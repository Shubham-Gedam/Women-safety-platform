import express from "express";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/admin", adminRoutes);

export default app;