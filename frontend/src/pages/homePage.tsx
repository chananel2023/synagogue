import React from 'react';
import FullWidthCarousel from '../components/karusela';
import TfilotList from '../components/TfilotList';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/footer'

const videoIds = [
    "TFFnwIS0_pk",
    "JfxV2T3KwUk",
    "DbPxhldtTWo",
    "wpdKe8yempk",
    "hWWaJo9O8uM",
    "-H-ZNkwDh5w"
]; // מזהי הסרטונים

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen" style={{ paddingTop: '10%' }}>
            <Navbar2 />
            <div style={styles.contentContainer}>
                <div style={styles.carouselContainer}>
                    <FullWidthCarousel />
                </div>
                <div>
                    <TfilotList /> {/* זמני התפילות */}
                </div>
                <div style={styles.cardsContainer}>
                    {videoIds.map((videoId, index) => (
                        <div key={index} style={styles.card}>
                            <iframe
                                width="100%"
                                height="200"
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title={`YouTube video ${index + 1}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))}
                </div>
            </div>
            <Footer /> 
        </div>
    );
};

const styles = {
    contentContainer: {
        width: '100%',  // רוחב מלא
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        marginTop: '20px',
    },
    carouselContainer: {
        width: '100%',
        marginBottom: '20px', // ריווח בין הקרוסלה לכרטיסים
    },
    cardsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        width: '100%',  // רוחב מלא
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        textAlign: 'center' as 'center',
    },
};

export default HomePage;
