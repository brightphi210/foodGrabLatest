import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TouchableNativeFeedback, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import DashHeader from '@/components/DashHeader';
import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '@/context/AuthContext';


// import DashHeader from '../../components/DashHeader';

const index = () => {
    const router = useRouter()
    const {logout} = useContext(AuthContext)
    
    const handlePress =() =>{
        router.replace('/(protected)/home')
    }


    const deleteSeenScreen = () => {
      AsyncStorage.removeItem('welcomeScreen');
      router.replace('/public/welcome_one');
    };

    const deleteOTP = () => {
      AsyncStorage.removeItem('otp');
      router.replace('/public/welcome_one');
    };


    const deleteCarts = () => {
      AsyncStorage.removeItem('cartItems');
      router.replace('/public/welcome_one');
    };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark'/>
        <DashHeader />

        {/* <TouchableOpacity onPress={deleteSeenScreen}>
          <Text style={{fontSize : 20, paddingTop : 20}}>Remove Screen</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={logout}>
          <Text style={{fontSize : 20, paddingTop : 20}}>Logout Screen</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={deleteOTP}>
          <Text style={{fontSize : 20, paddingTop : 20}}>Remove OTP</Text>
        </TouchableOpacity> */}
        
        {/* <TouchableOpacity onPress={deleteCarts}>
          <Text style={{fontSize : 20, paddingTop : 20}}>Remove OTP</Text>
        </TouchableOpacity> */}
        

        
        
        <View style={{}}>

              <View style={{paddingVertical : 0, paddingBottom : 0, }}>
                <Image source={require('../../assets/images/dashSec2.png')}
                  style={styles.imageDIv}
                  resizeMode='contain'
                />
              </View>


              <View style={{display : 'flex', gap : 10, flexDirection : 'column', paddingTop : 20}}>

                  <TouchableOpacity style={{padding : 15, backgroundColor : Colors.myLightGray, paddingLeft : 10}}>
                    
                    <View style={{display : 'flex', flexDirection : 'row', alignItems : 'center', gap : 10, }}> 
                      <Ionicons name='wallet-outline' size={20}/> 
                      <Text>Food Grab Wallet coming soon</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={{padding : 15, backgroundColor : Colors.myLightGray, paddingLeft : 10}}>
                    
                    <View style={{display : 'flex', flexDirection : 'row', alignItems : 'center', gap : 10, }}> 
                      <Ionicons name='fast-food-outline' size={20}/> 
                      <Text>Get Quality Food here  😊😊</Text>
                    </View>
                  </TouchableOpacity>

              </View>

            <View style={{display: 'flex', paddingTop : 20, paddingHorizontal : 10, flexDirection : 'row', alignItems : 'center', justifyContent : 'center', gap : 10}}>
              
              

                <TouchableOpacity  onPress={handlePress} style={styles.imageDIvBorder}>
                    <Image source={require('../../assets/images/foodSearch.png')}
                      style={{width : 130, height : 90, alignSelf : 'center'}}
                    />
                    <Text style={{textAlign : 'center', fontFamily : 'Railway2', fontSize : 15}}>Food</Text>
                </TouchableOpacity>

              <TouchableOpacity  onPress={handlePress} style={styles.imageDIvBorder}>
                  <Image source={require('../../assets/images/storeSearch.png')}
                    style={{width : 100, height : 100, alignSelf : 'center'}}
                  />
                  <Text style={{textAlign : 'center', fontFamily : 'Railway2', fontSize : 15,}}>Restaurant</Text>
              </TouchableOpacity>
            </View>
            

            <TouchableOpacity  onPress={handlePress} >
                <View style={styles.imageDIvBorder2}>
                  <Image source={require('../../assets/images/explore.png')}
                    style={{width : 100, height : 80, alignSelf : 'center'}}
                  />
                  <Text style={{textAlign : 'center', fontFamily : 'Railway2', fontSize : 15, paddingTop : 20}}>Explore the app</Text>
                </View>
            </TouchableOpacity>

        </View>
    </SafeAreaView>

  )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : 'white',
        paddingTop : 20,
        paddingHorizontal: 20
    },

    imageDIv : {
      width : '100%',
      height : 120
    },

    imageDIvBorder : {
      width : '50%', 
      borderColor : Colors.myGray, 
      borderWidth : 1, 
      display : 'flex', 
      borderRadius : 10,
      paddingVertical : 40
    },

    
    imageDIvBorder2 : {
      width : '100%', 
      borderColor : Colors.myGray, 
      borderWidth : 1, 
      display : 'flex', 
      justifyContent : 'center',
      borderRadius : 10 ,
      paddingVertical : 40,
      marginTop : 20
    }
})