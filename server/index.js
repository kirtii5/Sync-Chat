require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");
const ExpressError = require("./utils/ExpressError");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("🟢 A user connected");

    socket.on("join_chat", (chatId) => {
        socket.join(chatId);
        console.log(`👤 User joined chat: ${chatId}`);
    });

    socket.on("send_message", (messageData) => {
        const { chatId, ...message } = messageData;
        io.to(chatId).emit("new_message", message);
        console.log("📨 Message sent to room:", chatId);
    });

    socket.on("typing", (chatId) => {
        socket.to(chatId).emit("typing", chatId);
    });

    socket.on("stop_typing", (chatId) => {
        socket.to(chatId).emit("stop_typing", chatId);
    });

    socket.on("disconnect", () => {
        console.log("🔴 A user disconnected");
    });
});

app.use((req, res, next) => {
    req.io = io;
    next();
});


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/message", messageRoute);


app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
});

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
