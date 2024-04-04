import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import Colors from '@/constants/Colors';
import { Link } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '@/context/AuthContext';
import { BASE_URL } from '@/Enpoints/Endpoint';
import { useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import BackHeader from '@/components/BackHeader';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '@/components/Loader';
import Checkbox from 'expo-checkbox';


const resturantPage = () => {

    const route = useRoute<any>();
    const { shopId } : any = route.params;



    const [singleShopData, setSingleShopData] = useState<any>({})
    const [cuisines, setCuisines] = useState<any>([])


    const [isLoading, setIsLoading] = useState(false)


    const [userToken, setUserToken] = useState(null);
    const getData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setUserToken(JSON.parse(storedToken));
        } 
      } catch (e) {
        console.error('Error retrieving authentication data:', e);
      }
    };
  
    useEffect(() => {
      getData();
    }, []);




  const fetchData = async () => {
    
    setIsLoading(true)
    try {
      const res = await fetch(`${BASE_URL}singleShop/${shopId}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      const myData = await res.json();

      // console.log(myData)
      setIsLoading(false);

      setSingleShopData(myData.data);
      setCuisines(myData.data.cuisines)


    } catch (error) {
      setIsLoading(false);
      console.log('There was an error fetching token');
    }
  };

  useEffect(() => {
    fetchData();
  }, [userToken]);


  const navigate = useNavigation<any>()

  const handleProductPress = (cuisines : any) => {
    navigate.navigate('authRoute/order_page', { cuisines })
  };


  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [cartItems, setCartItems] = useState<any>([]);

  const toggleItem = (itemId:any) => {
    const index : any = selectedItems.indexOf(itemId);
    if (index === -1) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((item:any) => item !== itemId));
    }
  };



  const addToCart = () => {
    const selectedItemsToAdd = cuisines.filter((item :any) => selectedItems.includes(item._id));
    const updatedCartItems = [...cartItems, ...selectedItemsToAdd];
    setCartItems(updatedCartItems);
    setSelectedItems([]);
    saveCartToAsyncStorage(updatedCartItems);
  };



  const saveCartToAsyncStorage = async (cartItems:any) => {
    try {
      const serializedCartItems = JSON.stringify(cartItems);
      await AsyncStorage.setItem('cartItems', serializedCartItems);
    } catch (error) {
      console.error('Error saving cart items to AsyncStorage:', error);
    }
  };


const [asynData, setAsynData] = useState<any>([])
  const loadCartFromAsyncStorage = async () => {
    try {
      const serializedCartItems = await AsyncStorage.getItem('cartItems');
      if (serializedCartItems !== null) {
        return setAsynData(JSON.parse(serializedCartItems));
      }
      return [];
    } catch (error) {
      console.error('Error loading cart items from AsyncStorage:', error);
      return [];
    }
  };



  useEffect(() => {
    loadCartFromAsyncStorage()
  }, []);




  const deleteAll = () => {
    AsyncStorage.removeItem('cartItems');
  };


  console.log(asynData)

 

  return (
    <View style={styles.container}>

        <BackHeader />
        <StatusBar style='dark'/>

        {isLoading || singleShopData === null || singleShopData === undefined   ? 
          <Loader />
          :
          <View>
          <View style={{display : 'flex', flexDirection : 'row', paddingBottom : 10}}>
              <Text style={{ fontFamily : 'Railway2', fontSize : 17, }}>{singleShopData.shopName}</Text>
              <Text style={{marginLeft : 'auto', fontFamily : 'Railway1'}}>Open till 06:300 pm</Text>
          </View>
          <Image source={require('../../assets/images/rest1.png')}
              resizeMode='cover'
              style={{width : '100%', height : 100,
              borderRadius : 5
          }}
          />


          <View style={{display :'flex', 
              flexDirection : 'row', 
              justifyContent : 'space-between', 
              width : '100%',
              paddingTop : 10,
              borderBottomColor : Colors.myGray,
              borderBottomWidth : 1,
              paddingBottom : 10,
          }}>
              <View style={{borderRightColor : Colors.myGray, borderRightWidth : 1, paddingRight : 20}}>
                  <Text style={{fontFamily : 'Railway1', fontSize : 12, color : 'gray'}}>Preparation Time</Text>
                  <Text style={{fontFamily : 'Railway3', }}>5-20 minutes</Text>
              </View>

              <View style={{borderRightColor : Colors.myGray, borderRightWidth : 1, paddingRight : 20}}>
                  <Text style={{fontFamily : 'Railway1', fontSize : 12, color : 'gray'}}>Delivery Type</Text>
                  <Text style={{fontFamily : 'Railway3', }}>Instant Delivery</Text>
              </View>

              <View style={{}}>
                  <Text style={{fontFamily : 'Railway1', fontSize : 12, color : 'gray'}}>Rating</Text>
                  <Text style={{fontFamily : 'Railway3', }}>5.0 (123)</Text>
              </View>
          </View>

          <View style={{display : 'flex', flexDirection :'row', paddingVertical : 20, gap : 10}}>

              <TouchableOpacity style={styles.btnStyle}>
                  <Text style={styles.btnText}>All</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.btnStyle1}>
                  <Text style={styles.btnText1}>What’s New</Text>
              </TouchableOpacity>


            <TouchableOpacity  style={styles.btnStyle} onPress={deleteAll}>
                <Text style={{fontSize : 15, fontFamily : 'Railway2', color : 'white'}}>deleteAll</Text>
            </TouchableOpacity>

          </View>


          

          <ScrollView style={{paddingVertical : 10, height : '60%',}} showsVerticalScrollIndicator ={false}>

                {cuisines === undefined || cuisines === null ? <ActivityIndicator size={'large'}/> : (
                  <View >
                  {cuisines.map((eachCuisines:any, index:any)=>(

                      <TouchableOpacity key={index}  onPress={()=>toggleItem(eachCuisines._id)} style={{
                        display : 'flex', flexDirection : 'row', 
                        alignItems : 'center', marginBottom : 20, 
                        paddingBottom : 20, borderBottomColor : Colors.myGray,
                        borderBottomWidth : 1,
                      }}>
                        <View style={{display : 'flex', 
                            flexDirection : 'row', gap : 10, 
                            justifyContent : 'center', 
                            alignItems : 'center', 
                        }}>

                            <Image source={require('../../assets/images/imgFood4.png')}
                            style={{width : 70, height : 70, borderRadius : 5}}
                            />

                            <View style={{width : '75%'}}>
                            <View style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
                                <Text style={{fontFamily : 'Railway2', fontSize : 15}}>{eachCuisines.name}</Text>
                            </View>

                            <Text style={{fontFamily : 'Railway1', 
                                fontSize : 12, color : 'gray', paddingVertical : 5,
                                textAlign : 'justify'
                            }}>
                                {eachCuisines.description}
                            </Text>
                            <Text style={{ color : Colors.btnGreen}}>From N{eachCuisines.price.toLocaleString()}</Text>
                            </View>

                        </View>

                        <Checkbox 
                          style={styles.checkbox} 
                          value={selectedItems.includes(eachCuisines._id)}
                          onValueChange={() => toggleItem(eachCuisines._id)}
                        />
                      </TouchableOpacity>
                  ))}
                  </View>
                )}




          </ScrollView>


          </View>
        }

        <TouchableOpacity style={selectedItems.length === 0 ? styles.btnStylesOdd : styles.btnStyles} disabled={selectedItems.length === 0} onPress={addToCart}>
            <Text style={{fontSize : 15, fontFamily : 'Railway2', color : 'white'}}>{isLoading ? (<ActivityIndicator color={'white'}/>) : 'Add to cart'}</Text>
        </TouchableOpacity>

    </View>
  )
}

export default resturantPage

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        flex : 1,
        paddingHorizontal : 20,
    },


    inputStyles : {
        padding : 10,
        borderColor : Colors.myGray,
        borderWidth : 1,
        borderRadius : 5,
        fontSize : 15,
        position : 'relative',
        paddingLeft : 40
    },
  
    btnStyle :{
      backgroundColor : Colors.btnGreen,
      display : 'flex',
      flexDirection : 'row',
      width : '20%',
      alignItems : 'center',
      padding : 10,
      alignSelf : 'center',
      justifyContent : 'center',
      borderRadius : 50,
      gap : 5,
    },
  
    btnText : {
      fontFamily : 'Railway2', color : 'white', fontSize : 13
    },
  
  
    btnText1 : {
      fontFamily : 'Railway2', color : Colors.btnGreen, fontSize : 13
    },
  
  
    btnStyle1 :{
      backgroundColor : 'white',
      display : 'flex',
      flexDirection : 'row',
      width : '40%',
      alignItems : 'center',
      borderColor : Colors.btnGreen,
      borderWidth : 1,
      padding : 10,
      textAlign : 'center',
      justifyContent : 'center',
      borderRadius : 50,
      gap : 5
    },


    checkbox: {
      marginLeft : 'auto',
      borderRadius : 100
    },

    btnStyles :{
      height : 40,
      backgroundColor : Colors.myRed,
      flexDirection : 'row',
      alignItems : 'center',
      paddingHorizontal : 20,
      justifyContent : 'center',
      fontSize : 13,
      borderRadius : 5,  
      marginHorizontal : 20,
      position : 'absolute',
      bottom : 30,
      left : 0,
      right : 0,
  },


  btnStylesOdd :{
    height : 40,
    backgroundColor : 'pink',
    flexDirection : 'row',
    alignItems : 'center',
    paddingHorizontal : 20,
    justifyContent : 'center',
    fontSize : 13,
    borderRadius : 5,  
    marginHorizontal : 20,
    position : 'absolute',
    bottom : 30,
    left : 0,
    right : 0,
},
})