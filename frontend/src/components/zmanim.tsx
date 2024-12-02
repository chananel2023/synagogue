import React, { useState, useEffect, useMemo } from 'react';
import { getZmanimJson } from 'kosher-zmanim';
import locations from '../data/locations.json';
import TranslateKeyToHebrew from './TranslateKeyToHebrew';
import Location from '../models/Location';

const Zmanim2: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [zmanim, setZmanim] = useState<{ zmanim?: Record<string, string> } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useMemo(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString('he-IL', {
        timeZone: selectedLocation.timeZoneId,
      });
      setCurrentTime(now);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedLocation]);

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
    <div className="p-6 w-full shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-6">זמני היום</h1>

      {/* Current time */}
      <div className="flex justify-center items-center mb-6">
        <div className="bg-blue-500 text-white text-xl font-bold rounded-full p-6 shadow-md">
          השעה ב{selectedLocation.name}: {currentTime}
        </div>
      </div>

      {/* Location selector */}
      <div className="mb-6">
        <label className="block mb-2 text-center font-semibold">בחר מקום:</label>
        <select
          value={selectedLocation.name}
          onChange={(e) =>
            setSelectedLocation(
              locations.find((loc) => loc.name === e.target.value) || locations[0]
            )
          }
          className="w-full p-2 border rounded"
        >
          {locations.map((location) => (
            <option key={location.name} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-center font-semibold">בחר תאריך:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Zmanim list */}
      <ul className="list-none w-full text-right rtl">
        {sortedZmanim.map(({ key, date }) => (
          <li
            key={key}
            className="mb-2 p-3 shadow-sm hover:bg-gray-500 transition duration-200 ease-in-out"
          >
            <strong>{TranslateKeyToHebrew(key)}:</strong>{' '}
            {date.toLocaleTimeString('he-IL', {
              timeZone: selectedLocation.timeZoneId,
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Zmanim2;
