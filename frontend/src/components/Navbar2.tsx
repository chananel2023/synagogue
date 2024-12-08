import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Menu, Close, Home, Payment, School, AccessTime, Info, Dashboard, ExitToApp, WavingHand } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import PayPalIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useTheme, useMediaQuery } from '@mui/material';

const Navbar2: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDonateDrawerOpen, setIsDonateDrawerOpen] = useState<boolean>(false);
  const { logout, user } = useAuthStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const menuItems = useMemo(() => [
    { path: '/homePage', label: 'דף הבית', icon: <Home /> },
    { path: '/pay', label: 'תשלומים', icon: <Payment /> },
    { path: '/map', label: 'מקומות'},
    { path: '/shiurim', label: 'שיעורים', icon: <School /> },
    { path: '/zmanim', label: 'זמני היום', icon: <AccessTime /> },
    { path: '/contact', label: 'אודות', icon: <Info /> },
    { path: "/deshbord", label: 'ניהול', icon: <Dashboard /> },
    { path: '/login', label: 'יציאה', onClick: handleLogout, icon: <ExitToApp /> },
  ], [handleLogout]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    if (isDonateDrawerOpen) {
      setIsDonateDrawerOpen(false);
    }
  }, [isDonateDrawerOpen]);

  const toggleDonateDrawer = useCallback(() => {
    setIsDonateDrawerOpen(prev => !prev);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

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
    <nav className={`flex justify-between items-center text-white py-6 px-4 md:px-8 lg:px-16 fixed top-0 left-0 w-full z-50 bg-[#1D3557] shadow-lg ${isMobile ? 'text-sm' : ''}`}>
      <button
        onClick={toggleDonateDrawer}
        className="bg-[#1D3557] border border-white text-white rounded-md p-2 hover:bg-opacity-70 transition-all flex items-center"
      >
        <CreditCardIcon className="mr-2" /> תרום
      </button>

      <h1 className="text-lg font-bold text-yellow-300 md:text-xl lg:text-2xl">בית הכנסת בית ישראל</h1>

      <span className="text-base font-semibold text-white flex items-center md:text-lg lg:text-xl">
        <WavingHand className="mr-2" />
        {greeting} {user ? user.name : "אורח"}
      </span>

      <motion.button
        className="block text-3xl cursor-pointer"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
        animate={{ rotate: isMenuOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isMenuOpen ? <Close style={{ color: 'white' }} /> : <Menu style={{ color: 'white' }} />}
      </motion.button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`absolute top-16 right-0 w-48 bg-[#1D3557] flex flex-col items-center gap-4 font-semibold rounded-lg shadow-lg ${isMobile ? 'text-base' : 'text-lg'}`}
          >
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
                onClick={() => {
                  toggleMenu();
                  item.onClick?.();
                }}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isDonateDrawerOpen ? 0 : '-100%' }}
        transition={{ type: "spring", stiffness: 300 }}
        className="absolute top-16 left-0 w-64 bg-lightblue-500 shadow-lg rounded-lg p-4 z-50"
      >
        <div className="flex flex-col gap-2 items-center">
          <a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer">
            <button className="flex items-center bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-all w-full">
              <PayPalIcon className="mr-2" /> תרומה דרך פייפל
            </button>
          </a>
          <a href="https://www.biteasy.co.il" target="_blank" rel="noopener noreferrer">
            <button className="flex items-center bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition-all w-full">
              <CreditCardIcon className="mr-2" /> תרומה דרך ביט
            </button>
          </a>
        </div>
      </motion.div>
    </nav>
  );
};

export default React.memo(Navbar2);