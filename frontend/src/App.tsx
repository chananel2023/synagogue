import React, { useEffect } from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar2 from './components/Navbar2';
import routes from './routes/routes';
import { useAuthStore } from './store/authStore'; 

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
  
  const hiddenNavbarPaths = ['/', '/login', '/signup', '/verify-email'];
  const freeAccessPaths = [...hiddenNavbarPaths, '/homepage'];

  useEffect(() => {
    if (!isCheckingAuth) {

    }
  }, [isCheckingAuth]);

  if (!isAuthenticated && !freeAccessPaths.includes(location.pathname)) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: 'אנא התחבר כדי לגשת לעמוד זה.' }}
      />
    );
  }

  const shouldHideNavbar = hiddenNavbarPaths.includes(location.pathname);

  return (
    <div className="background">
      {!shouldHideNavbar && (
        <div className="navbar">
          <Navbar2 />
        </div>
      )}

      <div
        className={`${
          !hiddenNavbarPaths.includes(location.pathname) ? "content pt-[100px]" : ""
        }`}
      >
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
};

export default App;