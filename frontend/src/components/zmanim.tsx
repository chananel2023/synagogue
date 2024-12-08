import React, { useState, useEffect } from "react";
import { getZmanimJson } from 'kosher-zmanim';
import locations from '../data/locations.json';
import TranslateKeyToHebrew from './TranslateKeyToHebrew';
import Location from '../models/Location';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Calendar, Loader2, Sun } from 'lucide-react';
import Footer from '../components/Footer'

const Zmanim2: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [zmanim, setZmanim] = useState<{ zmanim?: Record<string, string> } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchZmanim = async () => {
      setIsLoading(true);
      try {
        const options = {
          date: new Date(selectedDate),
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          timeZoneId: selectedLocation.timeZoneId,
          elevation: selectedLocation.elevation || 0,
        };

        const zmanimJson = await getZmanimJson(options);
        setZmanim({ zmanim: zmanimJson.BasicZmanim as Record<string, string> });
        setError(null);
      } catch (err) {
        setError('שגיאה בקבלת זמני היום');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchZmanim();
  }, [selectedLocation, selectedDate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">שגיאה</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const sortedZmanim = zmanim?.zmanim ? Object.entries(zmanim.zmanim)
    .map(([key, value]) => {
      const date = new Date(value);
      return { key, value, date };
    })
    .filter(({ date }) => !isNaN(date.getTime()))
    .sort((a, b) => a.date.getTime() - b.date.getTime()) : [];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-6 pt-24 bg-transparent">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
          >
            <Sun className="w-6 h-6 text-[#FFD700]" />
            <h1 className="text-3xl font-bold text-[#007BFF]">זמני היום</h1>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-wrap justify-center gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4"
          >
            <label className="block mb-2 text-sm font-semibold text-[#007BFF]">בחר מקום</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#007BFF]" />
              <select
                value={selectedLocation.name}
                onChange={(e) => setSelectedLocation(
                  locations.find((loc) => loc.name === e.target.value) || locations[0]
                )}
                className="pl-10 pr-4 py-2 w-48 bg-white/50 border border-[#007BFF]/20 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              >
                {locations.map((location) => (
                  <option key={location.name} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4"
          >
            <label className="block mb-2 text-sm font-semibold text-[#007BFF]">בחר תאריך</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#007BFF]" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 pr-4 py-2 w-48 bg-white/50 border border-[#007BFF]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              />
            </div>
          </motion.div>
        </div>

        {/* Zmanim Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#007BFF]" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {sortedZmanim.map(({ key, date }) => (
                <motion.div
                  key={key}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-white/50"
                >
                  <div className="flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-[#FFD700] mr-2" />
                    <h3 className="text-lg font-semibold text-[#007BFF]">
                      {TranslateKeyToHebrew(key)}
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-center text-[#007BFF]">
                    {date.toLocaleTimeString('he-IL', {
                      timeZone: selectedLocation.timeZoneId,
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default React.memo(Zmanim2);