import express from "express";
import { createProfileController, getProfileController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {createContactController,getContactsController,} from "../controllers/emergencyContact.controller.js";

const router = express.Router();

router.post("/profile", authMiddleware, createProfileController);
router.get("/profile", authMiddleware, getProfileController);
router.post("/emergency-contacts", authMiddleware, createContactController);
router.get("/emergency-contacts", authMiddleware, getContactsController);

export default router;