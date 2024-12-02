import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import Carousel from '../components/karusela';
import TfilotList from '../components/TfilotList';
import { PlayCircleOutline } from '@mui/icons-material';
import Footer from '../components/Footer';

const videoIds = [
  "TFFnwIS0_pk",
  "JfxV2T3KwUk",
  "DbPxhldtTWo",
  "wpdKe8yempk",
  "hWWaJo9O8uM",
  "-H-ZNkwDh5w"
];

const HomePage: React.FC = () => {
  const [visibleVideos, setVisibleVideos] = useState<Set<string>>(new Set());
  const observer = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const videoId = entry.target.getAttribute('data-video-id');
        if (videoId) {
          setVisibleVideos(prev => new Set(prev).add(videoId));
        }
      }
    });
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    const currentObserver = observer.current;

    document.querySelectorAll('.video-container').forEach(el => {
      currentObserver.observe(el);
    });

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [handleIntersection]);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="my-8 w-full">
        <Carousel />
      </div>

      <div className="my-8 w-full">
        <TfilotList />
      </div>

      <div className="my-16 w-full px-4 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center mb-10 text-blue-700"
          style={{ fontFamily: 'Arial, sans-serif' }} // שינוי לפונט אריאל
        >
          אולי יעניין אותך
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoIds.map((videoId, index) => (
            <motion.div
              key={videoId}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="video-container rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
              data-video-id={videoId}
            >
              {visibleVideos.has(videoId) ? (
                <div className="relative pt-[56.25%]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`YouTube video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="w-full pt-[56.25%] bg-gray-200 relative flex items-center justify-center">
                  <PlayCircleOutline className="absolute text-gray-400" style={{ fontSize: '4rem' }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* הוספת הפוטר */}
      <Footer />
    </div>
  );
};

export default React.memo(HomePage);