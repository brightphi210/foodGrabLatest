import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';


const welcome_one = () => {



    

  return (
    <SafeAreaView style={{flex : 1, backgroundColor :'gray'}}>
        <StatusBar style='dark'/>
      <Animated.View style={styles.container}
             entering={FadeIn.duration(300).delay(300)}
             exiting={FadeOut.duration(300).delay(300)}
      >
        <Image source={require('../../assets/images/ride.png')} style={styles.imgStyle}/>

        {/* ========= Text =============== */}
        <View style={styles.textDiv}>
          <Image source={require('../../assets/images/Step1.png')} style={{marginBottom :10}}/>
          <Text style={{fontSize : 25, fontFamily : 'Railway2', textAlign : 'center'}}>Quench your craving</Text>

          <Text style={{textAlign : 'center', lineHeight : 22, paddingVertical : 10, fontSize : 15}}>
            Find your favorite meal from your favorite restaurants and we will deliver it to your door step 
          </Text>
        </View>

        
        <Link href={'/public/welcome_two'} asChild>        
          <TouchableOpacity style={styles.btnStyles} >
              <Text style={{fontSize : 18, color : 'white', fontFamily : 'Railway2'}}>Next</Text>
            </TouchableOpacity>
        </Link>
      </Animated.View>
    </SafeAreaView>
  )
}

export default welcome_one

const styles = StyleSheet.create({
  container : {
      flex : 1,
      width : '100%',
      justifyContent : 'center',
      alignItems : 'center',
      paddingHorizontal : 20,
      backgroundColor : 'white',
  },

  imgStyle : {
    width : 250,
    height : 250,
    alignSelf : 'center'
  },

  textDiv : {
    textAlign : 'center',
    alignItems : 'center',
    alignSelf : 'center',
    width : '90%',
    paddingTop : 50
  },

  btnStyles :{
    position : 'absolute',
    bottom : 50,
    left : 0,
    right : 0,
    height : 60,
    backgroundColor : Colors.myRed,
    flexDirection : 'row',
    alignItems : 'center',
    paddingHorizontal : 20,
    marginHorizontal : 30,
    justifyContent : 'center',
    borderRadius : 5,     
  }
})