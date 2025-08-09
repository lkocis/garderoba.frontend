import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Dohvati userId iz localStorage
  const userId = localStorage.getItem('userid');

  useEffect(() => {
    if (!userId) {
      setError('User ID not found');
      return;
    }

    async function fetchUser() {
      try {
        const token = localStorage.getItem('token'); // ako ti treba token za autorizaciju

        const response = await fetch(`https://localhost:7027/User/ReadUser/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // šalješ token ako endpoint traži autorizaciju
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchUser();
  }, [userId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>User Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
      <p><strong>Area:</strong> {user.area}</p>
      <p><strong>KUD Name:</strong> {user.kudName}</p>
    </div>
  );
};

export default Profile;