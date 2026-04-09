import express from "express";
import app from "./src/app.js";
import dotenv from "dotenv";
import { Server } from "socket.io";
import "./src/config/mongo.js";

import { VerifyToken, VerifySocketToken } from "./src/middlewares/VerifyToken.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  },
});

io.use(VerifySocketToken);

global.onlineUsers = new Map();

const getKey = (map, val) => {
  for (let [key, value] of map.entries()) {
    if (value === val) return key;
  }
};

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit("getUsers", Array.from(onlineUsers));
  });

  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const sendUserSocket = onlineUsers.get(receiverId);
    if (sendUserSocket) {
      io.to(sendUserSocket).emit("getMessage", {
        senderId,
        message,
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(getKey(onlineUsers, socket.id));
    io.emit("getUsers", Array.from(onlineUsers));
  });
});