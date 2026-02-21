import express from 'express';
import { createTfila, getTfilot, updateTfila, deleteTfila } from '../controllers/tfilot.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/verifyToken.js';

const router = express.Router();
router.get('/', getTfilot);
router.post('/', verifyToken, verifyAdmin, createTfila);
router.put('/:id', verifyToken, verifyAdmin, updateTfila);
router.delete('/:id', verifyToken, verifyAdmin, deleteTfila);

export default router;
