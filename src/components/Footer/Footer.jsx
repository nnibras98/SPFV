import React from 'react';
import './Footer.css'; // Make sure to create a corresponding CSS file
import { useParams } from '../../context/context';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="footer-link">
            LinkedIn
          </a>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="footer-link">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
