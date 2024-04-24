import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const order_details = () => {
    const route = useRoute();
    const { data } : any = route.params;
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style='dark'/>

        <View style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
            <Text><Ionicons name='arrow-back' size={30}/></Text>

            <Text style={{marginLeft : 'auto', fontFamily : 'Railway2'}}>Your Order is packaged</Text>
        </View>


        <View style={{display : 'flex', flexDirection : 'row', marginTop : 20}}>
            <Text style={{fontSize : 15, fontFamily : 'Railway2'}}>Order details</Text>

            <View style={{marginLeft : 'auto', display : 'flex', flexDirection : 'row', alignItems : 'center', gap : 5 }}>
                <Text style={{fontFamily : 'Railway1', fontSize : 11}}>Arrives between</Text>
                <Text style={{ fontSize : 15}}>12:30 pm</Text>
            </View>
        </View>

        <View style={{marginTop : 30, }}>
            <View style={{
                    display : 'flex', 
                    flexDirection :'row', 
                    gap : 2, justifyContent : 'space-between', 
                    alignItems : 'flex-start',
                    borderBottomColor : Colors.myGray, 
                    borderBottomWidth : 1, borderStyle : 'dashed', 
                    paddingBottom : 20
                }}>
                <View style={{}}>
                    <Text style={{textAlign : 'center'}}><FontAwesome name='list-alt' size={20}/></Text>
                    <Text style={{fontSize : 10, textAlign : 'center', fontFamily: 'Railway1', paddingTop : 5}}>Processing</Text>
                </View>

                <Text>-  -  -  -</Text>

                <View>
                    <Text style={{textAlign : 'center'}}><FontAwesome name='shopping-basket' size={20}/></Text>
                    <Text style={{fontSize : 10, fontFamily: 'Railway1', paddingTop : 5}}>Packaged</Text>
                </View>

                <Text>-  -  -  -</Text>

                <View>
                    <Text style={{textAlign : 'center'}}><FontAwesome name='motorcycle' size={20}/></Text>
                    <Text style={{fontSize : 10, fontFamily: 'Railway1', paddingTop : 5}}>In-transit</Text>
                </View>


                <Text>-  -  -  -</Text>

                <View>
                    <Text style={{textAlign : 'center'}}><Ionicons name='checkmark-circle-outline' size={20}/></Text>
                    <Text style={{fontSize : 10, fontFamily: 'Railway1', paddingTop : 5}}>Delivered</Text>
                </View>
            </View>

            <View>

                <View style={{
                        borderBottomColor : Colors.myGray, 
                        borderBottomWidth : 1, borderStyle : 'dashed', 
                        paddingBottom : 20
                    }}>
                    <Text style={{fontFamily : 'Railway2', fontSize : 15, paddingVertical : 20}}>Items Ordered</Text>

                    <View>
                        <View style={{
                                display : 'flex', 
                                flexDirection : 'row', 
                                alignItems : 'center', 
                                paddingBottom : 20
                            }}>
                            <Text style={{fontFamily : 'Railway3', fontSize : 13}}>Jollof Rice</Text>
                            <Text style={{marginLeft : 'auto', fontSize : 13}}>N2500</Text>
                        </View>

                        <View style={{
                                display : 'flex', 
                                flexDirection : 'row', 
                                alignItems : 'center', 
                                paddingBottom : 20
                            }}>
                            <Text style={{fontFamily : 'Railway3', fontSize : 13}}>Jollof Rice</Text>
                            <Text style={{marginLeft : 'auto', fontSize : 13}}>N2500</Text>
                        </View>

                        <View style={{
                                display : 'flex', 
                                flexDirection : 'row', 
                                alignItems : 'center', 
                                paddingBottom : 10
                            }}>
                            <Text style={{fontFamily : 'Railway3', fontSize : 13, color : Colors.myRed,}}>Total</Text>
                            <Text style={{marginLeft : 'auto', fontSize : 13, color : Colors.myRed}}>N4,650.00</Text>
                        </View>
                    </View>

                </View>


                <View style={{
                        borderBottomColor : Colors.myGray, 
                        borderBottomWidth : 1, borderStyle : 'dashed', 
                        paddingBottom : 20
                    }}>
                    <Text style={{fontFamily : 'Railway2', fontSize : 15, paddingVertical : 20}}>Restaurant</Text>

                    <View>
                        <View style={{
                                display : 'flex', 
                                flexDirection : 'column', 
                                paddingBottom : 20
                            }}>
                            <Text style={{ fontSize : 13}}>Kilimajaro - Big Tree</Text>
                        </View>
                    </View>

                </View>
            </View>
        </View>


    </SafeAreaView>
  )
}

export default order_details

const styles = StyleSheet.create({
    container : {
        paddingHorizontal : 20,
        paddingTop : 30
    }
})