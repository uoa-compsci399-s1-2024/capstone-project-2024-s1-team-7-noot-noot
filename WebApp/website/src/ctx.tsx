import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface AuthProps {
  authState: { 
    token: string | null; 
    authenticated: boolean | null;
  };
  onRegister: (
    email: string, 
    password: string, 
    username: string, 
    parent: boolean
  ) => void;
  onLogin: (
    email: string, 
    password: string
  ) => void;
  onLogout: () => void;
}

const TOKEN_KEY = 'token';
const USERNAME = 'username';
const EMAIL = 'email';
export const API_URL = 'https://sightsaver-api.azurewebsites.net/api';
const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null; 
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  // Check if token is stored
  useEffect(() => {
    const loadToken = () => {
      const token = localStorage.getItem(TOKEN_KEY);
      console.log("Stored: ", token);
      // If token is stored, login the user and set authenticated to true
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setAuthState({
          token,
          authenticated: true
        });
      }
    }
    loadToken();
  }, []);

  // Register User
  const register = async (email: string, password: string, username: string) => {
    console.log("register", email, password, username);
    try { 
      const result = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
        parent: true
      });
      setAuthState({
        token: result.data.token,
        authenticated: true
      });
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

      localStorage.setItem(TOKEN_KEY, result.data.token);
      localStorage.setItem(USERNAME, username);
      localStorage.setItem(EMAIL, email);
      return result;
    } catch (error: any) {
      console.log(error);
    }
  };

  // Login User
  const login = async (email: string, password: string) => {
    console.log("login", email, password);
    try { 
      const result = await axios.post(`${API_URL}/auth/authenticate`, {
        email, 
        password
      });

      setAuthState({
        token: result.data.token,
        authenticated: true
      });
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

      localStorage.setItem(TOKEN_KEY, result.data.token);
      localStorage.setItem(EMAIL, email);
      return result;
    } catch (error: any) {
      console.log(error);
    }
  };

  // Logout User
  const logout = async () => {
    localStorage.removeItem(TOKEN_KEY);
    axios.defaults.headers.common['Authorization'] = '';
    setAuthState({
      token: null,
      authenticated: false
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



