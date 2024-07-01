import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, useNavigation, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import Modal from 'react-native-modal';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import { Pressable } from 'react-native';
import Animated, { FadeInLeft, FadeOutRight } from 'react-native-reanimated';
const cart = () => {


  const {deleteItemFromCart, cartItems, getCartData, deleteAll} = useContext(AuthContext)
  
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();  
  const [showModal2, setShowModal2] = useState<any>(false)
  const navigate = useNavigation<any>()
    

  
  
  const handleProductPress2 = (cartItem : any) => {
    navigate.navigate('authRoute/proceed_checkout', { cartItem })
  };
  
  const handleProductPress1 = (cartItem : any) => {
    navigate.navigate('authRoute/order_summary', { cartItem })
  };


  console.log('This is the cart item', cartItems);
  


  return (
    <SafeAreaView style={styles.container}>
      
      <StatusBar style='dark'/>

      <View style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
        <Text style={{paddingLeft : 20, fontFamily : 'Railway2', paddingTop : 30, fontSize : 15}}>My Cart</Text>

        {cartItems.selectedItemsToAdd !== null &&
          <View style={{
            backgroundColor : Colors.myRed,  
            marginLeft : 'auto', marginTop : 30, 
            marginRight : 20, display : 'flex', flexDirection : 'column',
            width : 30,
            height : 30, 
            borderRadius : 100, 
            justifyContent : 'center', 
            alignItems : 'center', 
            padding : 5,

          }}>
            <Text style={{ fontFamily : 'Railway1',  fontSize : 13, color : 'white', }}>{cartItems.length}</Text>
          </View>
        }
      </View>

      {cartItems?.length === 0   ? (

        <View style={styles.container2}>

        <View >
          <Image 
            source={require('../../assets/images/Box.png')}
            style={{width : 80, height : 80}}
          />
        </View>
          <Text style={{paddingVertical : 20, fontFamily : 'Railway1', }}>Your Cart is empty</Text>

        <TouchableOpacity style={styles.btnStyles} onPress={()=>{router.replace('/(protected)/home')}}>
          <Text style={{color : 'white', fontSize : 12}}>Add Items to cart</Text>
        </TouchableOpacity>
        </View>

      ) : (

        <ScrollView style={styles.container3} showsVerticalScrollIndicator={false}>

          <View style={{
              display : 'flex', 
              flexDirection : 'row', 
              paddingBottom : 10
          }}>
            <TouchableOpacity onPress={()=>setShowModal2(true)} 
                  style={{backgroundColor : Colors.myLightGray, 
                    padding : 10, paddingHorizontal : 20, 
                    borderRadius : 20, 
                    
                  }}>
                  <Text style={{fontFamily : 'Railway3', fontSize : 12, fontWeight : 'bold'}}>Clear cart</Text>
            </TouchableOpacity>
          </View>

          {cartItems.map((cartItem : any, index : any) =>(<>
          
            {cartItem.selectedItemsToAdd && (<>
  
              
              <Animated.View style={styles.eachCartDiv}  key={index} entering={FadeInLeft.duration(300).delay(200)} exiting={FadeOutRight.duration(300).delay(200)}>
                
                  <View style={styles.eachCart}>
                    <View style={{overflow : 'hidden', width : 50, height : 50, borderRadius : 30}}>
  
                    {cartItem && (
                      <>
                        {cartItem.selectedItemsToAdd.slice(0, 1).map((item:any) => (
  
                          <Image 
                            source={{uri : item.thumbnail}}
                            style={{width : 50, height : 50, objectFit : 'cover'}}
                          />
                        ))}
                      </>
                    ) }
                    </View>
  
                    <View style={styles.cartRight}>
                      <View  style={{ display : 'flex', flexDirection : 'row', alignItems : 'center', width : 'auto', gap : 10}}>
                        <View style={{display : 'flex', flexDirection : 'row', gap : 3}}>
  
                          {cartItem.selectedItemsToAdd && (
                            <>
                              {cartItem.selectedItemsToAdd.slice(0, 1).map((item:any) => (
                                <View key={item.id} >
                                    <Text style={{fontFamily : 'Railway2', fontSize : 12, marginLeft :'auto'}}>{item.name.toUpperCase()}</Text> 
                                </View>
                              ))}
                            </>
                          )}
                        </View>
                        
                        <View style={{marginLeft : 'auto',}}>
                          <Text style={{  fontSize : 10, color : 'gray'}}>{cartItem.length}{cartItem.selectedItemsToAdd.length} Items</Text>
                        </View>
                      </View>
                      <Text style={{ fontFamily: 'Railway1', fontSize: 10, paddingVertical: 3, color: Colors.myGreen }}>{cartItem.resturantName}</Text>
                    </View>

                    <TouchableOpacity onPress={() => deleteItemFromCart(index)} style={{
                      marginLeft : 'auto', 
                      backgroundColor : Colors.myLightGray,
                      width : 40,
                      height : 40, 
                      borderRadius : 100, 
                      justifyContent : 'center', 
                      alignItems : 'center', 
                      padding : 5,
                    }}>
                      <FontAwesome name='trash' size={15} color={Colors.myRed}  />
                  </TouchableOpacity>
                    
                  </View>
  
                  <View style={styles.checkOutDiv} >

                    <TouchableOpacity onPress={()=> handleProductPress1(cartItem)} style={styles.checkOutBtn} >
                      <View>
                        <Text style={{fontFamily : 'Railway2', color : 'white', fontSize : 12}}>Checkout</Text>
                      </View>
                    </TouchableOpacity>
  
                    <TouchableOpacity onPress={()=> handleProductPress2(cartItem.selectedItemsToAdd)} style={styles.checkOutBtn2}>
                        <Text style={{fontFamily : 'Railway3', fontSize : 12,}}>
                            Edit Selection 
                        </Text>
                        <AntDesign name='edit' size={15}/>
                    </TouchableOpacity>

                  </View>


                
              </Animated.View>
            </>)}
          </>
          ))}

      </ScrollView>
      )}


      <Modal                 
            isVisible={showModal2} backdropOpacity={0.30} 
            animationIn={'slideInDown'} animationOut={'fadeOut'} 
            animationInTiming={500} animationOutTiming={10}
        >
            <View style={styles.modalStyle2}>
              <Ionicons name='notifications-circle' size={40} color={Colors.myGreen}/>
                <Text style={{fontFamily : 'Railway1', fontSize : 15, paddingTop : 10}}>Are you sure you want to clear cart</Text>

                <View style={{display : 'flex', flexDirection : 'row', gap : 10, marginVertical : 10}}>
                    <TouchableOpacity onPress={deleteAll}
                        style={{backgroundColor : Colors.myRed, 
                            paddingHorizontal : 15, paddingVertical : 5, 
                            marginTop : 15, borderRadius : 3,

                        }}
                    >
                        <Text style={{fontSize : 13, fontFamily : 'Railway3', color : 'white'}}>Clear Cart</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={()=> setShowModal2(false)}
                        style={{borderColor : Colors.myGray, borderWidth : 1, 
                            paddingHorizontal : 15, paddingVertical : 5, 
                            marginTop : 15, borderRadius : 3,
                        }}
                    >
                        <Text style={{fontSize : 13, fontFamily : 'Railway1', color : Colors.myGreen}}>Cancle</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </SafeAreaView>
  )
}

export default cart

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : 'white'
  },


  container2 : {
    flex : 1,
    justifyContent : 'center',
    alignItems: 'center',
    paddingHorizontal : 20
  },



  btnStyles :{
    height : 35,
    backgroundColor : Colors.myRed,
    flexDirection : 'row',
    alignItems : 'center',
    paddingHorizontal : 10,
    justifyContent : 'center',
    borderRadius : 5,  
    marginTop : 10,
    width : '50%',
},

container3 : {
  flex : 1,
  paddingHorizontal : 20,
  paddingTop : 20,
},

eachCartDiv : {
  borderColor : Colors.myGray,
  borderWidth : 1,
  padding : 10,
  borderRadius : 5,
  marginBottom : 20
},

eachCart : {
  display : 'flex',
  flexDirection : 'row',
  gap : 10,
  alignItems : 'center',
  marginBottom : 5

},

cartRight : {
},

checkOutDiv : {
  display : 'flex',
  flexDirection : 'row',
  width : '100%',
  gap : 10 
},

checkOutBtn : {
  height : 40,
  backgroundColor : Colors.myLightGreen,
  flexDirection : 'row',
  alignItems : 'center',
  paddingHorizontal : 20,
  justifyContent : 'center',
  borderRadius : 5,  
  marginTop : 5,
  width : '45%',
},

checkOutBtn2 : {
  height : 40,
  backgroundColor : 'white',
  display : 'flex',
  flexDirection : 'row',
  alignItems : 'center',
  paddingHorizontal : 20,
  justifyContent : 'center',
  borderRadius : 5,  
  marginTop : 5,
  width : '50%',
  borderColor : Colors.myGray,
  borderWidth : 1,
  gap : 10
},


modalStyle2 : {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: 'white',
  width: '100%',
  maxHeight: '30%',
  alignSelf : 'center',
  borderRadius : 10,
}



  
})