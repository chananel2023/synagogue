import React, { useState } from 'react';
import FullWidthCarousel from '../components/karusela';

const HomePage: React.FC = () => {
    const [notifications] = useState<string[]>([
        'שחרית א : 07:30',
        'שחרית ב : 07:30',

        'מנחה א : 13:30',
        'מנחה ב : 13:30',

        'ערבית א : 20:30',
        'ערבית ב : 20:30',

    ]);

    const eventPhotos = [
        'https://thekotel.org/wp-content/uploads/2021/08/WhatsApp-Image-2021-08-13-at-00.40.24.jpeg',
        'https://thekotel.org/wp-content/uploads/2021/08/WhatsApp-Image-2021-08-30-at-11.31.31-1.jpeg',
        'https://thekotel.org/wp-content/uploads/2021/08/WhatsApp-Image-2021-08-30-at-11.31.34.jpeg',
        // Add more URLs here
    ];

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.title}>בית כנסת - אורט סינגאלובסקי</h1>
            <p></p>

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

            <div style={styles.galleryContainer}>
                <h2 style={styles.galleryTitle}>גלריית תמונות מאירועים</h2>
                <div style={styles.galleryGrid}>
                    {eventPhotos.map((photo, index) => (
                        <img key={index} src={photo} alt={`Event ${index + 1}`} style={styles.galleryImage} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        padding: '30px',
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        backgroundColor: '#faf3e0', // Warm background color
        minHeight: '100vh',
    },
    title: {
        fontSize: '2.8rem',
        color: '#4a2c2a', // Rich, warm color
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    subtitle: {
        fontSize: '1.8rem',
        color: '#4a2c2a',
        fontWeight: 'normal',
        marginBottom: '25px',
    },
    contentContainer: {
        display: 'flex',
        width: '100%',
        maxWidth: '1200px',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '30px',
    },
    carouselContainer: {
        width: '75%',
        marginRight: '20px',
    },
    card: {
        width: '22%',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff7e6', // Light warm color
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'right' as 'right',
    },
    sectionTitle: {
        fontSize: '1.6rem',
        color: '#4a2c2a',
        fontWeight: '600',
        marginBottom: '15px',
    },
    notificationsList: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    },
    notificationItem: {
        fontSize: '1.1rem',
        color: '#4a2c2a',
        padding: '10px',
        marginBottom: '8px',
        borderRadius: '8px',
        backgroundColor: '#fff5e0',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
        transition: 'background-color 0.3s, transform 0.3s',
        cursor: 'pointer',
    },
    notificationItemHover: {
        backgroundColor: '#ffe5c0',
        transform: 'scale(1.03)',
    },
    galleryContainer: {
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#fff7e6',
        borderRadius: '10px',
        textAlign: 'center' as 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    galleryTitle: {
        fontSize: '1.75rem',
        color: '#4a2c2a',
        fontWeight: '600',
        marginBottom: '20px',
    },
    galleryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
    },
    galleryImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
        transition: 'transform 0.3s',
    },
};

export default HomePage;
