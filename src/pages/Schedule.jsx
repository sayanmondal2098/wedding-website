import React from 'react';
import './PageStyles.css';

const Schedule = () => {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Schedule</h1>
      </div>
      <div className="page-content">

        <div className="info-block" style={{ borderLeft: '2px solid var(--color-accent)', paddingLeft: '2rem', textAlign: 'left', marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>Tuesday, 26 Jan 2027</h3>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Marriage</h2>
          <p><strong>Time:</strong> 4:30 PM</p>
          <p><strong>Location:</strong> Subha Deep Villa, Maheshtala <a href="https://maps.app.goo.gl/XnhsdVqRoTtwMRBm7" target="_blank" rel="noreferrer" className="link-text" style={{marginTop: 0, marginLeft: '0.5rem'}}>Map</a></p>
          <p><strong>Attire:</strong> Traditional / Formal</p>
          <p style={{ marginTop: '1rem' }}>We invite you to join us as we tie the knot and celebrate our beginning.</p>
        </div>

        <div className="info-block" style={{ borderLeft: '2px solid var(--color-accent)', paddingLeft: '2rem', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>Thursday, 28 Jan 2027</h3>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Reception</h2>
          <p><strong>Time:</strong> 7:00 PM</p>
          <p><strong>Location:</strong> Bangur Avenue Town Hall <a href="https://maps.app.goo.gl/x2wshfVBcZM2PsAd6" target="_blank" rel="noreferrer" className="link-text" style={{marginTop: 0, marginLeft: '0.5rem'}}>Map</a></p>
          <p><strong>Attire:</strong> Formal / Black Tie Optional</p>
          <p style={{ marginTop: '1rem' }}>Join us for an evening of dining, dancing, and celebration!</p>
        </div>

      </div>
    </div>
  );
};

export default Schedule;
