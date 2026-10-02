import React from 'react';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import './PageStyles.css';

const Timeline = ({ day, date, title, time, venue, map, children }) => <section className="timeline-day">
  <div className="timeline-date"><span>{day}</span><strong>{date}</strong><i /> </div>
  <div className="timeline-content"><p className="eyebrow">Mark the moment</p><h2>{title}</h2><p className="timeline-intro">{children}</p><div className="timeline-event"><Clock3 size={19} strokeWidth={1.35} /><div><span>{time}</span><h3>{venue}</h3><a href={map} target="_blank" rel="noreferrer">View location <ArrowUpRight size={14} strokeWidth={1.5} /></a></div></div></div>
</section>;

const Schedule = () => <div className="event-page schedule-page">
  <header className="page-intro page-shell"><p className="eyebrow centered">Our wedding week</p><h1 className="display-title">The Itinerary</h1><p className="lead">Come for the vows. Stay for the stories, the supper, and the dance floor.</p></header>
  <main className="page-shell timeline">
    <Timeline day="Tuesday" date="26" title="The Marriage" time="4:30 PM onwards" venue="Subha Deep Villa, Maheshtala" map="https://maps.app.goo.gl/DtCUizHi97hFx4Zt6">Join us as we exchange vows and toast to a beautiful beginning. Traditional or formal attire is warmly encouraged.</Timeline>
    <Timeline day="Thursday" date="28" title="The Reception" time="7:00 PM onwards" venue="Bangur Avenue Town Hall" map="https://maps.app.goo.gl/2w9oHvJeZHP2bTWdA">An evening for embracing, dining, dancing, and celebration. Formal or black-tie optional attire.</Timeline>
  </main>
  <section className="dress-note"><p className="eyebrow centered">Dress code</p><h2>Bring your brightest selves.</h2></section>
</div>;

export default Schedule;
