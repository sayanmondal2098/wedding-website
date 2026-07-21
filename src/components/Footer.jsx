import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '3rem 1rem',
      backgroundColor: 'var(--color-bg-alt)',
      borderTop: '1px solid rgba(0,0,0,0.05)',
      marginTop: 'auto'
    }}>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.5rem',
        marginBottom: '1rem'
      }}>
        Sayan & Sukanya
      </p>
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color: 'var(--color-text-light)'
      }}>
        26 Jan 2027 • Kolkata
      </p>
    </footer>
  );
};

export default Footer;
