import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Pressable, TextInput } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import Colors from '@/constants/Colors';
import { BASE_URL } from '@/Enpoints/Endpoint';
import { useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import BackHeader from '@/components/BackHeader';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '@/components/Loader';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import Animated, { SlideInDown, SlideOutDown, SlideInLeft, BounceIn, BounceInDown, BounceOutDown, FadeOut } from "react-native-reanimated";


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
  

  // =========================== ADDING MULTIPLE ITEMS TO CART ============================
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [cartItems, setCartItems] = useState<any>([]);


  // ============== SELECT AN ITEM =================
  const toggleItem = (itemId:any) => {
    const index  = selectedItems.indexOf(itemId);
    if (index === -1) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((item:any) => item !== itemId));
    }
  };


  const [message, setMessage] = useState<any>('')
  const [showModal2, setShowModal2] = useState<any>(false)


  // ============== ADD TO CART =====================
  const addToCart = async () => {
    let selectedItemsToAdd = cuisines.filter((item :any) => selectedItems.includes(item._id));
   
    let existingCartItems = [];
    try {
      const storedItems = await AsyncStorage.getItem('cartItems');
      if (storedItems) {
        existingCartItems = JSON.parse(storedItems);
      }

    } catch (error) {
      console.error('Error retrieving cart items from AsyncStorage:', error);
    }
    
    


    const updatedCartItems = [...existingCartItems, selectedItemsToAdd];
    
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error('Error saving cart items to AsyncStorage:', error);
    }
    setCartItems(updatedCartItems);
    setMessage( 'Items added to cart')
    setShowModal2(true);
    setSelectedItems([]);
  };


  // ===================== AM GETTING THE STORED DATA FROM ASYNSTORAGE ==========
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



  const router = useRouter()
  const navigation = useRouter()
  const handleBackPress = () => {
    navigation.replace('/(protected)/home'); 
  };



  return (
    <Animated.View style={styles.container}   
      entering={BounceInDown.duration(300).delay(300)}
      exiting={FadeOut.duration(50).delay(50)}
    >
          <Pressable onPress={handleBackPress} style={{paddingVertical: 20}}>
            <Ionicons name='arrow-back' size={25} />
          </Pressable>
        <StatusBar style='dark'/>

        {isLoading || singleShopData === null || singleShopData === undefined   ? 
          <Loader />
          :
          <View>
          <View style={{display : 'flex', flexDirection : 'row', paddingBottom : 10}}>
              <Text style={{ fontFamily : 'Railway2', fontSize : 17, }}>{singleShopData.shopName}</Text>
              <Text style={{marginLeft : 'auto', fontFamily : 'Railway1'}}>Open till 06:300 pm</Text>
          </View>
          <Image source={{uri : singleShopData.backdropPic}}
              resizeMode='cover'
              style={{width : '100%', height : 110,
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

          </View>

          <View style={{position : 'relative', paddingTop : 10, paddingBottom : 10}}>
            <Ionicons name='search' size={15} style={{position : 'absolute', top : 25, left : 15}}/>
            <TextInput placeholder='Search for your favourite food' style={styles.inputStyles}/>
            {/* <Ionicons name='filter' size={15} style={{position : 'absolute', top : 25, right :15}}/> */}
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

                            <Image source={{uri: eachCuisines.thumbnail}}
                            style={{width : 60, height : 50, borderRadius : 5}}
                            />

                            <View style={{width : '75%'}}>
                            <View style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
                                <Text style={{fontFamily : 'Railway2', fontSize : 12}}>{eachCuisines.name.toUpperCase()}</Text>
                            </View>

                            <Text style={{fontFamily : 'Railway1', 
                                fontSize : 12, color : 'gray', paddingVertical : 3,
                                textAlign : 'justify'
                            }}>
                                {eachCuisines.description}
                            </Text>
                            <Text style={{ color : Colors.btnGreen, fontSize : 10}}>From N{eachCuisines.price.toLocaleString()}</Text>
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


        <Modal                 
            isVisible={showModal2} backdropOpacity={0.30} 
            animationIn={'slideInDown'} animationOut={'fadeOut'} 
            animationInTiming={500} animationOutTiming={10}
        >
            <View style={styles.modalStyle2}>
                <Image source={require('../../assets/images/succes2.png')} style={{width : 80, height : 80}}/>
                <Text style={{fontFamily : 'Railway1', fontSize : 13, padding : 0}}>{message}</Text>

                <View style={{display : 'flex', flexDirection : 'row', gap : 10, marginVertical : 10}}>
                    <TouchableOpacity onPress={()=>router.replace('/(protected)/carts')}
                        style={{borderColor : Colors.myGray, borderWidth : 1, 
                            paddingHorizontal : 15, paddingVertical : 5, 
                            marginTop : 15, borderRadius : 3,
                        }}
                    >
                        <Text style={{  fontSize : 13, fontFamily : 'Railway1', color : Colors.myGreen}}>Check out</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> setShowModal2(false)}
                        style={{backgroundColor : Colors.myRed, 
                            paddingHorizontal : 15, paddingVertical : 5, 
                            marginTop : 15, borderRadius : 3,

                        }}
                    >
                        <Text style={{fontSize : 13, fontFamily : 'Railway3', color : 'white' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

    </Animated.View>
  )
}

export default resturantPage

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        flex : 1,
        paddingHorizontal : 20,
        paddingTop : 50
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
      paddingHorizontal : 10,
      paddingVertical : 6,
      alignSelf : 'center',
      justifyContent : 'center',
      borderRadius : 50,
      gap : 5,
    },
  
    btnText : {
      fontFamily : 'Railway2', color : 'white', fontSize : 12
    },
  
  
    btnText1 : {
      fontFamily : 'Railway2', color : Colors.btnGreen, fontSize : 12
    },
  
  
    btnStyle1 :{
      backgroundColor : 'white',
      display : 'flex',
      flexDirection : 'row',
      width : '40%',
      alignItems : 'center',
      borderColor : Colors.btnGreen,
      borderWidth : 1,
      paddingHorizontal : 10,
      paddingVertical : 8,
      textAlign : 'center',
      justifyContent : 'center',
      borderRadius : 50,
      gap : 5
    },


    checkbox: {
      marginLeft : 'auto',
      borderRadius : 100,
      borderColor : Colors.myLightGreen,
      borderWidth : 1,
      width : 17,
      height : 17
    },

    btnStyles :{
      height : 50,
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
    height : 50,
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

  modalStyle2 : {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
    width: '100%',
    maxHeight: '30%',
    alignSelf : 'center',
    borderRadius : 10,
  }
})