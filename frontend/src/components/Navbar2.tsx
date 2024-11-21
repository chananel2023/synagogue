import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import  migo from "/Users/baruchyankvtz/Desktop/ti/channal2023/synagogue/frontend/src/assets/migo.jpg";

const Navbar2: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex justify-between items-center text-black py-6 px-8 md:px-32 bg-white bg-opacity-50 drop-shadow-md fixed top-0 left-0 z-10 w-full">
      {/* סמל ותמונה */}
      <a href="google.com">
        <img src={migo} alt="Migo" className="w-20 h-20 rounded-full hover:scale-105 transition-all" />
      </a>

      {/* תפריט קישורים */}
      <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
        <li>
          <a
            href="/login"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
            aria-label="Home"
            onClick={handleLogout}
          >
            log-out
          </a>
        </li>
        <li>
          <a
            href="zmanim"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
            aria-label="zmanim"
          >
            zmanim
          </a>
        </li>
        <li>
          <a
            href="/HomePage"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
            aria-label="Services"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="p-3 hover:bg-white hover:text-black rounded-md transition-all"
            aria-label="Contact"
          >
            Contact
          </a>
        </li>
      </ul>

      {/* שדה חיפוש */}
      <div className="relative hidden md:flex items-center justify-center gap-3">
        <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
        <input
          type="text"
          placeholder="Search..."
          className="py-2 pl-10 rounded-xl border-2 border-green-300 focus:bg-slate-100 focus:outline-sky-500"
        />
      </div>

      {/* כפתור פתיחת התפריט */}
      <i
        className="bx bx-menu xl:hidden block text-5xl cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      ></i>

      {/* תפריט נפתח במובייל */}
      <div
        className={`absolute xl:hidden top-24 left-0 w-full bg-white bg-opacity-50 flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
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
