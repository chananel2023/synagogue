import React, { useEffect } from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar2 from './components/Navbar2';
import routes from './routes/routes';
import { useAuthStore } from './store/authStore'; // ייבוא של החנות

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

const MainApp = () => {
  const location = useLocation();
  const { isAuthenticated, isCheckingAuth } = useAuthStore();
  const hiddenNavbarPaths = ['/', '/login', '/signup'];

  useEffect(() => {
    if (!isCheckingAuth) {
      // You can handle additional authentication checks here if needed
    }
  }, [isCheckingAuth]);

  if (!isAuthenticated && !hiddenNavbarPaths.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="background"> {/* Add background class here */}
      {!hiddenNavbarPaths.includes(location.pathname) && (
        <div className="navbar">
          <Navbar2 />
        </div>
      )}

      <div
        className={`${!hiddenNavbarPaths.includes(location.pathname)
          ? "content pt-[100px]"
          : ""
          }`}
      >
        <div className="min-h-screen w-full items-center justify-center overflow-hidden">
          {/* Routes */}
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