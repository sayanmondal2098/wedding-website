import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;
  const sections = [
    { title: 'The Details', path: '/details', img: assetUrl('table.png') },
    { title: 'Schedule', path: '/schedule', img: assetUrl('hero.png') },
    { title: 'RSVP', path: '/rsvp', img: assetUrl('table.png') }
  ];

  return (
    <div className="home-container" style={{ marginTop: '80px', padding: '2rem' }}>
      <div className="home-intro" style={{ textAlign: 'center', margin: '4rem 0' }}>
        <h1 style={{ marginBottom: '1rem' }}>Welcome to Our Beginning</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-light)' }}>
          We are so excited to celebrate our special day with you. 
          Please explore the site to find all the details you need for our wedding weekend.
        </p>
      </div>

      <div className="grid-gallery">
        {sections.map((sec, idx) => (
          <Link to={sec.path} key={idx} className="grid-item">
            <img src={sec.img} alt={sec.title} className="grid-img" />
            <div className="grid-overlay">
              <h3>{sec.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
