import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const router = useRouter();


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



  const [cartItems, setCartItems] = useState([])
  const [userDetails, setUserDetails] = useState({})
  const [userDetails2, setUserDetails2] = useState({})

  const getCartData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('cartItems');
        const parsedData = jsonValue != null ? JSON.parse(jsonValue) : [];
        return setCartItems(parsedData);
      } catch (e) {
        console.log(e)
      }
  };

  


  const getUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('data');
        const newJsonValue = (jsonValue != null ? JSON.parse(jsonValue) : null)
        return setUserDetails(newJsonValue.data);
      } catch (e) {
        console.log(e)
      }
  };


  const getUserData2 = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const newJsonValue = (jsonValue != null ? JSON.parse(jsonValue) : null)
      return setUserDetails2(newJsonValue.data);
    } catch (e) {
      console.log(e)
    }
};



  const logout = () => {
    setUserToken(null);
    AsyncStorage.removeItem('token');
    setIsAuthenticated(false);
    router.replace('/login');
  };

  const deleteAll = async () => {
    const updatedCartItems = []; // Clear all items
    setCartItems(updatedCartItems);
    await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  }


  // useEffect(()=>{
  //   deleteAll()
  // },[])

  const deleteItemFromCart = async (itemIndex) => {
    try {
        const updatedCartItems = [...cartItems];          
        updatedCartItems.splice(itemIndex, 1);
        setCartItems(updatedCartItems);
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } catch (e) { 
        console.log(e);
    }
  };  



  return (
    <AuthContext.Provider value={{ 
        userToken, isAuthenticated, 
        logout, getData, getCartData, 
        cartItems, setCartItems, userDetails2,getUserData2,
        deleteItemFromCart, getUserData, userDetails, deleteAll
    }}>
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