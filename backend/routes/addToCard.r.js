import express from 'express';


import addToCart, { getCart } from '../controllers/addToCart.js';

const router = express.Router();

// הוספת מוצר לעגלה
router.post('/', addToCart );

// הצגת עגלת קניות לפי ID של משתמש
router.get('/:userId',getCart )

export default router;
