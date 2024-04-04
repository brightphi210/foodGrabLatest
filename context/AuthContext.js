import React, { createContext, useState, useEffect, useContext } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);




  const getData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setUserToken(JSON.parse(storedToken));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      console.error('Error retrieving authentication data:', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  

  const logout = () => {
    setUserToken(null);
    AsyncStorage.removeItem('token');
    setIsAuthenticated(false);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ userToken, isAuthenticated, logout, getData }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const value = useContext(AuthContext)

  if(!value) {
    throw new Error('useAuth must be wrapped inside AuthContext')
  }

  return value
}