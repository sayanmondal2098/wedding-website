import React from 'react';
import './PageStyles.css';

const Details = () => {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>The Details</h1>
      </div>
      <div className="page-content">
        <div className="info-block">
          <h2>The Marriage</h2>
          <p>Tuesday, 26 Jan 2027</p>
          <p>Ceremony at 4:30 PM</p>
          <p><strong>Subha Deep Villa</strong></p>
          <p>E7-83, NEW, Biren Roy Road W, Subhayan Park, Beledanga, Muchipara, Maheshtala, West Bengal 700061</p>
          <p>Location: <a href="https://maps.app.goo.gl/XnhsdVqRoTtwMRBm7" target="_blank" rel="noreferrer" className="link-text" style={{marginTop: 0}}>View on Google Maps</a></p>
        </div>
        
        <div className="info-block">
          <h2>The Reception</h2>
          <p>Thursday, 28 Jan 2027</p>
          <p>Evening Reception</p>
          <p><strong>Bangur Avenue Town Hall</strong></p>
          <p>Bangur Avenue, South Dumdum, Kolkata 700055</p>
          <p>Location: <a href="https://maps.app.goo.gl/x2wshfVBcZM2PsAd6" target="_blank" rel="noreferrer" className="link-text" style={{marginTop: 0}}>View on Google Maps</a></p>
        </div>



        <div className="info-block">
          <h2>Parking</h2>
          <p>Valet parking will be provided at the venue. If you are taking a taxi, please instruct the driver to drop you off at the main gate.</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
