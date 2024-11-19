iimport React, { useState } from 'react';
import FullWidthCarousel from '../components/karusela';
import Navbar2 from '../components/Navbar2';
import UserMessagesComponent from '../components/message';

const HomePage: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const notifications = ["תפילה בבוקר", "שיעור תורה", "ארוחת צהריים"]; // דוגמא להודעות

    return (
        <div style={styles.pageContainer}>
            <Navbar2 />
            <div style={styles.contentContainer}>
                <div style={styles.carouselContainer}>
                    <FullWidthCarousel />
                </div>

                <div style={styles.card}>
                    <h2 style={styles.sectionTitle}>זמני תפילות</h2>
                    <ul style={styles.notificationsList}>
                        {notifications.map((notification, index) => (
                            <li
                                key={index}
                                style={{
                                    ...styles.notificationItem,
                                    backgroundColor: hoveredIndex === index ? '#ffd6a5' : '#fff5e0',
                                    transform: hoveredIndex === index ? 'scale(1.02)' : 'scale(1)',
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
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
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        minHeight: '100vh',
        paddingTop: '10%', // רווח מתחת ל-Navbar
    },
    contentContainer: {
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: '20px',
        flexWrap: 'wrap' as 'wrap',
    },
    carouselContainer: {
        width: '75%',
        marginRight: '20px', // ריווח בין הקרוסלה לכרטיסים
    },
    card: {
        width: '100%',
        padding: '15px',
        borderRadius: '10px',
        backgroundColor: '#fff7e6',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'right' as 'right',
        marginBottom: '20px', // ריווח בין הכרטיסים
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
    },
};

export default HomePage;
