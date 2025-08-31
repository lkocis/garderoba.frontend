import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Signup from '../src/pages/Signup';
import Navbar from './components/Navbar';
import Profile from '../src/pages/Profile';
import CostumeComponents from './pages/CostumeComponents';
import Choreographies from '../src/pages/Choreographies';
import Costumes from './pages/Costumes';
import CostumeParts from './pages/CostumeParts';
import Performance from './pages/Performance';
import CostumeCalculator from './pages/CostumeCalculator';
import AuthenticatedNavbar from './components/AuthenticatedNavbar';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setIsAuthenticated(true);
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          setIsAuthenticated(false);

          alert("Your session has expired. Reload this page and go to login.");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <>
      {isAuthenticated ? <AuthenticatedNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onAuth={handleAuth} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/costumeComponents" element={<CostumeComponents />} />
        <Route path="/allChoreos" element={<Choreographies />} />
        <Route path="/costumes/:userId/:choreographyId" element={<Costumes />} />
        <Route path="/costumeParts/:userId/:costumeId" element={<CostumeParts />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/costume-calculator/:userId/:choreographyId" element={<CostumeCalculator />} />
      </Routes>
    </>
  );
}

export default App;
