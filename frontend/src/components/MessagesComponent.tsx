import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import NavbarAdmin from '../components/navBarAdmin'
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

            const response = await axios.post('http://localhost:5007/api/messages', newMessage, {
                headers: {
                    'Content-Type': 'application/json',
                },
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

    // הגדרת העיצוב של הדף
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto', // מרכז את הרכיב
    };

    const titleStyle: React.CSSProperties = {
        textAlign: 'center',
        marginBottom: '20px',
    };

    const messageListStyle: React.CSSProperties = {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
        width: '100%',
    };

    const messageItemStyle: React.CSSProperties = {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    };

    const deleteButtonStyle: React.CSSProperties = {
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    };

    const formContainerStyle: React.CSSProperties = {
        marginTop: '30px',
        width: '100%',
    };

    const subtitleStyle: React.CSSProperties = {
        textAlign: 'center',
        marginBottom: '20px',
    };

    const inputFieldStyle: React.CSSProperties = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    };

    const submitButtonStyle: React.CSSProperties = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    return (
        <div>
            <NavbarAdmin />
            <div style={containerStyle}>
                <h1 style={titleStyle}>Admin Messages</h1>
                <ul style={messageListStyle}>
                    {messages.map(message => (
                        <li key={message._id} style={messageItemStyle}>
                            <strong>Message:</strong> {message.text} <br />
                            <strong>Start Time:</strong> {new Date(message.startTime).toLocaleString()} <br />
                            <strong>End Time:</strong> {new Date(message.endTime).toLocaleString()}
                            <button onClick={() => deleteMessage(message._id)} style={deleteButtonStyle}>Delete</button>
                        </li>
                    ))}
                </ul>
                <div style={formContainerStyle}>
                    <h2 style={subtitleStyle}>Add a New Message</h2>
                    <input
                        type="text"
                        value={text}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                        placeholder="Message text"
                        style={inputFieldStyle}
                    />
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
                        style={inputFieldStyle}
                    />
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value)}
                        style={inputFieldStyle}
                    />
                    <button onClick={addMessage} style={submitButtonStyle}>Add Message</button>
                </div>
            </div>
        </div>
    );
};

export default MessagesComponent;
