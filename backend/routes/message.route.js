import express from 'express';
import { getMessages, createMessage, deleteMessage } from '../controllers/message.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', getMessages);
router.post('/', verifyToken, createMessage);
router.delete('/:id', verifyToken, verifyAdmin, deleteMessage);

export default router;
