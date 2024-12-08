import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe, StripeCardElementOptions } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuthStore } from '../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Aliyah {
    _id: string;
    buyer: string;
    price: number;
    date: string;
    isPaid: boolean;
    quantity: number;
}

interface CheckoutFormProps {
    userId: string;
    aliyahIds: string[];
    onSuccess: () => void;
    totalAmount: number;
}

interface UnpaidAliyotProps {
    userId: string;
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || '');
console.log(stripePromise)

const cardStyle: StripeCardElementOptions = {
    style: {
        base: {
            color: "#fff",
            fontFamily: '"Heebo", sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "rgba(255, 255, 255, 0.8)"
            },
            backgroundColor: "transparent"
        },
        invalid: {
            color: "#ffd6d6",
            iconColor: "#ffd6d6"
        }
    },
    hidePostalCode: true
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3
        }
    }
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ userId, aliyahIds, onSuccess, totalAmount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        if (!stripe || !elements) {
            toast.error('שגיאה בטעינת Stripe', { rtl: true });
            return;
        }

        setLoading(true);

        try {
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) throw new Error('לא נמצא אלמנט כרטיס אשראי');

            const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (stripeError) throw new Error(stripeError.message);

            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5007';
            await axios.post(`${apiUrl}/api/aliyah/payAliyot`, {
                userId,
                aliyahIds,
                paymentMethodId: paymentMethod.id,
            });

            toast.success('התשלום בוצע בהצלחה!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                rtl: true,
                className: 'green-toast'
            });

            onSuccess();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'שגיאה לא ידועה התרחשה';
            setError(errorMessage);
            toast.error(errorMessage, {
                position: "top-center",
                rtl: true
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto p-6 backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 rounded-xl shadow-2xl border border-white/20"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-4 border border-white/20 rounded-lg bg-white/5">
                    <CardElement options={cardStyle} />
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-center justify-between pt-4">
                    <div className="text-white">
                        <span className="text-lg opacity-80">סה"כ לתשלום:</span>
                        <span className="text-2xl font-bold mr-2">${totalAmount}</span>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={!stripe || loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
              px-8 py-3 rounded-lg font-medium text-white
              transition-all duration-200 ease-in-out
              ${loading
                                ? 'bg-blue-500/50 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-blue-500/25'
                            }
            `}
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                מעבד תשלום...
                            </span>
                        ) : (
                            'אישור תשלום'
                        )}
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

const UnpaidAliyot: React.FC<UnpaidAliyotProps> = ({ userId }) => {
    const [aliyot, setAliyot] = useState<Aliyah[]>([]);
    const [selectedAliyot, setSelectedAliyot] = useState<string[]>([]);
    const { user } = useAuthStore();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAliyot = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5007';
                const response = await axios.post(
                    `${apiUrl}/api/aliyah/getUnpaidAliyot`,
                    { userId }
                );
                setAliyot(response.data.data.userTorahAliyah);
            } catch (error) {
                toast.error('שגיאה בטעינת העליות', { rtl: true });
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchAliyot();
        }
    }, [userId]);

    const totalAmount = selectedAliyot.reduce((sum, id) => {
        const aliyah = aliyot.find(a => a._id === id);
        return sum + (aliyah?.price || 0);
    }, 0);

    const handleSuccess = () => {
        setAliyot(aliyot.filter(aliyah => !selectedAliyot.includes(aliyah._id)));
        setSelectedAliyot([]);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
                <div className="relative w-24 h-24">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 border-opacity-20 rounded-full animate-ping"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div dir="rtl" className="min-h-screen  from-blue-900 via-blue-800 to-indigo-900 py-8 px-4 sm:px-6 lg:px-8">
            <ToastContainer position="top-center" rtl={true} />
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto"
            >
                <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-between mb-8 text-white"
                >
                    <h1 className="text-3xl font-bold">שלום {user?.name}</h1>
                    <span className="text-xl text-blue-200">עליות לתשלום</span>
                </motion.div>

                {aliyot.length === 0 ? (
                    <motion.div
                        variants={itemVariants}
                        className="text-center py-12 backdrop-blur-lg bg-white/5 rounded-xl text-blue-200"
                    >
                        <svg className="mx-auto h-12 w-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        אין עליות לתשלום כרגע
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        <motion.div className="grid gap-4">
                            {aliyot.map((aliyah) => (
                                <motion.div
                                    key={aliyah._id}
                                    variants={itemVariants}
                                    className="group flex items-center justify-between p-4 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 transition-all hover:bg-white/10"
                                >
                                    <div className="flex items-center">
                                        <motion.input
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            type="checkbox"
                                            className="w-5 h-5 rounded-md text-blue-500 border-white/20 focus:ring-blue-500 focus:ring-offset-0 bg-transparent"
                                            checked={selectedAliyot.includes(aliyah._id)}
                                            onChange={() => {
                                                setSelectedAliyot(prev =>
                                                    prev.includes(aliyah._id)
                                                        ? prev.filter(id => id !== aliyah._id)
                                                        : [...prev, aliyah._id]
                                                );
                                            }}
                                        />
                                        <div className="mr-4">
                                            <h3 className="font-medium text-white text-lg">{aliyah.buyer}</h3>
                                            <p className="text-blue-200 text-sm">{new Date(aliyah.date).toLocaleDateString('he-IL')}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-white text-xl">${aliyah.price}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        <AnimatePresence>
                            {selectedAliyot.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="mt-8 border-t border-white/10 pt-6"
                                >
                                    <Elements stripe={stripePromise}>
                                        <CheckoutForm
                                            userId={userId}
                                            aliyahIds={selectedAliyot}
                                            onSuccess={handleSuccess}
                                            totalAmount={totalAmount}
                                        />
                                    </Elements>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default UnpaidAliyot;