import React, {useEffect, useState} from "react";
import './Footer.css'
import Icon from '@mdi/react'
import { mdiYoutube, mdiInstagram } from '@mdi/js';
import qualionBanner from '../assets/qualion-banner.jpg'
import qualionLogo from '../assets/qualion-logo.png'
import { Link } from "react-router-dom";

const Footer = () => {
  
  return (
    <div className="footer">
      <div className="logo-and-pages">
        <div className="legal-pages-and-social">
          <div className="legal-pages">
            <Link to='/about' style={{ color: 'inherit', textDecoration: 'inherit'}}>
              <h1>About</h1>
            </Link>
            <Link to='/faq' style={{ color: 'inherit', textDecoration: 'inherit'}}>
              <h1>FAQ</h1>
            </Link>
            <Link to='/privacy-policy' style={{ color: 'inherit', textDecoration: 'inherit'}}>
              <h1>Privacy Policy</h1>
            </Link>
          </div>
          <div className="social-icons">
            <Icon
              path={mdiYoutube}
              title="Youtube icon"
              className="youtube-icon"
              size='1.5rem'
              color="#414c75"
            />
            <Icon
              path={mdiInstagram}
              title="Instagram icon"
              className="instagram-icon"
              size='1.5rem'
              color="#414c75"
            />
          </div>
        </div>
        <div className="logo-div">
          <img src={qualionLogo} alt='qualion' className="qualion-logo" />
          <h1>Copyright © 2022, Qualion, LLC All Rights Reserved.</h1>
        </div>
        <div className="contact-pages">
          <Link to='/contact' style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <button>Contact Us</button>
          </Link>
          <Link to='/contribute' style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <button>Contribute</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer;