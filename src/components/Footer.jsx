import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
const Footer = () => (<footer className="footer"><div className="footer-top"><p className="eyebrow centered">With love, always</p><p className="footer-names">Sayan <em>&amp;</em> Sukanya</p><Link className="btn btn--light" to="/rsvp">Celebrate with us</Link></div><div className="footer-bottom"><span>26 · 01 · 2027</span><span>Kolkata, India</span><span>Made for the ones we love</span></div></footer>);
export default Footer;
