import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import Logo from '../assets/Logo.jpg';


const Navbar2: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();

  };

  return (
    <div className="flex justify-between items-center text-black py-6 px-8 md:px-32 bg-white bg-opacity-50 drop-shadow-md fixed top-0 left-0 z-10 w-full">
      {/* Logo */}
      <a href="/HomePage">
        <img src={Logo} alt="Migo" className="w-20 h-20 rounded-full hover:scale-105 transition-all" />
      </a>

      {/* Navigation Links */}
      <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
        <li>
          <a
            href="/login"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
            onClick={handleLogout}
            aria-label="Logout"
          >
            יציאה
          </a>
        </li>
        <li>
          <a
            href="/zmanim"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
            aria-label="Zmanim"
          >
            זמני היום
          </a>
        </li>
        <li>
          <a
            href="/private"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
            aria-label="Zmanim"
          >
            איזור אישי
          </a>
        </li>
        <li>
          <a
            href="/Signup"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
            aria-label="Sign Up"
          >
            יצירת חשבון
          </a>
        </li>
        <li>
          <a
            href="/pay"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
            aria-label="Payments"
          >
            תשלומים
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
            aria-label="Contact"
          >
            צור קשר
          </a>
        </li>
      </ul>

      {/* Search Field */}
      <div className="relative hidden md:flex items-center justify-center gap-3">
        <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
        <input
          type="text"
          placeholder="Search..."
          className="py-2 pl-10 rounded-xl border-2 border-green-300 focus:bg-slate-100 focus:outline-sky-500"
        />
      </div>

      {/* Mobile Menu Toggle Button */}
      <i
        className="bx bx-menu xl:hidden block text-5xl cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      ></i>

      {/* Mobile Menu */}
      <div
        className={`absolute xl:hidden top-24 left-0 w-full bg-white bg-opacity-50 flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
      >
        <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
          1
        </li>
        <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
          2
        </li>
        <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
          3
        </li>
        <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
          4
        </li>
      </div>

      {/* Logout Button (for mobile) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}

      >
        Log Out
      </motion.button>
    </div>
  );
};

export default Navbar2;
