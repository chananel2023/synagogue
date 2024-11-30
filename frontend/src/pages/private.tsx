import React from 'react';
import UserMessagesComponent from '../components/UserMessagesComponent';
import Footer from '../components/footer'

const Private: React.FC = () => {
    console.log('Private');
    return (
        <div style={styles.privateContainer}>
            <h1 style={styles.privateTitle}>איזור אישי</h1>
            <UserMessagesComponent />
            <Footer/>
        </div>
    );
};

// סגנונות עבור העמוד "איזור אישי"
const styles: { [key: string]: React.CSSProperties } = {
    privateContainer: {

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
    },
    privateTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '0px', // כותרת לא תדבק למעלה
        marginBottom: '20px', // רווח בין כותרת לרכיב ההודעות
        color: '#2D3748',
    },
};

export default Private;
