import React, { useState, useEffect } from 'react';
import { getZmanimJson } from 'kosher-zmanim';
import locations from '../data/locations.json';
import TranslateKeyToHebrew from './TranslateKeyToHebrew';
import Location from '../models/Location';
import { motion } from 'framer-motion';
import { AccessTime, Event, LocationOn } from '@mui/icons-material';

const Zmanim2: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [zmanim, setZmanim] = useState<{ zmanim?: Record<string, string> } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchZmanim = async () => {
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
      }
    };

    fetchZmanim();
  }, [selectedLocation, selectedDate]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!zmanim || !zmanim.zmanim) {
    return <p>טוען זמני היום...</p>;
  }

  const sortedZmanim = Object.entries(zmanim.zmanim)
    .map(([key, value]) => {
      const date = new Date(value);
      return { key, value, date };
    })
    .filter(({ date }) => !isNaN(date.getTime()))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="p-6 w-full bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">זמני היום</h1>

      <div className="mb-6 flex flex-wrap justify-center gap-4">
        <div className="inline-block">
          <label className="block mb-2 text-center font-semibold">בחר מקום</label>
          <div className="relative inline-block">
            <LocationOn className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedLocation.name}
              onChange={(e) =>
                setSelectedLocation(
                  locations.find((loc) => loc.name === e.target.value) || locations[0]
                )
              }
              className="pl-8 pr-4 py-2 border rounded bg-white appearance-none"
            >
              {locations.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="inline-block">
          <label className="block mb-2 text-center font-semibold">בחר תאריך</label>
          <div className="relative inline-block">
            <Event className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-8 pr-4 py-2 border rounded bg-white"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedZmanim.map(({ key, date }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-2">
              <AccessTime className="text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-blue-600">{TranslateKeyToHebrew(key)}</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {date.toLocaleTimeString('he-IL', {
                timeZone: selectedLocation.timeZoneId,
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Zmanim2;