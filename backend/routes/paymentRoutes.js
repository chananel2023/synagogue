import express from 'express';
import Stripe from 'stripe';

// הגדרת Stripe עם המפתח הסודי שלך
const stripe = new Stripe('YOUR_STRIPE_SECRET_KEY'); // המפתח הסודי שלך ב-Stripe

const router = express.Router();

// יצירת Payment Intent
router.post('/create-payment-intent', async (req, res) => {
    const { amount, description } = req.body; // קבלת הנתונים מה-Client

    // ווידוא שהנתונים הגיעו
    if (!amount || !description) {
        return res.status(400).json({ message: 'Amount and description are required' });
    }

    try {
        // יצירת Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe מצפה לסכום באגורות (למשל 10 דולר = 1000 אגורות)
            currency: 'usd', // הגדרת המטבע
            description, // תיאור התשלום
        });

        // החזרת ה-clientSecret לקליינט
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating payment intent' });
    }
});

export default router;
