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


const proceed_checkout = () => {

    const navigate = useNavigation()
  return (
    <View style={styles.container} >
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
            <View style={styles.cartDiv}>
                <Text style={{fontFamily : 'Railway3', fontSize : 13}}>Jollof Rice</Text>
                <Text style={{ fontSize : 13, color : 'grey'}}>N2500</Text>

                <View style={styles.iconDiv}>

                    <TouchableOpacity>
                        <AntDesign name='minus' size={15} />
                    </TouchableOpacity>

                    <Text style={{ fontSize : 15}}>1</Text>

                    <TouchableOpacity>
                    <AntDesign name='plus' size={15} />
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.cartDiv}>
                <Text style={{fontFamily : 'Railway3', fontSize : 13}}>Drink (Coke)</Text>
                <Text style={{fontSize : 13, color : 'grey'}}>N900</Text>

                <View style={styles.iconDiv}>

                    <TouchableOpacity>
                        <AntDesign name='minus' size={15} />
                    </TouchableOpacity>

                    <Text style={{ fontSize : 15}}>1</Text>

                    <TouchableOpacity>
                    <AntDesign name='plus' size={15} />
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.cartDiv}>
                <Text style={{fontFamily : 'Railway3', fontSize : 13}}>Chicken (Spicy Fried)</Text>
                <Text style={{ fontSize : 13, color : 'grey'}}>N300</Text>

                <View style={styles.iconDiv}>

<TouchableOpacity>
    <AntDesign name='minus' size={15} />
</TouchableOpacity>

<Text style={{ fontSize : 15}}>1</Text>

<TouchableOpacity>
<AntDesign name='plus' size={15} />
</TouchableOpacity>

</View>
            </View>

            <View style={styles.btnDivs}>
                <TouchableOpacity style={styles.eachBtn}>
                    <FontAwesome name='plus'/>
                    <Text style={{fontFamily : 'Railway3', fontSize : 15, }}>Add more</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.eachBtn}>
                    <FontAwesome name='copy'/>
                    <Text style={{fontFamily : 'Railway3', fontSize : 15, }}>Duplicate pack</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>

      <View style={styles.bottomBtns} >

            <Link href={'/authRoute/order_summary'} asChild> 
                <TouchableOpacity style={styles.eachBottomBtn}>
                    <Text style={{fontFamily : 'Railway2', fontSize : 15, color : 'white'}}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </Link>

            <TouchableOpacity style={styles.eachBottomBtn2} onPress={navigate.goBack}>
                <Text style={{fontFamily : 'Railway2', fontSize : 15, color : Colors.myRed}}>Cancel Order</Text>
            </TouchableOpacity>
        </View>
    </View>
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
        justifyContent : 'space-between'
    },

    cartDiv : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingTop : 30
    },

    iconDiv : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        gap : 20,
        alignItems : 'center',
        backgroundColor : Colors.lighterGreen,
        paddingHorizontal : 20
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
        padding : 13,
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