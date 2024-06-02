import React, { useState } from 'react';
import logo from '../logo.png';
import './styles/register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EMAIL = 'email';
const TOKEN_KEY = 'token';
export const API_URL = 'https://sightsaver-api.azurewebsites.net/api';

const onRegister = async (email, password, username) => {
  // console.log("register", email, password, username);
  try { 
    const result = await axios.post(`${API_URL}/auth/register`, {
      username,
      email,
      password,
      parent: false
    });
    
    // axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

    localStorage.setItem(EMAIL, email);
    localStorage.setItem(TOKEN_KEY, result.data.token);

    return result;
  } catch (error) {
    // console.log(error);
  }
};

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const register = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('Password does not meet constraints. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
        // console.log('Password does not meet constraints');
        return; 
    }
  
    if (password !== confirmPassword) {
        // console.log('Passwords do not match');
        return; 
    }
      
    const result = await onRegister(email, password, "");

    if (result) {
      alert("Registration Success");
    } else {
      alert('Registration failed');
    }
  }

  return (
    <div className="Register">
      <div className="Register-header">
        <img src={logo} className="Register-logo" alt="sightsaver-logo" />
        <div className="Register-div">
          <form onSubmit={register} className="Login-div">
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
            <input 
              type="password" 
              className='input' 
              placeholder='Confirm Password' 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className='Registers-button'>
              <p className='button-text'>
                Register
              </p>
            </button>
          </form>
        </div>
        <div className="Register-button">
          <div className='login-text'>
            <p className='text'>
              Already have an account?
            </p>
            <Link to="/login">
              <p className='login'>
                Login
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;