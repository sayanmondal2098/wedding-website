import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const image = `${import.meta.env.BASE_URL}hero.png`;
  return <section className="landing">
    <img className="landing-image" src={image} alt="A glowing wedding ceremony by a mountain lake" />
    <div className="landing-shade" />
    <header className="landing-topline"><span className="landing-brand">Sayan + Sukanya</span><span>26.01.27</span></header>
    <div className="landing-content"><p className="landing-kicker">A wedding weekend in Kolkata</p><h1>One big yes.<br /><i>One unforgettable week.</i></h1><p className="landing-date">Join us for the beginning of our always.</p><div className="landing-actions"><Link to="/home" className="btn btn--light">Enter celebration <span className="landing-arrow">→</span></Link><Link className="landing-scroll" to="/home">See what’s planned <span>↓</span></Link></div></div>
    <div className="landing-bottom"><span>Tuesday, 26 January</span><span>With love, from Sayan &amp; Sukanya</span></div>
  </section>;
};
export default Landing;
