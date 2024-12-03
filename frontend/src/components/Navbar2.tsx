import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Menu, Close } from '@mui/icons-material';
import { motion } from 'framer-motion';
import PayPalIcon from '@mui/icons-material/Payment'; // אייקון פייפל
import CreditCardIcon from '@mui/icons-material/CreditCard'; // אייקון כרטיס אשראי

const Navbar2: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDonateDrawerOpen, setIsDonateDrawerOpen] = useState<boolean>(false);
  const { logout } = useAuthStore();
  const { user, isAuthenticated } = useAuthStore();
  

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const menuItems = useMemo(() => [
    { path: '/homePage', label: 'דף הבית' },
    { path: '/pay', label: 'תשלומים' },
    { path: '/shiurim', label: 'שיעורים' },
    { path: '/zmanim', label: 'זמני היום' },
    { path: '/contact', label: 'אודות בית הכנסת' },
    { path: "/deshbord", label: 'ניהול' },
    { path: '/login', label: 'יציאה', onClick: handleLogout },
  ], [handleLogout]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    if (isDonateDrawerOpen) {
      setIsDonateDrawerOpen(false); // סוגר את מגירת התרומות אם היא פתוחה
    }
  }, [isDonateDrawerOpen]);

  const toggleDonateDrawer = useCallback(() => {
    setIsDonateDrawerOpen(prev => !prev);
    if (isMenuOpen) {
      setIsMenuOpen(false); // סוגר את התפריט אם הוא פתוח
    }
  }, [isMenuOpen]);

  // הגדרת ברכת בוקר טוב בהתאם לשעה
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('בוקר טוב');
    } else if (currentHour < 18) {
      setGreeting('אחר צהריים טובים');
    } else {
      setGreeting('ערב טוב');
    }
  }, []);

  return (
    <nav className="flex justify-between items-center text-white py-4 px-8 md:px-32 fixed top-0 left-0 w-full z-50 bg-[#1D3557] shadow-lg">
      {/* כפתור תרומה */}
      <button
        onClick={toggleDonateDrawer}
        className="bg-[#1D3557] border border-white text-white rounded-md p-2 hover:bg-opacity-70 transition-all"
      >
        תרום
      </button>
  
      <h1 className="text-xl font-bold text-yellow-300">בית הכנסת בית ישראל</h1>
  
      {/* ברכת בוקר טוב */}
      <span className="text-lg font-semibold text-white">{greeting} {user ? user.name : "Guest"}</span>
  
      {/* כפתור תפריט */}
      <button
        className="block text-3xl cursor-pointer"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <Close style={{ color: 'white' }} /> : <Menu style={{ color: 'white' }} />}
      </button>
  
      {/* תפריט נפתח */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 w-48 bg-[#1D3557] flex flex-col items-center gap-4 font-semibold text-lg transition-all duration-300 ease-in-out rounded-lg shadow-lg">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer"
              onClick={() => {
                toggleMenu();
                item.onClick?.();
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
  
      {/* מגירת תרומות */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isDonateDrawerOpen ? 0 : '-100%' }}
        transition={{ type: "spring", stiffness: 300 }}
        className="absolute top-16 left-0 w-64 bg-lightblue-500 shadow-lg rounded-lg p-4 z-50" // רקע תכלת
      >
        <div className="flex flex-col gap-2 items-center">
          <a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer">
            <button className="flex items-center bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-all w-full">
              <PayPalIcon className="mr-2" /> תרום דרך פייפל
            </button>
          </a>
          <a href="https://www.biteasy.co.il" target="_blank" rel="noopener noreferrer">
            <button className="flex items-center bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition-all w-full">
              <CreditCardIcon className="mr-2" /> תרום דרך ביט
            </button>
          </a>
        </div>
      </motion.div>
    </nav>
  );
  
};

export default React.memo(Navbar2);
