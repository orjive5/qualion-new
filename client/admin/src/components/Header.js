import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Header.css'
import qualionBanner from '../assets/qualion-banner.jpg';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';

const Header = ({setFoundData}) => {
  const [searchBar, setSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const ref = useRef(null);
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(location.pathname);
  const navigate = useNavigate();
  const [store, setStore] = useState('');
  const [allData, setAllData] = useState([]);

  const getAllData = () => {
    axios
      .get('http://localhost:8000/posts')
      .then((res) => {
        const publishedPosts = res.data.filter(element => element.isPublished === true).reverse();
        setAllData(publishedPosts);
      })
      .catch((err) => console.log(err, 'Arrgh, it\'s an error...'))
  }

  const searchResults = () => {
    let foundArray = []
    allData.filter(data => {
      if (data.title.toLowerCase().includes(searchValue.toLowerCase())) {
        foundArray.push(data);
        setFoundData(foundArray);
      }
    })
  }

  const clearSearch = () => {
    setSearchValue('');
    setFoundData([]);
    setSearchBar(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  const logOut = () => {
    localStorage.removeItem('token');
    setStore(localStorage);
  }

  const scrollToTop = () => {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
     });
  }

  const handleQualion = () => {
    if (currentLocation === '/') {
      clearSearch();
      scrollToTop();
    } else {
      navigate('/')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/protected', {
        headers: {
        Authorization: token,
        }
    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
        navigate('/login')
    })
  }, [store])
  
  const toggleSearchBar = () => {
    clearSearch();
    setSearchBar(!searchBar)
  }

  useEffect(() => {
    searchBar && ref.current.focus();
  }, [searchBar])
  
  useEffect(() => {
    searchResults();
  }, [searchValue])

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <nav className="navbar">
      <img onClick={handleQualion} src={qualionBanner} alt='qualion' className="qualion-banner" />
      {currentLocation !== '/' && (
        <button onClick={() => navigate('/')}>
          Home
        </button>
      )}
      {currentLocation !== '/posts/new' && (
        <button onClick={() => navigate('/posts/new')}>
          New post
        </button>
      )}
      <button
        onClick={() => window.open('http://localhost:3000/', '_blank', 'noopener,noreferrer')}
      >
        View website
      </button>
      <button onClick={logOut}>Log out</button>
      {currentLocation === '/' && (<div className="search-bar">
        {searchBar && (
          <input
            ref={ref}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-input"
            type='text'
          />
        )}
        <Icon
          path={mdiMagnify}
          title="Search"
          className="search-icon"
          size='1.5rem'
          color='white'
          onClick={toggleSearchBar}
        />
        </div>)}
    </nav>
  )
}

export default Header;