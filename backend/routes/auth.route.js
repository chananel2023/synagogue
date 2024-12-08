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
import { verifyToken } from '../middleware/verifyToken.js';




const router = express.Router();
router.get('/users', getAllUsers);
router.get("/check-auth", verifyToken, checkAuth);
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.put("/to-admin",updateToAdmin)




export default router;
