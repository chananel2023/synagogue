import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';
import messagesRoutes from './routes/message.route.js';
import tfilotRoutes from './routes/tfilot.route.js';
import shiurimRouter from './routes/shiurim.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import slideRoutes from './routes/slide.route.js';
import paymentRoutes from './routes/paymentRoutes.js';
import addToCart from './routes/addToCard.r.js';
import cartRoutes from './routes/addToCard.r.js';
import aliyahRoutes from './routes/aliyah.route.js';



dotenv.config();
const PORT = process.env.PORT || 5007;
console.log('process.env.PORT ', process.env.PORT);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/tfilot', tfilotRoutes);
app.use('/api/lessons', shiurimRouter);
app.use('/api/slides', slideRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/addToCart', addToCart);
app.use("/api/aliyah", aliyahRoutes);
app.use('/cart', cartRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port : ', PORT);
});