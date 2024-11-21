import React, { useState, useEffect } from 'react';
import axios from 'axios';

// הגדרת סוגים להודעה
interface Message {
    _id: string;
    text: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
}

const UserMessagesComponent: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]); // מצב ראשוני כ-מערך ריק

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get<Message[]>('http://localhost:5007/api/messages/');
            if (Array.isArray(response.data)) {
                setMessages(response.data);
            } else {
                console.error('Response data is not an array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">הודעות</h2>
            {messages.length === 0 ? (
                <p className="text-center text-gray-500">לא נמצאו הודעות</p>
            ) : (
                <ul className="space-y-4">
                    {messages.map((message) => (
                        <li
                            key={message._id}
                            className={`p-4 border rounded-md ${
                                message.isActive ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'
                            }`}
                        >
                            <p className="text-lg font-medium text-gray-800">{message.text}</p>
                            <p className="text-sm text-gray-600">
                                <strong>מ: </strong>{message.startTime} <strong>עד: </strong>{message.endTime}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserMessagesComponent;
