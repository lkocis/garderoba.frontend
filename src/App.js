import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import { useEffect } from 'react';
import { useState } from 'react';
import AuthenticatedNavbar from './components/AuthenticatedNavbar';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      {isAuthenticated ? <AuthenticatedNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
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
