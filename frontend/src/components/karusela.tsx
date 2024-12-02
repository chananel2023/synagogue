import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

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
        const sortedSlides = response.data.sort((a: Slide, b: Slide) => a.priority - b.priority);
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
    <div className="relative w-full h-screen overflow-hidden">
      {slides.length > 0 ? (
        <motion.div
          className="relative w-full h-full"
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={slides[currentSlide].imageUrl}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4">{slides[currentSlide].title}</h2>
            <p className="bg-black bg-opacity-50 border-2 border-white text-lg md:text-2xl p-4 rounded-lg max-w-xl mx-auto">
              {slides[currentSlide].description}
            </p>
          </div>
        </motion.div>
      ) : (
        <p>טוען...</p>
      )}

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

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all ${currentSlide === index ? 'bg-blue-500' : 'bg-white bg-opacity-50'}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Carousel);