import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const image = `${import.meta.env.BASE_URL}hero.png`;
  return <section className="landing">
    <img className="landing-image" src={image} alt="A glowing wedding ceremony by a mountain lake" />
    <div className="landing-shade" />
    <div className="landing-topline"><span>Sayan &amp; Sukanya</span><span>Wedding Invitation</span></div>
    <div className="landing-content"><p className="landing-kicker">Together with their families</p><h1>Sayan <i>&amp;</i> Sukanya</h1><div className="landing-rule"><span /></div><p className="landing-date">Tuesday, the twenty-sixth of January<br />Two thousand twenty-seven · Kolkata</p><Link to="/home" className="btn btn--light">Discover our celebration <span className="landing-arrow">↓</span></Link></div>
    <p className="landing-scroll">Scroll to begin</p>
  </section>;
};
export default Landing;
