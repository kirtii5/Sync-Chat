require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const app = express();
const  userRoute = require('./routes/userRoute');
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute.js");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");
const ExpressError = require("./utils/ExpressError.js");

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => { // runs code whenever new user joins
    console.log("a user connected");


socket.on("join_chat", (chatId) => { //When the frontend calls socket.emit("join_chat", chatId);this handler runs.
    socket.join(chatId);
    console.log(`user joined chat: ${chatId}`);
});

socket.on("disconnect", () => { //Runs automatically when the socket disconnects:
    console.log("A user is disconnected");
});
});

app.use((req, res, next) => {
    req.io = io;
    next();
});



const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
     useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log(err);
});

server.listen(PORT, () => {
    console.log(`app is listening to port ${PORT}`);
})

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/message", messageRoute);



app.use((err, req, res, next) => {
    console.log(err.stack);
    const status = err.status || 500;
    const message = err.message || "internal server error";
    res.status(status).json({message});
})
