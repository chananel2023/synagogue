import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Slide {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  displayTime: number;
  priority: number;
}

const Carousel: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    // קריאה ל-API לקבלת השקופיות
    const fetchSlides = async () => {
      try {
        const response = await axios.get('http://localhost:5007/api/slides');
        const sortedSlides = response.data.sort((a: Slide, b: Slide) => a.priority - b.priority); // מיון לפי עדיפות
        setSlides(sortedSlides);
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      // מעבר אוטומטי לשקופית הבאה כל displayTime שניות
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, slides[currentSlide]?.displayTime * 1000);

      return () => clearInterval(interval);
    }
  }, [slides, currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {slides.length > 0 ? (
        <div className="relative">
          {/* תמונה נוכחית */}
          <img
            src={slides[currentSlide].imageUrl}
            alt={slides[currentSlide].title}
            className="w-full h-72 object-cover rounded-lg"
          />
          {/* כותרת ותיאור */}
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full text-center">
            <h2 className="text-2xl font-bold">{slides[currentSlide].title}</h2>
            <p>{slides[currentSlide].description}</p>
          </div>
        </div>
      ) : (
        <p>טוען שקופיות...</p>
      )}

      {/* כפתורי ניווט */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-700"
          >
            &#10094;
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-700"
          >
            &#10095;
          </button>
        </>
      )}
    </div>
  );
};

<<<<<<< HEAD
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
=======
export default Carousel;
>>>>>>> f103e9eec91d901434614e9402052275a541bc40
