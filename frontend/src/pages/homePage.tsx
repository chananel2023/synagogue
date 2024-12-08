import React from 'react';
import { motion } from 'framer-motion';
import Carousel from '../components/karusela';
import TfilotList from '../components/TfilotList';
import Footer from '../components/Footer';
import UserMessagesComponent from '../components/UserMessagesComponent';

const videoIds = [
  "TFFnwIS0_pk",
  "JfxV2T3KwUk",
  "DbPxhldtTWo",
  "wpdKe8yempk",
  "hWWaJo9O8uM",
  "-H-ZNkwDh5w"
];

const HomePage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="w-full">
          <Carousel />
        </motion.div>

        <motion.div variants={itemVariants} className="my-8 w-full">
          <UserMessagesComponent />
        </motion.div>

        <motion.div variants={itemVariants} className="my-8 w-full">
          <TfilotList />
        </motion.div>

        <motion.div variants={itemVariants} className="my-16 w-full px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-block bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <h2 className="text-3xl font-bold text-[#007BFF]">
                  שיעורים מומלצים
                </h2>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {videoIds.map((videoId, index) => (
                <motion.div
                  key={videoId}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl 
                           transition-all duration-300"
                >
                  <div className="relative pt-[56.25%]">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-t-xl"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`שיעור ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <div className="h-2 bg-gradient-to-r from-[#007BFF] to-[#FFD700] rounded-full" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Footer />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default React.memo(HomePage);
