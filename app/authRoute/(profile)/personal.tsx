import { StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import BackHeader from '@/components/BackHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BackHeaderAccount from '@/components/BackHeaderAccount'


const personal = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState('');

    
    const [showActive, setShowActiveColor] = useState(false)
    const [showInActive, setShowInActiveColor] = useState(true)

    const [isLoading, setIsLoading] = useState(false)



    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    };


    const showFunc = () =>{
        setShowActiveColor(true)
        setShowInActiveColor (false)
    }


    const hideFunc = () =>{
        setShowActiveColor(false)
        setShowInActiveColor (true)
    }


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
    <View style={styles.container}>
        
        <StatusBar style='dark'/>
        <BackHeaderAccount />
        <Text style={{fontFamily : 'Railway3', fontSize : 15}}>Person Details</Text>

        <View style={{paddingVertical : 20}}>

            <View style={{paddingBottom : 20}}>
                <Text style={{fontFamily : 'Railway3', fontSize : 13, paddingBottom : 5}}>Full name</Text>
                <TextInput 
                    placeholder='Full name' 
                    style={styles.inputStyles}
                    value={userDetails.fullname}
                />

            </View>


            {/* <View style={{paddingBottom : 20, position : 'relative'}}>
                <Text style={{fontFamily : 'Railway3', fontSize : 13, paddingBottom : 5}}>Phone Number</Text>
                <TextInput placeholder='Phone Number' style={styles.inputStyles}/>
                <Text style={{position : 'absolute', right : 20, top: "60%", fontSize : 10, fontFamily : 'Railway3', color : Colors.btnGreen}}>{userDetails.emailVerificationStatus}</Text>
            </View> */}


            <View style={{paddingBottom : 20, position : 'relative'}}>
                <Text style={{fontFamily : 'Railway3', fontSize : 13, paddingBottom : 5}}>Email address</Text>
                <TextInput 
                    placeholder='Email Address' 
                    style={styles.inputStyles}
                    value={userDetails.email}
                />
                <Text style={{position : 'absolute', right : 20, top: "60%", fontSize : 10, fontFamily : 'Railway3', color : Colors.btnGreen}}>{userDetails.emailVerificationStatus}</Text>
            </View>
        </View>

        

        {/* <View style={{backgroundColor : Colors.myLightGray, padding : 10}}>
            <Text style={{fontFamily : 'Railway3', fontSize : 13}}>Change Password </Text>
        </View>
        <View style={{paddingVertical : 20}}>


            <View style={{paddingBottom : 10}}>
                <Text style={{fontFamily : 'Railway3', paddingBottom : 10, fontSize : 13}}>Password</Text>
                <View>
                    <TextInput placeholder='Password:' 
                        style={styles.inputStyles}
                        secureTextEntry={!showPassword1}
                        // value={ password}
                    />

                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconStyle}>
                        {showPassword1 ? 
                            <Ionicons name='eye-off' size={15}/>
                            :
                            <Ionicons name='eye' size={15} /> 
                        }
                    </TouchableOpacity>
                    
                </View>
            </View>

            <View style={{paddingBottom : 10}}>
                <Text style={{fontFamily : 'Railway3', paddingBottom : 10, fontSize : 13}}>Confirm Password</Text>
                <View>
                    <TextInput placeholder='Password:' 
                        style={styles.inputStyles}
                        secureTextEntry={!showPassword}
                        // value={ password}
                    />

                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconStyle}>
                        {showPassword ? 
                            <Ionicons name='eye-off' size={15}/>
                            :
                            <Ionicons name='eye' size={15} /> 
                        }
                    </TouchableOpacity>
                    
                </View>
            </View>

            <TouchableOpacity style={styles.btnStyles}>
                <Text style={{fontSize : 12, fontFamily : 'Railway2', color : 'white'}}>{isLoading ? (<ActivityIndicator color={'white'}/>) : 'Change Password'}</Text>
            </TouchableOpacity>


        </View> */}
    </View>
  )
}

export default personal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    inputStyles : {
        borderWidth : 1, 
        borderColor : Colors.myGray,
        padding : 15,
        paddingHorizontal : 20,
        fontSize : 13,
        borderRadius : 5
    },

    inputStylesa : {
        padding : 10,
        borderColor : Colors.myGray,
        borderWidth : 1,
        borderRadius : 5,
        fontSize : 15,
        position : 'relative',
        fontFamily :'Railway1'
    },

    btnStyles :{
        height : 35,
        backgroundColor : Colors.myRed,
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal : 0,
        justifyContent : 'center',
        borderRadius : 5,  
        marginTop : 30,
    },

    iconStyle : {
        position : 'absolute',
        top : 15,
        right : 30,
    }

})