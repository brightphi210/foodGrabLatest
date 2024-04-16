import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

const NetworkError = () => {
  return (
    <View style={{display : 'flex', justifyContent : 'center', alignItems : 'center', paddingTop : 60}}>
    <View>
      <Image source={require('../assets/images/internet.png')} style={{width : 80, height : 80, alignSelf : 'center', display : 'flex', margin : 'auto'}}/>
      <Text style={{fontFamily : 'Railway3', fontSize : 20, color : Colors.myGray}}>Check your network</Text>
    </View>
  </View>
  )
}

export default NetworkError

const styles = StyleSheet.create({})