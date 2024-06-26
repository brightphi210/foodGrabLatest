import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BackHeader from '@/components/BackHeader'
import { StatusBar } from 'expo-status-bar'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import BackHeaderAccount from '@/components/BackHeaderAccount'

const FAQs = () => {

    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [show4, setShow4] = useState(false)
    
    const handleShow1 = () =>{
        setShow1(!show1);
        setShow2(false)
        setShow3(false)
        setShow4(false)
    }

    const handleShow2 = () =>{
        setShow1(false);
        setShow2(!show2)
        setShow3(false)
        setShow4(false)
    }


    const handleShow3 = () =>{
        setShow1(false);
        setShow2(false)
        setShow3(!show3)
        setShow4(false)
    }

    const handleShow4 = () =>{
        setShow1(false);
        setShow2(false)
        setShow3(false)
        setShow4(!show4)
    }
  return (
    <View style={styles.container}>
        <StatusBar style='dark'/>
        <BackHeaderAccount />
        <Text style={{fontFamily : 'Railway2', fontSize : 16, paddingTop : 20}}>FAQs</Text>


        <View style={{paddingTop : 10}}>
            <TouchableOpacity onPress={handleShow1} style={{
                
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
              backgroundColor : Colors.myLightGray, padding : 15,  paddingVertical : 30,
              borderRadius : 5, display : 'flex', gap :10, marginBottom : 20
                
            }}>
                <FontAwesome name='question-circle-o' size={20} color={Colors.myRed}/>
                <Text style={{fontFamily : 'Railway3', fontSize : 15}}>How does <Text style={{color : Colors.myRed}}>Food Grab</Text> works ?</Text>
                <Ionicons name='chevron-forward-outline' size={20} style={{marginLeft : 'auto'}} color={Colors.myGray}/>
            </TouchableOpacity>

            {
                show1 && (
                <View style={{marginTop : 10, marginBottom : 20, backgroundColor : Colors.myLightGray, padding : 20, borderRadius : 5}}>
                    <Text style={{fontSize : 15, fontFamily : 'Railway1', textAlign : 'left', lineHeight : 20}}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. dolore debitis. 
                        Nisi cupiditate nesciunt distinctio doloremque incidunt autem. Animi.
                    </Text>
                </View>
                )
            }



            <TouchableOpacity onPress={handleShow2} style={{
                
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
                backgroundColor : Colors.myLightGray, padding : 15,  paddingVertical : 30,
                borderRadius : 5, display : 'flex', gap :10, marginBottom : 20
                
            }}>
                <FontAwesome name='question-circle-o' size={20} color={Colors.myRed}/>
                <Text style={{fontFamily : 'Railway3', fontSize : 15}}>How much is the delivery fee?</Text>
                <Ionicons name='chevron-forward-outline' size={20} style={{marginLeft : 'auto'}} color={Colors.myGray}/>
            </TouchableOpacity>


            {
                show2 && (
                    <View style={{marginTop : 10, marginBottom:20, backgroundColor : Colors.myLightPink, padding : 20, borderRadius : 5}}>
                    <Text style={{fontSize : 15, fontFamily : 'Railway1', textAlign : 'left', lineHeight : 20}}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. dolore debitis. 
                        Nisi cupiditate nesciunt distinctio doloremque incidunt autem. Animi.
                    </Text>
                </View>
                )
            }

            <TouchableOpacity onPress={handleShow3} style={{
                
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
              backgroundColor : Colors.myLightGray, padding : 15,  paddingVertical : 30,
              borderRadius : 5, display : 'flex', gap :10, marginBottom : 20
            }}>
                <FontAwesome name='question-circle-o' size={20} color={Colors.myRed}/>
                <Text style={{fontFamily : 'Railway3', fontSize : 15}}>How to place order</Text>
                <Ionicons name='chevron-forward-outline' size={15} style={{marginLeft : 'auto'}} color={Colors.myGray}/>
            </TouchableOpacity>


            {
                show3 && (
                    <View style={{marginTop : 10, marginBottom:20, backgroundColor : Colors.myLightGray, padding : 20, borderRadius : 5}}>
                    <Text style={{fontSize : 15, fontFamily : 'Railway1', textAlign : 'left', lineHeight : 20}}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. dolore debitis. 
                        Nisi cupiditate nesciunt distinctio doloremque incidunt autem. Animi.
                    </Text>
                </View>
                )
            }

            <TouchableOpacity onPress={handleShow4} style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
                backgroundColor : Colors.myLightGray, padding : 15,  paddingVertical : 30,
                borderRadius : 5, display : 'flex', gap :10, marginBottom : 20
            }}>
                <FontAwesome name='question-circle-o' size={20} color={Colors.myRed}/>
                <Text style={{fontFamily : 'Railway3', fontSize : 15}}>How to become a grabber?</Text>
                <Ionicons name='chevron-forward-outline' size={15} style={{marginLeft : 'auto'}} color={Colors.myGray}/>
            </TouchableOpacity>


            {
                show4 && (
                    <View style={{marginTop : 10, marginBottom:20, backgroundColor : Colors.myLightPink, padding : 20, borderRadius : 5}}>
                    <Text style={{fontSize : 15, fontFamily : 'Railway1', textAlign : 'left', lineHeight : 20}}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. dolore debitis. 
                        Nisi cupiditate nesciunt distinctio doloremque incidunt autem. Animi.
                    </Text>
                </View>
                )
            }

 


        </View>


    </View>
  )
}

export default FAQs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 0,
    },
})