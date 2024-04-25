import {StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors';
import {Link} from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'

const OTPVerifcation = () => {
  const [isEmpty, setIsEmpty] = useState<any>(null)

  const handleChange = (e : any) =>{
    setIsEmpty(!isEmpty)
  }


  const [token, setToken] = useState('');

  const handleVerifyToken = () => {
    // Assuming you have a function to verify the token
    if (token.length === 4 && /^\d+$/.test(token)) {
      // Token verification logic goes here
      // For example, you might send the token to a server for validation
      // Replace the alert with appropriate logic for your application
      alert('Token verified successfully');
    } else {
      alert('Invalid token. Please enter a 4-digit number.');
    }
  };



  return (
    <SafeAreaView style={{flex : 1, paddingHorizontal : 20}}>
      <StatusBar style='dark'/>
      <View style={styles.container}>
          <Text style={{fontFamily : 'Railway2', fontSize : 17}}>OTP Verification</Text>
          <Text style={{width : '98%', paddingTop : 10, fontFamily : 'Railway1'}}>
            Thank you for signing up, Enter the 4-digit that we 
            have sent via the phone number +234 728-1047-820
          </Text>

          <View style={styles.OTPDiv}>
          <TextInput
              style={styles.input}
              onChangeText={setToken}
              value={token}
              keyboardType="numeric"
              placeholder="Enter 4-digit token"
              maxLength={4}
            />
          </View>

          


          <TouchableOpacity style={styles.btnContainer} onPress={() => {/* handle verification */}}>
            <Text style={styles.btnText}>Verify my account</Text>
          </TouchableOpacity>


          <View style={{display : 'flex', flexDirection : 'row', paddingTop : 30, gap : 5, alignSelf : 'center'}}>
            <Text style={{fontFamily : 'Railway1', textAlign : 'center', fontSize : 15}}>Didn’t receive a code? </Text>
            <Text style={{color : Colors.myRed, fontFamily : 'Railway3'}}>Resend code</Text>
          </View>
      </View>



    </SafeAreaView>
  )
}

export default OTPVerifcation

const styles = StyleSheet.create({
  container : {
    backgroundColor : 'white',
    flex : 1,
    paddingTop : 20
  },

  OTPDiv : {
    display : 'flex', 
    flexDirection : 'row',
    justifyContent : 'space-between',
    paddingTop : 20
  },

  input: {
    height: 50,
    width: '100%',
    borderColor: Colors.myGray,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius : 5
  },

  btnContainer: {
    height: 45,
    backgroundColor: Colors.myRed,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 5,
    width: '100%',
  },
  
  btnText: {
    fontFamily: 'Railway2',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },

})