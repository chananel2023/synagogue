import express from 'express';

import {
	signup, login, logout,
	verifyEmail,
	forgotPassword,
	resetPassword,
	checkAuth,
	getAllUsers,
	updateToAdmin,
} from '../controllers/auth.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/verifyToken.js';

const router = express.Router();
router.get('/users', verifyToken, verifyAdmin, getAllUsers);
router.get("/check-auth", verifyToken, checkAuth);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.put("/to-admin", verifyToken, verifyAdmin, updateToAdmin);

export default router;
