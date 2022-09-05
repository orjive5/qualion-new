import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('https://qualion-blog.herokuapp.com/protected', {
        headers: {
          Authorization: token
        }
      })
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        navigate('/login');
      });
  }, []);

  const submit = () => {
    axios
      .post('https://qualion-blog.herokuapp.com/auth/login', { email, password })
      .then((user) => {
        localStorage.setItem('token', user.data.token);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login">
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={submit}>Sign In</button>
    </div>
  );
};

export default Login;
