import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import Colors from '@/constants/Colors';
import { Link } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '@/context/AuthContext';
import { BASE_URL } from '@/Enpoints/Endpoint';
import { useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import BackHeader from '@/components/BackHeader';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '@/components/Loader';


const resturantPage = () => {

    const route = useRoute<any>();
    const { shopId } : any = route.params;



    const [singleShopData, setSingleShopData] = useState<any>({})
    const [cuisines, setCuisines] = useState<any>([])


    const [isLoading, setIsLoading] = useState(false)


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




  const fetchData = async () => {
    
    setIsLoading(true)
    try {
      const res = await fetch(`${BASE_URL}singleShop/${shopId}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      const myData = await res.json();

      // console.log(myData)
      setIsLoading(false);

      setSingleShopData(myData.data);
      setCuisines(myData.data.cuisines)


    } catch (error) {
      setIsLoading(false);
      console.log('There was an error fetching token');
    }
  };

  useEffect(() => {
    fetchData();
  }, [userToken]);






  const navigate = useNavigation<any>()

  const handleProductPress = (cuisines : any) => {
    navigate.navigate('authRoute/order_page', { cuisines })
  };

 

  return (
    <View style={styles.container}>

        <BackHeader />
        <StatusBar style='dark'/>

        {isLoading || singleShopData === null || singleShopData === undefined   ? 
          <Loader />
          :
          <View>
          <View style={{display : 'flex', flexDirection : 'row', paddingBottom : 10}}>
              <Text style={{ fontFamily : 'Railway2', fontSize : 17, }}>{singleShopData.shopName}</Text>
              <Text style={{marginLeft : 'auto', fontFamily : 'Railway1'}}>Open till 06:300 pm</Text>
          </View>
          <Image source={require('../../assets/images/rest1.png')}
              resizeMode='cover'
              style={{width : '100%', height : 100,
              borderRadius : 5
          }}
          />


          <View style={{display :'flex', 
              flexDirection : 'row', 
              justifyContent : 'space-between', 
              width : '100%',
              paddingTop : 10,
              borderBottomColor : Colors.myGray,
              borderBottomWidth : 1,
              paddingBottom : 10,
          }}>
              <View style={{borderRightColor : Colors.myGray, borderRightWidth : 1, paddingRight : 20}}>
                  <Text style={{fontFamily : 'Railway1', fontSize : 12, color : 'gray'}}>Preparation Time</Text>
                  <Text style={{fontFamily : 'Railway3', }}>5-20 minutes</Text>
              </View>

              <View style={{borderRightColor : Colors.myGray, borderRightWidth : 1, paddingRight : 20}}>
                  <Text style={{fontFamily : 'Railway1', fontSize : 12, color : 'gray'}}>Delivery Type</Text>
                  <Text style={{fontFamily : 'Railway3', }}>Instant Delivery</Text>
              </View>

              <View style={{}}>
                  <Text style={{fontFamily : 'Railway1', fontSize : 12, color : 'gray'}}>Rating</Text>
                  <Text style={{fontFamily : 'Railway3', }}>5.0 (123)</Text>
              </View>
          </View>

          <View style={{display : 'flex', flexDirection :'row', paddingVertical : 20, gap : 10}}>

              <TouchableOpacity style={styles.btnStyle}>
                  <Text style={styles.btnText}>All</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.btnStyle1}>
                  <Text style={styles.btnText1}>What’s New</Text>
              </TouchableOpacity>

          </View>


          

          <ScrollView style={{paddingVertical : 10, height : '60%'}} showsVerticalScrollIndicator ={false}>

                {cuisines === undefined || cuisines === null ? <ActivityIndicator size={'large'}/> : (
                  <>
                  {cuisines.map((eachCuisines:any, index:any)=>(
                  <TouchableOpacity key={index} onPress={() => handleProductPress(eachCuisines)}>
                  <View style={{display : 'flex', 
                      flexDirection : 'row', gap : 10, 
                      justifyContent : 'center', 
                      alignItems : 'center', 
                      borderBottomColor : Colors.myGray,
                      borderBottomWidth : 1,
                      paddingBottom : 15,
                      marginBottom : 15,
                  }}>

                      <Image source={require('../../assets/images/imgFood4.png')}
                      style={{width : 70, height : 70, borderRadius : 5}}
                      />

                      <View style={{width : '75%'}}>
                      <View style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
                          <Text style={{fontFamily : 'Railway2', fontSize : 15}}>{eachCuisines.name}</Text>
                      </View>

                      <Text style={{fontFamily : 'Railway1', 
                          fontSize : 12, color : 'gray', paddingVertical : 5,
                          textAlign : 'justify'
                      }}>
                          {eachCuisines.description}
                      </Text>
                      <Text style={{ color : Colors.btnGreen}}>From N{eachCuisines.price.toLocaleString()}</Text>
                      </View>

                  </View>
                  </TouchableOpacity>
                  ))}
                  </>
                )}
                        
          </ScrollView>
          </View>
        }


    </View>
  )
}

export default resturantPage

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        flex : 1,
        paddingHorizontal : 20,
    },


    inputStyles : {
        padding : 10,
        borderColor : Colors.myGray,
        borderWidth : 1,
        borderRadius : 5,
        fontSize : 15,
        position : 'relative',
        paddingLeft : 40
    },
  
    btnStyle :{
      backgroundColor : Colors.btnGreen,
      display : 'flex',
      flexDirection : 'row',
      width : '20%',
      alignItems : 'center',
      padding : 10,
      alignSelf : 'center',
      justifyContent : 'center',
      borderRadius : 50,
      gap : 5,
    },
  
    btnText : {
      fontFamily : 'Railway2', color : 'white', fontSize : 13
    },
  
  
    btnText1 : {
      fontFamily : 'Railway2', color : Colors.btnGreen, fontSize : 13
    },
  
  
    btnStyle1 :{
      backgroundColor : 'white',
      display : 'flex',
      flexDirection : 'row',
      width : '40%',
      alignItems : 'center',
      borderColor : Colors.btnGreen,
      borderWidth : 1,
      padding : 10,
      textAlign : 'center',
      justifyContent : 'center',
      borderRadius : 50,
      gap : 5
    },
})