import React from 'react';
import FullWidthCarousel from '../components/karusela'
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
    
    return (
        <div className="min-h-screen pt-50 w-100">
        
        <div className="container mx-auto px-4">
          {/* קרוסלת תמונות */}
          <div className="my-8  ">
            <FullWidthCarousel />
          </div>
      
          {/* רשימת זמני תפילות */}
          <div className="my-8">
            <TfilotList />
          </div>
      
          {/* סרטוני YouTube */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-8">
            {videoIds.map((videoId, index) => (
              <div key={index} className="rounded overflow-hidden shadow-lg">
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
      
    );
};



export default HomePage;
