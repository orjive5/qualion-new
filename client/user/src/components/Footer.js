import React from 'react';
import './Footer.css';
import Icon from '@mdi/react';
import { mdiYoutube, mdiInstagram } from '@mdi/js';
import qualionLogo from '../assets/qualion-logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  const linkStyle = {
    color: 'inherit',
    textDecoration: 'inherit'
  };

  const newWindowYouTube = () => {
    window.open('https://www.youtube.com/', '_blank', 'noopener,noreferrer');
  };

  const newWindowInstagram = () => {
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="footer">
      <div className="logo-and-pages">
        <div className="legal-pages-and-social">
          <div className="legal-pages">
            <Link to="/about" style={linkStyle}>
              <h1>About</h1>
            </Link>
            <Link to="/faq" style={linkStyle}>
              <h1>FAQ</h1>
            </Link>
            <Link to="/privacy-policy" style={linkStyle}>
              <h1>Privacy Policy</h1>
            </Link>
          </div>
          <div className="social-icons">
            <Icon
              onClick={newWindowYouTube}
              path={mdiYoutube}
              title="Youtube"
              className="youtube-icon"
              size="1.5rem"
              color="#414c75"
            />
            <Icon
              onClick={newWindowInstagram}
              path={mdiInstagram}
              title="Instagram"
              className="instagram-icon"
              size="1.5rem"
              color="#414c75"
            />
          </div>
        </div>
        <div className="logo-div">
          <img src={qualionLogo} alt="Qualion logo" className="qualion-logo" />
          <h1>Copyright © 2022, Qualion, LLC All Rights Reserved.</h1>
        </div>
        <div className="contact-pages">
          <Link to="/contact" style={linkStyle}>
            <button>Contact Us</button>
          </Link>
          <Link to="/contribute" style={linkStyle}>
            <button>Contribute</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
