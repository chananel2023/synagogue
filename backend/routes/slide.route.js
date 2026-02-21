import express from 'express';
import { getSlides, createSlide, updateSlide, deleteSlide } from '../controllers/slide.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', getSlides);
router.post('/', verifyToken, verifyAdmin, createSlide);
router.put('/:id', verifyToken, verifyAdmin, updateSlide);
router.delete('/:id', verifyToken, verifyAdmin, deleteSlide);

export default router;
