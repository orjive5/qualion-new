import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import qualionBanner from '../assets/qualion-banner.jpg';
import Icon from '@mdi/react';
import { mdiMagnify, mdiMenu } from '@mdi/js';

const Header = ({ setFoundData }) => {
  const [searchBar, setSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const ref = useRef(null);
  const location = useLocation();
  const [currentLocation] = useState(location.pathname);
  const navigate = useNavigate();
  const [store, setStore] = useState('');
  const [allData, setAllData] = useState([]);
  const [navDropdown, setNavDropdown] = useState(false);

  const getAllData = () => {
    axios
      .get('https://qualion-blog.herokuapp.com/posts')
      .then((res) => {
        const publishedPosts = res.data.filter((element) => element.isPublished === true).reverse();
        setAllData(publishedPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchResults = () => {
    let foundArray = [];
    allData.filter((data) => {
      if (data.title.toLowerCase().includes(searchValue.toLowerCase())) {
        foundArray.push(data);
        setFoundData(foundArray);
      }
    });
  };

  const clearSearch = () => {
    setSearchValue('');
    setFoundData([]);
    setSearchBar(false);
    scrollToTop();
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setStore(localStorage);
  };

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const toggleNavDropdown = () => {
    setNavDropdown(!navDropdown);
    setSearchBar(false);
  };

  const handleQualion = () => {
    if (currentLocation === '/') {
      clearSearch();
      setNavDropdown(false);
      scrollToTop();
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('https://qualion-blog.herokuapp.com/protected', {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        navigate('/login');
      });
  }, [store]);

  const toggleSearchBar = () => {
    clearSearch();
    setSearchBar(!searchBar);
    setNavDropdown(false);
  };

  const viewWebsite = () => {
    window.open('https://marvelous-squirrel-227f4a.netlify.app/', '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    searchBar && ref.current.focus();
  }, [searchBar]);

  useEffect(() => {
    searchResults();
  }, [searchValue]);

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <nav className="navbar">
      <img
        onClick={handleQualion}
        src={qualionBanner}
        alt="Qualion banner"
        className="qualion-banner"
      />
      <Icon
        path={mdiMenu}
        title="Navigation menu"
        className="hamburger-menu"
        size="1.5rem"
        color="white"
        onClick={toggleNavDropdown}
      />
      {currentLocation !== '/' && <button onClick={() => navigate('/')}>Home</button>}
      {currentLocation !== '/posts/new' && (
        <button onClick={() => navigate('/posts/new')}>New post</button>
      )}
      <button onClick={viewWebsite}>View website</button>
      <button onClick={logOut}>Log out</button>
      {currentLocation === '/' && (
        <div className="search-bar">
          {searchBar && (
            <input
              ref={ref}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="search-input"
              type="text"
            />
          )}
          <Icon
            path={mdiMagnify}
            title="Search icon"
            className="search-icon"
            size="1.5rem"
            color="white"
            onClick={toggleSearchBar}
          />
        </div>
      )}
      {navDropdown && (
        <div className="nav-dropdown-simple">
          <div className="menu-pages">
            {currentLocation !== '/' && <h1 onClick={() => navigate('/')}>HOME</h1>}
            {currentLocation !== '/posts/new' && (
              <h1 onClick={() => navigate('/posts/new')}>NEW POST</h1>
            )}
            <h1 onClick={viewWebsite}>VIEW WEBSITE</h1>
            <h1 onClick={logOut}>LOG OUT</h1>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
