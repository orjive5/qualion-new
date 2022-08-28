import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Header.css'
import qualionBanner from '../assets/qualion-banner.jpg'

const Header = () => {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(location.pathname);
  const navigate = useNavigate();
  const [store, setStore] = useState('');
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
    currentLocation === '/' ? scrollToTop() : navigate('/')
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
      <button onClick={logOut}>Log out</button>
    </nav>
  )
}

export default Header;