import React from 'react';
import '../styles/Footer.css'; 
import teachHubLogo from '../styles/Teach_Hub_logo.png';

function Footer() {
  return (
    <footer className="footer bg-dark text-dark py-3">
      <div className="container">
      <img src={teachHubLogo} alt="TeachHub Logo" className="footer-logo me-3" /> {}
        <p><strong>© 2024 TeachHub, Inc. All rights reserved.</strong></p>
      </div>
    </footer>
  );
}

export default Footer;