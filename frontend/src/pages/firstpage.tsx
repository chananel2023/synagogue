import React from 'react';

const WelcomePage: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>ברוכים הבאים לאתר בית הכנסת אורט סינגאלובסקי </h1>
            <p style={styles.text}>בבקשה בצע כניסה בכדי להמשיך</p>

            <button
                style={styles.button}
                onClick={() => window.location.href = '/login'}
            >
                כניסה
            </button>
            <button
                style={styles.button}
                onClick={() => window.location.href = '/signup'}
            >
                יצירת חשבון
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
    },
    title: {
        fontSize: '2.5em',
        color: '#333',
        marginBottom: '1em',
        textAlign: 'center' as 'center',
        fontFamily: 'Arial, sans-serif',
    },
    text: {
        fontSize: '1.2em',
        color: '#555',
        marginBottom: '1.5em',
        textAlign: 'center' as 'center',
        lineHeight: '1.6',
    },
    button: {
        padding: '12px 25px',
        fontSize: '1.1em',
        color: '#fff',
        backgroundColor: '#FF6F61', // צבע חמים לכפתור
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        margin: '10px', // מוסיף ריווח בין הכפתורים
    } as React.CSSProperties,
};

export default WelcomePage;
