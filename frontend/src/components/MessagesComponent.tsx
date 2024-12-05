import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Clock, X, Check, Loader2 } from 'lucide-react';

interface Message {
    _id: string;
    text: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
}

const MessagesComponent = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:5007/api/messages');
            const data = await response.json();
            if (Array.isArray(data)) {
                setMessages(data);
            }
        } catch (err) {
            setError('שגיאה בטעינת ההודעות');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setText('');
        setStartTime('');
        setEndTime('');
        setIsModalOpen(false);
        setError(null);
    };

    const handleSubmit = async () => {
        if (!text || !startTime || !endTime) {
            setError('נא למלא את כל השדות');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:5007/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text,
                    startTime: new Date(startTime).toISOString(),
                    endTime: new Date(endTime).toISOString(),
                }),
            });

            if (response.ok) {
                await fetchMessages();
                resetForm();
            }
        } catch (err) {
            setError('שגיאה בשמירת ההודעה');
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteMessage = async (id: string) => {
        try {
            await fetch(`http://localhost:5007/api/messages/${id}`, {
                method: 'DELETE'
            });
            setMessages(messages.filter(m => m._id !== id));
        } catch (err) {
            setError('שגיאה במחיקת ההודעה');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[#007BFF]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Centered Header */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-[#007BFF] inline-block bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-md"
                    >
                        ניהול הודעות
                    </motion.h2>
                </div>

                {/* Add Button */}
                <div className="mb-8 flex justify-end">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#007BFF] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#0056b3] transition-colors shadow-md"
                    >
                        <Plus size={20} />
                        <span>הוסף הודעה</span>
                    </motion.button>
                </div>

                {/* Error Alert */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-right"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Add Message Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                            onClick={(e) => {
                                if (e.target === e.currentTarget) {
                                    resetForm();
                                }
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-xl p-6 w-full max-w-md mx-4 relative"
                            >
                                <button
                                    onClick={resetForm}
                                    className="absolute left-4 top-4 text-gray-500 hover:text-gray-700"
                                >
                                    <X size={20} />
                                </button>
                                <h3 className="text-xl font-bold text-[#007BFF] mb-4 text-right">
                                    הוספת הודעה חדשה
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-right text-sm font-medium mb-2">תוכן ההודעה</label>
                                        <textarea
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            className="w-full p-3 border rounded-lg text-right resize-none focus:ring-2 focus:ring-[#007BFF] focus:border-transparent"
                                            rows={3}
                                            placeholder="הכנס את תוכן ההודעה כאן..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-right text-sm font-medium mb-2">זמן התחלה</label>
                                            <input
                                                type="datetime-local"
                                                value={startTime}
                                                onChange={(e) => setStartTime(e.target.value)}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#007BFF] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-right text-sm font-medium mb-2">זמן סיום</label>
                                            <input
                                                type="datetime-local"
                                                value={endTime}
                                                onChange={(e) => setEndTime(e.target.value)}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#007BFF] focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full bg-[#007BFF] text-white py-2 rounded-lg hover:bg-[#0056b3] transition-colors
                                                 flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <Check size={20} />
                                                <span>שמור הודעה</span>
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Messages Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {messages.map((message) => (
                        <motion.div
                            key={message._id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 relative group shadow-md"
                        >
                            <p className="text-lg font-medium mb-3 text-right">
                                {message.text}
                            </p>
                            <div className="text-sm text-gray-600 text-right flex items-center justify-end gap-2">
                                <Clock size={16} />
                                <span>{new Date(message.startTime).toLocaleString()}</span>
                                <span>-</span>
                                <span>{new Date(message.endTime).toLocaleString()}</span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => deleteMessage(message._id)}
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 
                                         text-white p-1.5 rounded-full"
                                title="מחק הודעה"
                            >
                                <X size={16} />
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default React.memo(MessagesComponent);