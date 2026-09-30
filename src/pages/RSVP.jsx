import React, { useState } from 'react';
import { Check, Heart } from 'lucide-react';
import './PageStyles.css';

const RSVP = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event) => { event.preventDefault(); setSubmitted(true); };
  return <div className="event-page rsvp-page">
    <header className="page-intro page-shell"><p className="eyebrow centered">Save us a seat</p><h1 className="display-title">Will you join us?</h1><p className="lead">Please let us know if we will have the pleasure of celebrating together.</p></header>
    <main className="page-shell rsvp-layout">
      <aside className="rsvp-aside"><Heart size={31} strokeWidth={1.2} /><p className="eyebrow">A note from us</p><h2>Your presence is the<br /><em>greatest gift.</em></h2><p>We hope the evening finds you beside us, but we understand that love travels in many forms.</p><span>Please reply by<br /><strong>01 December 2026</strong></span></aside>
      <section className="rsvp-card">
        {submitted ? <div className="rsvp-thanks"><span><Check size={27} strokeWidth={1.5} /></span><p className="eyebrow centered">Received with love</p><h2>Thank you.</h2><p>Your RSVP has been received. We cannot wait to celebrate with you.</p></div> : <form onSubmit={handleSubmit}><div className="form-heading"><p className="eyebrow">Your response</p><h2>RSVP</h2></div><label>Full name(s)<input name="name" type="text" required autoComplete="name" placeholder="Your name" /></label><label>Will you be attending?<select name="attending" required defaultValue=""><option value="" disabled>Please select</option><option value="yes">Joyfully accept</option><option value="no">Regretfully decline</option></select></label><label>Dietary restrictions <span>(optional)</span><textarea name="dietary" rows="3" placeholder="Allergies or dietary needs" /></label><button className="btn" type="submit">Send RSVP <span>↗</span></button></form>}
      </section>
    </main>
  </div>;
};
export default RSVP;
