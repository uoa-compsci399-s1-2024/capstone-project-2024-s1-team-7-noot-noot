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
  ) => void;
  onLogin: (username: string, password: string) => void;
  onLogout: () => void;
}

const TOKEN_KEY = 'token';
const USERNAME = 'username';
const EMAIL = 'email';
const CHILDREN_INFO = 'childrenInfo';

export const API_URL = 'https://sightsaver-api.azurewebsites.net/api';
const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};


export const setupAxiosInterceptors = (onLogout: () => void) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 403) {
        alert('Sorry, the session has expired. Please login again.');
        onLogout(); // Logout user on 403 error
        // // console.log('Axios 403 error intercepted.');
      }
      return Promise.reject(error);
    }
  );
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
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      //If token is stored, login the user and set authenticated to true
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // // console.log('Stored: ', token);

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
    // // console.log('register', email, password, username);
    try {
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
      return result;
    } catch (error: any) {
      // // console.log(error);
    }
  };

  //Login User
  const login = async (email: string, password: string) => {
    // // console.log('login', email, password);
    try {
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
      return result;
    } catch (error: any) {
      // // console.log('error in loading:', error);
    }
  };

  //Logout User
  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USERNAME);
    await SecureStore.deleteItemAsync(EMAIL);
    await SecureStore.deleteItemAsync(CHILDREN_INFO);
    axios.defaults.headers.common['Authorization'] = '';
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  useEffect(() => {
    setupAxiosInterceptors(logout);
  }, []);
  

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
    // // console.log('getting user details');
    let email = await SecureStore.getItemAsync(EMAIL);
    let username = await SecureStore.getItemAsync(USERNAME);

    if (!email || !username) {
      // If email or username is not present, fetch them from the API
      email = await SecureStore.getItemAsync(EMAIL);
      username = await axios
        .get(`${API_URL}/user/email/${email}`)
        .then((res) => res.data);
    }
    // // console.log('Get User details:', { username, email });
    return { username, email };
  } catch (error) {
    // console.error('Error retrieving user details:', error);
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
    // // console.log(token);
    return token;
  } catch (error) {
    // console.error('Error retrieving token:', error);
    return null;
  }
};

// Fetch Children Count
// export const fetchChildrenCount = async () => {
//   const email = await SecureStore.getItemAsync(EMAIL);
//   try {
//     // // console.log('Fetching children count...');
//     // Make POST request to fetch children data, with email in the request body
//     const response = await axios.get(`${API_URL}/user/getAllLux/${email}`);

//     // Extract data from the API response
//     const childrenData = response.data as {
//       [key: string]: {
//         id: number;
//         lux_value: number;
//         date_time: string;
//         sensorId: number;
//       }[];
//     };

//     // Count the number of children
//     const numberOfChildren = Object.keys(childrenData).length;

//     // Prepare an array to hold child objects containing name and sensorId
//     const childrenInfo: {childName: string; sensorId: number | null}[] = [];

//     // Loop through each child's data to extract name and sensorId
//     for (const [childName, childData] of Object.entries(childrenData)) {
//       // Extracting the sensorId for each child, even if lux values are not present
//       const sensorId = childData.length > 0 ? childData[0].sensorId : null;

//       // Pushing child's name and sensorId to the array
//       childrenInfo.push({ childName, sensorId });
//     }

//     // // console.log('Number of children:', numberOfChildren);
//     // // console.log('Children info:', childrenInfo);

//     return { numberOfChildren, childrenInfo };
//   } catch (error) {
//     // console.error('Error fetching children count:', error);
//     return { numberOfChildren: 0, childrenInfo: [] };
//   }
// };
export const getChildrenInfo = async () => {
  try {
    let childrenInfo: { numberOfChildren: number; childrenInfo: { childName: string; sensorId: number | null }[] } = { numberOfChildren: 0, childrenInfo: [] };
    // // console.log('Fetching children count...');

    // Check if there is data stored in SecureStore
    const storedChildrenInfo = await SecureStore.getItemAsync(CHILDREN_INFO);

    if (storedChildrenInfo) {
      // If there is stored data, parse it and return it
      childrenInfo = JSON.parse(storedChildrenInfo);
      // // console.log('Using stored children info:', childrenInfo);
      } else {
        // // console.log('No stored children info found.');
          // If there is no stored data, fetch data from the API
          const email = await SecureStore.getItemAsync(EMAIL);
          const response = await axios.get(`${API_URL}/child/getChildren/${email}`);
          // const response = {
          //   data:
          //     [
          //       {
          //           "id": 18,
          //           "sensor_id": 6,
          //           "name": "jedd",
          //           "parent": 3
          //       },
          //       {
          //           "id": 23,
          //           "sensor_id": 1,
          //           "name": "test",
          //           "parent": 3
          //       },
          //       {
          //           "id": 24,
          //           "sensor_id": 5,
          //           "name": "test",
          //           "parent": 3
          //       }
          //   ]
          // }
          const childrenData = response.data as {
            id: number;
            sensor_id: string;
            name: string;
            parent: number;
          }[];
          // Count the number of children
          const numberOfChildren = childrenData.length;
          // Prepare an array to hold child objects containing name and sensorId
          const childrenInfo: {childName: string; sensorId: string | null}[] = [];
          // Loop through each child's data to extract name and sensorId
          childrenData.forEach(child => {
            // Pushing child's name and sensorId to the array
            childrenInfo.push({ childName: child.name, sensorId: child.sensor_id });
          });
          // children = { numberOfChildren, childrenInfo };
          // // console.log('Fetched children info from API:', childrenInfo);

          // Serialize and store the fetched data in SecureStore
          await SecureStore.setItemAsync(CHILDREN_INFO, JSON.stringify(childrenInfo));
          return  childrenInfo ;
    }

    return childrenInfo ;
    
  } catch (error) {
    // console.error('Error fetching children count:', error);
    return { numberOfChildren: 0, childrenInfo: [] };
  }
};

export const newChildAdded = async (childName: string) => {
  try {
    const email = await SecureStore.getItemAsync(EMAIL);
    const response = await axios.post(`${API_URL}/child/addChild`, {
      name: childName,
      parent: email,
    });
    // // console.log('Added new child:', response.data);
    return response.data;
  } catch (error) {
    // console.error('Error adding new child:', error);
    return null;
  }
}