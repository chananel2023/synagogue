import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme, useMediaQuery } from '@mui/material';

interface Message {
    _id: string;
    text: string;
    isActive: boolean;
}

const UserMessagesComponent: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) =>
                messages.length > 0 ? (prevIndex + 1) % messages.length : 0
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:5007/api/messages/');
            const data = await response.json();
            if (Array.isArray(data)) {
                const activeMessages = data.filter(msg => msg.isActive);
                setMessages(activeMessages);
                if (activeMessages.length === 0) {
                    setCurrentMessageIndex(0);
                }
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const navigateMessage = (direction: 'next' | 'prev') => {
        setCurrentMessageIndex(prevIndex => {
            if (direction === 'next') {
                return (prevIndex + 1) % messages.length;
            } else {
                return prevIndex === 0 ? messages.length - 1 : prevIndex - 1;
            }
        });
    };

    return (
        <div className="relative bg-gradient-to-r from-[#1D3557] to-[#152744] shadow-lg">
            <div className="max-w-7xl mx-auto relative">
                {/* Messages Display */}
                <div className="py-8 px-4 h-20 flex items-center justify-center relative">
                    {messages.length > 1 && (
                        <>
                            {isMobile ? (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => navigateMessage('prev')}
                                        className="absolute left-4 text-white/80 hover:text-white"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => navigateMessage('next')}
                                        className="absolute right-4 text-white/80 hover:text-white"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </motion.button>
                                </>
                            ) : (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => navigateMessage('prev')}
                                        className="absolute left-4 text-white/80 hover:text-white"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => navigateMessage('next')}
                                        className="absolute right-4 text-white/80 hover:text-white"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </motion.button>
                                </>
                            )}
                        </>
                    )}

                    <AnimatePresence mode="wait">
                        {messages.length > 0 ? (
                            <motion.div
                                key={messages[currentMessageIndex]._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className={`text-center text-${isMobile ? 'base' : 'xl'} font-medium text-white max-w-2xl`}
                            >
                                {messages[currentMessageIndex].text}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`text-center text-${isMobile ? 'base' : 'xl'} text-white/80`}
                            >
                                No new messages
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {!isMobile && (
                    <div className="absolute left-4 top-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-[#FFD700] text-[#1D3557] rounded-full flex items-center gap-2 hover:bg-[#ffd900] transition-colors shadow-md"
                        >
                            <span className="font-medium">הודעות קהילה</span>
                        </motion.button>
                    </div>
                )}

                {/* Messages Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                            onClick={(e) => {
                                if (e.target === e.currentTarget) setIsModalOpen(false);
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className={`bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto relative 
                                        ${isMobile ? 'text-base' : 'text-lg'}`}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-[#1D3557] flex items-center gap-2">
                                        כל ההודעות                                    </h2>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </motion.button>
                                </div>

                                <div className="space-y-3">
                                    {messages.length === 0 ? (
                                        <p className="text-center text-gray-500 py-4">No messages available</p>
                                    ) : (
                                        messages.map((message, index) => (
                                            <motion.div
                                                key={message._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-[#E0F7FA] p-4 rounded-lg hover:bg-[#D1EDF0] transition-colors"
                                            >
                                                {message.text}
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default React.memo(UserMessagesComponent);