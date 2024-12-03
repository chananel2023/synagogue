import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// טעינת Stripe במפתח הציבורי שלך
const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY'); // המפתח הציבורי שלך מ-Stripe

const PaymentPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [amount, setAmount] = useState(10); // סכום ברירת מחדל של 10 דולר
    const [description, setDescription] = useState('תרומה לבית הכנסת');

    const stripe = useStripe();
    const elements = useElements();

    // טיפול בהגשת טופס התשלום
    const handleDonation = async () => {
        setIsLoading(true);
        setError(null);

        if (!stripe || !elements) {
            setError('Stripe לא הוטען כראוי');
            setIsLoading(false);
            return;
        }

        try {
            // שליחת בקשה ליצירת Payment Intent
            const response = await axios.post('/api/payment/create-payment-intent', {
                amount,
                description,
            });

            const { clientSecret } = response.data;

            // אישור תשלום עם Stripe
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement), // משתמשים ב-CardElement ישירות
                },
            });

            if (stripeError) {
                setError('stripeError.message');
            } else if (paymentIntent.status === 'succeeded') {
                // התשלום הצליח
                alert('התשלום הושלם בהצלחה');
            }

        } catch (error) {
            setError('שגיאה בתשלום');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="payment-page">
            <h1>תרום לבית הכנסת</h1>
            <div>
                <label>סכום תרומה ($):</label>
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="1"
                />
            </div>
            <div>
                <label>תיאור:</label>
                <input 
                    type="text" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>פרטי כרטיס אשראי:</label>
                <CardElement />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button 
                onClick={handleDonation} 
                disabled={isLoading}
            >
                {isLoading ? 'ממתין...' : 'תרום'}
            </button>
        </div>
    );
};

const PaymentPageWithStripe = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentPage />
        </Elements>
    );
};

export default PaymentPageWithStripe;
