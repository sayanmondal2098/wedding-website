import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundMusic from './components/BackgroundMusic';

// Pages
import Home from './pages/Home';
import RSVP from './pages/RSVP';

const Layout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="page-container">
      <Navbar />
      <BackgroundMusic />
      <main className="content-wrap fade-in" key={location.pathname}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
