import { useState } from "react";
import { Link } from "react-router-dom"; // שימוש ב-Link מ-react-router
import { useAuthStore } from "../store/authStore"; // חנות האותנטיקציה
import Logo from "../assets/Logo.jpg"; // הלוגו

const Navbar2: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { user, logout } = useAuthStore(); // קבלת המידע על המשתמש והפעולה logout

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className="flex justify-between items-center text-white py-6 px-8 md:px-32 drop-shadow-md fixed top-0 left-0 w-full z-50 bg-[#1D3557] shadow-lg my-15"
    >
      {/* Logo */}
      <Link to="/HomePage">
        <img
          src={Logo}
          alt="Migo"
          className="w-20 h-20 rounded-full hover:scale-105 transition-all"
        />
      </Link>

      {/* Navigation Links */}
      <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
        <li>
          <Link
            to="/login"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
            onClick={handleLogout}
          >
            יציאה
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
          >
            אודות בית הכנסת
          </Link>
        </li>
        <li>
          <Link
            to="/zmanim"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
          >
            זמני היום
          </Link>
        </li>
        <li>
          <Link
            to="/shiurim"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
          >
            שיעורים
          </Link>
        </li>
        <li>
          <Link
            to="/pay"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
          >
            תשלומים
          </Link>
        </li>
        <li>
          <Link
            to="/homePage"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
          >
            דף הבית
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Toggle Button */}
      <i
        className="bx bx-menu xl:hidden block text-5xl cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      ></i>

      {/* Mobile Menu */}
      <div
        className={`absolute xl:hidden top-24 right-0 w-40 bg-[#1D3557] flex flex-col items-center gap-6 font-semibold text-lg transition-all duration-300 ease-in-out   ${
          isMenuOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none "
        }`}
      >
        <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer ">
          <Link to="/login" onClick={handleLogout}>
            יציאה
          </Link>
        </li>
        <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
          <Link to="/contact">אודות בית הכנסת</Link>
        </li>
        <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
          <Link to="/zmanim">זמני היום</Link>
        </li>
        <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
          <Link to="/shiurim">שיעורים</Link>
        </li>
        <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
          <Link to="/pay">תשלומים</Link>
        </li>
        <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
          <Link to="/homePage">דף הבית</Link>
        </li>
      </div>
    </div>
  );
};

export default Navbar2;

