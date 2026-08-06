import express from "express";
import * as authController from '../controllers/auth.controller.js';
import * as adminController from '../controllers/admin.controller.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', authController.registerController)
router.post('/login', authController.loginController)
router.post('/logout', authMiddleware.authMiddleware, authController.userLogoutController)
router.get('/me', authMiddleware.authMiddleware, authController.getMeController)
router.patch('/volunteer/request', authMiddleware.authMiddleware, authController.requestVolunteerController)

router.get('/admin/users', authMiddleware.authMiddleware, authMiddleware.requireAdmin, adminController.listUsersController)
router.patch('/admin/users/:id/verify', authMiddleware.authMiddleware, authMiddleware.requireAdmin, adminController.verifyUserController)

export default router;