import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React,{ useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn, FadeOut, useSharedValue, useAnimatedStyle, withRepeat, withSpring } from 'react-native-reanimated';

const welcome_three = () => {

  const [hasSeenWelcomeScreen, setHasSeenWelcomeScreen] = useState(false)


  const router = useRouter()

  const setHasSeenScreen = async () => {
      await AsyncStorage.setItem('welcomeScreen', JSON.stringify(true));
      setHasSeenWelcomeScreen(true)
      router.replace('/login')
  }

  const setHasSeenScreen2 = async () => {
    await AsyncStorage.setItem('welcomeScreen', JSON.stringify(true));
    setHasSeenWelcomeScreen(true)
    router.replace('/register')
}


  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  React.useEffect(() => {
    const animation = withRepeat(
      withSpring(-10, { stiffness: 150, damping: 150, mass: 1 }),
      -1,
      true
    );
    translateY.value = animation;
  }, []);


  return (
    <SafeAreaView style={{flex : 1, backgroundColor :'gray'}}>
        <StatusBar style='dark'/>
      <Animated.View style={styles.container}
             entering={FadeIn.duration(300).delay(300)}
             exiting={FadeOut.duration(300).delay(300)}
      >
        <Animated.Image source={require('../../assets/images/logimg.png')} style={[styles.imgStyle, animatedStyle]}/>

        {/* ========= Text =============== */}
        
          <TouchableOpacity style={styles.btnStyles1}  onPress={setHasSeenScreen2}>
              <Text style={{fontSize : 18, color : 'white', fontFamily : 'Railway2'}}>Get Started</Text>
            </TouchableOpacity>

          <TouchableOpacity style={styles.btnStyles} onPress={setHasSeenScreen}>
              <Text style={{fontSize : 18, color : Colors.myGreen, fontFamily : 'Railway2'}}>Login</Text>
            </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  )
}

export default welcome_three

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
    width : 260,
    height : 260,
    alignSelf : 'center',
  },


  btnStyles1 :{
    height : 50,
    backgroundColor : Colors.myRed,
    flexDirection : 'row',
    alignItems : 'center',
    paddingHorizontal : 20,
    marginHorizontal : 30,
    justifyContent : 'center',
    borderRadius : 5,    
    width : '95%',
    position : 'absolute',
    bottom : 150,
    left : 0,
    right : 0,
  },

  btnStyles :{
    position : 'absolute',
    bottom : 50,
    left : 0,
    right : 0,
    height : 50,
    backgroundColor : 'white',
    flexDirection : 'row',
    alignItems : 'center',
    paddingHorizontal : 20,
    marginHorizontal : 30,
    justifyContent : 'center',
    borderRadius : 5,   
    borderColor : Colors.myGreen,
    borderWidth : 1,  
  }
})