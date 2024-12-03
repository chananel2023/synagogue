import MessagesComponent from "../components/MessagesComponent"
import EmailVerificationPage from "../pages/EmailVerificationPage"
import WelcomePage from "../pages/firstpage"
import HomePage from "../pages/homePage"
import LoginPage from "../pages/LoginPage"
import Pay from "../pages/pay"
import SignUpPage from "../pages/SignUpPage"
import ZmanimPage from "../pages/ZmanimPage"
import NavbarAdmin from "../pagesAdmin/deshbordAdmin"
import PayAdmin from "../pagesAdmin/payAdmin"
import AdminTfilot from "../pagesAdmin/tfilotAdmin"
import AdminLessons from '../pagesAdmin/shiurimAdmun'
import ShiurimHome from "../pages/user.shiurim"
import AboutAndContact from '../pages/contact&about'
import UpdataAdminCarousel from "../pagesAdmin/UpdataAdminCarousel"

const routes = [
    { path: "/", element: <WelcomePage /> },
    { path: "/signup", element: <SignUpPage /> },
    { path: "/verify-email", element: <EmailVerificationPage /> },
    { path: "/messageAdmin", element: <MessagesComponent /> },
    { path: "/payAdmin", element: <PayAdmin /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/HomePage", element: <HomePage /> },
    { path: "/zmanim", element: <ZmanimPage /> },
    { path: "/contact", element: <AboutAndContact /> },
    { path: "/pay", element: <Pay /> },
    { path: "/tfilotAdmin", element: <AdminTfilot /> },
    { path: "/deshbord", element: <NavbarAdmin /> },
    { path: "/Lessons", element: <AdminLessons /> },
    { path: "/shiurim", element: <ShiurimHome /> },
    { path: "/UpdataAdminCarousel", element: <UpdataAdminCarousel /> },
    
];

export default routes;