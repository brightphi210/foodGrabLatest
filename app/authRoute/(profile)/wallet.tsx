import { Image, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackHeader from '@/components/BackHeader'
import { StatusBar } from 'expo-status-bar'
import Colors from '@/constants/Colors'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import BackHeaderAccount from '@/components/BackHeaderAccount'



const wallet = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [cardNumber, setCardNumber] = useState<any>(null)
    const [cardCVV, setCardCVV] = useState<any>(null)
    const [cardMonth, setCardMonth] = useState<any>(null)
    const [cardYear, setCardYear] = useState<any>(null)


    const [trimCarNumber, setTrimCardNumber] = useState<any>('')

    const [isRefressing, setIsRefressing] = useState<any>(true)


    const storeData = async () => {
        try {
          await AsyncStorage.setItem('cardNumber', cardNumber);
          await AsyncStorage.setItem('cardCVV', cardCVV);
          await AsyncStorage.setItem('cardMonth', cardMonth);
          await AsyncStorage.setItem('cardYear', cardYear);
          console.log('Data stored successfully!');
          alert('card added successfully')
          router.replace('/authRoute/(profile)/wallet')
        } catch (error) {
          console.log('Error storing data: ', error);
        }
    };




    const retrieveData = async () => {
        try {

            setIsRefressing(false)
            const cardNumber : any = await AsyncStorage.getItem('cardNumber');
            setCardNumber(cardNumber)
            setTrimCardNumber(cardNumber)


            const cardCVV :any = await AsyncStorage.getItem('cardCVV');
            setCardCVV(cardCVV)

            const cardYear : any = await AsyncStorage.getItem('cardYear');

            setCardYear(cardYear)

            const cardMonth : any = await AsyncStorage.getItem('cardMonth');
            setCardMonth(cardMonth)

            if (cardNumber !== null && cardCVV !== null && cardMonth !== null && cardYear !== null) {
                console.log('Stored Number:', cardNumber);
            } else {
                console.log('No data stored yet.');
            }



        } catch (error) {
          console.log('Error retrieving data: ', error);
        }
    };


    useEffect(() => {
        retrieveData()
    }, [])



    const showModal = () =>{
        setIsModalOpen(true)
    }

    const hideModal = () =>{
        setIsModalOpen(false)
    }

    const router = useRouter()

    const deleteAll = () => {
        AsyncStorage.removeItem('cardNumber');
        AsyncStorage.removeItem('cardCVV');
        AsyncStorage.removeItem('cardMonth');
        AsyncStorage.removeItem('cardYear');
        router.replace('/authRoute/(profile)/wallet')
    };


    cardYear
    cardMonth
      


  return (
    <RefreshControl refreshing={isRefressing} style={styles.container}>
        
        <StatusBar style='dark'/>
        <BackHeaderAccount />
        <Text style={{fontFamily : 'Railway3', fontSize : 16}}>Wallet</Text>

        <View style={styles.card}>

            <View>
                <Text style={{fontFamily : 'Railway3', paddingBottom : 10, fontSize : 12}}>Available Balance</Text>
                <Text style={{fontWeight : 'bold', fontSize : 25}}>N4,500.00</Text>
                
                <TouchableOpacity style={{display : 'flex', flexDirection : 'row', alignItems : 'center', paddingTop : 30, gap : 5,}}>
                    <AntDesign name='plus' size={15} style={{fontWeight : 'bold'}}/>
                    <Text style={{fontFamily : 'Railway2', fontSize : 12}}>Add Fund</Text>
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={{display : 'flex', 
                    flexDirection : 'row', 
                    alignItems : 'center', gap : 10, 
                    backgroundColor : Colors.myGreen, 
                    marginLeft : 'auto',
                    padding : 10,
                    borderRadius : 5,
                }}>
                <View>
                    <Text style={{fontFamily : 'Railway3', color : 'white', fontSize : 10}}>Wema</Text>
                    <Text style={{fontWeight : 'bold', color : 'white', fontSize : 10}}>9094422807</Text>
                </View>
                <Text style={{fontFamily : 'Railway3', color : 'white', fontSize : 11, }}><Ionicons name='copy-outline' color={'white'} size={11}/> Copy</Text>
            </TouchableOpacity>


            <View style={{position : 'absolute', right : -25, bottom : -40}}>
                <Image source={require('../../../assets/images/walletLogo.png')} style={{width : 110, height : 110}}/>
            </View>
        </View>


        <View style={{marginTop : 30}}>
            <View style={{backgroundColor : Colors.myLightGray, padding : 10, borderRadius : 5, marginBottom : 30}}>
                <Text style={{fontFamily : 'Railway3', fontSize : 15}}>Bank Card</Text>
            </View>

            
            {
                cardNumber === null ? (
                    <TouchableOpacity onPress={showModal} style={{display : "flex", flexDirection : 'row', alignItems : 'center', gap : 10}}>
                        <Ionicons name='add' size={15}/>
                        <Text style={{fontFamily : 'Railway3'}}>Add a new debit card</Text>
                    </TouchableOpacity>

                ) : (

                    <View 
                         
                        style={{display : "flex", flexDirection : 'row', alignItems : 'center', gap : 10, paddingHorizontal : 10}}>

                        <TouchableOpacity onPress={showModal}>
                            <View>
                                {
                                    trimCarNumber === null ? '' : (<Text style={{fontSize : 20}}>*** *** ***{trimCarNumber.slice(0, 4)}</Text>)
                                }
                                <Text style={{fontSize : 15, color : 'gray'}}>{cardMonth}/{cardYear}</Text>
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={{marginLeft : 'auto'}} onPress={deleteAll}>
                            <FontAwesome name='trash' size={15} color={Colors.myRed} />
                        </TouchableOpacity>
                    </View>
                )
            }



        </View>

    
        {isModalOpen && (

            <Modal 
                isVisible={isModalOpen} backdropOpacity={0.30} 
                animationIn={'slideInDown'} animationOut={'fadeOut'} 
                animationInTiming={500} animationOutTiming={10}
                
            >
                
                <View style={styles.modalContainer}>

                    <TouchableOpacity style={{marginLeft : 'auto',}} onPress={hideModal}>
                        <Ionicons name='close-circle-outline' size={20}/>
                    </TouchableOpacity>
                    
                    <View style={{paddingBottom : 10,}}>
                        <Text style={{fontFamily : 'Railway3', fontSize : 12, paddingBottom : 5}}>Card Number</Text>
                        <TextInput 
                            placeholder='Card Number' 
                            style={styles.inputStyles}
                            onChangeText={(e:any)=>{setCardNumber(e)}}
                            value={cardNumber}
                            keyboardType="numeric"
                            maxLength={12}
                            
                        />
                    </View>


                    <View style={{paddingBottom : 10,}}>
                        <Text style={{fontFamily : 'Railway3', fontSize : 12, paddingBottom : 5}}>Month</Text>
                        <TextInput 
                            placeholder='Month' 
                            style={styles.inputStyles}
                            onChangeText={(e:any)=>{setCardMonth(e)}}
                            value={cardMonth}
                            keyboardType="numeric"
                            maxLength={2}
                        />
                    </View>


                    <View style={{paddingBottom : 10,}}>
                        <Text style={{fontFamily : 'Railway3', fontSize : 12, paddingBottom : 5}}>Year</Text>
                        <TextInput 
                            placeholder='Year'
                            style={styles.inputStyles}
                            onChangeText={(e:any)=>{setCardYear(e)}}
                            value={cardYear}
                            keyboardType="numeric"
                            maxLength={4}
                        />
                    </View>

                    <View style={{paddingBottom : 10,}}>
                        <Text style={{fontFamily : 'Railway3', fontSize : 12, paddingBottom : 5}}>CVV</Text>
                        <TextInput 
                            placeholder='CVV' 
                            style={styles.inputStyles}
                            onChangeText={(e:any)=>{setCardCVV(e)}}
                            value={cardCVV}
                            keyboardType="numeric"
                            maxLength={3}
                        />
                    </View>


                    <TouchableOpacity onPress={storeData} style={{backgroundColor : Colors.myRed, padding : 10, borderRadius : 5,}}>
                        <Text style={{textAlign : 'center', color : 'white', fontFamily : 'Railway2'}}>Save</Text>
                    </TouchableOpacity>
                </View>

            </Modal>
        )}
        
    </RefreshControl>
  )
}

export default wallet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 0,
    },

    card : {
        marginTop : 10,
        backgroundColor : Colors.myLightPink,
        padding : 15,
        borderRadius : 10,
        overflow : 'hidden',
        height : 140,
        borderWidth : 1.5,
        borderColor : Colors.myPink, 
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'flex-start'
    },

    modalContainer :{
        backgroundColor : 'white',
        borderRadius : 10,
        padding : 20,
        paddingVertical : 30
    },

    inputStyles : {
        borderWidth : 1, 
        borderColor : Colors.myGray,
        padding : 6,
        paddingHorizontal : 20,
        fontSize : 13,
        borderRadius : 5,
        width : '100%'
    },
})