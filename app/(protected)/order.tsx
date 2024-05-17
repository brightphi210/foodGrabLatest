import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigation, useRouter } from 'expo-router'
import { FadeInLeft, FadeOutRight } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

import OrderHeader from '@/components/OrderHeader';
import Colors from '@/constants/Colors';
import OrderData from '@/components/OrderData';
import { StatusBar } from 'expo-status-bar';
import { BASE_URL } from '@/Enpoints/Endpoint';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderLoader from '@/components/OrderLoader';
import { AuthContext } from '@/context/AuthContext';

const order = () => {
 

  const {userDetails, getUserData} = useContext(AuthContext)

  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);

  
  const [orderDatas, setOrderData] = useState<any>()
  const [error, setError] = useState<any>(false)

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


  useEffect(() => {
    getUserData();
  },[]);


  const fetchOrderData = async () => {
    try {
      const res = await fetch(`${BASE_URL}viewOrders?id=${userDetails._id}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      const myData = await res.json();
      setOrderData(myData.data);
      
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [userToken]);



  const handleIsActive1 = () =>{
    setIsActive1(true);
    setIsActive2(false);
  }

  const handleIsActive2 = () =>{
    setIsActive1(false);
    setIsActive2(true);
  }

  const navigate = useNavigation<any>()
  const handleOrderPress = (data : any) => {
    navigate.navigate('authRoute/order_details', { data })
  };


  console.log('This is the list orders', orderDatas)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark'/>
      <OrderHeader />

      <View style={{ marginTop: 20 }}>
        <View style={styles.filterContainer}>
            <Pressable style={isActive1 === true ? styles.active : styles.inActive} onPress={handleIsActive1}>
              <Text style={isActive1 === true ? styles.activeText : styles.inActiveText}>Active Order</Text>
            </Pressable>


            <Pressable style={isActive2 === true ? styles.active : styles.inActive} onPress={handleIsActive2}>
              <Text style={isActive2 === true ? styles.activeText : styles.inActiveText}>Completed Order</Text>
            </Pressable>
        </View>
      </View>

      {isActive1 === true && (

        <>

        <>
            {orderDatas !== undefined && orderDatas.length === 0 && (
              <View style={{ flex: 1, paddingTop : 150, justifyContent: 'center', alignItems: 'center', gap: 15 }}>

                <Image source={require("../../assets/images/Box.png")} 
                  style={{width : 80, height : 80}}
                />
    
                <Text style={{ fontFamily: 'Railway1' }}>You don’t have an active order</Text>
    
                <Link href={'/(protected)/home'} asChild>
                  <TouchableOpacity style={styles.orderBtn} >
                    <Text style={{color : 'white', fontSize : 12}}>Place an order now</Text>
                  </TouchableOpacity>
                </Link>
              </View>  
            )}
          
        </>

          <>
          {orderDatas === undefined &&(
            <View style={{ flex: 1, paddingTop : 150, justifyContent: 'center', alignItems: 'center', gap: 15 }}>

              <Image source={require("../../assets/images/Box.png")} 
                style={{width : 80, height : 80}}
              />

              <Text style={{ fontFamily: 'Railway1' }}>You don’t have an active order</Text>

              <Link href={'/(protected)/home'} asChild>
                <TouchableOpacity style={styles.orderBtn} >
                  <Text style={{color : 'white', fontSize : 12}}>Place an order now</Text>
                </TouchableOpacity>
              </Link>
            </View>  
          )}

          </>
        </>
      )}

      
      {isActive1 === true && (<>
        {isLoading ?
            
          <ActivityIndicator size={'large'} style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}/> 
          
          :
          <ScrollView
            style={{ flex: 1, marginTop: 20 }}
            showsVerticalScrollIndicator={false}
          > 
            {orderDatas && orderDatas.map((data:any, index :any)=>(

              <Animated.View key={index} style={styles.eachCartDiv} entering={FadeInLeft.duration(300).delay(200)}>
                <View style={styles.eachCart}>
                  <View style={{ overflow: 'hidden', width: 70, height: 60, borderRadius: 5 }}>

                  {data.items.slice(0, 1).map((item:any) => (
                      <Image
                      source={{uri: item.cuisineImage}}
                      style={{ width: 80, height: 60, }}
                    />
                  ))}
    
                  </View>

                  <View style={styles.cartRight}>
                    <View>

                      <View style={{display : 'flex', flexDirection : 'row', gap : 3}}>

                            {data.items.slice(0, 2).map((item:any) => (
                              <View key={item.id} >
                                  <Text style={{fontFamily : 'Railway2', fontSize : 11}}>{item.name.toUpperCase()}, </Text> 
                              </View>
                            ))}


                            <View>
                              {data.items.length > 2 && <Text >. . </Text>}
                            </View>

                      </View>

                      <Text style={{ fontFamily: 'Railway2', fontSize: 12, paddingVertical: 6, color: "#54804D", fontWeight: "600" }}>Kilimajaro - Big Tree</Text>
                      <Text style={{ fontFamily: 'Railway3', fontSize: 13, color: 'gray', fontWeight: "600" }}>&#8358;{data.totalPrice.toLocaleString()}</Text>
                    
                    </View>
                  </View>

                  <View style={{
                      marginLeft : 'auto', 
                      borderRadius : 3, 
                      backgroundColor : Colors.myLightPink, 
                      padding : 5, paddingHorizontal : 10
                    }}>
                    <Text style={{fontSize : 10}}>{data.requestStatus.toLowerCase()}. .</Text>
                  </View>
                </View>

                  <View>
                      <TouchableOpacity  style={{
                        alignItems: "center", 
                        backgroundColor: Colors.myLightGray, 
                        padding: 10, paddingHorizontal: 20, 
                        width: '100%', borderRadius: 5, marginTop: 10
                      }} onPress={()=> handleOrderPress(data)}>
                        <Text style={{ fontFamily: 'Railway3', color: 'black' }}>See Details</Text>
                      </TouchableOpacity>
                  </View>
              </Animated.View>
            ))}

          </ScrollView>
        } 

      </>)}





      {/* {isActive2 === true && (<>
        <ScrollView
            style={{ flex: 1, marginTop: 20 }}
            showsVerticalScrollIndicator={false}
          > 


              <Animated.View style={styles.eachCartDiv} entering={FadeInLeft.duration(300).delay(200)}>
                <View style={styles.eachCart}>
                  <View style={{ overflow: 'hidden', width: 70, height: 60, borderRadius: 5 }}>
                    <Image
                      source={require("../../assets/images/combo1.png")}
                      style={{ width: 80, height: 60, }}
                    />
                  </View>

                  <View style={styles.cartRight}>
                    <View>

                      <View style={{display : 'flex', flexDirection : 'row', gap : 3}}>

                        <View>
                            <Text style={{fontFamily : 'Railway2', fontSize : 12}}>Yam Porridge </Text> 
                        </View>

                      </View>

                      <Text style={{ fontFamily: 'Railway2', fontSize: 12, paddingVertical: 6, color: "#54804D", fontWeight: "600" }}>Kilimajaro - Big Tree</Text>
                      <Text style={{ fontFamily: 'Railway3', fontSize: 13, color: 'gray', fontWeight: "600" }}>&#8358;4,650</Text>
                    
                    </View>
                  </View>

                  <View style={{
                      marginLeft : 'auto', 
                      borderRadius : 3, 
                      backgroundColor : Colors.myLightestGreen, 
                      padding : 5, paddingHorizontal : 10
                    }}>
                    <Text style={{fontSize : 10}}>Delivered</Text>
                  </View>
                </View>

                  <View style={{display : 'flex', flexDirection : 'row', gap : 10}}>
                      <TouchableOpacity style={{
                        alignItems: "center", 
                        backgroundColor: Colors.myLightGray, 
                        padding: 10, paddingHorizontal: 20, 
                        width: '50%', borderRadius: 5, marginTop: 10
                      }}>
                        <Text style={{ fontFamily: 'Railway3', color: 'black' }}>See Details</Text>
                      </TouchableOpacity>


                      <TouchableOpacity style={{
                        alignItems: "center", 
                        backgroundColor: Colors.myRed, 
                        padding: 10, paddingHorizontal: 20, 
                        width: '45%', borderRadius: 5, marginTop: 10
                      }}>
                        <Text style={{ fontFamily: 'Railway3', color: 'white' }}>Reorder</Text>
                      </TouchableOpacity>
                  </View>
              </Animated.View>
          </ScrollView>
      </>)} */}


        {isActive2 === true && (

        <>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 15 }}>

                <Image source={require("../../assets/images/Box.png")} 
                  style={{width : 80, height : 80}}
                />

                <Text style={{ fontFamily: 'Railway1' }}>No Completed Order Yet !!!</Text>
              </View>  
          
        </>
        )}


    </SafeAreaView>
  )
}


export default order

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 0,
  },

  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: Colors.myRed,
    borderWidth: 1,
    borderRadius: 5
  },

  active: {
    alignItems: "center",
    backgroundColor: Colors.myRed,
    padding: 10,
    paddingHorizontal: 20,
    width: '50%',
    borderRadius: 4
  },

  inActive: {
    alignItems: "center",
    backgroundColor: 'white',
    padding: 10,
    paddingHorizontal: 20,
    width: '50%',
    borderRadius: 5,
  },

  activeText: {
    color: "white",
    fontFamily: 'Railway3'
  },
  
  inActiveText: {
    color: "black",
    fontFamily: 'Railway3'
  },

  orderBtn: {
    height : 35,
    backgroundColor : Colors.myRed,
    flexDirection : 'row',
    alignItems : 'center',
    paddingHorizontal : 20,
    justifyContent : 'center',
    borderRadius : 5,  
    marginTop : 10,
    width : '50%',
  },



  eachCartDiv: {
    borderColor: Colors.myGray,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom : 20
  },

  eachCart: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    marginBottom: 5

  },

  cartRight: {},

  checkOutDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10
  },

  seeDetails: {
    alignItems: "center",
    backgroundColor: Colors.myGray,
    padding: 13,
    paddingHorizontal: 20,
    width: '48%',
    borderRadius: 5,
    marginTop: 10,
  },

  reOrderBtn: {
    alignItems: "center",
    backgroundColor: Colors.myRed,
    padding: 13,
    paddingHorizontal: 20,
    width: '48%',
    borderRadius: 5,
    marginTop: 10,
  },
  statusDelivered: {
    backgroundColor: "#D3FFCC",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5
  },
  statusDeliveredText: {
    fontSize: 12,
    color: '#54804D',
    fontWeight: "600"
  },
  statusProcessing: {
    backgroundColor: Colors.myGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5
  },
  statusProcessingText: {
    fontSize: 12,
    color: "#101010",
    fontWeight: "600"
  }
})