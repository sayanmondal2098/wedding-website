import React from 'react';
import { ArrowUpRight, CarFront, MapPin } from 'lucide-react';
import './PageStyles.css';

const EventCard = ({ number, date, title, time, venue, address, map }) => (
  <article className="event-card">
    <div className="event-card-top"><span className="event-number">{number}</span><p>{date}</p></div>
    <h2>{title}</h2>
    <div className="event-card-rule" />
    <dl className="event-facts"><div><dt>Time</dt><dd>{time}</dd></div><div><dt>Venue</dt><dd>{venue}<br /><span>{address}</span></dd></div></dl>
    <a className="map-link" href={map} target="_blank" rel="noreferrer"><MapPin size={16} strokeWidth={1.5} />Open in Google Maps <ArrowUpRight size={15} strokeWidth={1.5} /></a>
  </article>
);

const Details = () => <div className="event-page">
  <header className="page-intro page-shell"><p className="eyebrow centered">All you need to know</p><h1 className="display-title">The Details</h1><p className="lead">Two moments, one very full heart. Here’s where to find us.</p></header>
  <main className="page-shell details-main">
    <div className="event-grid">
      <EventCard number="01" date="Tuesday · 26 January 2027" title="The Marriage" time="4:30 PM onwards" venue="Subha Deep Villa" address="E7-83, New Biren Roy Road W, Maheshtala, West Bengal 700061" map="https://maps.app.goo.gl/XnhsdVqRoTtwMRBm7" />
      <EventCard number="02" date="Thursday · 28 January 2027" title="The Reception" time="7:00 PM onwards" venue="Bangur Avenue Town Hall" address="Bangur Avenue, South Dumdum, Kolkata 700055" map="https://maps.app.goo.gl/x2wshfVBcZM2PsAd6" />
    </div>
    <aside className="travel-note"><CarFront size={28} strokeWidth={1.25} /><div><p className="eyebrow">A small note</p><h3>Arriving with ease</h3><p>Valet parking will be available at both venues. Arriving by taxi? Simply ask to be dropped at the main gate.</p></div></aside>
  </main>
</div>;

export default Details;
