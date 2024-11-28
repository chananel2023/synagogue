import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Logo from "../assets/Logo.jpg";

const Navbar2: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className="flex justify-between items-center text-white py-6 px-8 md:px-32 drop-shadow-md fixed top-0 left-0 z-10 w-full"
      style={{
        backgroundColor: "#1D3557", // כחול חיל הים
        marginBottom: "20px",
      }}
    >
      {/* Logo */}
      <a href="/HomePage">
        <img
          src={Logo}
          alt="Migo"
          className="w-20 h-20 rounded-full hover:scale-105 transition-all"
        />
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
            href="/contact"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
            aria-label="Contact"
          >
            אודות בית הכנסת
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
            href="/shiurim"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
            aria-label="Private"
          >
            שיעורים
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
            href="/homePage"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
            aria-label="Payments"
          >
            דף הבית
          </a>
        </li>
      </ul>

      {/* Mobile Menu Toggle Button */}
      <i
        className="bx bx-menu xl:hidden block text-5xl cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      ></i>

      {/* Mobile Menu */}
      <div
        className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
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
    </div>
  );
};

export default Navbar2;
