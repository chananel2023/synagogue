import React from 'react';
import Login from './pages/login';
import SignupForm from './pages/signup';
import Header from './components/header';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/HomePage' element={<HomePage />} /> 
        <Route path='/' element={<Header />} />
        <Route path='/SignupForm' element={<SignupForm />} />

      </Routes>
    </Router>
  );
}

export default App;
