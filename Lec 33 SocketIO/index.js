const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    socket.on("User-message", (message) => {
        console.log(socket.id + " says " + message);

        io.emit("message", message);
    });

});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./public/index.html"));
});

server.listen(8000, () => console.log("Server Started"));