import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Tfila {
    _id: string;
    tfila: string;
    time: string;
}

const TfilotList: React.FC = () => {
    const [tfilot, setTfilot] = useState<Tfila[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTfilot = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Tfila[]>('http://localhost:5007/api/tfilot');
            setTfilot(response.data);
        } catch (err) {
            setError('שגיאה בטעינת התפילות');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTfilot();
    }, [fetchTfilot]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 text-indigo-800" style={{ fontFamily: 'Arial, sans-serif' }}>
                זמני תפילות
            </h2>

            {loading && (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            )}

            {error && !loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mb-4"
                >
                    <p className="text-red-600 mb-2">{error}</p>
                    <button
                        onClick={fetchTfilot}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        נסה שוב
                    </button>
                </motion.div>
            )}

            {!loading && !error && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {tfilot.length === 0 ? (
                        <motion.div
                            variants={itemVariants}
                            className="text-center text-gray-500 col-span-full"
                        >
                            לא קיימות תפילות במערכת כרגע. חזור מאוחר יותר.
                        </motion.div>
                    ) : (
                        tfilot.map((tfila) => (
                            <motion.div
                                key={tfila._id}
                                variants={itemVariants}
                                className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
                            >
                                <span className="text-xl font-bold text-indigo-800 mb-2">{tfila.tfila}</span>
                                <span className="text-4xl font-mono font-bold text-indigo-600">
                                    {tfila.time.split(':')[0]}
                                    <span className="text-3xl">:</span>
                                    {tfila.time.split(':')[1]}
                                </span>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default React.memo(TfilotList);