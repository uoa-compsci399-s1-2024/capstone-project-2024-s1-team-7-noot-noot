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
  fetchChildrenCount: () => void;
}

const TOKEN_KEY = 'token';
const USERNAME = 'username';
const EMAIL = 'email';

export const API_URL = 'https://sightsaver-api.azurewebsites.net/api';
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

  //Check if token is stored
useEffect(() => {
  const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      //If token is stored, login the user and set authenticated to true
      if (token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log("Stored: ", token);

        setAuthState({
          token,
          authenticated: true
        });
      }
  }
  loadToken();
}, []);

  //Register User
  const register = async (email: string, password: string, username: string) => {
    console.log("register", email, password, username);
    try{ 
      const result = await axios.post(`${API_URL}/auth/register`, {
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
      await SecureStore.setItemAsync(USERNAME, username);
      await SecureStore.setItemAsync(EMAIL, email);
      return result;
    } catch (error:any){
      console.log(error);
    }
  }

  //Login User
  const login = async (email: string, password: string) => {
    console.log("login", email, password);
    try{ 
      const result = await axios.post(`${API_URL}/auth/authenticate`, {
        "email": email, 
        "password": password
      });

      setAuthState({
        token: result.data.token,
        authenticated: true
      })
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      await SecureStore.setItemAsync(EMAIL, email);
      return result;
      
    } catch (error:any) {
      console.log("error in loading:",error);
      }
    }
  
  //Logout User
  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USERNAME);
    await SecureStore.deleteItemAsync(EMAIL);
    axios.defaults.headers.common['Authorization'] = '';
    setAuthState({
      token: null,
      authenticated: false
    });
  }
  
  //Fetch Children Count
  const fetchChildrenCount = async () => {
    try {
      const response = await axios.get(`${API_URL}/child/numberOfChildren`);
      console.log('fetch children',response.data); // You can handle the response data here
      return response.data;
    } catch (error) {
      console.error('Error fetching children count:', error);
    }
  };
  
  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    fetchChildrenCount,
    authState
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Get User Details
export const getUserDetails = async () => {
  try {
    console.log("running")
    let email = await SecureStore.getItemAsync(EMAIL);
    let username = await SecureStore.getItemAsync(USERNAME);

    if (!email || !username) {
      // If email or username is not present, fetch them from the API
      email = await SecureStore.getItemAsync(EMAIL);
      username = await axios.get(`${API_URL}/user/email/${email}`).then((res) => res.data);
    }

    return { username, email };
  } catch (error) {
    console.error('Error retrieving user details:', error);
    return null;
  }
};

//Set username and email in async storage
export const setUserDetails = async (username: string, email: string) => {
  try {
    await SecureStore.setItemAsync(USERNAME, username);
    await SecureStore.setItemAsync(EMAIL, email);
  } catch (error) {
    console.error('Error setting user details:', error);
  }
}

//Change User Details

//WIP NEED TO SEPERATE PASSWORD AND USERNAME
export const changeUserDetails = async (newUsername: string, currentPassword: string, newPassword: string) => {
  try {
    const email = await SecureStore.getItemAsync(EMAIL);
    const result = await axios.post(`${API_URL}/user/change`, {
      "email": email,
      "currentPassword": currentPassword,
      "newPassword": newPassword,
      "newUsername": newUsername
    });
    await SecureStore.setItemAsync(USERNAME, newUsername);
    return result;
  } catch (error) {
    console.error('Error changing user details:', error);
    return null;
  }
}

export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    console.log(token);
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
}