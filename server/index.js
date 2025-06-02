require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const app = express();
const  userRoute = require('./routes/userRoute');

const server = http.createServer(app);
const io = new Server(server);

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


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/", userRoute);
