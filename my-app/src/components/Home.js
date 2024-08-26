import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <h1>Self Intro Generator</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Home;
