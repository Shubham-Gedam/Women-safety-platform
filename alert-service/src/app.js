import express from "express";
import cookieParser from "cookie-parser";
import alertRoutes from "./routes/alert.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    service: "kavach-alert-service",
    message: "Alert Service is running",
  });
});

app.use("/api/alerts", alertRoutes);

export default app;