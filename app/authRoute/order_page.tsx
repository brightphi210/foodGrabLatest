import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import React,{useEffect, useState} from 'react'
import Colors from '@/constants/Colors';
import BackHeader from '@/components/BackHeader';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRouter } from 'expo-router';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Modal from "react-native-modal";

const orderPage = () => {

  

    const [current1, setCurrent1] = useState(true);
    const [current2, setCurrent2] = useState(false);

    const [current3, setCurrent3] = useState(true);
    const [current4, setCurrent4] = useState(false);


    const [current5, setCurrent5] = useState(true);
    const [current6, setCurrent6] = useState(false);

    const activate1 = () =>{
        setCurrent1(true);
        setCurrent2(false);
    }

    const activate2 = () =>{
        setCurrent1(false);
        setCurrent2(true);
    }


    const activate3 = () =>{
        setCurrent3(true);
        setCurrent4(false);
    }

    const activate4 = () =>{
        setCurrent3(false);
        setCurrent4(true);
    }


    const activate5 = () =>{
        setCurrent5(true);
        setCurrent6(false);
    }

    const activate6 = () =>{
        setCurrent5(false);
        setCurrent6(true);
    }



    const router = useRouter()
    const route = useRoute();

    const { cuisines } : any = route.params;

    const [message, setMessage] = useState<any>('')
    const [showModal2, setShowModal2] = useState<any>(false)


    const addToCart = async () => {
        try {
          const existingCart = await AsyncStorage.getItem('cuisines');
          let updatedCart;
          if (existingCart) {
            updatedCart = JSON.parse(existingCart);
          } else {  
            updatedCart = [];
          }
      
          // 2. Check for existing cuisine with same ID:
          const existingCuisineIndex = updatedCart.findIndex(
            (cuisine : any) => cuisine._id === cuisines._id
            

          );
      
          // 3. Handle duplicate cuisine:
          if (existingCuisineIndex !== -1) {
            updatedCart[existingCuisineIndex].quantity++;
            console.log(`Cuisine ${cuisines.name} quantity increased to ${updatedCart[existingCuisineIndex].quantity}`);
            setMessage(`${cuisines.name} quantity increased to ${updatedCart[existingCuisineIndex].quantity}`)
            setQuantity(updatedCart[existingCuisineIndex].quantity)
            
          }
          
          else {
            // 4. Add new cuisine with quantity 1:
            updatedCart.push({ ...cuisines, quantity: 1 });
            setMessage(`${cuisines.name} added (quantity 1)`)
            console.log(`Cuisine ${cuisines.name} added with quantity 1`);
          }
      
          // 5. Persist updated cart in AsyncStorage:
          await AsyncStorage.setItem('cuisines', JSON.stringify(updatedCart));
          

          setShowModal2(true);
        } catch (error) {
          console.error('Error adding item to cart:', error);
        }
    };


    const removeFromCart = async () => {
        try {
          const existingCart = await AsyncStorage.getItem('cuisines');
          let updatedCart;
          if (existingCart) {
            updatedCart = JSON.parse(existingCart);
          } else {  
            updatedCart = [];
          }
      
          // 2. Check for existing cuisine with same ID:
          const existingCuisineIndex = updatedCart.findIndex(
            (cuisine : any) => cuisine._id === cuisines._id
          );
      
          // 3. Handle duplicate cuisine:
          if (existingCuisineIndex !== -1) {
            updatedCart[existingCuisineIndex].quantity--;
            console.log(`Cuisine ${cuisines.name} quantity reduce to ${updatedCart[existingCuisineIndex].quantity}`);
            setMessage(`${cuisines.name} quantity reduce to ${updatedCart[existingCuisineIndex].quantity}`)
            setQuantity(updatedCart[existingCuisineIndex].quantity)
            
            
          }
          
          // 5. Persist updated cart in AsyncStorage:
          await AsyncStorage.setItem('cuisines', JSON.stringify(updatedCart));
          

          setShowModal2(true);
        } catch (error) {
          console.error('Error adding item to cart:', error);
        }
    };

    const [quantity, setQuantity] = useState<any>(0); // State to track quantity of selected cuisine


    const getQuantity = async () => {
        try {
          const cuisineQunatity = await AsyncStorage.getItem('cuisines');
          let myQuantity
          if (cuisineQunatity) {
            myQuantity = JSON.parse(cuisineQunatity)
          }


          const existingCuisineIndex = myQuantity.findIndex(
            (cuisine : any) => cuisine._id === cuisines._id
          );


          if(existingCuisineIndex !== -1){
            setQuantity(myQuantity[existingCuisineIndex].quantity);
          }
        } catch (e) {
          console.error('Error retrieving authentication data:', e);
        }
      };
    
      useEffect(() => {
        getQuantity();
      }, [quantity]);

  return (
    <View style={styles.container}>
        <StatusBar style='dark'/>
        <BackHeader />
        <View>

            <Text style={{fontFamily : 'Railway2', fontSize : 20, paddingBottom : 10}}>{cuisines.name}</Text>
            <Image source={require('../../assets/images/combo1.png')}
                resizeMode='cover' style={{width:'100%', height:100, borderRadius : 5,}}
            />
            <Text style={{fontFamily : 'Railway3', paddingTop : 10, color : 'gray', fontSize : 13, lineHeight: 20}}>
                {cuisines.description}
            </Text>
        </View>


        <View>

            <View>
                <View style={styles.headStyle}>
                    <Text style={{fontFamily : 'Railway3', fontSize : 13}}>Drinks</Text>
                    <Ionicons name='chevron-down'style={{marginLeft : 'auto', fontSize : 15}}/>
                </View>


                <View>


                    <View style={styles.selectDiv}>
                        <Text style={{fontFamily : 'Railway1', fontSize : 12}}>Coke</Text>
                        <TouchableOpacity style={{marginLeft : 'auto'}} onPress={activate5}>
                            <View style={current5 ? styles.radioOuter : styles.radioNone}>
                                <View style={current5 ? styles.radioInner : null}></View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.selectDiv}>
                        <Text style={{fontFamily : 'Railway1', fontSize : 12}}>Fanta</Text>
                        <TouchableOpacity style={{marginLeft : 'auto'}} onPress={activate6}>
                            <View style={current6 ? styles.radioOuter : styles.radioNone}>
                                <View style={current6 ? styles.radioInner : null}></View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        </View>

        <View>
            <View style={{display : 'flex', flexDirection : 'row', paddingTop : 30, alignItems : 'center'}}>

                <Text style={{fontFamily : 'Railway3', fontSize : 13,}}>Quantity</Text>

                <View 
                    style={{display : 'flex', 
                        backgroundColor : Colors.myLightGray , 
                        flexDirection : 'row', alignItems : 'center', 
                        marginLeft : 'auto', gap : 20,
                        borderRadius : 5, paddingHorizontal : 5,
                        paddingVertical : 3
                    }}>

                    <TouchableOpacity onPress={removeFromCart}>
                        <AntDesign name='minus' size={15}/>
                    </TouchableOpacity>

                    <Text style={{fontSize : 20, padding : 0}}>{quantity}</Text>

                    <TouchableOpacity onPress={addToCart}>
                        <AntDesign name='plus' size={15}/>
                    </TouchableOpacity>
                </View>

            </View>

            <TouchableOpacity style={styles.btnStyles} onPress={addToCart}>
                <Text style={{color : 'white', fontSize : 13, fontWeight : 'bold'}}>Add N{cuisines.price.toLocaleString()}</Text>
            </TouchableOpacity>
        </View>


        <Modal                 
            isVisible={showModal2} backdropOpacity={0.30} 
            animationIn={'slideInDown'} animationOut={'fadeOut'} 
            animationInTiming={500} animationOutTiming={10}
        >
            <View style={styles.modalStyle2}>
                <Image source={require('../../assets/images/succes2.png')} style={{width : 80, height : 80}}/>
                <Text style={{fontFamily : 'Railway1', fontSize : 13, padding : 0}}>{message}</Text>

                <View style={{display : 'flex', flexDirection : 'row', gap : 10, marginVertical : 10}}>
                    <TouchableOpacity onPress={()=>router.replace('/(protected)/carts')}
                        style={{borderColor : Colors.myGray, borderWidth : 1, 
                            paddingHorizontal : 15, paddingVertical : 5, 
                            marginTop : 15, borderRadius : 3,
                        }}
                    >
                        <Text style={{  fontSize : 13, fontFamily : 'Railway1', color : Colors.myGreen}}>Check out</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={()=> setShowModal2(false)}
     

                        style={{backgroundColor : Colors.myRed, 
                            paddingHorizontal : 15, paddingVertical : 5, 
                            marginTop : 15, borderRadius : 3,

                        }}
                    >
                        <Text style={{fontSize : 13, fontFamily : 'Railway3', color : 'white' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>
  )
}

export default orderPage

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white',
        paddingHorizontal : 20
    },

    radioNone : {
        borderColor : Colors.myGray, 
        borderWidth : 1.5, 
        padding : 5, 
        width : 15, 
        height : 15, 
        borderRadius : 50,
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
    },

    radioOuter : {
        borderColor : Colors.myRed, 
        borderWidth : 1.5, 
        padding : 5, 
        width : 15, 
        height : 15, 
        borderRadius : 50,
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
    },
    
    radioInner : {
        backgroundColor : Colors.myRed, 
         padding : 4, 
        width : 5, 
        height : 5, 
        borderRadius : 50,
    },

    selectDiv :{
        display : 'flex',
        flexDirection : 'row',
        alignItems :'center',
        marginTop : 10
    },

    headStyle : {
        display : 'flex',
        flexDirection : 'row',
        backgroundColor : Colors.myLightGray,
        padding : 6,
        marginTop : 20,
        marginBottom : 6,
        borderRadius : 2
    },
    btnStyles :{
        height : 40,
        backgroundColor : Colors.myRed,
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal : 20,
        justifyContent : 'center',
        borderRadius : 5,  
        marginTop : 50,
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