import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter } from 'expo-router'
import { useNavigation } from 'expo-router';
import BackHeader from '@/components/BackHeader';
import { StatusBar } from 'expo-status-bar';
import {PayWithFlutterwave} from 'flutterwave-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const order_summary = () => {

  const navigate = useNavigation()
  
  const router = useRouter()
  const [current1, setCurrent1] = useState(true);
  const [current2, setCurrent2] = useState(false);

  const [current3, setCurrent3] = useState(true);
  const [current4, setCurrent4] = useState(false);


  const [current5, setCurrent5] = useState(true);
  const [current6, setCurrent6] = useState(false);

  const activate1 = () =>{
      setCurrent1(true);
      setCurrent2(false);
  }

  const activate2 = () =>{
      setCurrent1(false);
      setCurrent2(true);
  }


  const activate3 = () =>{
      setCurrent3(true);
      setCurrent4(false);
  }

  const activate4 = () =>{
      setCurrent3(false);
      setCurrent4(true);
  }


  const activate5 = () =>{
      setCurrent5(true);
      setCurrent6(false);
  }

  const activate6 = () =>{
      setCurrent5(false);
      setCurrent6(true);
  }


  const [userDetails, setUserDetails] = useState<any>({})

  const getUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('data');
        const newJsonValue = (jsonValue != null ? JSON.parse(jsonValue) : null)

        return setUserDetails(newJsonValue.data);
      } catch (e) {
        console.log(e)
      }
  };

  useEffect(() => {
      getUserData();
  },[]);

  const [cartItems, setCartItems] = useState([])

  const [isLoading, setIsLoading] = useState(false)


  const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('cuisines');
        return setCartItems(jsonValue != null ? JSON.parse(jsonValue) : null);
      } catch (e) {
        console.log(e)
      }
  };

  useEffect(() => {
      getData();
  },[]);


  const userEmail = userDetails.email;
  // const [subTotal, setSubTotal] = useState(null)

  const sumTotalPrice = cartItems.reduce((total:any, product:any) => total + (product.price * product.quantity), 0);
  const newTotalPrice = sumTotalPrice.toLocaleString()
  const percentage = sumTotalPrice * 0.03
  const grandTotalPrice = (sumTotalPrice + percentage)

  console.log(percentage)

  interface RedirectParams {
    status: 'successful' | 'cancelled';
    transaction_id?: string;
    tx_ref: string;
  }

    const handleOnRedirect = (data: RedirectParams) => {
      if(data.status === 'successful'){
          router.replace('/authRoute/order_status')
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
    <View style={styles.container}>
      <StatusBar style='dark'/>
      <BackHeader />
      <Text style={{fontFamily : 'Railway2', fontSize : 15, paddingBottom : 20}}>Checkout</Text>

      <ScrollView  showsVerticalScrollIndicator={false}>
        <View style={styles.grayBG}>
          <Text style={{fontFamily : 'Railway3', fontSize : 13}}>Order Summary</Text>
        </View>

        {cartItems.map((cartItem : any, index: any) =>(

        <View key={index} style={{display : 'flex', flexDirection : 'row', borderBottomWidth : 1, borderBottomColor : Colors.myGray, paddingVertical : 20}}>
          <View style={{display : 'flex', flexDirection : 'row', gap : 10}}>
            <View style={{width : 50, height : 40, overflow : 'hidden', borderRadius : 5}}>
              <Image source={require('../../assets/images/imgFood2.png')} style={{width  : 60, height : 60}}/>
            </View>

            <View>
              <Text style={{fontFamily : 'Railway2', fontSize : 15}}>{cartItem.name}</Text>
              <Text style={{fontFamily : 'Railway3', color : Colors.myLightGreen, fontSize : 11, paddingTop : 6}}>Kilimajaro - Big Tree</Text>
            </View>
          </View>

          <View style={{marginLeft : 'auto',}}>
            <Text style={{ color : 'gray', fontSize : 12}}>{cartItem.quantity} Items</Text>
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
            {cartItems && (
              <View>
                  <Text style={{fontSize : 13, color : 'gray'}}>Sub-Total {cartItems.length} (Items)</Text>
              </View>
            )}
            <Text style={{marginLeft : 'auto', fontWeight : '500', fontSize : 13}}>N{newTotalPrice}</Text>
          </View>

          <View style={styles.paymentDiv}>
            <Text style={{fontFamily : 'Railway1', fontSize : 13, color : 'gray'}}>Delivery Fee</Text>
            <Text style={{marginLeft : 'auto', fontWeight : '500', fontSize : 13}}>N3,700.00</Text>
          </View>

          <View style={styles.paymentDiv}> 
            <Text style={{fontFamily : 'Railway1', fontSize : 13, color : 'gray'}}>Booking Fee</Text>
            <Text style={{marginLeft : 'auto', fontWeight : '500', fontSize : 13}}>N{percentage}</Text>
          </View>

          <View style={styles.paymentDiv}>
            <Text style={{fontFamily : 'Railway3', color : Colors.myRed}}>Total</Text>
            <Text style={{marginLeft : 'auto', fontWeight : '500', fontSize : 13, color : Colors.myRed}}>N{grandTotalPrice.toLocaleString()}</Text>
          </View>
        </View>


        <View style={styles.bottomBtns} >

        <PayWithFlutterwave

            onRedirect={handleOnRedirect}
            options={{
                tx_ref: generateTransactionRef(10),
                authorization: "FLWPUBK_TEST-1846f466dad001520b9bf6345d69c9cb-X",
                customer: {
                email: userEmail,
                },
                amount: grandTotalPrice,
                currency: 'NGN',
                payment_options: 'card'
            }}
            customButton={(props : any) => (
                <TouchableOpacity style={styles.eachBottomBtn} onPress={props.onPress} disabled={props.disabled}>
                    <Text style={{fontFamily : 'Railway2', fontSize : 15, color : 'white'}}>Make Payment</Text>
                </TouchableOpacity>

            )}
        />

          <TouchableOpacity style={styles.eachBottomBtn2} onPress={navigate.goBack}>
              <Text style={{fontFamily : 'Railway2', fontSize : 13, color : Colors.myRed}}>Cancel Order</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    </View>
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
    // paddingHorizontal : 20,
    borderRadius : 10,
    borderStyle : 'dashed'
},

bottomBtns: {
    display : 'flex',
    flexDirection : 'column',
    paddingTop : 30, 
    gap : 10,
    paddingHorizontal : 10,
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