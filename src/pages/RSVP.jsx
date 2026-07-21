import React, { useState } from 'react';
import './PageStyles.css';

const RSVP = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>RSVP</h1>
      </div>
      
      <div className="page-content" style={{ maxWidth: '500px', margin: '0 auto' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--color-bg-alt)', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '1rem' }}>Thank You!</h2>
            <p>Your RSVP has been received. We look forward to celebrating with you.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ textAlign: 'center', marginBottom: '1rem', fontStyle: 'italic' }}>
              Kindly respond by December 1st, 2026
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="name" style={{ fontWeight: '500' }}>Full Name(s)</label>
              <input 
                type="text" 
                id="name" 
                required 
                style={{ padding: '0.8rem', border: '1px solid var(--color-accent)', borderRadius: '4px', backgroundColor: 'transparent', fontFamily: 'var(--font-sans)' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="attending" style={{ fontWeight: '500' }}>Will you be attending?</label>
              <select 
                id="attending" 
                required 
                style={{ padding: '0.8rem', border: '1px solid var(--color-accent)', borderRadius: '4px', backgroundColor: 'transparent', fontFamily: 'var(--font-sans)' }}
              >
                <option value="">Please select...</option>
                <option value="yes">Joyfully Accept</option>
                <option value="no">Regretfully Decline</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="dietary" style={{ fontWeight: '500' }}>Dietary Restrictions</label>
              <textarea 
                id="dietary" 
                rows="3" 
                placeholder="Let us know about any allergies or dietary needs" 
                style={{ padding: '0.8rem', border: '1px solid var(--color-accent)', borderRadius: '4px', backgroundColor: 'transparent', fontFamily: 'var(--font-sans)' }}
              ></textarea>
            </div>

            <button type="submit" className="btn" style={{ marginTop: '1rem' }}>
              Submit RSVP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RSVP;
