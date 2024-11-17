import React from 'react';
import FullWidthCarousel from '../components/karusela';
import Navbar from '../components/navbar';
import UserMessagesComponent from '../components/message';
import TfilotList from '../components/TfilotList';

const HomePage: React.FC = () => {
    return (
        <div style={styles.pageContainer}>
            <Navbar />
            <UserMessagesComponent />
            <h1 style={styles.title}>בית כנסת - אורט סינגאלובסקי</h1>

            <div style={styles.contentContainer}>
                <div style={styles.carouselContainer}>
                    <FullWidthCarousel />
                </div>

                <div style={styles.card}>
                    <h2 style={styles.sectionTitle}>זמני תפילות</h2>
                    <TfilotList /> {/* מציג את זמני התפילות מדינמיים מה-API */}
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
};

export default HomePage;
