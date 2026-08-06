import express from "express";
import { adminAuthMiddleware } from "../middlewares/admin.middleware.js";
import * as adminController from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/safety-zones", adminController.listSafetyZonesController);

router.use(adminAuthMiddleware);   // is line ke neeche sab routes admin-only

router.get("/users", adminController.getUsersController);
router.get("/volunteers", adminController.getVolunteersController);
router.patch("/volunteers/:id/verify", adminController.verifyVolunteerController);
router.get("/alerts", adminController.getAlertsController);
router.post("/safety-zones", adminController.createSafetyZoneController);


export default router;