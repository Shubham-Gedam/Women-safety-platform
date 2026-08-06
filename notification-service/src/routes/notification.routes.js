import express from "express";
import { sendSOSNotificationController } from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/sos-alert", sendSOSNotificationController);

export default router;