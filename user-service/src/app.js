import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/user.routes.js";

const app = express();


app.use(express.json());
app.use(cookieParser());


app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    service: "kavach-user-service",
    message: "User Service is running",
  });
});



app.use("/api/users", userRoutes);



export default app;
