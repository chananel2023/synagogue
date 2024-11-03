import React, { useEffect, useState } from 'react';

const HomePage: React.FC = () => {
    const [time, setTime] = useState<string>('');
    const [notifications, setNotifications] = useState<string[]>([
        'הודעה חדשה ממערכת הניהול',
        'בדוק עדכונים אחרונים במערכת',
    ]);

    useEffect(() => {
        const fetchTime = async () => {
            try {
                const response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Tel_Aviv');
                const data = await response.json();
                setTime(data.datetime);
            } catch (error) {
                console.error('Error fetching time:', error);
            }
        };

        fetchTime();

        const intervalId = setInterval(fetchTime, 60000); // עדכון כל דקה

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>ברוכים הבאים</h1>

            <div style={styles.card}>
                <h2 style={styles.sectionTitle}>הודעות</h2>
                <ul style={styles.notificationsList}>
                    {notifications.map((notification, index) => (
                        <li key={index} style={styles.notificationItem}>{notification}</li>
                    ))}
                </ul>
            </div>

            <div style={styles.card}>
                <h2 style={styles.sectionTitle}>השעה כעת</h2>
                {time ? <p style={styles.timeText}>{new Date(time).toLocaleTimeString()}</p> : <p style={styles.loadingText}>טוען...</p>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        backgroundColor: '#f7f7f7',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: '2rem',
        color: '#333',
        marginBottom: '20px',
    },
    card: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'right' as 'right',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        color: '#555',
        marginBottom: '10px',
    },
    notificationsList: {
        listStyleType: 'none',
        padding: '0',
    },
    notificationItem: {
        fontSize: '1rem',
        color: '#666',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        marginBottom: '8px',
        borderRadius: '8px',
    },
    timeText: {
        fontSize: '1.25rem',
        color: '#333',
    },
    loadingText: {
        fontSize: '1.25rem',
        color: '#888',
    },
};

export default HomePage;
