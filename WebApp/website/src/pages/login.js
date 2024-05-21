import React, { useState } from 'react';
import logo from '../logo.png';
import './styles/login.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const EMAIL = 'email';
export const API_URL = 'https://cors-anywhere.herokuapp.com/https://sightsaver-api.azurewebsites.net/api';

const onLogin = async (email, password) => {
  console.log("login", email, password);
  try { 
    const result = await axios.post(`${API_URL}/auth/authenticate`, {
      email, 
      password
    });

    axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

    localStorage.setItem(EMAIL, email);

    return result;
  } catch (error) {
    console.log(error);
  }
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    // Validate all fields filled 
    if (!email || !password) {
      alert("Please fill in all fields. If you don't have an account, please sign up.");
      return;
    }

    const result = await onLogin(email, password);

    if (result) {
      console.log("Login Success");
      history.push('/home');

    } else {
      alert('Login failed');
    }
  }

  return (
    <div className="Login">
      <div className="Login-header">
        <img src={logo} className="Login-logo" alt="logo" />
        <div className="Login-div">
          <form onSubmit={login} className="Login-div">
            <input 
              type="text" 
              className='input' 
              placeholder='Email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              className='input' 
              placeholder='Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className='forgot-pw'>
              Forgot Password?
            </p>
            <button type="submit" className='button'>
              <p className='button-text'>
                Login
              </p>
            </button>
          </form>
        </div>
        <div className='sign-up-text'>
          <p className='text'>
            Don't have an account?
          </p>
          <Link to="/register">
            <p className='register'>
              Register
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
