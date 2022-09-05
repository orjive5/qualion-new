import React from 'react';
import './Footer.css';
import qualionLogo from '../assets/qualion-logo.png';
import Icon from '@mdi/react';
import { mdiArrowUpBold } from '@mdi/js';

const Footer = () => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="logo-copyright">
        <img src={qualionLogo} alt="qualion" className="qualion-logo" />
        <p>Copyright © 2022, Qualion, LLC All Rights Reserved.</p>
      </div>
      <button onClick={scrollToTop}>
        <Icon className="up-arrow" path={mdiArrowUpBold} title="Scroll to the top" />
      </button>
    </footer>
  );
};

export default Footer;
