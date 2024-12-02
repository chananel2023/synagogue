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
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [slides]);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {slides.length > 0 ? (
        <div className="relative w-full h-full transition-all duration-1000 ease-in-out">
          {/* תמונה נוכחית */}
          <img
            src={slides[currentSlide].imageUrl}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover opacity-90 transition-opacity duration-1000 ease-in-out"
          />
          {/* שכבת כהות מתחת לטקסט */}
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 pointer-events-none"></div>
          {/* כותרת ותיאור */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            {/* כותרת */}
            <h2 className="text-6xl font-extrabold mb-8">{slides[currentSlide].title}</h2>
            {/* תיאור */}
            <div className="bg-black bg-opacity-50 border-4 border-white text-white p-8 rounded-lg max-w-2xl mx-auto">
              <p className="text-3xl font-extrabold">{slides[currentSlide].description}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>טוען...</p>
      )}

      {/* כפתורי ניווט */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-4 rounded-full hover:bg-gray-700 transition-all"
          >
            &#10094;
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-4 rounded-full hover:bg-gray-700 transition-all"
          >
            &#10095;
          </button>
        </>
      )}

      {/* שורה של עיגולים למטה */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full bg-white cursor-pointer transition-all ${currentSlide === index ? 'bg-blue-500' : 'bg-opacity-50'}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
