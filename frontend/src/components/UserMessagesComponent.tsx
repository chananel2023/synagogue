import React, { useState, useEffect } from 'react';
import axios from 'axios';

// הגדרת סוגים להודעה
interface Message {
    _id: string;
    text: string;
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
        <div style={styles.container}>
            <h2 style={styles.title}>עדכונים חמים</h2>
            {messages.length === 0 ? (
                <p style={styles.noMessages}>לא נמצאו הודעות</p>
            ) : (
                <div className="marquee-container">
                    {messages.map((message) => (
                        <div
                            key={message._id}
                            style={{
                                ...styles.messageBox,
                                backgroundColor: message.isActive ? '#D1F7D4' : '#E2E8F0',
                            }}
                        >
                            <p style={styles.messageText}>{message.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// סגנונות CSS בתוכה קובץ React
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '100%',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        paddingTop: '0px', // טופ פדינג עליון
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px',
        color: '#2D3748',
    },
    noMessages: {
        textAlign: 'center',
        color: '#A0AEC0',
    },
    messageBox: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        borderRadius: '5px',
        marginRight: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        whiteSpace: 'nowrap',
        minWidth: '200px', // הגבלת רוחב מינימלי
    },
    messageText: {
        fontSize: '1.2rem',
        fontWeight: '500',
        color: '#2D3748',
    },
};

// הכנסת אנימציה באמצעות CSS רגיל במקום JavaScript
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
    @keyframes marquee {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(100%);
        }
    }
    .marquee-container {
        display: flex;
        flex-direction: row;
        animation: marquee 10s linear infinite;
    }
`;
document.head.appendChild(styleSheet);

export default UserMessagesComponent;
