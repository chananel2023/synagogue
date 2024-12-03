import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { AccessTime, Delete } from '@mui/icons-material';

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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
            setError('שגיאה בטעינת ההודעות');
        } finally {
            setLoading(false);
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

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div style={styles.pageContainer}>
            <Typography variant="h4" style={styles.title}>ניהול הודעות</Typography>

            <div style={styles.contentContainer}>
                <div style={styles.messageBox}>
                    <Typography variant="h5" style={styles.subtitle}>הודעות קיימות</Typography>
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
                                <Button
                                    onClick={() => deleteMessage(message._id)}
                                    style={styles.deleteButton}
                                    startIcon={<Delete />}
                                >
                                    מחיקה
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={styles.formBox}>
                    <Typography variant="h5" style={styles.subtitle}>הוסף הודעה חדשה</Typography>
                    <TextField
                        value={text}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                        placeholder="תוכן ההודעה"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        style={styles.textarea}
                    />
                    <TextField
                        type="datetime-local"
                        value={startTime}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
                        variant="outlined"
                        fullWidth
                        style={styles.input}
                    />
                    <TextField
                        type="datetime-local"
                        value={endTime}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value)}
                        variant="outlined"
                        fullWidth
                        style={styles.input}
                    />
                    <Button onClick={addMessage} variant="contained" color="primary" style={styles.submitButton}>
                        הוסף הודעה
                    </Button>
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
        backgroundColor: '#f0f4f8', // צבע רקע בהיר ונעים
    } as React.CSSProperties,
    title: {
        marginBottom: '20px',
        color: '#333',
        fontSize: 36,
        fontWeight: 'bold',
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
        backgroundColor: '#ffffff', // צבע רקע לבן לכרטיס ההודעות
    } as React.CSSProperties,
    formBox: {
        flex: 1,
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        backgroundColor: '#ffffff', // צבע רקע לבן לכרטיס ההוספה
    } as React.CSSProperties,
    subtitle: {
        marginBottom: '10px',
        color: '#555',
    } as React.CSSProperties,
    messageList: {
        listStyleType: 'none',
        paddingLeft: 0,
    } as React.CSSProperties,
    messageItem: {
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
        marginBottom: '10px',
    } as React.CSSProperties,
    deleteButton: {
        marginTop: '10px',
        backgroundColor: '#e74c3c',
        color: 'white',
    } as React.CSSProperties,
    textarea: {
        width: '100%',
        marginBottom: '10px',
    } as React.CSSProperties,
    input: {
        width: '100%',
        marginBottom: '10px',
    } as React.CSSProperties,
    submitButton: {
        width: '100%',
    } as React.CSSProperties,
};

export default MessagesComponent;