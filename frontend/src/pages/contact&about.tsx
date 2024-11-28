import React from 'react';
import Navbar2 from '../components/Navbar2'

const AboutContactPage: React.FC = () => {
    return (
        <div style={styles.pageContainer}>
            {/* חלק עליון */}

            <header>
                <Navbar2/>
            </header>
            {/* אודות */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>אודותינו</h2>
                <p style={styles.text}>
                    קהילתנו היא קהילה חמה, תוססת ומשפחתית, השואפת לחבר בין אנשים בכל הגילאים ובכל שלבי החיים. בית הכנסת שלנו, שהוקם בשנת 1980, הפך למרכז רוחני וחברתי עבור חברי הקהילה. אנו גאים במגוון הפעילויות שאנו מציעים, הכוללות שיעורי תורה, פעילויות לנוער, אירועי תרבות ופעילויות לילדים ולמשפחות. האווירה בקהילה מאופיינת בשותפות, עזרה הדדית ואהבת ישראל, ומספקת תחושת בית לכל מי שמגיע. הקהילה ממשיכה לגדול ולהתפתח, ומזמינה אתכם להצטרף ולהיות חלק ממשפחה אחת גדולה ומאוחדת. כאן תמצאו מקום להתחבר, לצמוח ולהרגיש שייכות אמיתית.
                </p>
            </section>

            {/* צור קשר */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>צור קשר</h2>
                <p style={styles.text}>
                    נשמח לשמוע ממך ולסייע בכל שאלה או צורך! תוכל ליצור קשר באמצעות האמצעים
                    הבאים:
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

            {/* תחתית */}
            <footer style={styles.footer}>
                <p>כל הזכויות שמורות &copy; 2024</p>
            </footer>
        </div>
    );
};

const styles = {
    pageContainer: {
        fontFamily: "'Arial', sans-serif",
        color: '#333',
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    } as React.CSSProperties,
    header: {
        padding: '20px',
        backgroundColor: '#3498db',
        color: '#fff',
        width: '100%',
        borderRadius: '8px',
        marginBottom: '20px',
    } as React.CSSProperties,
    title: {
        fontSize: '2.5rem',
        margin: '10px 0',
    } as React.CSSProperties,
    subtitle: {
        fontSize: '1.2rem',
        margin: '10px 0',
    } as React.CSSProperties,
    section: {
        backgroundColor: '#fff',
        padding: '20px',
        margin: '10px 0',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '90%',
        maxWidth: '800px',
    } as React.CSSProperties,
    sectionTitle: {
        fontSize: '1.8rem',
        marginBottom: '10px',
    } as React.CSSProperties,
    text: {
        fontSize: '1rem',
        lineHeight: '1.6',
    } as React.CSSProperties,
    contactMethods: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '20px',
    } as React.CSSProperties,
    contactLink: {
        textDecoration: 'none',
        color: '#3498db',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    } as React.CSSProperties,
    icon: {
        fontSize: '1.5rem',
    } as React.CSSProperties,
    footer: {
        marginTop: 'auto',
        padding: '10px',
        backgroundColor: '#ddd',
        borderRadius: '8px',
        width: '100%',
        textAlign: 'center',
        fontSize: '0.9rem',
    } as React.CSSProperties,
};

export default AboutContactPage;
