import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => { const onScroll = () => setIsScrolled(window.scrollY > 20); onScroll(); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  useEffect(() => setIsOpen(false), [location.pathname]);
  const links = [{ name: 'Our Story', path: '/home' }, { name: 'Details', path: '/details' }, { name: 'Itinerary', path: '/schedule' }];
  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="nav-container">
        <Link className="nav-monogram" to="/" aria-label="Sayan and Sukanya home"><span>S</span><i>&amp;</i><span>S</span></Link>
        <nav className="nav-links" aria-label="Main navigation">{links.map((link) => <Link key={link.path} className={location.pathname === link.path ? 'active' : ''} to={link.path}>{link.name}</Link>)}</nav>
        <Link className="nav-rsvp" to="/rsvp">RSVP <span>↗</span></Link>
        <button className="mobile-toggle" type="button" aria-label={isOpen ? 'Close menu' : 'Open menu'} onClick={() => setIsOpen((open) => !open)}>{isOpen ? <X size={21} strokeWidth={1.5} /> : <Menu size={23} strokeWidth={1.5} />}</button>
      </div>
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>{[...links, { name: 'RSVP', path: '/rsvp' }].map((link) => <Link key={link.path} className={location.pathname === link.path ? 'active' : ''} to={link.path}>{link.name}</Link>)}</div>
    </header>
  );
};
export default Navbar;
