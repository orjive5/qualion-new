import React, { useState } from "react";
import './Header.css'
import qualionBanner from '../assets/qualion-banner.jpg'
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ setFoundData, activeTag, setActiveTag }) => {
  const [navDropdown, setNavDropdown] = useState(false);

  const navigate = useNavigate();

  const toggleNavDropdown = () => {
    setNavDropdown(!navDropdown)
  }

  return (
    <nav className="navbar">
      <div className="main-nav">
        <Link to='/'>
          <img onClick={() => navigate('/')} src={qualionBanner} alt='qualion' className="qualion-banner" />
        </Link>
        <Icon path={mdiMenu}
          title="Navigation menu"
          className="hamburger-menu"
          size='1.5rem'
          color='white'
          onClick={toggleNavDropdown}
        />
      </div>
      {navDropdown && (
        <div className="nav-dropdown-simple">
          <div className="menu-pages">
            <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit'}}>
              <h1>HOME</h1>
            </Link>
            <Link to='/about' style={{ color: 'inherit', textDecoration: 'inherit'}}>
              <h1>ABOUT</h1>
            </Link>
            <Link to='/faq' style={{ color: 'inherit', textDecoration: 'inherit'}}>
              <h1>FAQ</h1>
            </Link>
            <Link to='/contact' style={{ color: 'inherit', textDecoration: 'inherit'}}>
              <h1>CONTACT</h1>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header;