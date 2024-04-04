import React, { useContext, useEffect, useState } from 'react'
import {View, Text, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter } from 'expo-router'
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '@/context/AuthContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DashHeader = () => {

  const router = useRouter()




  const [userDetails, setUserDetails] = useState<any>({})

  const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('data');
        const newJsonValue = (jsonValue != null ? JSON.parse(jsonValue) : null)

        return setUserDetails(newJsonValue.data);
      } catch (e) {
        console.log(e)
      }
  };

  useEffect(() => {
      getData();
  },[]);

  return (
   <SafeAreaView style={{display : 'flex', alignItems : 'center', flexDirection : 'row'}}>
        
        <TouchableOpacity onPress={()=>router.replace('/(protected)/account')}>
          <View style={{display : 'flex', flexDirection : 'row', alignItems : 'center', gap : 5}}>
              <FontAwesome name='user-circle' size={20} color={Colors.myLightGreen}/>
              <Text style={{fontFamily : 'Railway3', fontSize : 15, paddingLeft : 5}}>{userDetails.fullname}</Text>
              <Ionicons name='chevron-down' size={20}/>
          </View>
        </TouchableOpacity>

        <View style={{marginLeft : 'auto'}}>
            <TouchableOpacity onPress={()=>router.push('/authRoute/notification')}>
              <Ionicons name='notifications-outline' size={20}/>
            </TouchableOpacity>
        </View>
   </SafeAreaView>
  )
}

export default DashHeader