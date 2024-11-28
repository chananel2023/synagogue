import express from 'express';
import {
    createLesson,
    getAllLessons,
    updateLesson,
    deleteLesson,
} from '../controllers/shiurim.controller.js';

const router = express.Router();

// יצירת שיעור
router.post('/', createLesson);

// קבלת כל השיעורים
router.get('/', getAllLessons);

// עדכון שיעור לפי ID
router.put('/:id', updateLesson);

// מחיקת שיעור לפי ID
router.delete('/:id', deleteLesson);

export default router;
