import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuthStore } from '../store/authStore';

// טעינת המפתח הפומבי מ-.env
const stripePromise = loadStripe('pk_test_51QRYlcIxvrp9Hc1FCpRCt0Fp7eKNpYhRNrc4rZ70fqHQX5gjksS1LUfyiofDWnRDKLLjp240yw4PfSkNukV4dsop00lLgQDfu4');
console.log(stripePromise )


// טיפוס עבור פרטי עלייה
interface Aliyah {
    _id: string;
    buyer: string;
    price: number;
    isPaid: boolean;
    date: string;
    quantity: number;
}

// טיפוס עבור פרופס
interface UnpaidAliyotProps {
    userId: string;
}

const CheckoutForm: React.FC<{ userId: string; aliyahIds: string[]; onSuccess: () => void }> = ({
    userId,
    aliyahIds,
    onSuccess,
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.error('Stripe.js has not loaded.');
            return;
        }

        setLoading(true);

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            console.error('CardElement is not available.');
            setLoading(false);
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error('Error creating payment method:', error.message);
            setLoading(false);
            return;
        }

        try {
            await axios.post(`http://localhost:5007/api/aliyah/payAliyot`, {
                userId,
                aliyahIds,
                paymentMethodId: paymentMethod.id,
            });

            alert('Payment successful!');
            onSuccess();
        } catch (apiError) {
            console.error('Error processing payment:', apiError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement options={{ hidePostalCode: true }} />
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

const UnpaidAliyot: React.FC<UnpaidAliyotProps> = ({ userId }) => {
    const [aliyot, setAliyot] = useState<Aliyah[]>([]);
    const { user } = useAuthStore();

    useEffect(() => {
        const fetchAliyot = async () => {
            try {
                const response = await axios.post(`http://localhost:5007/api/aliyah/getUnpaidAliyot`, { userId });
                setAliyot(response.data.data.userTorahAliyah);
            } catch (error) {
                console.error('Error fetching aliyot:', error);
            }
        };
        fetchAliyot();
    }, [userId]);

    const handleSuccess = (aliyahIds: string[]) => {
        setAliyot(aliyot.filter(aliyah => !aliyahIds.includes(aliyah._id)));
    };

    return (
        <div>
            <h1>היי {user.name}</h1>
            {aliyot.map(aliyah => (
                <div key={aliyah._id}>
                    <p>
                        {aliyah.buyer} - ${aliyah.price}
                    </p>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            userId={userId}
                            aliyahIds={[aliyah._id]}
                            onSuccess={() => handleSuccess([aliyah._id])}
                        />
                    </Elements>
                </div>
            ))}
        </div>
    );
};

export default UnpaidAliyot;
