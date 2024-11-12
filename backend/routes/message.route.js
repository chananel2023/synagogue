import express from 'express';
import { getMessages, createMessage, deleteMessage } from '../controllers/message.controller.js'; // ודא שהנתיב נכון

const router = express.Router();

router.get('/', getMessages);
router.post('/', createMessage);
router.delete('/:id', deleteMessage);

export default router;
