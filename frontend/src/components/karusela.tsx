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
    axios.get('http://localhost:5007/api/slides')
      .then(response => {
        setSlides(response.data);
      })
      .catch(error => {
        console.error('Error fetching slides:', error);
      });
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      // מעבר אוטומטי לשקופית הבאה כל displayTime שניות
      const interval = setInterval(() => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
      }, slides[currentSlide]?.displayTime * 1000); // displayTime בשניות

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
      {/* שקופית נוכחית */}
      {slides.length > 0 && (
        <div className="relative">
          <img
            src={slides[currentSlide].imageUrl}
            alt={slides[currentSlide].title}
            className="w-full h-72 object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full text-center">
            <h2 className="text-2xl font-bold">{slides[currentSlide].title}</h2>
            <p>{slides[currentSlide].description}</p>
          </div>
        </div>
      )}

      {/* כפתורים לניווט */}
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
    </div>
  );
};

export default Carousel;

