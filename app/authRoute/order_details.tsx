import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

const order_details = () => {
    const route = useRoute();
    const { data } : any = route.params;

    console.log(data);


    const router = useRouter()

    const handleBackPress = () => {
      router.replace('/order'); 
    };
    
    // const [status, setStatus] = useState('processing');
    // const [status, setStatus] = useState('packaging');
    // const [status, setStatus] = useState('intransit');
    const [status, setStatus] = useState('delivered');
    
    console.log('THis is the data, ', data);
    

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style='dark'/>

        <View style={{display : 'flex', flexDirection : 'row', alignItems : 'center'}}>
            <TouchableOpacity onPress={handleBackPress}>
                <Ionicons name='arrow-back' size={30}/>
            </TouchableOpacity>

            <Text style={{marginLeft : 'auto', fontFamily : 'Railway2'}}>Your Order is Processed</Text>
        </View>


        <View style={{display : 'flex', flexDirection : 'row', marginTop : 20}}>
            <Text style={{fontSize : 15, fontFamily : 'Railway2'}}>Order details</Text>

            <View style={{marginLeft : 'auto', display : 'flex', flexDirection : 'row', alignItems : 'center', gap : 5 }}>
                <Text style={{fontFamily : 'Railway1', fontSize : 11}}>Arrives soon</Text>
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
                    <Text style={{textAlign : 'center'}}><FontAwesome name='list-alt' size={20} color={status === 'processing' ? Colors.myLightGreen : ''}/></Text>
                    <Text style={{fontSize : 10, textAlign : 'center', fontFamily: 'Railway1', paddingTop : 5}}>Processing</Text>
                </View>

                <Text>-  -  -  -</Text>

                <View>
                    <Text style={{textAlign : 'center'}}><FontAwesome name='shopping-basket' size={20} color={status === 'packaging' ? Colors.myLightGreen : ''}/></Text>
                    <Text style={{fontSize : 10, fontFamily: 'Railway1', paddingTop : 5}}>Packaged</Text>
                </View>

                <Text>-  -  -  -</Text>

                <View>
                    <Text style={{textAlign : 'center'}}><FontAwesome name='motorcycle' size={20} color={status === 'intransit' ? Colors.myLightGreen : ''}/></Text>
                    <Text style={{fontSize : 10, fontFamily: 'Railway1', paddingTop : 5}}>In-transit</Text>
                </View>


                <Text>-  -  -  -</Text>

                <View>
                    <Text style={{textAlign : 'center'}}><Ionicons name='checkmark-circle-outline' size={20} color={status === 'delivered' ? Colors.myLightGreen : ''}/></Text>
                    <Text style={{fontSize : 10, fontFamily: 'Railway1', paddingTop : 5}}>Delivered</Text>
                </View>
            </View>



            <View>

                {status === 'processing' && (
                    <>
                        <View style={{
                                borderBottomColor : Colors.myGray, 
                                borderBottomWidth : 1, borderStyle : 'dashed', 
                                paddingBottom : 20
                            }}>
                            <Text style={{fontFamily : 'Railway2', fontSize : 15, paddingVertical : 20}}>Items Ordered</Text>

                            {data.items.map((item :any) =>(

                                <View>
                                    <View style={{
                                            display : 'flex', 
                                            flexDirection : 'row', 
                                            alignItems : 'center', 
                                            paddingBottom : 20
                                        }}>
                                        <Text style={{fontFamily : 'Railway3', fontSize : 13}}>{item.name}</Text>
                                        <Text style={{marginLeft : 'auto', fontSize : 13}}>N{(item.price * item.quantity).toLocaleString()}</Text>
                                    </View>

                                </View>
                            ))}
                            <View style={{
                                    display : 'flex', 
                                    flexDirection : 'row', 
                                    alignItems : 'center', 
                                    paddingBottom : 10
                                }}>
                                <Text style={{fontFamily : 'Railway3', fontSize : 13, color : Colors.myRed,}}>Total</Text>
                                <Text style={{marginLeft : 'auto', fontSize : 13, color : Colors.myRed}}>N{data.totalPrice.toLocaleString()}</Text>
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

                                        <View style={{display : 'flex', flexDirection : 'row', alignItems:'center', gap : 10}}>
                                            <FontAwesome name='home' />
                                            <Text style={{ fontSize : 13}}>{data.shopId.shopName}</Text>
                                        </View>
                                </View>
                            </View>
                        </View>
                    </>
                )}


                {status === 'packaging' && (
                    <>
                        <View style={{ paddingTop : 150, justifyContent :'center', alignItems: 'center', display : 'flex'}}>
                            <Image source={require('../../assets/images/packed.png')} style={{width : 300, height : 300}}/>
                        </View>
                    </>
                )}


                {status === 'intransit' && (
                    <>
                        <View style={{ paddingTop : 150, justifyContent :'center', alignItems: 'center', display : 'flex'}}>
                            <Image source={require('../../assets/images/transit.png')} style={{width : 270, height : 250}}/>
                        </View>
                    </>
                )}


                {status === 'delivered' && (
                    <>
                        <View style={{ paddingTop : 100, justifyContent :'center', alignItems: 'center', display : 'flex'}}>
                            <Image source={require('../../assets/images/thanks.png')} style={{width : 150, height : 150}}/>

                            <View>
                                <Text style={{fontSize : 15, fontFamily : 'Railway3', textAlign : 'center'}}>Thank you for using Foodgrab !!</Text>
                                <Text style={{fontSize : 15, fontFamily : 'Railway2', textAlign : 'center', paddingVertical : 10}}>Hope you’ve received your order??</Text>
                            </View>


                            <View style={{display : 'flex', flexDirection : 'row', gap : 10, alignItems : 'center', marginTop : 30}}>
                                <TouchableOpacity style={{paddingVertical : 10, borderRadius : 5, paddingHorizontal : 25, borderColor : Colors.myRed, borderWidth : 1, backgroundColor : 'white'}}>
                                    <Text style={{color : Colors.myRed, fontSize : 15, fontFamily : 'Railway3'}}>No, I didn't</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{paddingVertical : 11, borderRadius : 5, paddingHorizontal : 25, backgroundColor : Colors.myRed}}>
                                    <Text style={{color : 'white', fontSize : 15, fontFamily : 'Railway3'}}>Yes, I did</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}


            </View>
        </View>


    </SafeAreaView>
  )
}

export default order_details

const styles = StyleSheet.create({
    container : {
        paddingHorizontal : 20,
        paddingTop : 30,
        flex : 1
    },

    activeColor : {
        color : Colors.myLightGreen
    }


})