import {createContext, useContext, useEffect, useState} from 'react';
import React from 'react';
import axios, { AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';

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
    username: string, 
    password: string
  ) => void;
  onLogout: () => void;
}

const TOKEN_KEY = 'token';
export const API_URL = 'https://sightsaver-api.azurewebsites.net/api/auth';
const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null; 
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

useEffect(() => {
  const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("Stored: ", token);

      if (token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setAuthState({
          token,
          authenticated: true
        });
      }
  }
  loadToken();
}, []);

  const register = async (email: string, password: string, username: string) => {
    console.log("register", email, password, username);
    try{ 
      const result = await axios.post(`${API_URL}/register`, {
        "username": username,
        "email": email, 
        "password": password,
        "parent": true
      });
      setAuthState({
        token: result.data.token,
        authenticated: true
      })
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      return result;
    } catch (error:any){
      console.log(error);
    }
  }

  const login = async (email: string, password: string) => {
    console.log("login", email, password);
    try{ 
      const result = await axios.post(`${API_URL}/authenticate`, {
        "email": email, 
        "password": password
      });

      setAuthState({
        token: result.data.token,
        authenticated: true
      })
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      return result;

    } catch (error:any) {
      console.log(error);
      }
    }

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common['Authorization'] = '';
    setAuthState({
      token: null,
      authenticated: false
    });
  }

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

//Export Token
export const getTokenKey = async () => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};
