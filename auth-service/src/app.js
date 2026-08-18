import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes.js";

const app = express();


app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    service: "kavach-auth-service",
    message: "Auth Service is running",
  });
});
app.use('/api/auth', authRoutes);


export default app;
