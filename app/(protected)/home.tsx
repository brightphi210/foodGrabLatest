import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, RefreshControl, Pressable, Button } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from "@expo/vector-icons/FontAwesome";
// import DashHeader from '../components/DashHeader'
import { Link, useNavigation, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '@/context/AuthContext';
import { BASE_URL } from '@/Enpoints/Endpoint';
import DashHeader from '@/components/DashHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader2 from '@/components/Loader2';
import NetworkError from '@/components/NetworkError';
import Animated, { FadeInLeft, FadeOutRight, SlideInDown, SlideInLeft, SlideInRight, SlideInUp, SlideOutDown, SlideOutRight } from "react-native-reanimated";


const index = () => {
  const [show, setShow] = useState(false);

  const navigate = useNavigation<any>()

  const [isLoading, setIsLoading] = useState(true);

  const hideAndShowOne = () =>{
    setShow(false);
  } 

  const hideAndShowTwo = () =>{
    setShow(true);
  }


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

  if(userToken === undefined){
    getData()
  }


  const [shopData, setShopData] = useState<any>([])
  const [error, setError] = useState<any>(false)
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true)
      const res = await fetch(`${BASE_URL}shops`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      const myData = await res.json();
      setIsLoading(false);
      setRefreshing(false)
      setShopData(myData.data);
      
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(true);
      setRefreshing(false)

    }
  };


  useEffect(() => {
    fetchData();
  }, [userToken]);



  const [query, setQuery] = useState('')

  const fetchDataSearch = async (searchQuery : any) => {
    try {
      setRefreshing(true)
      const res = await fetch(`${BASE_URL}shops?search=${query}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      const myData = await res.json();
      setIsLoading(false);
      setRefreshing(false)
      setShopData(myData.data);
      
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(true);
      setRefreshing(false)

    }
  };


  const handleChangeText = (text:any) => {
    setQuery(text);
    fetchDataSearch(text);
  };



  const [isFound, setIsFound] = useState(true);

  const handleSearch = () => {
    const foundIndex = shopData.findIndex((item : any) => item === query);
    setIsFound(foundIndex !== -1);
  };

  useEffect(()=>{
    handleSearch();
  },[])


  const handleProductPress = (shopId : any) => {
    navigate.navigate('authRoute/resturant_page', {shopId})
  };


  const [isFavorite, setIsFavorite] = useState(false);

  const handleIsFavorite = () => {
    setIsFavorite(!isFavorite);
  }
  console.log('This is the data', typeof(shopData));



  


  return (
    
    <SafeAreaView style={styles.container}>
        <StatusBar style='dark'/>

        <DashHeader />


        <View style={{position : 'relative', paddingTop : 10, paddingBottom : 6}}>
          <Ionicons name='search' size={15} style={{position : 'absolute', top : 25, left : 15}}/>
          <TextInput 
            placeholder='Search for your favourite food' 
            style={styles.inputStyles}
            value={query}
            onChangeText={handleChangeText}
          />
          <Ionicons name='filter' size={15} style={{position : 'absolute', top : 25, right :15}}/>
        </View>
 
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />}>
          <View>
              <View style={{paddingVertical : 0, paddingBottom : 0, }}>
                <Image source={require('../../assets/images/dashSec2.png')}
                  style={styles.imageDIv}
                  resizeMode='contain'
                />
              </View>

              
            <View style={{display : 'flex', flexDirection : 'row', gap : 10, paddingTop : 10, paddingHorizontal : 0}}>
              <TouchableOpacity style={show ? styles.btnStyle1 : styles.btnStyle} onPress={hideAndShowOne}>
                <Ionicons name='fast-food' color={show ? Colors.btnGreen  : 'white' } size={15}/>
                <Text style={show ? styles.btnText1 : styles.btnText}>Restaurant</Text>
              </TouchableOpacity>

              <TouchableOpacity style={show ? styles.btnStyle : styles.btnStyle1} onPress={hideAndShowTwo}>
                <Ionicons name='restaurant' size={15} color={!show ? Colors.btnGreen  : 'white' }/>
                <Text style={show ? styles.btnText : styles.btnText1}>Private Chef</Text>
              </TouchableOpacity>
            
            </View>
          </View>



          { show ? 
            <View style={{paddingTop : 20, }} >
              <Text style={{fontFamily : 'Railway3', fontSize : 15, paddingBottom : 20}}>Recommend Chef</Text>

                  {isLoading ? 
                  
                    (
                    <ActivityIndicator style={{paddingTop : 150}} size={'large'}/> 
                    )

                    : (

                    <>
                      {shopData && (

                        <>
                        {shopData.map((item : any, index:any) => (

                          <>
                          {item.type === 'CHEF' && (
                            
                            <Animated.View key={index} entering={FadeInLeft.duration(300).delay(200)} exiting={FadeOutRight.duration(300).delay(200)}>
                              <TouchableOpacity onPress={() => handleProductPress(item._id)}>
                                  <View style={{display : 'flex', 
                                    flexDirection : 'row', gap : 10, 
                                    justifyContent : 'center', 
                                    alignItems : 'center', 
                                    borderBottomColor : Colors.myGray,
                                    borderBottomWidth : 1,
                                    paddingBottom : 15,
                                    marginBottom : 15,
                                  }}>

                                    <View style={{width : 70, height : 70, overflow : 'hidden', borderRadius : 50, backgroundColor : Colors.myLightGray}}>
                                      <Image source={{uri : item.logo}}
                                        style={{width : 80, height : 80}}
                                      />
                                    </View>

                                    <View style={{width : '75%'}}>
                                      <View style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
                                        <Text style={{fontFamily : 'Railway3', fontSize : 15}}>{item.shopName}</Text>
                                        <Text style={{fontSize : 15, marginLeft : 'auto'}}>5.0 (123)</Text>
                                      </View>

                                      <Text style={{fontFamily : 'Railway1', 
                                        fontSize : 12, color : 'gray', paddingVertical : 5,
                                        textAlign : 'justify'
                                      }}>
                                      {item.description}
                                      </Text>
                                    </View>

                                  </View>
                                </TouchableOpacity>
                            </Animated.View>
                          )}
                          </>
                        ))}
                        </>

                      )}
                    </>
                  )}

                  {shopData === undefined || shopData.length === 0  && (
                    <View style={{display : 'flex', paddingTop: 80, flexDirection : 'column', justifyContent : 'center', margin : 'auto'}}>
                      <Ionicons name='notifications-circle' style={{textAlign : 'center'}} size={100} color={Colors.myGray}/>
                      <Text style={{textAlign: 'center', color : Colors.myGray}}>Nothing Found</Text>
                    </View>
                  )}

            </View> 
            
            :
                        
            <View style={{paddingTop : 20, }}>
              <Text style={{fontFamily : 'Railway3', fontSize : 15, paddingBottom : 10}}>Available Restaurants</Text>
              <View>

 

                  {isLoading ? 
                  
                  (
                  <ActivityIndicator style={{paddingTop : 150}} size={'large'}/> 
                  )

                  : (


                    <>
                      {shopData && ( 

                        <>
                          {shopData.map((item : any, index:any) => (
                            <>
                                {item.type === 'RESTAURANT' && (
                                  
                                  <Animated.View key={index} entering={FadeInLeft.duration(300).delay(200)}>
                                  <Pressable style={styles.restImageDiv}  onPress={() => handleProductPress(item._id)}>

                                    
                                    <View>
                                      <Image source={{uri : item.backdropPic}}
                                        resizeMode='cover'
                                        style={styles.restImage}
                                      />
                                    </View>

              
                                    <View style={{paddingHorizontal : 10, paddingVertical : 5, backgroundColor:'white', display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
                                      <View style={{display : 'flex', flexDirection : 'column'}}>
                                        <Text style={{fontFamily : 'Railway3', fontSize : 15}}>{item.shopName}</Text>
                                        <Text style={{fontFamily : 'Railway1', fontSize : 12}}>{item.description}</Text>
                                      </View>
                                        <TouchableOpacity onPress={handleIsFavorite} style={{
                                          marginLeft : 'auto', padding : 10, 
                                          backgroundColor : Colors.myLightGray,
                                          borderRadius : 50

                                        }}>
                                          {isFavorite === false ? <FontAwesome name='heart-o' color={Colors.myRed}  size={15}/>
                                          : <FontAwesome name='heart' color={Colors.myRed}  size={15}/>
                                          }
                                        
                                        </TouchableOpacity>
                                    </View>
                                  </Pressable>
                                  </Animated.View>
                                )}
                            </>
                          ))}
                        </>
                      )}

                    </>
                  )}

                  {error === true && (
                    <NetworkError />
                  )}
              </View>
            </View>

          }
      </ScrollView>
      {/* </Animated.View> */}

    </SafeAreaView>

  )
}

export default index

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor : 'white',
      paddingHorizontal: 20,
      paddingTop : 0,
    },

    imageDIv : {
      width : '100%',
      height : 120,
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
    width : '48%',
    alignItems : 'center',
    padding : 8,
    alignSelf : 'center',
    justifyContent : 'center',
    borderRadius : 20,
    gap : 5
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
    width : '48%',
    alignItems : 'center',
    borderColor : Colors.btnGreen,
    borderWidth : 1,
    padding : 8,
    textAlign : 'center',
    justifyContent : 'center',
    borderRadius : 20,
    gap : 5
  },

  restImageDiv :{
    borderColor : Colors.myLightGray,
    borderWidth : 1,
    borderRadius : 5,
    marginBottom : 20,
    backgroundColor : Colors.myLightGray
  },


  restImage : {
    width : '100%',
    height : 150,
    borderTopRightRadius : 5,
    borderTopLeftRadius : 5,
  }

})