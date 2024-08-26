import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS file

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      // Display a success message
      window.alert('Successfully registered!');
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Failed to register', error);
      window.alert('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Register</h2>
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
