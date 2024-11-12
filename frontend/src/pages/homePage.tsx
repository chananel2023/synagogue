
import React, { useState } from 'react';
import FullWidthCarousel from '../components/karusela';
import Navbar from '../components/navbar';
import UserMessagesComponent from '../components/message'
const HomePage: React.FC = () => {
    const [notifications] = useState<string[]>([
        'שחרית א : 07:30',
        'שחרית ב : 07:30',
        'מנחה א : 13:30',
        'מנחה ב : 13:30',
        'ערבית א : 20:30',
        'ערבית ב : 20:30',
    ]);

    return (

            


        <div style={styles.pageContainer}>
            <Navbar />
            <UserMessagesComponent/>

            <h1 style={styles.title}>בית כנסת - אורט סינגאלובסקי</h1>

            <div style={styles.contentContainer}>
                <div style={styles.carouselContainer}>
                    <FullWidthCarousel />
                </div>

                <div style={styles.card}>
                    <h2 style={styles.sectionTitle}>זמני תפילות</h2>
                    <ul style={styles.notificationsList}>
                        {notifications.map((notification, index) => (
                            <li key={index} style={styles.notificationItem}>
                                {notification}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        
    );
};

const styles = {
    pageContainer: {
        padding: '20px',
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        backgroundColor: '#faf3e0',
        minHeight: '100vh',
    },
    title: {
        fontSize: '2.5rem',
        color: '#4a2c2a',
        fontWeight: 'bold',
        marginBottom: '15px',
    },
    contentContainer: {
        display: 'flex',
        width: '100%',
        maxWidth: '1200px',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px',
    },
    carouselContainer: {
        width: '75%', // רוחב הקרוסלה
    },
    card: {
        width: '22%', // רוחב קטע התפילות
        padding: '15px',
        borderRadius: '10px',
        backgroundColor: '#fff7e6',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'right' as 'right',
    },
    sectionTitle: {
        fontSize: '1.4rem',
        color: '#4a2c2a',
        fontWeight: '600',
        marginBottom: '10px',
    },
    notificationsList: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    },
    notificationItem: {
        fontSize: '1.1rem',
        color: '#4a2c2a',
        padding: '8px',
        marginBottom: '6px',
        borderRadius: '8px',
        backgroundColor: '#fff5e0',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
        transition: 'background-color 0.3s, transform 0.3s',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#ffd6a5', // צבע רקע בהעברה
            transform: 'scale(1.02)', // התמקדות
        },
    },
};

export default HomePage;
