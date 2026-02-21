import express from 'express';
import {
    createLesson,
    getAllLessons,
    updateLesson,
    deleteLesson,
} from '../controllers/shiurim.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/verifyToken.js';

const router = express.Router();
router.get('/', getAllLessons);
router.post('/', verifyToken, verifyAdmin, createLesson);
router.put('/:id', verifyToken, verifyAdmin, updateLesson);
router.delete('/:id', verifyToken, verifyAdmin, deleteLesson);

export default router;
