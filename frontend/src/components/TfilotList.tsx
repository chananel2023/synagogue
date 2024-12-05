import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertCircle, RefreshCcw, Loader2, BookOpen } from 'lucide-react';

interface Tfila {
    _id: string;
    tfila: string;
    time: string;
}

const TfilotList = () => {
    const [tfilot, setTfilot] = useState<Tfila[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTfilot = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5007/api/tfilot');
            const data = await response.json();
            setTfilot(data);
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
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <div className="pt-24 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                        <BookOpen className="w-8 h-8 text-[#007BFF]" />
                        <h2 className="text-3xl font-bold text-[#007BFF]">
                            זמני תפילות
                        </h2>
                    </div>
                </motion.div>

                {/* Loading State */}
                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-center items-center h-40"
                        >
                            <Loader2 className="w-12 h-12 animate-spin text-[#007BFF]" />
                        </motion.div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg"
                        >
                            <AlertCircle className="w-12 h-12 text-red-500" />
                            <p className="text-red-600 font-medium text-lg">{error}</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={fetchTfilot}
                                className="px-6 py-2 bg-[#007BFF] text-white rounded-full flex items-center gap-2 hover:bg-[#0056b3] transition-colors shadow-md"
                            >
                                <RefreshCcw className="w-5 h-5" />
                                <span>נסה שוב</span>
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Prayer Times Grid */}
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
                                    className="col-span-full text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                                >
                                    <p className="text-gray-600 text-lg">לא קיימות תפילות במערכת כרגע</p>
                                </motion.div>
                            ) : (
                                tfilot.map((tfila) => (
                                    <motion.div
                                        key={tfila._id}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.03 }}
                                        className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg
                                                 transition-all duration-300 border border-white/50"
                                    >
                                        <div className="flex flex-col items-center gap-4">
                                            <h3 className="text-xl font-bold text-[#007BFF]">
                                                {tfila.tfila}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-[#FFD700]" />
                                                <span className="text-3xl font-mono font-bold text-[#007BFF]">
                                                    {tfila.time.split(':')[0]}
                                                    <span className="text-2xl mx-1">:</span>
                                                    {tfila.time.split(':')[1]}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default React.memo(TfilotList);