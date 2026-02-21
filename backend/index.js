import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';
import messagesRoutes from './routes/message.route.js';
import tfilotRoutes from './routes/tfilot.route.js';
import shiurimRouter from './routes/shiurim.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import slideRoutes from './routes/slide.route.js';
import paymentRoutes from './routes/paymentRoutes.js';
import cartRoutes from './routes/addToCard.r.js';
import aliyahRoutes from './routes/aliyah.route.js';

dotenv.config();
const PORT = process.env.PORT || 5007;

const app = express();

// Security headers
app.use(helmet());

// Rate limiting — max 100 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: 'Too many requests, try again later' },
});
app.use(limiter);

// Stricter rate limit for auth routes (login/signup brute force protection)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { success: false, message: 'Too many attempts, try again later' },
});

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/tfilot', tfilotRoutes);
app.use('/api/lessons', shiurimRouter);
app.use('/api/slides', slideRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/addToCart', cartRoutes);
app.use("/api/aliyah", aliyahRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port:', PORT);
});
