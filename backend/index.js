import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';
import messagesRoutes from './routes/message.route.js'

import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config();
const PORT = process.env.PORT || 5007
console.log('process.env.PORT ', process.env.PORT)
const app = express();
//a
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000', // הכתובת של ה-Frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // מתיר שליחת עוגיות
}));
app.use('/api/auth', authRoutes);
app.use('/api/messages', messagesRoutes);
app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port : ', PORT);
});


















