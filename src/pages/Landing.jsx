import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const heroImage = `${import.meta.env.BASE_URL}hero.png`;

  return (
    <div className="hero-section">
      <img src={heroImage} alt="Lakeside Wedding" className="hero-img" />
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h2 className="hero-subtitle">You are invited to the wedding of</h2>
        <h1 className="hero-title">Sayan & Sukanya</h1>
        <p className="hero-subtitle" style={{ marginBottom: '2rem' }}>
          26 Jan 2027 • Kolkata
        </p>
        <Link to="/home" className="btn">ENTER SITE</Link>
      </div>
    </div>
  );
};

export default Landing;
