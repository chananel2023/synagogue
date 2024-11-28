import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FullWidthCarousel: React.FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div style={styles.carouselContainer}>
            <Slider {...settings}>
                <div style={styles.slide}>
                    <img 
                        src="https://kav.meorot.net/wp-content/uploads/elementor/thumbs/%D7%A1%D7%9C%D7%99%D7%97%D7%95%D7%AA-%D7%9C%D7%90%D7%AA%D7%A8-pkbpfvrstb70u08tvd9zsgqu77hcu6pqq8lycc8z8w.png" 
                        alt="סליחות לאתר" 
                        style={styles.image}
                        loading="lazy"
                    />
                </div>
                <div style={styles.slide}>
                    <img 
                        src="https://chabadarielcampus.co.il/wordpress/wp-content/uploads/2022/09/%D7%A2%D7%A8%D7%91-%D7%A1%D7%9C%D7%99%D7%97%D7%95%D7%AA-%D7%91%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D-1024x1024.jpeg" 
                        alt="ערב סליחות בירושלים" 
                        style={styles.image}
                        loading="lazy"
                    />
                </div>
                <div style={styles.slide}>
                    <img 
                        src="https://kav.meorot.net/wp-content/uploads/elementor/thumbs/%D7%A1%D7%9C%D7%99%D7%97%D7%95%D7%AA-%D7%9C%D7%90%D7%AA%D7%A8-pkbpfvrstb70u08tvd9zsgqu77hcu6pqq8lycc8z8w.png" 
                        alt="סליחות לאתר" 
                        style={styles.image}
                        loading="lazy"
                    />
                </div>
            </Slider>
        </div>
    );
};

const styles = {
    carouselContainer: {
        maxWidth: '75%', // תפס את רוב רוחב העמוד
        margin: '20px auto', // ממורכז עם ריווח
        borderRadius: '10px', // עגל פינות
        overflow: 'hidden', // מונע חפיפות
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // צל עדין
        '@media (max-width: 768px)': {
            maxWidth: '90%', // רוחב יותר קטן במסכים קטנים
        },
    },
    slide: {
        display: 'flex', // סידור פנימי גמיש
        justifyContent: 'center', // מרכז את התמונה
        alignItems: 'center', // מרכז את התמונה אנכית
    },
    image: {
        width: '100%', // תמונה תופסת את כל רוחב הקונטיינר
        borderRadius: '10px', // עגל פינות
    },
};

export default FullWidthCarousel;