import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '@/constants/Colors';
import {Link, useRouter} from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '@/context/AuthContext';
import { BASE_URL } from '@/Enpoints/Endpoint';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPVerifcation = () => 
  {
  const [isEmpty, setIsEmpty] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {getUserData2, userDetails2} = useContext(AuthContext)

  const handleChange = (e : any) =>{
    setIsEmpty(!isEmpty)
  }

  const navigation = useRouter()

  useEffect(() => {
    getUserData2()
  },[])


  const email = userDetails2.email
  const [code, setCode] = useState('')



  // const handleVerifyToken = () => {
  //   // Assuming you have a function to verify the token
  //   if (code.length === 4 && /^\d+$/.test(code)) {
  //     // Token verification logic goes here
  //     // For example, you might send the token to a server for validation
  //     // Replace the alert with appropriate logic for your application
  //     alert('Token verified successfully');
  //   } else {
  //     alert('Invalid token. Please enter a 4-digit number.');
  //   }
  // };


  const handVerify = async ( ) => {

    setIsLoading(true)
    try {
      const response = await fetch(`${BASE_URL}verifyEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            email,
            code
          }),
      })


      if (!response.ok) {
        setIsLoading(false);
        if (response.status === 400) {
          throw new Error('Bad request. Please check your data.');
        } else {
          throw new Error(`API request failed with status ${response.status}`);
        }
      }
      const responseData = await response.json();
      await AsyncStorage.setItem('otp', JSON.stringify(false));

      if(responseData.status === "SUCCESS") {
        navigation.replace('/login')
      }

      setIsLoading(false)
      console.log('POST request successful:', responseData);

    } catch (error) {
      console.log('There was an error!! ', error);
      setIsLoading(false);
      
    }
  }

  const [userDetails, setUserDetails] = useState<any>({})

  const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        const newJsonValue = (jsonValue != null ? JSON.parse(jsonValue) : null)

        return setUserDetails(newJsonValue.data);
      } catch (e) {
        console.log(e)
      }
  };

  useEffect(() => {
      getData();
  },[]);


  console.log(userDetails.email);
  
  


  return (
    <SafeAreaView style={{flex : 1, paddingHorizontal : 20}}>
      <StatusBar style='dark'/>
      <View style={styles.container}>
          <Text style={{fontFamily : 'Railway2', fontSize : 17}}>OTP Verification</Text>
          <Text style={{width : '98%', paddingTop : 10, fontFamily : 'Railway1', fontSize : 12, lineHeight : 25}}>
            Thank you for signing up, Enter the 4-digit that was 
            sent to this mail: <Text style={{fontSize : 13, fontWeight : '800', color : Colors.btnGreen}}>{userDetails.email}</Text>
          </Text>

          <View style={styles.OTPDiv}>
          <TextInput
              style={styles.input}
              onChangeText={setCode}
              value={code}
              // keyboardType="numeric"
              placeholder="Enter 4-digit token"
              maxLength={4}
            />
          </View>

          


          <TouchableOpacity style={styles.btnContainer} onPress={handVerify}>
            <Text style={styles.btnText}>{isLoading === true ? <ActivityIndicator size={'large'}/> : 'Verify my account'}</Text>
          </TouchableOpacity>


          <View style={{display : 'flex', flexDirection : 'row', paddingTop : 30, gap : 10}}>

            <TouchableOpacity onPress={()=>navigation.replace('/register')}>
              <Text style={{
                  fontFamily : 'Railway1', 
                  textAlign : 'center', fontSize : 15, 
                  textTransform : 'uppercase', 
                  textDecorationLine : 'underline'
                }}>SignUp 
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.replace('/login')}>
            <Text style={{
              color : Colors.myRed, 
              fontFamily : 'Railway3', 
              textTransform : 'uppercase', 
              textDecorationLine : 'underline'
              }}>Login
            </Text>
            </TouchableOpacity>


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