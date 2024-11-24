import React, { useState } from 'react';
import FullWidthCarousel from '../components/karusela';
import TfilotList from '../components/TfilotList';
import Navbar2 from '../components/Navbar2';


const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen" style={{ paddingTop: '10%' }}>
            <Navbar2 />
            <div style={styles.contentContainer}>
                <div style={styles.carouselContainer}>
                    <FullWidthCarousel />
                </div>
                <div>
                    <div>
                    <TfilotList/>
                </div>
                <div>
               
                </div>
                
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
        paddingTop: '10%', // מתאים לרווח מתחת ל-Navbar
    },
    contentContainer: {
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'space-between', // מארגן את הרכיבים בסדר אופקי
        alignItems: 'flex-start', // כדי לוודא שהכרטיסים יתחילו מהחלק העליון
        marginTop: '20px',
        flexWrap: 'wrap' as 'wrap', // שימוש בערך חוקי עבור flexWrap
    },
    carouselContainer: {
        width: '75%',
        marginRight: '20px', // ריווח בין הקרוסלה לכרטיסים
    },
    cardsContainer: {
        width: '22%', // רוחב הכרטיסים
        display: 'flex',
        flexDirection: 'column' as 'column', // סידור הכרטיסים אחד מעל השני
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
        '&:hover': {
            backgroundColor: '#ffd6a5', // צבע רקע בהעברה
            transform: 'scale(1.02)', // התמקדות
        },
    },

    // Media Queries
    '@media (max-width: 768px)': {
        contentContainer: {
            flexDirection: 'rou', // על מסכים קטנים, הסדר יהיה עמודה
            alignItems: 'center', // מיישר את הפריטים במרכז
        },
        carouselContainer: {
            width: '100%', // על מסכים קטנים, הקרוסלה תיקח את כל רוחב המסך
            marginRight: '0', // לא צריך ריווח בין הקרוסלה לכרטיסים
        },
        cardsContainer: {
            width: '100%', // הכרטיסים יתפסו 100% מהרוחב במסכים קטנים
            alignItems: 'center', // למרכז את הכרטיסים במסכים קטנים
        },
        card: {
            width: '80%', // על מסכים קטנים, כל כרטיס יתפוס 80% מהמסך
        }
    },

    '@media (max-width: 480px)': {
        sectionTitle: {
            fontSize: '1.2rem', // גודל פונט קטן יותר במסכים מאוד קטנים
        },
        notificationItem: {
            fontSize: '1rem', // גודל פונט קטן יותר
            padding: '6px', // מעט פחות ריווח
        },
    },
};




export default HomePage;
