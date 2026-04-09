import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import { VerifyToken, VerifySocketToken } from "./middlewares/VerifyToken.js";
import chatRoomRoutes from "./routes/chatRoom.js";
import chatMessageRoutes from "./routes/chatMessage.js";
import userRoutes from "./routes/user.js";

const __dirname = path.resolve();
const app = express();

dotenv.config();

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Protect only the /api route footprint
app.use("/api", VerifyToken);

app.use("/api/room", chatRoomRoutes);
app.use("/api/message", chatMessageRoutes);
app.use("/api/user", userRoutes);

// Catch-all route to hand off client-side routing to React
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default app;
