import React, { useState } from 'react';
import logo from '../assets/login-logo.png';
import '../styles/Signup.css'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    area: '',
    kudName: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7027/User/CreateUser', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      console.log('Signup success:', data);
      window.location.href = '/login'; // redirect to login page
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='signup-container'>
      <div className="login-logo">
            <img src={logo} alt="Logo" className="login-image" />
        </div>
        <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="firstName"
        placeholder="First name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="area"
        placeholder="Area"
        value={formData.area}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="kudName"
        placeholder="KUD Name"
        value={formData.kudName}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
};

export default Signup;