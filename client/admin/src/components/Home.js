import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

const Home = () => {
    const navigate = useNavigate();
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
    }, [])

  return (
    <div className="home">
          <Header />
          <Main />
          <Footer />
    </div>
  )
}

export default Home;