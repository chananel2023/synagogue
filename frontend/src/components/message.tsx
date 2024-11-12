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
    const [messages, setMessages] = useState<Message[]>([]);  // מצב ראשוני כ-מערך ריק

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
        <div>
            <h1>הודעות </h1>
            <ul>
                {messages.map(message => (
                    <li key={message._id}>
                         {message.text} <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserMessagesComponent;
