import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();
  const [store, setStore] = useState('');
  const logOut = () => {
    localStorage.removeItem('token');
    setStore(localStorage);
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
    <div>
      <h1>Header</h1>
      <button onClick={() => navigate('/posts/new')}>New post</button>
      <button onClick={logOut}>Log out</button>
    </div>
  )
}

export default Header;