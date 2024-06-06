import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, Ionicons, Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Link, useNavigation, useRouter } from "expo-router"
import Colors from '@/constants/Colors';
import { AuthContext } from '@/context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeOut, FadeOutDown, SlideInLeft, SlideOutRight } from 'react-native-reanimated';
import { BASE_URL } from '@/Enpoints/Endpoint';
import AsyncStorage from '@react-native-async-storage/async-storage';

const account = () => {
  const [image, setImage] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const router = useNavigation<any>()
  const { userData, logout,  getUserData, userDetails} = useContext(AuthContext)

  const uploadImage = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync()
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
      })

      if (!result.canceled) {
        saveImage(result.assets[0].uri)
      } else {
        alert('You did not select any image.');
      }
    } catch (error) {

    }
  }

  const saveImage = async (image : any) => {
    try {
      setImage(image)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getUserData();
  },[]);


  const [userToken, setUserToken] = useState(null);

  const getData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setUserToken(JSON.parse(storedToken));
      } 
    } catch (e) {
      console.error('Error retrieving authentication data:', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [orderDatas, setOrderData] = useState<any>([])
  const [error, setError] = useState<any>(false)
  const fetchOrderData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}viewOrders?id=${userDetails._id}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${userToken}`,
          'Content-Type': 'application/json',
          },
        });
        setIsLoading(false);
        const myData = await res.json();
        setOrderData(myData.data);
        
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        setError(true);
      } finally {
      setIsLoading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [userToken]);


  console.log(orderDatas);
  

  return (
    <SafeAreaView style={styles.container}>
      
      <StatusBar style='dark'/>
      {/* {isLoading && <ActivityIndicator size={'large'}/>} */}

      <Animated.View style={{ flex: 1, marginTop: 30, alignItems: 'center' }}
        entering={FadeInLeft.duration(400).delay(400)}
        exiting={FadeOutDown.duration(500).delay(500)}
      >
        <View style={styles.avatarContainer}>

          <View>
            {image ? (
              <Image source={{uri : image}} style={styles.image} />
            ) : (

            <Image source={require('../../assets/images/defaultProf.png')} style={styles.image} />
            )}
          </View>
          {/* <TouchableOpacity style={styles.editButton} onPress={() => uploadImage()}>
            <MaterialCommunityIcons name="camera-outline" size={15} color="#fff" />
          </TouchableOpacity> */}
        </View>

        <View style={{ marginTop: 10, gap: 10,  }}>
          <Text style={{ fontFamily: "Railway2", fontSize: 15, fontWeight: "600", color: "#1D2739" ,textAlign : 'center' }}>{userDetails.fullname}</Text>
          
          <View style={{display : 'flex', gap : 5, flexDirection : 'row'}}>

            {isLoading && (<ActivityIndicator size={'small'} style={{ paddingRight : 10}} color={Colors.myRed}/>) }

            {
              orderDatas === undefined || orderDatas.length === 0 ? <Text>0</Text> :
           
            
              <>
                <Text style={{fontWeight : '600', fontSize : 13,}}>{orderDatas.length}</Text>
              </>
            }

            
             <Text style={{ color: Colors.myGreen, fontFamily : 'Railway3' }}>Successful Order </Text>
            </View>
        </View>

        <View style={{ width: "100%", marginTop: 50, flexDirection: 'column', gap: 25, }}>


            <TouchableOpacity style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'space-between' ,
              backgroundColor : Colors.myLightGray, padding : 20,  paddingVertical : 20,
              borderRadius : 5
            }} onPress={()=> router.navigate('authRoute/(profile)/personal')}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <MaterialIcons name="perm-contact-cal" size={15} color={Colors.myRed} />
                <Text style={{ fontSize: 13, color: "#606060", fontFamily : 'Railway3'}}>Personal Info</Text>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={13} color={Colors.btnGreen} />
            </TouchableOpacity>


            {/* <TouchableOpacity onPress={()=> router.navigate('authRoute/(profile)/wallet')} 
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
              backgroundColor : Colors.myLightGray, padding : 15,  paddingVertical : 30,
              borderRadius : 5
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <MaterialCommunityIcons name="wallet-outline" size={15} color={Colors.myRed} />
                <Text style={{ fontSize: 13, color: "#606060", fontFamily : 'Railway3'}}>Wallet (Payment)</Text>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={13} color={Colors.btnGreen} />
            </TouchableOpacity> */}



            <TouchableOpacity onPress={()=>router.navigate('authRoute/(profile)/support')}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
              backgroundColor : Colors.myLightGray, padding : 20,  paddingVertical : 20,
              borderRadius : 5
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Feather name="phone" size={15} color={Colors.myRed} />
                <Text style={{ fontSize: 13, color: "#606060", fontFamily : 'Railway3'}}>Support</Text>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={13} color={Colors.btnGreen} />
            </TouchableOpacity>



            <TouchableOpacity onPress={()=>router.navigate('authRoute/(profile)/FAQs')} 
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
              backgroundColor : Colors.myLightGray, padding : 20,  paddingVertical : 20,
              borderRadius : 5
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <AntDesign name="questioncircleo" size={15} color={Colors.myRed} />
                <Text style={{ fontSize: 13, color: "#606060", fontFamily : 'Railway3'}}>FAQs</Text>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={13} color={Colors.btnGreen} />
            </TouchableOpacity>


          <TouchableOpacity onPress={logout} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor : Colors.myLightGray, padding : 20,  paddingVertical : 20,
            borderRadius : 5
           }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <AntDesign name="logout" size={15} color={Colors.myRed} />
              <Text style={{ fontSize: 13, color: "#606060", fontFamily : 'Railway3'}}>Logout</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={13} color={Colors.btnGreen}n/>
          </TouchableOpacity>


        </View>
      </Animated.View>
    </SafeAreaView>
  )
}

export default account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  avatarContainer: {
    alignItems: "center",
    position: "relative"
  },
  image: {
    borderRadius: 100,
    width: 120,
    height: 120,
    borderColor: Colors.myRed,
    borderWidth: 1
  },
  editButton: {
    backgroundColor: Colors.myRed,
    borderRadius: 24,
    padding: 8,
    position: "absolute",
    right: 0,
    top: -10
  }
})