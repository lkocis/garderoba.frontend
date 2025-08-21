import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; 

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Ako nema tokena → ide na login
    if (!token) {
      navigate('/login');
    } else {
      // Provjeri da li je već refreshano u ovoj sesiji
      const refreshed = sessionStorage.getItem('homeRefreshed');
      if (!refreshed) {
        sessionStorage.setItem('homeRefreshed', 'true');
        window.location.reload(); // Hard reload
      }
    }
  }, [navigate]);

  return (
    <div className="home-container">
      <h1>About</h1>
      <p>This is the Home page.</p>
    </div>
  );
};

export default Home;
