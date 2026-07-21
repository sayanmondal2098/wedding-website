import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundMusic from './components/BackgroundMusic';

// Pages
import Landing from './pages/Landing';
import Home from './pages/Home';
import Details from './pages/Details';

import RSVP from './pages/RSVP';
import Schedule from './pages/Schedule';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  
  return (
    <div className="page-container">
      {!isLanding && <Navbar />}
      {!isLanding && <BackgroundMusic />}
      <main className="content-wrap fade-in" key={location.pathname}>
        {children}
      </main>
      {!isLanding && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details" element={<Details />} />

          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
