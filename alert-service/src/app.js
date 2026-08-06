import express from "express";
import cookieParser from "cookie-parser";
import alertRoutes from "./routes/alert.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/alerts", alertRoutes);

export default app;