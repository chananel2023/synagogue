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
        width: '100vw', // פריסה על כל רוחב העמוד
        height: '120x', // עובי צר
        padding: '0',
        margin: '0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '1rem',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '5px 0',
        color: '#2D3748',
        margin: '0',
    },
    noMessages: {
        textAlign: 'center',
        color: '#A0AEC0',
        fontSize: '0.9rem',
    },
    messageBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 20px',
        borderRadius: '5px',
        marginRight: '20px',
        whiteSpace: 'nowrap',
        minWidth: '200px',
        height: '80%', // תופס את כל הגובה של השורה
        backgroundColor: '#D1F7D4',
    },
    messageText: {
        fontSize: '1rem',
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
        animation: marquee 20s linear infinite;
        position: relative;
        width: 100vw; /* פריסה על כל רוחב המסך */
        height: 100%; /* מתיישר לגובה הרכיב */
        padding-top: 0; /* טופ פדינג */
    }
`;
document.head.appendChild(styleSheet);

export default UserMessagesComponent;
