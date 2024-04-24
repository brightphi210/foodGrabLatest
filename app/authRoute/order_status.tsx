import { StyleSheet, Text, View, Image, Pressable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import Colors from '@/constants/Colors';
import {Link} from 'expo-router'
import { StatusBar } from 'expo-status-bar';


const order_status = () => {
  return (
    <SafeAreaView style={styles.container}>

        <StatusBar style='dark'/>

        <View style={{paddingTop : 100}}>

            <View style={{}}>
                <View style={{width : 200, height : 200, alignSelf : 'center', paddingTop : 50}}>
                    <Image source={require('../../assets/images/succes2.png')} style={{width : 200, height : 200}}/>
                </View>
                <Text style={{
                    textAlign : 'center', 
                    fontFamily : 'Railway3', 
                    fontSize : 15, paddingTop : 50, 
                    width : '80%', alignSelf : 'center' 
                }}>ORDER SUCCESSFULLY PLACED</Text>
            </View>


            <View style={{paddingTop : 20}}>
                <Link href={'/(protected)/order'} asChild>
                    <Pressable style={styles.btnStyles}>
                        <Text style={{color : 'white', fontSize : 15, fontFamily : 'Railway3'}}>See order status</Text>
                    </Pressable>
                </Link>

                <Link href={'/(protected)/home'} asChild>
                    <Pressable style={styles.btnStyles2}>
                        <Text style={{color : Colors.myRed, fontSize : 15, fontFamily : 'Railway3'}}>Go back home</Text>
                    </Pressable>
                </Link>
            </View>
        </View>

        

    </SafeAreaView>
  )
}

export default order_status

const styles = StyleSheet.create({

    container : {
        flex : 1,
        backgroundColor : 'white',
        paddingHorizontal : 20,
        display : 'flex',
        alignContent : 'center',    
    },


    btnStyles :{
        height : 40,
        backgroundColor : Colors.myRed,
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal : 20,
        justifyContent : 'center',
        borderRadius : 5,  
        marginBottom : 20,
        fontSize : 12,
        width : '80%',
        alignSelf : 'center',
    },


    btnStyles2 :{
        height : 40,
        borderColor : Colors.myRed,
        borderWidth : 1,
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal : 20,
        justifyContent : 'center',
        borderRadius : 5,  
        fontSize : 12,
        width : '80%',
        alignSelf : 'center',
    },


})