import React from 'react';
import Navbar2 from '../components/Navbar2';

const AboutContactPage: React.FC = () => {
    return (
        <div style={styles.pageContainer}>
            {/* חלק עליון */}
            <header>
                <Navbar2 />
            </header>

            {/* אודות */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>אודותינו</h2>
                <p style={styles.text}>
                    קהילתנו היא קהילה חמה, תוססת ומשפחתית, השואפת לחבר בין אנשים בכל הגילאים ובכל שלבי החיים.
                    בית הכנסת שלנו, שהוקם בשנת 1980, הפך למרכז רוחני וחברתי עבור חברי הקהילה
                </p>
                <p style={styles.text}>
                    אנו גאים במגוון הפעילויות שאנו מציעים, הכוללות שיעורי תורה, פעילויות לנוער, אירועי תרבות ופעילויות לילדים ולמשפחות.
                    האווירה בקהילה מאופיינת בשותפות, עזרה הדדית ואהבת ישראל
                </p>
            </section>

            {/* צור קשר */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>צור קשר</h2>
                <p style={styles.text}>
                    נשמח לשמוע ממך ולסייע בכל שאלה או צורך! תוכל ליצור קשר באמצעות האמצעים הבאים
                </p>
                <div style={styles.contactMethods}>
                    <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.contactLink}
                    >
                        <i className="fab fa-whatsapp" style={styles.icon}></i> WhatsApp
                    </a>
                    <a
                        href="mailto:example@email.com"
                        style={styles.contactLink}
                    >
                        <i className="fas fa-envelope" style={styles.icon}></i> Email
                    </a>
                </div>
            </section>

         
        </div>
    );
};

const styles = {
    pageContainer: {
        fontFamily: "'Arial', sans-serif",
        color: '#333',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0',
        margin: '0',
        width: '100%',
        backgroundColor: '#F3F4F6',
    } as React.CSSProperties,
    section: {
        width: '90%',
        maxWidth: '1200px',
        padding: '40px',
        margin: '20px auto',
        textAlign: 'center',
        borderBottom: '2px solid #ddd',
    } as React.CSSProperties,
    sectionTitle: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#1E3A8A',
        marginBottom: '20px',
    } as React.CSSProperties,
    text: {
        fontSize: '1.2rem',
        lineHeight: '1.8',
        marginBottom: '20px',
        color: '#4B5563',
        textAlign: 'center',
    } as React.CSSProperties,
    contactMethods: {
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        marginTop: '30px',
    } as React.CSSProperties,
    contactLink: {
        textDecoration: 'none',
        color: '#1E3A8A',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'color 0.3s ease',
    } as React.CSSProperties,
    icon: {
        fontSize: '2rem',
    } as React.CSSProperties,
};

// רספונסיביות בעזרת Media Queries
const mediaQueries = `
    @media (max-width: 768px) {
        .sectionTitle {
            font-size: 1.8rem;
        }
        .text {
            font-size: 1rem;
        }
        .contactLink {
            font-size: 1.2rem;
        }
        .icon {
            font-size: 1.5rem;
        }
    }
    @media (max-width: 480px) {
        .sectionTitle {
            font-size: 1.5rem;
        }
        .text {
            font-size: 0.9rem;
        }
        .contactLink {
            font-size: 1rem;
        }
        .icon {
            font-size: 1.2rem;
        }
    }
`;

export default AboutContactPage;
