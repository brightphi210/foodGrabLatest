import Checkbox from 'expo-checkbox';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Link, useNavigation, useRouter} from 'expo-router'
import { BASE_URL } from '@/Enpoints/Endpoint';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import MyModal from '@/components/MyModal';;
import { StatusBar } from 'expo-status-bar';


import AsyncStorage from '@react-native-async-storage/async-storage';
const register = () => {

    const [showActive, setShowActiveColor] = useState(false)
    const [showInActive, setShowInActiveColor] = useState(true)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpen1, setIsModalOpen1] = useState(false)
    const [isModalOpen2, setIsModalOpen2] = useState(false)

    const [isChecked, setChecked] = useState<any>(false);
    const [showPassword, setShowPassword] = useState<any>('');
    const [showPassword1, setShowPassword1] = useState<any>('');


    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    };

    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };  

    const showFunc = () =>{
        setShowActiveColor(true)
        setShowInActiveColor (false)
    }


    const hideFunc = () =>{
        setShowActiveColor(false)
        setShowInActiveColor (true)
    }


    const closeModal = () =>{
        setIsModalOpen(false)
    }

    const closeModal1 = () =>{
        setIsModalOpen1(false)
    }

    const closeModal2 = () =>{
        setIsModalOpen2(false)
    }


    const [fullname, setFullame] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emptyField, setEmptyField] = useState<any>(false);
    const [samePassword, setSamePassword] = useState<any>(false);
    const [statusMessage, setStatusMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false)


    const navigation = useRouter()

    const handleSignup = async () => {
        setIsLoading(true)

        if (!fullname || !email || !password || !confirmPassword) {
            setEmptyField('All Fields Required!! ')
            setIsModalOpen(true)
            setIsLoading(false);
            return;
        }
    
        else if (password !== confirmPassword) {
            setSamePassword('Password1 & Password2 must match')
            setIsLoading(false);
            setIsModalOpen1(true)
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}signup`, {
                fullname,
                email,
                password,
                confirmPassword,
            });

            const data = response;
            
            await AsyncStorage.setItem('user', JSON.stringify(data.data));
            setStatusMessage(response.data.mssg);
            setIsLoading(false)
            setIsModalOpen2(true)
            if (response.data.status === 'SUCCESS'){
                navigation.replace('/otp_verification')
            }


        } catch (err) {
            console.error(err);
            alert('Signup failed!');
        }
    };



    


  return (
    <SafeAreaView style={{flex : 1, backgroundColor : Colors.myRed,}}>
        <StatusBar style='light'/>
        
      <View style={styles.container}>
        <ScrollView >
            <Text style={{fontFamily : 'Railway2', fontSize : 20}}>Get Started</Text>
            <Text style={{fontFamily : 'Railway1', fontSize : 13}}>Sign up today and start placing your order</Text>

            <View style={{
                display : 'flex', flexDirection :'row', 
                padding : 1, width : '100%', backgroundColor : Colors.myRed, 
                borderRadius : 5, marginTop : 15
            }}>
                <TouchableOpacity style={showInActive ? styles.active : styles.inActive} onPress={showFunc}>
                    <Text style={showInActive ? styles.activeColor : styles.inActiveColor}>Phone Number</Text>
                </TouchableOpacity>

                <TouchableOpacity style={showActive ? styles.active : styles.inActive} onPress={hideFunc}>
                    <Text style={showActive ? styles.activeColor : styles.inActiveColor}>Email Address</Text>
                </TouchableOpacity>
            </View>

            { 
                showActive ? 
                    <View style={{paddingTop : 0}}>
                      <View style={styles.inputDiv}>
                            <Text style={{fontFamily : 'Railway3', paddingBottom : 10, fontSize : 13}}>Full Name</Text>
                            <TextInput 
                                placeholder='Your Fullname : ' 
                                style={styles.inputStyles}
                                value={fullname}
                                onChangeText={setFullame}
                            />
                        </View>

                        <View style={styles.inputDiv}>
                            <Text style={{fontFamily : 'Railway3', paddingBottom : 10, fontSize : 13}}>Phone Number</Text>
                            <TextInput placeholder='Phone Number : ' style={styles.inputStyles}/>
                        </View>

                        <View style={styles.inputDiv}>
                            <Text style={{fontFamily : 'Railway3', paddingBottom : 10, fontSize : 13}}>Password</Text>
                            <View>
                                <TextInput placeholder='Password:' 
                                    style={styles.inputStyles}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />

                                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconStyle}>
                                    {showPassword ? 
                                        <Ionicons name='eye-off' size={20}/>
                                        :
                                        <Ionicons name='eye' size={20} /> 
                                    }
                                </TouchableOpacity>
                                
                            </View>
                        </View>

                        <View style={styles.inputDiv}>
                            <Text style={{ fontFamily: 'Railway3', paddingBottom: 10, fontSize: 13 }}>
                                Confirm Password
                            </Text>
                            <View>
                                <TextInput
                                    placeholder='Confirm Password:'
                                    style={styles.inputStyles}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!showPassword1}
                                />

                                <TouchableOpacity onPress={togglePasswordVisibility1} style={styles.iconStyle}>
                                    {showPassword1 ? <Ionicons name='eye-off' size={20} /> : <Ionicons name='eye' size={20} />}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> 
                
                : 

                    <View style={{paddingTop : 0}}>
                        <View style={styles.inputDiv}>
                            <Text style={{fontFamily : 'Railway3', paddingBottom : 10, fontSize : 13}}>Full Name</Text>
                            <TextInput 
                                placeholder='Your Fullname : ' 
                                style={styles.inputStyles}
                                value={fullname}
                                onChangeText={setFullame}
                            />
                        </View>

                        <View style={styles.inputDiv}>
                            <Text style={{fontFamily : 'Railway3', paddingBottom : 10, fontSize : 13}}>Email address</Text>
                            <TextInput 
                                placeholder='Email address : ' 
                                style={styles.inputStyles}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={styles.inputDiv}>
                            <Text style={{fontFamily : 'Railway3', paddingBottom : 10, fontSize : 13}}>Password</Text>
                            <View>
                                <TextInput placeholder='Password:' 
                                    style={styles.inputStyles}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />

                                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconStyle}>
                                    {showPassword ? 
                                        <Ionicons name='eye-off' size={20}/>
                                        :
                                        <Ionicons name='eye' size={20} /> 
                                    }
                                </TouchableOpacity>
                                
                            </View>
                        </View>

                        <View style={styles.inputDiv}>
                            <Text style={{ fontFamily: 'Railway3', paddingBottom: 10, fontSize: 13 }}>
                                Confirm Password
                            </Text>
                            <View>
                                <TextInput
                                    placeholder='Confirm Password:'
                                    style={styles.inputStyles}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!showPassword1}
                                />

                                <TouchableOpacity onPress={togglePasswordVisibility1} style={styles.iconStyle}>
                                    {showPassword1 ? <Ionicons name='eye-off' size={20} /> : <Ionicons name='eye' size={20} />}
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
            }



            <View style={{display : 'flex', flexDirection : 'row', gap : 5, paddingTop : 10, alignItems : 'center'}}>
                <Checkbox style={{borderColor : Colors.myRed, width : 15, height : 15}} value={isChecked} onValueChange={setChecked} color={isChecked && Colors.myRed}/>
                <Text style={{width : '90%', fontSize : 12, fontFamily : 'Railway1'}}>
                    If you are creating a new account, 
                    <Text style={{color : Colors.myRed}}>Terms & Conditions</Text> 
                    and  <Text style={{color : Colors.myRed}}>Privacy Policy</Text> will apply
                </Text>
            </View>

            <TouchableOpacity style={styles.btnStyles} onPress={handleSignup}>
                <Text style={{fontSize : 15, fontFamily : 'Railway2', color : 'white'}}>{isLoading ? (<ActivityIndicator color={'white'}/>) : 'Get Started'}</Text>
            </TouchableOpacity>

            <Text style={{textAlign : 'center', paddingTop : 10, fontSize : 15, fontFamily : 'Railway3',}}>
                Have an account? 
                <Link href={'/login'}><Text style={{color : Colors.myRed}}>Login</Text></Link>
            </Text>
        </ScrollView>

      </View>

      <MyModal 
            isModalOpen={isModalOpen} 
            isModalOpen1={isModalOpen1} 
            isModalOpen2={isModalOpen2} 
            statusMessage={statusMessage} 
            emptyField={emptyField} 
            closeModal={closeModal} 
            samePassword={samePassword}
            closeModal1={closeModal1}
            closeModal2={closeModal2}
        />
    </SafeAreaView>
  )
}

export default register

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white',
        marginTop : 70, 
        borderTopEndRadius : 20,
        borderTopLeftRadius : 20,
        paddingTop : 30,
        paddingHorizontal : 20,
    },

    active : {
        backgroundColor : Colors.myRed,
        padding : 13,
        paddingHorizontal : 20,
        width : '50%',
        borderRadius : 5
    },

    activeColor : {
        color : 'white',
        fontSize : 13, fontFamily : 'Railway3'
    },

    inActive : {
        backgroundColor : 'white',
        padding : 13,
        paddingHorizontal : 20,
        width : '50%',
        borderRadius : 5
    },

    inActiveColor : {
        color : Colors.myGreen,
        fontSize : 13, fontFamily : 'Railway3'
    },

    inputDiv : {
        paddingTop : 15,
        
    },

    inputStyles : {
        padding : 10,
        borderColor : Colors.myGray,
        borderWidth : 1,
        borderRadius : 5,
        fontSize : 13,
        position : 'relative',
        fontFamily : 'Railway3'
    },

    btnStyles :{
        height : 50,
        backgroundColor : Colors.myRed,
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal : 20,
        justifyContent : 'center',
        borderRadius : 10,  
        marginTop : 15,
    },

    iconStyle : {
        position : 'absolute',
        top : 15,
        right : 30,
    },


})