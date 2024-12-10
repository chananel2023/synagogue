import express from 'express';
import {
    createLesson,
    getAllLessons,
    updateLesson,
    deleteLesson,
} from '../controllers/shiurim.controller.js';
const router = express.Router();
router.post('/', createLesson);
router.get('/', getAllLessons);
router.put('/:id', updateLesson);
router.delete('/:id', deleteLesson);
export default router;
