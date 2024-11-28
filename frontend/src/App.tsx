import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar2 from './components/Navbar2';
import FloatingShapes from './components/FloatingShapes';
import routes from './routes/routes';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

const MainApp = () => {
  const location = useLocation(); // קבלת המיקום הנוכחי
  const hiddenNavbarPaths = ['/', '/login', '/signup']; 

  return (
    <div className="min-h-screen">
      {!hiddenNavbarPaths.includes(location.pathname) && (
        <div className="navbar">
          <Navbar2 />
        </div>
      )}
  
      <div
        className={`${
          !hiddenNavbarPaths.includes(location.pathname)
            ? "content pt-[100px]" // נניח שה-Navbar גובה 100px
            : ""
        }`}
      >
        <div className="min-h-screen  w-full bg-gradient-to-br from-cyan-300 via-cyan-200 to-sky-900 flex items-center justify-center relative overflow-hidden">
          <FloatingShapes />
  
          {/* נתיבים */}
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
  
}

export default App;
