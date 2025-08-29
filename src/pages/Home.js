import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; 

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="home-container">
      <h1>About</h1>
      <h3>Garderoba is a web application designed for leaders of folklore ensembles, 
        allowing them to lend or borrow folk costumes and their components, 
        as well as to form new friendships.
      </h3>
      <br></br>
      <p>The app allows you to create choreographies for anyone and to add the costumes and costume pieces you own to those choreographies.
        The main idea of the app is to enable the performance of various choreographies 
        with the collaboration of other coordinators, thereby helping to promote folk heritage.
      </p>
    </div>
  );
};

export default Home;
