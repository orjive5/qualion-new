import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import './Home.css';

const Home = () => {
  const [foundData, setFoundData] = useState([]);
  const navigate = useNavigate();

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
  }, []);

  return (
    <div className="home">
      <Header setFoundData={setFoundData} />
      <Main foundData={foundData} />
      <Footer />
    </div>
  );
};

export default Home;
