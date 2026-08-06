import express from "express";
import { authMiddleware, requireAdmin } from "../middlewares/auth.middleware.js";
import * as alertController from "../controllers/alert.controller.js";

const router = express.Router();

router.post("/sos", authMiddleware, alertController.createSOSController);

router.patch("/:id/accept", authMiddleware, alertController.acceptAlertController);
router.patch("/:id/resolve", authMiddleware, alertController.resolveAlertController);
router.patch("/:id/decline", authMiddleware, alertController.declineAlertController);


router.get("/history", authMiddleware, alertController.getHistoryController);
router.get("/admin/all", authMiddleware, requireAdmin, alertController.getAllAlertsController);


router.get("/:id", authMiddleware, alertController.getAlertByIdController);



export default router;