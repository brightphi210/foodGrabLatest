import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import {Link} from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

const successfull = () => {
  return (
    <SafeAreaView style={styles.container}>

      <Image
        source={require('../assets/images/successIMG.png')} 
        style={{width: '60%', height: '30%',}}
      />

      <View style={{paddingVertical : 50}}>
        <Text style={{fontFamily : 'Railway2', fontSize : 25, textAlign : 'center'}}>You Are doing well</Text>
        <Text style={{fontFamily : 'Railway1', fontSize : 15, textAlign : 'center', paddingTop : 20}}>
          Congratulations! Your account has been 
          successfully created. You're now ready to embark 
          on a delicious journey with foodie delight.
        </Text>
      </View>

        <Link href={'/login'} asChild>
          <TouchableOpacity style={styles.btnStyles}>
            <Text style={{fontFamily : 'Railway2', color : 'white', fontSize : 15}}>Login</Text>
          </TouchableOpacity>
        </Link>
    </SafeAreaView>
  )
}

export default successfull

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal : 20,
    backgroundColor :'white',
  },

  btnStyles :{
    height : 50,
    backgroundColor : Colors.myRed,
    flexDirection : 'row',
    alignItems : 'center',
    paddingHorizontal : 20,
    marginHorizontal : 30,
    justifyContent : 'center',
    borderRadius : 10,    
    width : '100%' 
  }
})