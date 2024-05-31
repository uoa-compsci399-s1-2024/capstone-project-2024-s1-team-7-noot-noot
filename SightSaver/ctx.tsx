import { createContext, useContext, useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export interface AuthProps {
  authState: {
    token: string | null;
    authenticated: boolean | null;
  };
  onRegister: (
    email: string,
    password: string,
    username: string,
    parent: boolean
  ) => Promise<void>;
  onLogin: (username: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
}

const TOKEN_KEY = 'token';
const USERNAME = 'username';
const EMAIL = 'email';
const CHILDREN_INFO = 'childrenInfo';
const DAILY_GOAL = 'dailyGoal';
const SENSOR_ID = 'sensorId';

export const API_URL = 'https://sightsaver-api.azurewebsites.net/api';
//export const API_URL = 'http://192.168.1.74:8080/api';
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

  //Check if token is stored
  useEffect(() => {
    SecureStore.setItemAsync(DAILY_GOAL, '2');
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({
          token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  //Register User
  const register = async (email: string, password: string, username: string) => {
    const result = await axios.post(`${API_URL}/auth/register`, {
      username: username,
      email: email,
      password: password,
      parent: true,
    });
    setAuthState({
      token: result.data.token,
      authenticated: true,
    });
    axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

    await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
    await SecureStore.setItemAsync(USERNAME, username);
    await SecureStore.setItemAsync(EMAIL, email);
    await SecureStore.setItemAsync(DAILY_GOAL, '2');
  };

  //Login User
  const login = async (email: string, password: string) => {
    const result = await axios.post(`${API_URL}/auth/authenticate`, {
      email: email,
      password: password,
    });

    setAuthState({
      token: result.data.token,
      authenticated: true,
    });
    axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

    await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
    await SecureStore.setItemAsync(EMAIL, email);
    await SecureStore.setItemAsync(DAILY_GOAL, '2');
  };

  //Logout User
  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USERNAME);
    await SecureStore.deleteItemAsync(EMAIL);
    await SecureStore.deleteItemAsync(CHILDREN_INFO);
    await SecureStore.deleteItemAsync(DAILY_GOAL);
    await SecureStore.deleteItemAsync(SENSOR_ID);
    axios.defaults.headers.common['Authorization'] = '';
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Get User Details
export const getUserDetails = async () => {
  try {
    // console.log('getting user details');
    let email = await SecureStore.getItemAsync(EMAIL);
    let username = await SecureStore.getItemAsync(USERNAME);

    if (!email || !username) {
      // If email or username is not present, fetch them from the API
      email = await SecureStore.getItemAsync(EMAIL);
      username = await axios
        .get(`${API_URL}/user/email/${email}`)
        .then((res) => res.data);
    }
    // console.log('Get User details:', { username, email });
    return { username, email };
  } catch (error) {
    //console.error('Error retrieving user details:', error);
    return null;
  }
};

//Set username and email in async storage
export const setUserDetails = async (username: string, email: string) => {
  try {
    await SecureStore.setItemAsync(USERNAME, username);
    await SecureStore.setItemAsync(EMAIL, email);
  } catch (error) {
    // console.error('Error setting user details:', error);
  }
};

//Get Token
export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    // console.log(token);
    return token;
  } catch (error) {
    // console.error('Error retrieving token:', error);
    return null;
  }
};

export const getChildrenInfo = async () => {
  type ChildJson = {childName: string; sensorId: string};
  let childrenInfo: ChildJson[] = [];
  const storedChildrenInfo = await SecureStore.getItemAsync(CHILDREN_INFO);

  if (!storedChildrenInfo) {
    const email = await SecureStore.getItemAsync(EMAIL);
    const response = await axios.get(`${API_URL}/child/getChildren/${email}`);
    const childrenData = response.data as {
      id: number;
      sensor_id: string;
      name: string;
      parent: number;
    }[];
    childrenData.forEach(child => {
      childrenInfo.push({ childName: child.name, sensorId: child.sensor_id });
    });

    await SecureStore.setItemAsync(CHILDREN_INFO, JSON.stringify(childrenInfo));
  }
};

export const newChildAdded = async (childName: string, sensorId: string) => {
  const email = await SecureStore.getItemAsync('email');
  try {
    await axios.post(`${API_URL}/child/addChild`, {
      email: email,
      name: childName,
      sensor_id: sensorId,
    });
   } catch(error) {
    //console.log('Failed to add child:', error);
  } finally {
      type ChildJson = {childName: string; sensorId: string};
      let childrenInfo: ChildJson[] = [];
      const storedChildrenInfo = await SecureStore.getItemAsync(CHILDREN_INFO);

      if (storedChildrenInfo) {
        childrenInfo = JSON.parse(storedChildrenInfo);
        childrenInfo.push({ childName: childName, sensorId: sensorId });
      } else {
          childrenInfo.push({ childName: childName, sensorId: sensorId });
      }
      await SecureStore.setItemAsync(CHILDREN_INFO, JSON.stringify(childrenInfo));
  }
};

export const pushData = async (data: Array<JSON>) => {
  const email = await SecureStore.getItemAsync(EMAIL);
  console.log(data);
  try {
    await axios.post(`${API_URL}/lux`, {
      email: email,
      data: data,
    });
  } catch (error) {
    console.log('Failed to push data:', error);
    return false;
  } finally {
    console.log('Data pushed');
    return true;
  }
}