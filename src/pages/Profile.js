import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';  
import '../styles/Profile.css';

const Profile = ({onLogout}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setError('User ID not found');
      return;
    }

    async function fetchUser() {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
          `https://localhost:7027/User/ReadUser/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(response.data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          const message =
            err.response?.data || err.message || 'Failed to fetch user data';
          setError(message);
        }
      }
    }

    fetchUser();
  }, [userId, navigate]);

  const updateUserInfo = async (fieldName) => {
    const newValue = prompt(
      `Unesi novi podatak za ${fieldName}:`,
      user[fieldName]
    );
    if (newValue === null || newValue === user[fieldName]) return;

    try {
      const token = localStorage.getItem('token');

      const payload = {
        ...user,
        id: userId,
        [fieldName]: newValue,
      };

      await axios.put(
        `https://localhost:7027/User/UpdateUserById/${userId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser((prevUser) => ({
        ...prevUser,
        [fieldName]: newValue,
      }));
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        alert('Failed to update user info.');
      }
    }
  };

  const handleLogoutClick = () => {
    onLogout();
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Loading...</p>;

  const renderEditableRow = (label, fieldName) => (
    <p>
      <strong>{label}:</strong> {user[fieldName]}{' '}
      <FaEdit
        style={{ cursor: 'pointer', color: '#007bff' }}
        onClick={() => updateUserInfo(fieldName)}
        title={`Edit ${label}`}
      />
    </p>
  );

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="info-box">
        {renderEditableRow('Email', 'email')}
        {renderEditableRow('First Name', 'firstName')}
        {renderEditableRow('Last Name', 'lastName')}
        {renderEditableRow('Phone Number', 'phoneNumber')}
        {renderEditableRow('Area', 'area')}
        {renderEditableRow('KUD Name', 'kudName')}
      </div>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default Profile;
