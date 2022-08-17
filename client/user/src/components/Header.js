import React from "react";
import './Header.css'
import qualionBanner from '../assets/qualion-banner.jpg'
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import { mdiMagnify } from '@mdi/js';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className="main-nav">
      <Link to='/'>
        <img src={qualionBanner} alt='qualion' className="qualion-banner"/>
      </Link>
      <Icon path={mdiMenu}
        title="Navigation menu"
        className="hamburger-menu"
        size='1.5rem'
        color='white'
      />
      <Icon path={mdiMagnify}
        title="Search"
        className="search-icon"
        size='1.5rem'
        color='white'
      />
    </nav>
  )
}

export default Header;