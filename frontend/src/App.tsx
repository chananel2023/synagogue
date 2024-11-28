import React from 'react';
import './index.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import WelcomePage from './pages/firstpage';
import Private from './pages/private';
import Pay from './pages/pay';
import PayAdmin from './pagesAdmin/payAdmin';
import MessagesComponent from './components/MessagesComponent';
import SignUpPage from './pages/SignUpPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import FloatingShape from './components/FloatingShape';
import LoginPage from './pages/LoginPage';
import AdminTfilot from './pagesAdmin/tfilotAdmin';
import ZmanimPage from './pages/ZmanimPage';
import NavbarAdmin from './pagesAdmin/deshbordAdmin'
import AboutAndContact from './pages/contact&about'
import AdminLessons from './pagesAdmin/shiurimAdmun'
import ShiurimHome from './pages/user.shiurim'
//import { ChakraProvider } from '@chakra-ui/react'

function App() {
  const routes = [
    { path: "/", element: <WelcomePage /> },
    { path: "/signup", element: <SignUpPage /> },
    { path: "/verify-email", element: <EmailVerificationPage /> },
    { path: "/messageAdmin", element: <MessagesComponent /> },
    { path: "/payAdmin", element: <PayAdmin /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/HomePage", element: <HomePage /> },
    { path: "/zmanim", element: <ZmanimPage /> },
    { path: "/private", element: <Private /> },
    { path: "/contact", element: <AboutAndContact /> },
    { path: "/pay", element: <Pay /> },
    { path: "/tfilotAdmin", element: <AdminTfilot /> },
    { path: "/deshbord", element: <NavbarAdmin /> },
    { path: "/Lessons", element: <AdminLessons /> },
    { path: "/shiurim", element: <ShiurimHome /> },

  ];

  return (
   // <ChakraProvider>
 
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-cyan-200 to-sky-900 flex items-center justify-center relative overflow-hidden">
        
        <>
          <FloatingShape color="bg-yellow-400" size="w-64 h-64" top="-5%" left="10%" delay={0} />
          <FloatingShape color="bg-yellow-400" size="w-48 h-48" top="70%" left="80%" delay={0} />
          <FloatingShape color="bg-yellow-400" size="w-32 h-32" top="40%" left="10%" delay={0} />
        </>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </div>
      </Router >
      
    //  </ChakraProvider>
  );
}

export default App;
