import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './PaymentPage.css'; // Custom CSS for better styling

// Load Stripe with your publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '');

const PaymentPage = () => {
    const [dues, setDues] = useState<number | ''>(''); // 
    const [amount, setAmount] = useState<number | ''>(''); // Support for empty state
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    // useEffect(()=>{
    //     const fetchDept = ()=>{
    //         const result = axios.get(...)
    //         setDues(result.data)
    //     }
    //     fetchDept();
    // },[])
    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!stripe || !elements) {
            setError('Stripe has not been loaded properly.');
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            setError('Please enter your card details.');
            return;
        }

        if (!amount || amount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }

        setIsLoading(true);

        try {
            // Send payment amount to backend to create a PaymentIntent
            const { data } = await axios.post('/api/payment/create-payment-intent', {
                amount: Math.round(amount * 100), // Stripe expects the amount in cents
                description: 'Payment to synagogue',
            });

            const { clientSecret } = data;

            // Confirm card payment with Stripe
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (stripeError) {
                setError(stripeError.message || 'Payment failed.');
            } else if (paymentIntent?.status === 'succeeded') {
                setSuccess(true);
                setAmount(''); // Reset amount after successful payment
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Server error during payment.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="payment-page">
            <h1>אתה נמצא בחוב על סך {dues} </h1>
            <p className="description">
                Use the form below to pay your outstanding dues to the synagogue.
            </p>
            <form onSubmit={handlePayment} className="payment-form">
                <div className="form-group">
                    <label htmlFor="amount">Amount Due ($):</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        min="0.01"
                        step="0.01"
                        required
                        placeholder="Enter amount"
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label>Credit Card Details:</label>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#32325d',
                                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#fa755a',
                                    iconColor: '#fa755a',
                                },
                            },
                        }}
                        className="card-element"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">Payment successful! Thank you.</p>}
                <button
                    type="submit"
                    disabled={isLoading || !stripe || !elements}
                    className={`submit-button ${isLoading ? 'loading' : ''}`}
                >
                    {isLoading ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
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
