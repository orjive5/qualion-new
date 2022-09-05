import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import qualionBanner from '../assets/qualion-banner.jpg';
import Icon from '@mdi/react';
import { mdiMenu, mdiMagnify } from '@mdi/js';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = ({ setFoundData, setActiveTag, setCurrentPage }) => {
  const [searchBar, setSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [navDropdown, setNavDropdown] = useState(false);
  const [allData, setAllData] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const ref = useRef(null);

  const toggleSearchBar = () => {
    setNavDropdown(false);
    setSearchBar(!searchBar);
  };

  const toggleNavDropdown = () => {
    setSearchBar(false);
    setNavDropdown(!navDropdown);
  };

  const getAllData = () => {
    axios
      .get('https://qualion-blog.herokuapp.com/posts')
      .then((res) => {
        const publishedPosts = res.data.filter((element) => element.isPublished).reverse();
        setAllData(publishedPosts);
        const getTags = publishedPosts.map((el) => el.tags).flat();
        setAllTags([...new Set(getTags)]);
      })
      .catch((err) => console.log(err));
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const selectCategory = (e) => {
    setCurrentPage(1);
    setActiveTag(e.target.textContent.toLowerCase());
    toggleNavDropdown();
  };

  const linkStyle = {
    color: 'inherit',
    textDecoration: 'inherit'
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
      <div className="main-nav">
        <Link to="/">
          <img
            onClick={clearSearch}
            src={qualionBanner}
            alt="Qualion banner"
            className="qualion-banner"
          />
        </Link>
        <Icon
          path={mdiMenu}
          title="Navigation menu"
          className="hamburger-menu"
          size="1.5rem"
          color="white"
          onClick={toggleNavDropdown}
        />
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
            title="Search"
            className="search-icon"
            size="1.5rem"
            color="white"
            onClick={toggleSearchBar}
          />
        </div>
      </div>
      {navDropdown && (
        <div className="nav-dropdown">
          <div className="menu-categories">
            <h1>CATEGORIES</h1>
            <h2 onClick={selectCategory}>Science</h2>
            <h2 onClick={selectCategory}>Culture</h2>
            <h2 onClick={selectCategory}>Space</h2>
            <h2 onClick={selectCategory}>Health</h2>
            <h2 onClick={selectCategory}>Climate</h2>
            <h2 onClick={selectCategory}>AI</h2>
          </div>
          <div className="menu-pages">
            <Link to="/about" style={linkStyle}>
              <h1>ABOUT</h1>
            </Link>
            <Link to="/faq" style={linkStyle}>
              <h1>FAQ</h1>
            </Link>
            <Link to="/contact" style={linkStyle}>
              <h1>CONTACT</h1>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
