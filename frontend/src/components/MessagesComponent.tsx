import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

// הגדרת סוגים להודעה
interface Message {
    _id: string;
    text: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
}

const MessagesComponent: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get<Message[]>('http://localhost:5007/api/messages');
            if (Array.isArray(response.data)) {
                setMessages(response.data);
            } else {
                console.error('Response data is not an array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const addMessage = async () => {
        try {
            if (!text || !startTime || !endTime) {
                console.error('All fields are required');
                return;
            }

            const start = new Date(startTime);
            const end = new Date(endTime);

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                console.error('Invalid date values');
                return;
            }

            const newMessage = {
                text,
                startTime: start.toISOString(),
                endTime: end.toISOString(),
            };

            await axios.post('http://localhost:5007/api/messages', newMessage, {
                headers: { 'Content-Type': 'application/json' },
            });

            fetchMessages();
            setText('');
            setStartTime('');
            setEndTime('');
        } catch (error) {
            console.error('Error adding message:', error);
        }
    };

    const deleteMessage = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5007/api/messages/${id}`);
            fetchMessages();
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.title}>ניהול הודעות</h1>
            <div style={styles.contentContainer}>
                <div style={styles.messageBox}>
                    <h1 style={styles.subtitle}>הודעות קיימות</h1>
                    <ul style={styles.messageList}>
                        {messages.map((message) => (
                            <li key={message._id} style={styles.messageItem}>
                                <p>
                                    <strong>הודעה:</strong> {message.text}
                                </p>
                                <p>
                                    <strong>תחילת תוקף:</strong>{' '}
                                    {new Date(message.startTime).toLocaleString()}
                                </p>
                                <p>
                                    <strong>סיום תוקף:</strong>{' '}
                                    {new Date(message.endTime).toLocaleString()}
                                </p>
                                <button
                                    onClick={() => deleteMessage(message._id)}
                                    style={styles.deleteButton}
                                >
                                    מחיקה
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={styles.formBox}>
                    <h2 style={styles.subtitle}>הוסף הודעה חדשה</h2>
                    <textarea
                        value={text}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                        placeholder="תוכן ההודעה"
                        style={styles.textarea}
                    />
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value)}
                        style={styles.input}
                    />
                    <button onClick={addMessage} style={styles.submitButton}>
                        הוסף הודעה
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        minHeight: '100vh',
    } as React.CSSProperties,
    title: {
        marginBottom: '20px',
        color: '#333',
        fontSize: 50
    } as React.CSSProperties,
    contentContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '90%',
        maxWidth: '1200px',
    } as React.CSSProperties,
    messageBox: {
        flex: 1,
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginRight: '10px',
        padding: '20px',
    } as React.CSSProperties,
    formBox: {
        flex: 1,
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
    } as React.CSSProperties,
    subtitle: {
        marginBottom: '10px',
        color: '#555',
    } as React.CSSProperties,
    messageList: {
        listStyle: 'none',
        padding: '0',
        margin: '0',
    } as React.CSSProperties,
    messageItem: {
        borderBottom: '1px solid #eee',
        padding: '10px 0',
    } as React.CSSProperties,
    deleteButton: {
        marginTop: '10px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 12px',
        cursor: 'pointer',
    } as React.CSSProperties,
    textarea: {
        width: '100%',
        height: '100px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '10px',
    } as React.CSSProperties,
    input: {
        width: '100%',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '10px',
    } as React.CSSProperties,
    submitButton: {
        width: '100%',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '10px',
        cursor: 'pointer',
    } as React.CSSProperties,
};

export default MessagesComponent;
