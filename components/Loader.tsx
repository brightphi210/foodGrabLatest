import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

const Loader = () => {
  return (
    <View>

        <View style={styles.bigCard0}>
        
        </View>

        <View style={styles.bigCard}>
            
        </View>

        <View style={styles.bigCard1}>
        
        </View>


        <View style={styles.bigCard1}>
        
        </View>

        <View style={styles.bigCard1}>
        
        </View>

        <View style={styles.bigCard1}>
        
        </View>

        <View style={styles.bigCard1}>
        
        </View>


        <View style={styles.bigCard0}>
        
        </View>

    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    bigCard : {
        backgroundColor : Colors.myLightGray,
        height : '20%',
        width : '100%',
        borderRadius : 5
    },


    bigCard1 : {
        backgroundColor : Colors.myLightGray,
        height : '8%',
        width : '100%',
        marginTop : 20,
        borderRadius : 5
    },

    bigCard0 : {
        backgroundColor : Colors.myLightGray,
        height : '3%',
        width : '100%',
        marginVertical : 20,
        borderRadius : 5
    }
})