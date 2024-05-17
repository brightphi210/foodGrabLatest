import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Pressable } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router'
import { useNavigation } from 'expo-router';
import BackHeader from '@/components/BackHeader';
import { StatusBar } from 'expo-status-bar';
import {PayWithFlutterwave} from 'flutterwave-react-native';
import { useRoute } from '@react-navigation/native';
import Animated, { BounceInDown, BounceInUp, BounceOutDown, FadeIn, SlideInLeft, SlideOutRight } from 'react-native-reanimated';
import { AuthContext } from '@/context/AuthContext';
import { BASE_URL } from '@/Enpoints/Endpoint';


const order_summary = () => {
  const { getData, getUserData, userDetails, userToken  } = useContext(AuthContext)  
  const route = useRoute();
  const { cartItem } : any = route.params;
  const navigate = useNavigation()
  const router = useRouter()

  const handleBackPress = () => {
    router.replace('/carts'); 
  };



  const [shopId, setShopId] = useState(cartItem[0].shopId);
  const userEmail = userDetails.email;
  const [subTotal, setSubTotal] = useState(null)
  const sumTotalPrice = cartItem.reduce((total:any, product:any) => total + (product.price * product.quantity), 0);
  const newTotalPrice = sumTotalPrice.toLocaleString()
  const percentage = sumTotalPrice * 0.03
  const grandTotalPrice = (sumTotalPrice + percentage)
  
  // console.log('THis is the data ', cartItem);

  // Extracting required fields and saving into a new array
  const newArray = cartItem.map((item : any) => ({
    cuisineId: item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    cuisineImage : item.thumbnail
  }));


  const [finalData, setFinalData] = useState({
    "shopId" : shopId,
    "items" : newArray
  })


  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
      getUserData();
  },[]);

  interface RedirectParams {
    status: 'successful' | 'cancelled';
    transaction_id?: string;
    tx_ref: string;
  }

  const handleOnRedirect = async (data: RedirectParams) => {
    if(data.status === 'successful'){

      try {
  
        const response = await fetch(`${BASE_URL}checkout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${userToken}`,
          },
          body: JSON.stringify(finalData),
        });
    
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error('Bad request. Please check your data.');
          } else {
            throw new Error(`API request failed with status ${response.status}`);
          }
        }
    
        const responseData = await response.json();
    
        console.log('POST request successful:', responseData);
        router.replace('/authRoute/order_status')
    
      } catch (error) {
        console.error('POST request error:', error);
      }
      }
  };

  const generateTransactionRef = (length: number) => {
    var result = '';
    var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `flw_tx_ref_${result}`;
  };


  return (
    <Animated.View style={styles.container}
    entering={FadeIn.duration(200).delay(200)}
    exiting={SlideOutRight.duration(200).delay(200)}
    >
      <StatusBar style='dark'/>
      <BackHeader />
      <Text style={{fontFamily : 'Railway2', fontSize : 15, paddingBottom : 20}}>Checkout</Text>

      <ScrollView  showsVerticalScrollIndicator={false}>
        <View style={styles.grayBG}>
          <Text style={{fontFamily : 'Railway3', fontSize : 13}}>Order Summary</Text>
        </View>

        {cartItem.map((item : any, index: any) =>(

        <View key={index} style={{display : 'flex', flexDirection : 'row', borderBottomWidth : 1, borderBottomColor : Colors.myGray, paddingVertical : 20}}>
          <View style={{display : 'flex', flexDirection : 'row', gap : 10}}>
            <View style={{width : 50, height : 40, overflow : 'hidden', borderRadius : 5}}>
              <Image source={{uri: item.thumbnail}} style={{width  : 60, height : 60}}/>
            </View>

            <View>
              <Text style={{fontFamily : 'Railway2', fontSize : 13}}>{item.name.toUpperCase()}</Text>
              <Text style={{fontFamily : 'Railway3', color : Colors.myLightGreen, fontSize : 11, paddingTop : 6}}>Kilimajaro - Big Tree</Text>
            </View>
          </View>

          <View style={{marginLeft : 'auto',}}>
            <Text style={{ color : 'gray', fontSize : 12}}>{item.quantity} Items</Text>
            <Text style={{ color : 'gray', fontFamily : 'Railway1', fontSize : 12}}>View Selection</Text>
          </View>
        </View>
        ))}

        <View style={{paddingTop : 10}}>
          <Text style={{fontFamily : 'Railway1', fontSize : 11, color : 'grey', paddingBottom : 5}}>Delivery Address</Text>
          <View style={{borderColor : Colors.myGray, borderWidth : 1, padding : 10, borderRadius : 5}}>
            <TextInput placeholder='Enter Address'/>
          </View>
        </View>

        <View style={styles.grayBG}>
          <Text style={{fontFamily : 'Railway3', fontSize : 13}}>Payment Summary</Text>
        </View>

        <View style={{paddingTop : 10}}>
          <View style={styles.paymentDiv}>
            {cartItem && (
              <View>
                  <Text style={{fontSize : 13, color : 'gray'}}>Sub-Total {cartItem.length} (Items)</Text>
              </View>
            )}
            <Text style={{marginLeft : 'auto', fontWeight : '500', fontSize : 13}}>&#8358;{newTotalPrice}</Text>
          </View>

          <View style={styles.paymentDiv}>
            <Text style={{fontFamily : 'Railway1', fontSize : 13, color : 'gray'}}>Delivery Fee</Text>
            <Text style={{marginLeft : 'auto', fontWeight : '500', fontSize : 13}}>&#8358;3,700.00</Text>
          </View>

          <View style={styles.paymentDiv}> 
            <Text style={{fontFamily : 'Railway1', fontSize : 13, color : 'gray'}}>Booking Fee</Text>
            <Text style={{marginLeft : 'auto', fontWeight : '500', fontSize : 13}}>&#8358;{percentage}</Text>
          </View>

          <View style={styles.paymentDiv}>
            <Text style={{fontFamily : 'Railway3', color : Colors.myRed}}>Total</Text>
            <Text style={{marginLeft : 'auto', fontWeight : '500', fontSize : 13, color : Colors.myRed}}>&#8358;{grandTotalPrice.toLocaleString()}</Text>
          </View>
        </View>


        <View style={styles.bottomBtns} >

        <PayWithFlutterwave

            onRedirect={handleOnRedirect}
            options={{
                tx_ref: generateTransactionRef(10),
                authorization: "FLWPUBK_TEST-1846f466dad001520b9bf6345d69c9cb-X",
                customer: {
                email: (userDetails.email),
                },
                amount: grandTotalPrice,
                currency: 'NGN',
                payment_options: 'card'
            }}
            customButton={(props : any) => (
                <Pressable style={styles.eachBottomBtn} onPress={props.onPress} disabled={props.disabled}>
                    <Text style={{fontFamily : 'Railway2', fontSize : 15, color : 'white'}}>Make Payment</Text>
                </Pressable>

            )}
        />

          <Pressable style={styles.eachBottomBtn2} onPress={handleBackPress}>
              <Text style={{fontFamily : 'Railway2', fontSize : 13, color : Colors.myRed}}>Cancel Order</Text>
          </Pressable>
        </View>


      </ScrollView>
    </Animated.View>
  )
}

export default order_summary

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : 'white',
    paddingHorizontal : 20
  },

  grayBG : {
    padding : 5,
    paddingHorizontal :10,
    backgroundColor : Colors.myLightGray,
    borderRadius : 2,
    marginTop : 20
  },

  paymentDiv : {
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    paddingVertical : 7
  },

  
  radioNone : {
    borderColor : Colors.myGray, 
    borderWidth : 1.5, 
    padding : 5, 
    width : 16, 
    height : 16, 
    borderRadius : 50,
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
},

radioOuter : {
    borderColor : 'gray', 
    borderWidth : 1.5, 
    padding : 3, 
    width : 16, 
    height : 16, 
    borderRadius : 50,
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
},

radioInner : {
    backgroundColor : 'gray', 
     padding : 5, 
      width : 3, 
      height : 3, 
    borderRadius : 50,
},

  selectDiv :{
      display : 'flex',
      flexDirection : 'row',
      alignItems :'center',
  },

  headStyle : {
      display : 'flex',
      flexDirection : 'row',
      backgroundColor : Colors.myLightGray,
      padding : 5,
      marginTop : 20,
      borderRadius : 5
  },
  btnStyles :{
      height : 50,
      backgroundColor : Colors.myRed,
      flexDirection : 'row',
      alignItems : 'center',
      paddingHorizontal : 20,
      justifyContent : 'center',
      borderRadius : 10,  
      marginTop : 30,
  },

  btnDivs :{
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    gap : 20,
    paddingTop : 20,
},

eachBtn : {
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    gap : 5,
    borderWidth : 1,
    borderColor : Colors.myGray,
    padding : 13,
    borderRadius : 10,
    borderStyle : 'dashed'
},

bottomBtns: {
    display : 'flex',
    flexDirection : 'column',
    paddingTop : 30, 
    gap : 10,
    marginBottom : 30
},


eachBottomBtn : {
    width : '100%',
    padding : 15,
    alignItems : 'center',
    backgroundColor : Colors.myRed, 
    marginTop : 10,
    borderRadius : 5,
},

eachBottomBtn2 : {
    width : '100%',
    padding : 15,
    alignItems : 'center',
    borderColor : Colors.myRed, 
    borderWidth : 1,
    marginTop : 10,
    borderRadius : 5,
}
})