import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

const OrderLoader = () => {
  return (
    <View style={{flex : 1, marginTop : 20}}>


            <View style={styles.bigCard}>
                
                <View style={styles.bigCard1}>
                
                </View>

                <View style={styles.bigCard2}>
            
                </View>
            </View>

            <View style={styles.bigCard}>
                
                <View style={styles.bigCard1}>
                
                </View>

                <View style={styles.bigCard2}>
            
                </View>
            </View>


            <View style={styles.bigCard}>
                
                <View style={styles.bigCard1}>
                
                </View>

                <View style={styles.bigCard2}>
            
                </View>
            </View>

            <View style={styles.bigCard}>
                
                <View style={styles.bigCard1}>
                
                </View>

                <View style={styles.bigCard2}>
            
                </View>
            </View>

            <View style={styles.bigCard}>
                
                <View style={styles.bigCard1}>
                
                </View>

                <View style={styles.bigCard2}>
            
                </View>
            </View>
    </View>
  )
}

export default OrderLoader

const styles = StyleSheet.create({
    bigCard : {
        display : 'flex',
        flexDirection : 'row',
        gap : 10,
        marginBottom : 30,
        alignContent : 'center',
        alignItems : 'center',
        margin : 'auto',
        width : '100%',
    },


    bigCard1 : {
        backgroundColor : Colors.myLightGray,
        height : 80,
        width : '30%',
        borderRadius : 5
    },

    bigCard2 : {
        backgroundColor : Colors.myLightGray,
        height : 80,
        width : '65%',
        borderRadius : 5
    },
})