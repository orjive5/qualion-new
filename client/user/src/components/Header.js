import React, { useState } from "react";
import './Header.css'
import qualionBanner from '../assets/qualion-banner.jpg'
import Icon from '@mdi/react';
import { mdiMenu, mdiMagnify } from '@mdi/js';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const [searchBar, setSearchBar] = useState(false);
  const [navDropdown, setNavDropdown] = useState(false);

  const toggleSearchBar = () => {
    setNavDropdown(false)
    setSearchBar(!searchBar)
  }
  const toggleNavDropdown = () => {
    setSearchBar(false)
    setNavDropdown(!navDropdown)
  }

  return (
    <nav className="navbar">
      <div className="main-nav">
        <Link to='/'>
          <img src={qualionBanner} alt='qualion' className="qualion-banner"/>
        </Link>
        <Icon path={mdiMenu}
          title="Navigation menu"
          className="hamburger-menu"
          size='1.5rem'
          color='white'
          onClick={toggleNavDropdown}
        />
        <Icon path={mdiMagnify}
          title="Search"
          className="search-icon"
          size='1.5rem'
          color='white'
          onClick = {toggleSearchBar}
        />
      </div>
      {searchBar && (
        <div className="search-bar">
          <form className="search-form">
            <input type='text'></input>
            <button type="submit">
            <Icon path={mdiMagnify}
              title="Search"
              className="search-bar-icon"
              size='2.5rem'
              color='white'
            />
            </button>
          </form>
        </div>
      )}
      {navDropdown && (
        <div className="nav-dropdown">
          <div className="categories">
            <h1>CATEGORIES</h1>
            <h3>Space</h3>
            <h3>Biotechnology</h3>
            <h3>Robotics</h3>
            <h3>Culture</h3>
          </div>
          <div className="pages">
            <h1>ABOUT</h1>
            <h1>FAQ</h1>
            <h1>CONTACT</h1>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header;