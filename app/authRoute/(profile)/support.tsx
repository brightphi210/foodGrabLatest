import { ActivityIndicator,  StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '@/Enpoints/Endpoint'
import { useTheme } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import BackHeader from '@/components/BackHeader'
import { ScrollView } from 'react-native'
import Colors from '@/constants/Colors'
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'
import BackHeaderAccount from '@/components/BackHeaderAccount'
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';


const support = () => {

    const [message, setMessage] =useState<any>('')
    const [phoneNumber, setPhoneNumber] = useState<any>('')
    const [email, setEmail] = useState<any>('')
    const [name, setName] = useState<any>('')


    const [showModal, setShowModal] = useState<any>(false)
    const [showModal2, setShowModal2] = useState<any>(false)
    const [alert, setAlert] = useState<any>('')



    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null);

    const router = useRouter()

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


    const handleSend = async () => {
        setIsLoading(true)
        if(message === '' || phoneNumber === '' || email === '' || name === ''){
            setAlert('Please fill out all field')
            setIsLoading(false)
            setShowModal(true);
            return;
        }        

        try {
            const res = await fetch(`${BASE_URL}sendMessage`, {
                
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${userToken}`,
                },
                body : JSON.stringify({
                    message: message,
                    phoneNumber: phoneNumber,
                    email: email,
                    name: name
                })
            })


            if (res.status === 201 || res.ok ) {
                setIsLoading(false)
                console.log('Message Sent Successfully')
                setShowModal2(true)

            }

            else{
                console.log('Message was not sent successfully')
                setIsLoading(false)

            }
        
            setMessage('');
            setPhoneNumber('');
            setEmail('');
            setName('');

        } catch (error) {
            
        }
    }


  return (
    <View style={styles.container}>
        <StatusBar style='dark'/>
        
        <View style={{backgroundColor : 'white', zIndex : 3, paddingBottom : 10, marginBottom : 30,}}>
            <BackHeaderAccount />
            <Text style={{fontFamily : 'Railway3', fontSize : 16}}>support</Text>

            <View>
                <Text style={{fontSize : 12, fontFamily : 'Railway3', paddingTop : 10}}>Welcome to food grab support, Ask us anything or share your feedback with me</Text>
            </View>
        </View>


        <TouchableOpacity style={styles.btnStyles} onPress={() => Linking.openURL('https://wa.link/hpiqzo')}>
                <Text style={{fontSize : 15, fontFamily : 'Railway2', color : 'white'}}>{isLoading ? (<ActivityIndicator color={'white'}/>) : 'Contact'}</Text>
        </TouchableOpacity>


        {/* <TouchableOpacity style={styles.btnStyles} onPress={() => WebBrowser.openBrowserAsync('https://wa.link/hpiqzo')}>
                <Text style={{fontSize : 15, fontFamily : 'Railway2', color : 'white'}}>{isLoading ? (<ActivityIndicator color={'white'}/>) : 'Contact Here'}</Text>
        </TouchableOpacity> */}

        {/* <View style={styles.inputViews}>

           <TextInput 
                placeholder='Enter Name: ' 
                style={styles.eachInputViews}
                value={name}
                onChangeText={setName}
            />

            <TextInput 
                placeholder='Enter Phone Number: ' 
                style={styles.eachInputViews}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />

            <TextInput 
                placeholder='Enter Email: ' 
                style={styles.eachInputViews}
                value={email}
                onChangeText={setEmail}
            />

            <TextInput 
                placeholder='Enter Message: ' 
                style={styles.eachInputViews}
                multiline={true}
                numberOfLines={3}

                value={message}
                onChangeText={setMessage}
            />


            <TouchableOpacity style={styles.btnStyles} onPress={handleSend}>
                <Text style={{fontSize : 15, fontFamily : 'Railway2', color : 'white'}}>{isLoading ? (<ActivityIndicator color={'white'}/>) : 'Send'}</Text>
            </TouchableOpacity>
        </View> */}


        {/* <Modal                 
            isVisible={showModal} backdropOpacity={0.30} 
            animationIn={'slideInDown'} animationOut={'fadeOut'} 
            animationInTiming={500} animationOutTiming={10}
        >
            <View style={styles.modalStyle}>
                {alert && <Text style={{fontFamily : 'Railway1', fontSize : 15}}>{alert}</Text>}
                <TouchableOpacity onPress={()=>setShowModal(false)}>
                    <AntDesign name='closecircleo' size={15} />
                </TouchableOpacity>
            </View>
        </Modal>


        <Modal                 
            isVisible={showModal2} backdropOpacity={0.30} 
            animationIn={'slideInDown'} animationOut={'fadeOut'} 
            animationInTiming={500} animationOutTiming={10}
        >
            <View style={styles.modalStyle2}>
                <Image source={require('../../../assets/images/succes2.png')} style={{width : 100, height : 100}}/>
                <Text style={{fontFamily : 'Railway1', fontSize : 15, padding : 0}}>Message Sent Succesfully</Text>

                <View style={{display : 'flex', flexDirection : 'row', gap : 10,}}>
                    <TouchableOpacity onPress={()=>router.replace('/(protected)/home')}
                        style={{backgroundColor : Colors.myRed, 
                            paddingHorizontal : 15, paddingVertical : 5, 
                            marginTop : 15, borderRadius : 3,

                        }}
                    >
                        <Text style={{fontSize : 13, fontFamily : 'Railway3', color : 'white'}}>Continue</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={()=> setShowModal2(false)}
                        style={{borderColor : Colors.myGray, borderWidth : 1, 
                            paddingHorizontal : 15, paddingVertical : 5, 
                            marginTop : 15, borderRadius : 3,
                        }}
                    >
                        <Text style={{fontSize : 13, fontFamily : 'Railway1', color : Colors.myGreen}}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal> */}
        


    </View>
  )
}

export default support

const styles = StyleSheet.create({
    container : {
        paddingHorizontal : 20,
        position : 'relative',
        flex : 1
    },


    inputViews :{
        marginTop : 40,
    },

    eachInputViews : {
        borderWidth : 1, 
        borderColor : Colors.myGray,
        fontFamily : 'Railway3',
        padding : 15,
        paddingHorizontal : 20,
        fontSize : 13,
        borderRadius : 5,
        marginBottom : 20,
    },

    btnStyles :{
        height : 50,
        backgroundColor : Colors.myRed,
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal : 20,
        justifyContent : 'center',
        borderRadius : 6,
        width : '100%',
    },

    modalStyle : {
        flex: 1,
        display :'flex',
        flexDirection : 'row',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.myLightPink,
        width: '100%',
        maxHeight: '10%',
        alignSelf : 'center',
        borderRadius : 5,
        gap : 10
    },



    modalStyle2 : {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        width: '100%',
        maxHeight: '35%',
        alignSelf : 'center',
        borderRadius : 10,
    }

})