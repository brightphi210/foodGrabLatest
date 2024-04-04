import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TouchableNativeFeedback, ScrollView } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import DashHeader from '@/components/DashHeader';
import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';


// import DashHeader from '../../components/DashHeader';

const index = () => {
    const router = useRouter()
    
    const handlePress =() =>{
        router.replace('/(protected)/home')
    }


    const deleteSeenScreen = () => {
      AsyncStorage.removeItem('welcomeScreen');
      router.replace('/public/welcome_one');
    };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark'/>
        <DashHeader />

        {/* <TouchableOpacity onPress={deleteSeenScreen}>
          <Text style={{fontSize : 20, paddingTop : 20}}>Remove Screen</Text>
        </TouchableOpacity> */}
        
        <View>

              <View style={{paddingVertical : 0, paddingBottom : 0, }}>
                <Image source={require('../../assets/images/dashSec2.png')}
                  style={styles.imageDIv}
                  resizeMode='contain'
                />
              </View>


              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={{display : 'flex', gap : 10, flexDirection : 'row', height : 0}}
              >
                <View style={{
                    display : 'flex', backgroundColor : Colors.myLightPink, 
                    borderRadius : 100, flexDirection : 'row',
                    padding : 5, paddingHorizontal : 20, gap : 10, height : 26,
                    marginRight : 10, 
                  }}
                >
                  <TouchableOpacity style={{display : 'flex', flexDirection : 'row', alignItems : 'center', gap : 5}}>
                    <Ionicons name='wallet-outline' size={12}/>
                    <Text style={{fontSize : 11, fontFamily : 'Railway1'}}>Food Grab Wallet coming soon</Text>
                  </TouchableOpacity>
                </View>

                <View style={{
                    display : 'flex', backgroundColor : Colors.myLightGray, 
                    borderRadius : 100, flexDirection : 'row',
                    padding : 5, paddingHorizontal : 20, gap : 10, height : 26,
                    marginRight : 10, 
                  }}
                >
                  <TouchableOpacity style={{display : 'flex', flexDirection : 'row', alignItems : 'center', gap : 5}}>
                    <Ionicons name='fast-food-outline' size={12}/>
                    <Text style={{fontSize : 11, fontFamily : 'Railway1'}}>Get the best food here</Text>
                  </TouchableOpacity>
                </View>

              </ScrollView>

            <View style={{display: 'flex', paddingTop : 10, paddingHorizontal : 10, flexDirection : 'row', alignItems : 'center', justifyContent : 'center', gap : 10}}>
              
              

                <TouchableNativeFeedback  onPress={handlePress}>
                  <View style={styles.imageDIvBorder}>
                    <Image source={require('../../assets/images/foodSearch.png')}
                      style={{width : 130, height : 90, alignSelf : 'center'}}
                    />
                    <Text style={{textAlign : 'center', fontFamily : 'Railway2', fontSize : 15}}>Food</Text>
                  </View>
                </TouchableNativeFeedback>

              <TouchableNativeFeedback  onPress={handlePress}>
                <View style={styles.imageDIvBorder}>
                  <Image source={require('../../assets/images/storeSearch.png')}
                    style={{width : 100, height : 100, alignSelf : 'center'}}
                  />
                  <Text style={{textAlign : 'center', fontFamily : 'Railway2', fontSize : 15,}}>Restaurant</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            

            <TouchableNativeFeedback  onPress={handlePress}>
                <View style={styles.imageDIvBorder2}>
                  <Image source={require('../../assets/images/explore.png')}
                    style={{width : 100, height : 80, alignSelf : 'center'}}
                  />
                  <Text style={{textAlign : 'center', fontFamily : 'Railway2', fontSize : 15, paddingTop : 20}}>Explore the app</Text>
                </View>
            </TouchableNativeFeedback>

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
      height : '100%', 
      borderColor : Colors.myGray, 
      borderWidth : 1, 
      display : 'flex', 
      borderRadius : 10,
      paddingVertical : 40
    },

    
    imageDIvBorder2 : {
      width : '100%', 
      height : '30%', 
      borderColor : Colors.myGray, 
      borderWidth : 1, 
      display : 'flex', 
      justifyContent : 'center',
      borderRadius : 10 ,
      paddingVertical : 40,
      marginTop : 20
    }
})