const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let documentContent = "";

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  // Send current content to new user
  socket.emit("text-update", documentContent);

  socket.on("text-change", (data) => {
    documentContent = data;
    socket.broadcast.emit("text-update", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

http.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
