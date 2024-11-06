import React from 'react';
import Login from './pages/login';
import Signup from './pages/signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage'
import WelcomePage from './pages/firstpage'
import Zmanim from './pages/zmanim'
import Private from './pages/private'
import Pay from './pages/pay'
import Contact from './pages/contact&about'

function App() {
  return (
    <Router>

      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/HomePage' element={<HomePage />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/private' element={<Private />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/zmanim' element={<Zmanim />} />
        <Route path='/pay' element={<Pay />} />



      </Routes>
    </Router>
  );
}

export default App;








