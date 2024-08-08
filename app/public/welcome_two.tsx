import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import Animated, { FadeIn, FadeOut, useSharedValue, useAnimatedStyle, withRepeat, withSpring  } from 'react-native-reanimated';

const welcome_two = () => {

  
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
        <Animated.Image source={{uri: 'https://food-grab-images.s3.amazonaws.com/users/assets/food.png'}} style={[styles.imgStyle , animatedStyle]}/>

            {/* ========= Text =============== */}
            <View style={styles.textDiv}>
            <Image source={require('../../assets/images/Step2.png')} style={{marginBottom :10}}/>
            <Text style={{fontSize : 25, fontFamily : 'Railway2', textAlign : 'center'}}>Discover new cuisines</Text>

            <Text style={{textAlign : 'center', lineHeight : 22, paddingVertical : 10, fontSize : 15}}>
                From local favorites to global delights, find the perfect dish for every taste
            </Text>
            </View>


            <Link href={'/public/welcome_three'} asChild>        
            <TouchableOpacity style={styles.btnStyles}>
                <Text style={{fontSize : 18, color : 'white', fontFamily : 'Railway2'}}>Next</Text>
                </TouchableOpacity>
            </Link>
      </Animated.View>
    </SafeAreaView>
  )
}

export default welcome_two

const styles = StyleSheet.create({
  container : {
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center',
      paddingHorizontal : 20,
      backgroundColor : 'white',
  },

  imgStyle : {
    width : 260,
    height : 260,
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
    height : 50,
    backgroundColor : Colors.myRed,
    flexDirection : 'row',
    alignItems : 'center',
    paddingHorizontal : 20,
    marginHorizontal : 30,
    justifyContent : 'center',
    borderRadius : 5,     
  }
})