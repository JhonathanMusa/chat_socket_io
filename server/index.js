const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("client"));

var messages = [
  {
    id: 1,
    text: "Welcome to my App",
    nickname: "JSM",
  },
];

io.on("connection", (socket) => {
  console.log(
    "The client with Ip: " + socket.handshake.address + " is online..."
  );

  socket.emit("messages", messages);

  socket.on("add-message", (data) => {
    messages.push(data);

    io.sockets.emit("messages", messages);
  });
});

server.listen(6677, () => {
  console.log("Server running on port 6677");
});
