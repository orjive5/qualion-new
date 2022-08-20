import React, {useEffect, useState} from "react";
import './Footer.css'
import axios from "axios";
import Icon from '@mdi/react'
import { mdiYoutube, mdiInstagram } from '@mdi/js';
import qualionBanner from '../assets/qualion-banner.jpg'
import qualionLogo from '../assets/qualion-logo.png'

const Footer = () => {
  
  return (
    <div className="footer">
      <div className="about-paragraph">
        <h1>Our mission is to explore interesting, weird and mysterious aspects of the ever-changing world in which we live.</h1>
      </div>
      <div className="logo-and-pages">
        <div className="legal-pages-and-social">
          <div className="legal-pages">
            <h1>About</h1>
            <h1>FAQ</h1>
            <h1>Privacy Policy</h1>
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
          <img src={qualionBanner} alt='qualion' className="qualion-banner-footer"/>
          <img src={qualionLogo} alt='qualion' className="qualion-logo"/>
        </div>
        <div className="contact-pages">
          <button>Contact Us</button>
          <button>Contribute</button>
        </div>
      </div>
    </div>
  )
}

export default Footer;