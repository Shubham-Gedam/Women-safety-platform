import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(cors());

const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,

  pathRewrite: {
    "^/api/auth": "/api/auth",
  },

  on: {
    proxyReq: (proxyReq, req) => {
      console.log(
        "➡️ AUTH REQUEST:",
        req.method,
        req.originalUrl,
        "→",
        process.env.AUTH_SERVICE_URL
      );
    },

    error: (err, req, res) => {
      console.error("❌ Auth service error:", err.message);

      if (!res.headersSent) {
        res.status(502).json({
          status: "failed",
          message: "Auth service unavailable",
        });
      }
    },
  },
});

const userProxy = createProxyMiddleware({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/users": "/api/users",
  },
  on: {
    proxyReq: (proxyReq, req) => {
      console.log(
        "➡️ USER REQUEST:",
        req.method,
        req.originalUrl,
        "→",
        process.env.USER_SERVICE_URL
      );
    },
    error: (err, req, res) => {
      console.error("❌ User service error:", err.message);
      res.status(502).json({
        status: "failed",
        message: "User service unavailable",
      });
    },
  },
});

const alertProxy = createProxyMiddleware({
  target: process.env.ALERT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/alerts": "/api/alerts",
  },
  on: {
    proxyReq: (proxyReq, req) => {
      console.log(
        "➡️ ALERT REQUEST:",
        req.method,
        req.originalUrl,
        "→",
        process.env.ALERT_SERVICE_URL
      );
    },
    error: (err, req, res) => {
      console.error("❌ Alert service error:", err.message);
      res.status(502).json({
        status: "failed",
        message: "Alert service unavailable",
      });
    },
  },
});

const adminProxy = createProxyMiddleware({
  target: process.env.ADMIN_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    "^/api/admin": "/api/admin",
  },
  on: {
    error: (err, req, res) => {
      console.error("Admin service error:", err.message);
      res.status(502).json({ message: "Admin service unavailable" });
    },
  },
});

// Socket.IO traffic ke liye alag proxy — alert-service tak
const socketProxy = createProxyMiddleware({
  target: process.env.ALERT_SERVICE_URL,
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    "^/socket.io": "/socket.io",
  },
});

app.use("/api/auth", authProxy);
app.use("/api/users", userProxy);
app.use("/api/alerts", alertProxy);
app.use("/socket.io", socketProxy);
app.use("/api/admin", adminProxy);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "API Gateway is running" });
});

export { app, socketProxy };