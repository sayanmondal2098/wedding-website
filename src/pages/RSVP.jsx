import React, { useState } from 'react';
import { Check, Heart } from 'lucide-react';
import './PageStyles.css';

const RSVP = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const rsvpEndpoint = import.meta.env.VITE_RSVP_SHEET_ENDPOINT?.trim();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    if (!rsvpEndpoint) {
      setSubmitError('RSVP collection is being connected. Please check back shortly.');
      return;
    }

    const form = new FormData(event.currentTarget);
    const payload = new URLSearchParams({
      name: form.get('name')?.toString().trim() || '',
      attending: form.get('attending')?.toString() || '',
      dietary: form.get('dietary')?.toString().trim() || '',
    });

    setSubmitting(true);
    try {
      await fetch(rsvpEndpoint, { method: 'POST', mode: 'no-cors', body: payload });
      setSubmitted(true);
    } catch {
      setSubmitError('We could not send your RSVP. Please try again in a moment.');
    } finally {
      setSubmitting(false);
    }
  };
  return <div className="event-page rsvp-page">
    <header className="page-intro page-shell"><p className="eyebrow centered">Save us a seat</p><h1 className="display-title">Will you join us?</h1><p className="lead">Please let us know if we will have the pleasure of celebrating together.</p></header>
    <main className="page-shell rsvp-layout">
      <aside className="rsvp-aside"><Heart size={31} strokeWidth={1.2} /><p className="eyebrow">A note from us</p><h2>Your presence is the<br /><em>greatest gift.</em></h2><p>We hope the evening finds you beside us, but we understand that love travels in many forms.</p><span>Please reply by<br /><strong>01 December 2026</strong></span></aside>
      <section className="rsvp-card">
        {submitted ? <div className="rsvp-thanks"><span><Check size={27} strokeWidth={1.5} /></span><p className="eyebrow centered">Received with love</p><h2>Thank you.</h2><p>Your RSVP has been received. We cannot wait to celebrate with you.</p></div> : <form onSubmit={handleSubmit}><div className="form-heading"><p className="eyebrow">Your response</p><h2>RSVP</h2></div><label>Full name(s)<input name="name" type="text" required autoComplete="name" placeholder="Your name" /></label><label>Will you be attending?<select name="attending" required defaultValue=""><option value="" disabled>Please select</option><option value="Joyfully accept">Joyfully accept</option><option value="Regretfully decline">Regretfully decline</option></select></label><label>Dietary restrictions <span>(optional)</span><textarea name="dietary" rows="3" placeholder="Allergies or dietary needs" /></label>{submitError && <p className="rsvp-submit-error" role="alert">{submitError}</p>}<button className="btn" type="submit" disabled={submitting}>{submitting ? 'Sending…' : <>Send RSVP <span>↗</span></>}</button></form>}
      </section>
    </main>
  </div>;
};
export default RSVP;
