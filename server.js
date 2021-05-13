const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { formatMessage, saveMessage } = require("./utils/messages");

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getAllUsers
} = require("./utils/users");

const app = express()

const server = http.createServer(app);
const io = socketio(server);
io.origins(["http://localhost:4200"]);

const botName = "ChatCord Bot";

// Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ empName, empId, businessId }) => {

    if (!empName || !empId || !businessId) {
      return;
    }

    const user = userJoin(socket.id, empName, empId, businessId);
    socket.join(empId);
    socket.join("B-" + businessId);

    // Welcome current user
    //socket.emit("message", formatMessage(0, botName, "Welcome to ChatCord!"));

    // Broadcast when a user connects
    // socket.broadcast
    //   .to(user.room)
    //   .emit(
    //     "message",
    //     formatMessage(botName, `${user.username} has joined the chat`)
    //   );

    // Send users and room info
    io.to("B-" + businessId).emit("roomUsers", {
      users: getAllUsers(),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", ({ msg, receiver }) => {
    const user = getCurrentUser(socket.id);

    if (!user) {
      return
    }

    //saveMessage(user.empId, receiver, msg)
    io.to(receiver).emit("message", formatMessage(user.empId, user.empName, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      // io.to(user.room).emit(
      // "message",
      // formatMessage(0, botName, `${user.username} has left the chat`)
      //);

      // Send users and room info
      io.to("B-" + user.businessId).emit("roomUsers", {
        users: getAllUsers(),
      });
    }
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
