import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors';
import { Link } from 'expo-router'
import { useNavigation } from 'expo-router';
import BackHeader from '@/components/BackHeader';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import Animated, { BounceInDown, BounceInUp, BounceOutDown, SlideInLeft, SlideOutRight } from 'react-native-reanimated';


const proceed_checkout = () => {

    const navigate = useNavigation()

    const route = useRoute();

    const { cartItem } : any = route.params;
  
    console.log('This is what am looking for', cartItem)

 
  return (
    <Animated.View style={styles.container} 
        entering={SlideInLeft.duration(200).delay(200)}
        exiting={SlideOutRight.duration(200).delay(200)}
    >
        <StatusBar style='dark'/>
        <BackHeader />
      <View>

        <View style={styles.viewSelction}>
            <Text style={{fontSize : 15, fontFamily : 'Railway2'}}>View Selection</Text>
            <TouchableOpacity >
                <FontAwesome name='trash' color={Colors.myRed} size={15}/>
            </TouchableOpacity>
        </View>

        <View >
            {cartItem.map((item : any, index : any) => (

                <View style={styles.cartDiv} key={index}>
                    <Text style={{fontFamily : 'Railway3', fontSize : 12}}>{item.name.toUpperCase()}</Text>
                    <Text style={{ fontSize : 13, color : 'grey'}}>N{item.price.toLocaleString()}</Text>

                    <View style={styles.iconDiv}>

                        <TouchableOpacity>
                            <AntDesign name='minus' size={15} />
                        </TouchableOpacity>

                        <Text style={{ fontSize : 15}}>{item.quantity}</Text>

                        <TouchableOpacity>
                        <AntDesign name='plus' size={15} />
                        </TouchableOpacity>

                    </View>
                </View>
            ))}

            <View style={styles.btnDivs}>
                <TouchableOpacity style={styles.eachBtn}>
                    <FontAwesome name='plus'/>
                    <Text style={{fontFamily : 'Railway3', fontSize : 12, }}>Add more</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.eachBtn}>
                    <FontAwesome name='copy'/>
                    <Text style={{fontFamily : 'Railway3', fontSize : 12, }}>Duplicate pack</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>

      <View style={styles.bottomBtns} >

            <Link href={'/authRoute/order_summary'} asChild> 
                <TouchableOpacity style={styles.eachBottomBtn}>
                    <Text style={{fontFamily : 'Railway2', fontSize : 13, color : 'white'}}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </Link>

            <TouchableOpacity style={styles.eachBottomBtn2} onPress={navigate.goBack}>
                <Text style={{fontFamily : 'Railway2', fontSize : 13, color : Colors.myRed}}>Cancel Order</Text>
            </TouchableOpacity>
        </View>
    </Animated.View>
  )
}

export default proceed_checkout

const styles = StyleSheet.create({
    container : {
        flex : 1,
        position : 'relative',
        backgroundColor : 'white',
        paddingHorizontal : 20,
    },

    viewSelction : {
        display : 'flex',
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingTop : 20
    },

    cartDiv : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginTop : 20,
        borderColor : Colors.myLightGray,
        borderWidth : 1,
        padding : 10,
        borderRadius : 5

    },

    iconDiv : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        gap : 20,
        alignItems : 'center',
        paddingHorizontal : 10,
    },

    btnDivs :{
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        gap : 20,
        paddingTop : 20,
    },

    eachBtn : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        gap : 5,
        borderWidth : 1,
        borderColor : Colors.myGray,
        padding : 10,
        paddingHorizontal : 20,
        borderRadius : 10,
        borderStyle : 'dashed'
    },

    bottomBtns: {
        position : 'absolute',
        bottom : 40,
        width : '100%',
        display : 'flex',
        margin : 'auto',
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center',
        alignSelf : 'center',
    },


    eachBottomBtn : {
        width : '100%',
        left : 0,
        right : 0,
        padding : 15,
        alignItems : 'center',
        backgroundColor : Colors.myRed, 
        marginBottom : 15, 
        borderRadius : 5,

    },

    eachBottomBtn2 : {
        width : '100%',
        left : 0,
        right : 0,
        padding : 15,
        alignItems : 'center',
        borderColor : Colors.myRed, 
        borderWidth : 1,
        marginBottom : 15, 
        borderRadius : 5,
        
    }




})