import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8000/protected', {
            headers: {
            Authorization: token,
            }
        }).then(res => {
            console.log(res);
            navigate('/')
        }).catch(err => {
            console.log(err)
            navigate('/login')
        })
    }, [])

    const submit = () => {
        console.log(email, password)
        axios
            .post('http://localhost:8000/auth/login', { email, password })
            .then(user => {
                console.log(user)
                localStorage.setItem('token', user.data.token);
                navigate('/')
            }).catch(err => {
                console.log(err)
            })
    }
  return (
    <div className="login">
      <input type='email' placeholder="Enter email" value={email} onChange={event => setEmail(event.target.value)}></input>
      <input type='password' placeholder="Enter password" value={password} onChange={event => setPassword(event.target.value)}></input>
      <button onClick={submit}>Submit</button>
    </div>
  )
}

export default Login;