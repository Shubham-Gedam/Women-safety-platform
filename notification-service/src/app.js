import express from "express";
import notificationRoutes from "./routes/notification.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    service: "kavach-notification-service",
    message: "Notification Service is running",
  });
});


app.use("/api/notifications", notificationRoutes);

export default app;