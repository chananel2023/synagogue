import express from 'express';
import addToCart, { getCart } from '../controllers/addToCart.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addToCart);
router.get('/:userId', verifyToken, getCart);

export default router;
