import React, { useMemo } from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar2 from './components/Navbar2';
import routes from './routes/routes';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

const MainApp = () => {
  const location = useLocation();
  const hiddenNavbarPaths = useMemo(() => ['/', '/login', '/signup'], []);

  const showNavbar = !hiddenNavbarPaths.includes(location.pathname);

  return (
    <div className="min-h-screen">
      {showNavbar && (
        <div className="navbar">
          <Navbar2 />
        </div>
      )}

      <div className={`${showNavbar ? "content pt-[100px]" : ""}`}>
        <div className="min-h-screen w-full items-center justify-center overflow-hidden">
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