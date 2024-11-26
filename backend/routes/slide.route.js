import express from 'express';
import { getSlides, createSlide, updateSlide, deleteSlide } from '../controllers/slide.controller.js';

const router = express.Router();

router.get('/', getSlides);
router.post('/', createSlide);
router.put('/:id', updateSlide);
router.delete('/:id', deleteSlide);

export default router;
