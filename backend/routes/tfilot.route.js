import express from 'express';
import { createTfila, getTfilot, updateTfila, deleteTfila } from '../controllers/tfilot.controller.js';
const router = express.Router();
router.post('/', createTfila);
router.get('/', getTfilot);
router.put('/:id', updateTfila);
router.delete('/:id', deleteTfila);
export default router;






