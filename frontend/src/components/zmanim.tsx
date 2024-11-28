import React, { useState, useEffect } from 'react';
import { getZmanimJson } from 'kosher-zmanim';

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  timeZoneId: string;
  elevation?: number;
}

const locations: Location[] = [
  { name: 'תל אביב', latitude: 32.0853, longitude: 34.7818, timeZoneId: 'Asia/Jerusalem' },
  { name: 'ירושלים', latitude: 31.7683, longitude: 35.2137, timeZoneId: 'Asia/Jerusalem' },
  { name: 'ניו יורק', latitude: 40.7128, longitude: -74.0060, timeZoneId: 'America/New_York' },
  { name: 'חיפה', latitude: 32.7940, longitude: 34.9896, timeZoneId: 'Asia/Jerusalem' },
  { name: 'לונדון', latitude: 51.5074, longitude: -0.1278, timeZoneId: 'Europe/London' },
];

const Zmanim2: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [zmanim, setZmanim] = useState<{ zmanim?: Record<string, string> } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Update current time for the selected location
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString('he-IL', {
        timeZone: selectedLocation.timeZoneId,
      });
      setCurrentTime(now);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedLocation]);

  // Fetch Zmanim for the selected location and date
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

        setError(null); // Clear errors
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

  // Translate zmanim keys to Hebrew
  const translateKeyToHebrew = (key: string): string => {
    const translations: Record<string, string> = {
      BeginAstronomicalTwilight: 'התחלת בין הערביים האסטרונומית',
      AlosHashachar: 'עלות השחר',
      Sunrise: 'זריחה',
      // Add more translations as needed
    };
    return translations[key] || key;
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">זמני היום</h1>

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

      {/* Date picker */}
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
      <ul className="list-none pl-0 text-right rtl">
        {Object.entries(zmanim.zmanim).map(([key, value]) => {
          const dateValue = new Date(value);
          if (isNaN(dateValue.getTime())) {
            return null;
          }

          return (
            <li
              key={key}
              className="mb-2 p-3 bg-gray-100 rounded-md shadow-sm hover:bg-gray-500 transition duration-200 ease-in-out"
            >
              <strong>{translateKeyToHebrew(key)}:</strong>{' '}
              {dateValue.toLocaleTimeString('he-IL', {
                timeZone: selectedLocation.timeZoneId,
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Zmanim2;
