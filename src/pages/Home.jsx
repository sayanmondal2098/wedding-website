import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Sparkles } from 'lucide-react';
import './Home.css';

const Home = () => {
  const image = (name) => `${import.meta.env.BASE_URL}${name}`;
  return <div className="home">
    <section className="home-hero page-shell"><div className="home-hero-copy"><p className="eyebrow">A new chapter begins</p><h1>We found<br /><em>our forever.</em></h1><p className="lead">The best things in life are even better when shared. We would be delighted to have you with us as we begin ours.</p><Link to="/rsvp" className="btn">Join the celebration</Link></div><div className="home-hero-image"><img src={image('couple.png')} alt="A couple walking hand in hand in a sunlit forest" /><span className="image-caption">S + S · Est. 2027</span></div></section>
    <section className="date-band"><div className="page-shell date-band-inner"><span>Save the date</span><strong>26</strong><span>January 2027<br />Kolkata, India</span></div></section>
    <section className="welcome page-shell"><div><p className="eyebrow">An invitation</p><h2 className="section-heading">Come celebrate<br />with us.</h2></div><div className="welcome-copy"><p className="lead">From the first hello to every adventure since, ours has been a story made brighter by the people who surround us. This day will be no different.</p><p>Bring your love, your laughter, and your dancing shoes. We cannot wait to make memories together.</p></div></section>
    <section className="home-links page-shell"><Link className="feature-card feature-card--wide" to="/details"><img src={image('table.png')} alt="An elegant outdoor wedding table" /><div className="feature-card-overlay"><p className="eyebrow">Where &amp; when</p><h3>The Details</h3><span className="link-arrow">Explore</span></div></Link><div className="feature-stack"><Link className="feature-card" to="/schedule"><div className="feature-card-solid"><CalendarDays size={25} strokeWidth={1.25} /><p className="eyebrow">Two beautiful days</p><h3>Our itinerary</h3><span className="link-arrow">See schedule</span></div></Link><Link className="feature-card" to="/rsvp"><div className="feature-card-paper"><Sparkles size={24} strokeWidth={1.25} /><p className="eyebrow">Let us know</p><h3>Will you be there?</h3><span className="link-arrow">RSVP</span></div></Link></div></section>
    <section className="note-strip"><MapPin size={17} strokeWidth={1.5} /><p><strong>Kolkata, here we come.</strong> We have gathered every detail you need to celebrate easily and joyfully.</p></section>
  </div>;
};
export default Home;
