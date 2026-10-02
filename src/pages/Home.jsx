import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, CalendarDays, Heart, MapPin, Sparkles } from 'lucide-react';
import { WeddingQuest } from './Play';
import './Home.css';

const WEDDING_DAY = new Date('2027-01-26T16:30:00+05:30').getTime();

const Countdown = () => {
  const getTime = () => Math.max(0, WEDDING_DAY - Date.now());
  const [remaining, setRemaining] = useState(getTime);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getTime()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1_000);
  const parts = [[days, 'Days'], [hours, 'Hours'], [minutes, 'Mins'], [seconds, 'Secs']];

  return <div className="countdown" aria-label={`${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds until the marriage`}>
    <p><span>Counting down to the marriage</span>Tuesday, 26 January 2027 · 4:30 PM</p>
    <div className="countdown-grid">
      {parts.map(([value, label]) => <span className="countdown-part" key={label}><b>{String(value).padStart(2, '0')}</b><small>{label}</small></span>)}
    </div>
  </div>;
};

const Home = () => {
  const art = (name) => `${import.meta.env.BASE_URL}illustrations/${name}`;
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return <div className="one-page">
    <section className="one-hero" id="top">
      <div className="one-hero-copy"><p className="one-kicker"><span />26 January 2027 · Kolkata</p><h1>Sayan<br /><em>&amp; Sukanya</em></h1><p>One beautiful beginning, made even brighter with you there.</p><Countdown /><div className="one-hero-actions"><Link className="btn" to="/rsvp">RSVP now <ArrowUpRight size={15} /></Link><button type="button" onClick={() => scrollTo('story')}>Explore our day <ArrowDown size={15} /></button></div></div>
      <div className="one-hero-art"><img src={art('kolkata-ceremony.png')} alt="Illustration of Sayan and Sukanya celebrating beside the Kolkata skyline" /><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><span className="hero-art-note">Made for the moment</span></div>
    </section>

    <section className="story-section page-shell" id="story">
      <div className="story-image"><img src={art('wedding-details.png')} alt="Illustration of wedding invitations, flowers, rings, and celebratory details" /></div>
      <div className="story-copy"><p className="eyebrow">Our story, in one line</p><h2>A little love.<br /><em>A lot of joy.</em></h2><p className="lead">We are getting married—and we would love for our favourite people to be part of it.</p><p>Two days. One city. So many reasons to smile, gather, and celebrate the next chapter together.</p><button type="button" className="story-scroll" onClick={() => scrollTo('details')}>Explore the details <span>→</span></button></div>
    </section>

    <section className="details-section" id="details"><div className="page-shell"><header className="section-intro"><p className="eyebrow">Save these moments</p><h2>Where the magic happens.</h2><p>Everything you need for both celebrations, gathered in one place.</p></header><div className="celebration-grid">
      <article className="celebration-card celebration-card--marriage"><img className="say-yes-image" src={art('say-yes.png')} alt="Illustration of the couple sharing a joyful wedding moment" /><div className="marriage-copy"><span className="event-pill">01 · The marriage</span><h3>Let’s<br />say <em>yes.</em></h3><p className="event-date">Tuesday · 26 January · 4:30 PM</p></div><div className="event-place"><MapPin size={18} /><p><strong>Subha Deep Villa</strong><br />Maheshtala, West Bengal</p><a href="https://maps.app.goo.gl/DtCUizHi97hFx4Zt6" target="_blank" rel="noreferrer">Open map <ArrowUpRight size={14} /></a></div></article>
      <article className="celebration-card celebration-card--reception"><img src={art('reception-dance.png')} alt="Illustration of a wedding reception dance beneath twinkling lights" /><div className="reception-copy"><span className="event-pill">02 · The reception</span><h3>Then we<br /><em>dance.</em></h3><p className="event-date">Thursday · 28 January · 7:00 PM</p><a href="https://maps.app.goo.gl/2w9oHvJeZHP2bTWdA" target="_blank" rel="noreferrer">Bangur Avenue Town Hall <ArrowUpRight size={14} /></a></div></article>
    </div></div></section>

    <section className="itinerary-section page-shell" id="itinerary"><header className="section-intro"><p className="eyebrow">Your simple plan</p><h2>The weekend,<br /><em>at a glance.</em></h2></header><div className="itinerary-list"><article><div className="itinerary-number">01</div><div><p>Tuesday · 26 January</p><h3>The Marriage</h3><span>4:30 PM onwards · Subha Deep Villa</span></div><CalendarDays size={25} strokeWidth={1.35} /></article><article><div className="itinerary-number">02</div><div><p>Thursday · 28 January</p><h3>The Reception</h3><span>7:00 PM onwards · Bangur Avenue Town Hall</span></div><Sparkles size={25} strokeWidth={1.35} /></article></div><div className="arrival-note"><Heart size={18} fill="currentColor" strokeWidth={1} /><p><strong>Easy arrival:</strong> Valet parking is available at both venues. Taxis can use the main gate drop-off.</p></div></section>

    <section className="maps-section" id="maps"><div className="page-shell"><header className="section-intro"><p className="eyebrow">Find your way</p><h2>Two places.<br /><em>One celebration.</em></h2><p>See each venue at a glance, then open Google Maps for the live route.</p></header><div className="venue-map-grid">
      <article className="venue-map-card"><iframe title="Map to Subha Deep Villa" src="https://www.google.com/maps?q=Subha+Deep+Villa,+Maheshtala,+West+Bengal&z=15&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div><span className="event-pill">01 · The marriage</span><h3>Subha Deep Villa</h3><p>Maheshtala, West Bengal<br />Tuesday · 26 January · 4:30 PM</p><a href="https://maps.app.goo.gl/DtCUizHi97hFx4Zt6" target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={15} /></a></div></article>
      <article className="venue-map-card venue-map-card--reception"><iframe title="Map to Bangur Avenue Town Hall" src="https://www.google.com/maps?q=Bangur+Avenue+Town+Hall,+Kolkata,+West+Bengal&z=15&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div><span className="event-pill">02 · The reception</span><h3>Bangur Avenue Town Hall</h3><p>South Dumdum, Kolkata<br />Thursday · 28 January · 7:00 PM</p><a href="https://maps.app.goo.gl/2w9oHvJeZHP2bTWdA" target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={15} /></a></div></article>
    </div></div></section>

    <WeddingQuest embedded />

    <section className="one-rsvp page-shell"><div><p className="eyebrow">One last thing</p><h2>Will you<br /><em>be there?</em></h2><p>We hope the answer is a joyful yes.</p></div><Link className="btn" to="/rsvp">RSVP for the celebration <ArrowUpRight size={15} /></Link></section>
  </div>;
};

export default Home;
