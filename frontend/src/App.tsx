import React from 'react';
import Login from './pages/login';
import Signup from './pages/signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import WelcomePage from './pages/firstpage';
import Zmanim from './pages/zmanim';
import Private from './pages/private';
import Pay from './pages/pay';
import Contact from './pages/contact&about';
import PayAdmin from './pagesAdmin/payAdmin';
import MessagesComponent from './components/MessagesComponent';
import SignUpPage from './pages/SignUpPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import FloatingShape from './components/FloatingShape';
import AdminTfilot from './pagesAdmin/tfilotAdmin'
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-cyan-200 to-sky-900 flex items-center justify-center relative overflow-hidden">
        <FloatingShape color="bg-yellow-400" size="w-64 h-64" top="-5%" left="10%" delay={0} /> {/* big */}
        <FloatingShape color="bg-yellow-400" size="w-48 h-48" top="70%" left="80%" delay={0} /> {/* medium */}
        <FloatingShape color="bg-yellow-400" size="w-32 h-32" top="40%" left="10%" delay={0} /> {/* small */}

        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/messageAdmin" element={<MessagesComponent />} />
          <Route path="/payAdmin" element={<PayAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/private" element={<Private />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/zmanim" element={<Zmanim />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/tfilotAdmin" element={<AdminTfilot />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
