import React, { useState } from 'react';
import FullWidthCarousel from '../components/karusela';
import TfilotList from '../components/TfilotList';

const videoIds = [
  "TFFnwIS0_pk",
  "JfxV2T3KwUk",
  "DbPxhldtTWo",
  "wpdKe8yempk",
  "hWWaJo9O8uM",
  "-H-ZNkwDh5w"
]; // מזהי הסרטונים

const HomePage: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen w-screen">
      {/* קרוסלת תמונות */}
      <div className="my-8 w-full">
        <FullWidthCarousel />
      </div>

      <div className="my-8 w-full">
        <TfilotList />
      </div>

      {/* סרטוני YouTube */}
      <div className="my-8 w-full px-4">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-blue-700" style={{ fontFamily: "'Poppins', sans-serif" }}>
          אולי יעניין אותך
        </h2>


        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {videoIds.map((videoId, index) => (
              <div
                key={index}
                className="rounded overflow-hidden shadow-lg bg-white transform scale-90"
              >
                <iframe
                  className="w-full h-48"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`YouTube video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
