import express from 'express';
import Stripe from 'stripe';
import { verifyToken } from '../middleware/verifyToken.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post('/create-payment-intent', verifyToken, async (req, res) => {
    const { amount, description } = req.body;

    if (!amount || !description) {
        return res.status(400).json({ message: 'Amount and description are required' });
    }

    if (typeof amount !== 'number' || amount <= 0 || amount > 100000) {
        return res.status(400).json({ message: 'Invalid amount' });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
            description,
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ message: 'Error creating payment intent' });
    }
});

export default router;
