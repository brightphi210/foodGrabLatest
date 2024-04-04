import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import Colors from '@/constants/Colors';
import {Link} from 'expo-router'


const order_status = () => {
  return (
    <SafeAreaView style={styles.container}>

        <View style={{}}>
            <View style={{width : 150, height : 150, alignSelf : 'center', paddingTop : 50}}>
                <Image source={require('../../assets/images/succes2.png')} style={{width : 150, height : 150}}/>
            </View>
            <Text style={{textAlign : 'center', fontFamily : 'Railway3', fontSize : 20, paddingTop : 50, }}>Your order has been successfully placed.</Text>
        </View>


        <View style={{paddingTop : 50}}>
            <View style={styles.eachDiv}>
                <Text style={{fontFamily : 'Railway3', color : 'gray', fontSize : 15}}>Time</Text>
                <Text style={{marginLeft : 'auto', fontFamily : 'Railway3', fontSize : 15}}>12:00 pm</Text>
            </View>

            <View style={styles.eachDiv}>
                <Text style={{fontFamily : 'Railway3', color : 'gray', fontSize : 15}}>Date</Text>
                <Text style={{marginLeft : 'auto', fontFamily : 'Railway3', fontSize : 15}}>Fri, Nov. 24</Text>
            </View>

            <View style={styles.eachDiv}>
                <Text style={{fontFamily : 'Railway3', color : 'gray', fontSize : 15}}>Order number</Text>
                <Text style={{marginLeft : 'auto', fontFamily : 'Railway3', fontSize : 15}}>FG49573</Text>
            </View>

            <View style={styles.eachDiv}>
                <Text style={{fontFamily : 'Railway3', color : 'gray', fontSize : 15}}>Price</Text>
                <Text style={{marginLeft : 'auto', fontFamily : 'Railway3', fontSize : 15}}>N4,650.00</Text>
            </View>
        </View>

        
        <View style={{paddingTop : 20}}>
            <TouchableOpacity style={styles.btnStyles}>
                <Text style={{color : 'white', fontSize : 15, fontFamily : 'Railway3'}}>See order status</Text>
            </TouchableOpacity>

            <Link href={'/(protected)/home'} asChild>
                <TouchableOpacity style={styles.btnStyles2}>
                    <Text style={{color : Colors.myRed, fontSize : 15, fontFamily : 'Railway3'}}>Go back home</Text>
                </TouchableOpacity>
            </Link>
        </View>

    </SafeAreaView>
  )
}

export default order_status

const styles = StyleSheet.create({

    container : {
        flex : 1,
        backgroundColor : 'white',
        paddingHorizontal : 20
    },

    eachDiv :{
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        paddingTop : 20,
    },

    btnStyles :{
        height : 50,
        backgroundColor : Colors.myRed,
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal : 20,
        justifyContent : 'center',
        borderRadius : 10,  
        marginTop : 30,
    },


    btnStyles2 :{
        height : 50,
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal : 20,
        justifyContent : 'center',
        borderRadius : 10,  
        marginTop : 10,
    },


})