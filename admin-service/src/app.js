import express from "express";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    service: "kavach-admin-service",
    message: "Admin Service is running",
  });
});

app.use("/api/admin", adminRoutes);

export default app;