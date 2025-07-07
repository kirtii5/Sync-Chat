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

// ✅ Socket.IO server with CORS config
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // your frontend port
        methods: ["GET", "POST"],
        credentials: true
    }
});

// ✅ Global Socket.IO connection
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

    socket.on("disconnect", () => {
        console.log("🔴 A user disconnected");
    });
});

// ✅ Make `io` accessible in routes via middleware
app.use((req, res, next) => {
    req.io = io;
    next();
});

// ✅ Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/message", messageRoute);

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
