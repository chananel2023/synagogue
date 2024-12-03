import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    _id: string;
    text: string;
    isActive: boolean;
}

const UserMessagesComponent: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 60000); // עדכון כל דקה
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) =>
                messages.length > 0 ? (prevIndex + 1) % messages.length : 0
            );
        }, 5000); // החלפת הודעה כל 5 שניות
        return () => clearInterval(interval);
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get<Message[]>('http://localhost:5007/api/messages/');
            if (Array.isArray(response.data)) {
                const activeMessages = response.data.filter(msg => msg.isActive);
                setMessages(activeMessages);

                // אם אין הודעות פעילות, אפס את האינדקס
                if (activeMessages.length === 0) {
                    setCurrentMessageIndex(0);
                }
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    return (
        <div className="bg-blue-600 text-white p-2">
            <AnimatePresence mode="wait">
                {messages.length > 0 ? (
                    <motion.div
                        key={messages[currentMessageIndex]._id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        {messages[currentMessageIndex].text}
                    </motion.div>
                ) : (
                    <div className="text-center">אין הודעות חדשות</div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserMessagesComponent;