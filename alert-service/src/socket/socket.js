import jwt from "jsonwebtoken";
import VolunteerLocation from "../models/volunteerLocation.model.js";

const onlineUsers = new Map(); // authUserId -> socketId (dono users aur volunteers ke liye)

export function initSocket(io) {
  io.use((socket, next) => {
  const token =
    socket.handshake.auth?.token ||
    socket.handshake.headers?.authorization?.split(" ")[1] ||
    socket.handshake.query?.token;

  if (!token) {
    return next(new Error("Authentication token missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    next();
  } catch (error) {
    next(new Error("Invalid or expired token"));
  }
});

  io.on("connection", (socket) => {
    onlineUsers.set(socket.userId, socket.id);
    console.log(`Connected: ${socket.userId}`);

    socket.on("location:update", async ({ latitude, longitude }) => {
      try {
        await VolunteerLocation.findOneAndUpdate(
          { authUserId: socket.userId },
          {
            authUserId: socket.userId,
            location: { type: "Point", coordinates: [longitude, latitude] },
            isOnline: true,
          },
          { upsert: true, returnDocument:"after"}
        );
      } catch (error) {
        console.error("Location update error:", error);
      }
    });

    socket.on("disconnect", async () => {
      onlineUsers.delete(socket.userId);
      try {
        await VolunteerLocation.findOneAndUpdate(
          { authUserId: socket.userId },
          { isOnline: false }
        );
      } catch (error) {
        // volunteer entry na ho toh ignore kar do
      }
      console.log(`Disconnected: ${socket.userId}`);
    });
  });
}

export { onlineUsers };