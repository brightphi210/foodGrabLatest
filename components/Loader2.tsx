import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

const Loader2 = () => {
  return (
    <View>

        <View style={styles.bigCard}>
            
        </View>

        <View style={styles.bigCard0}>
        
        </View>


        <View style={styles.bigCard}>
            
        </View>

        <View style={styles.bigCard0}>
        
        </View>


    </View>
  )
}

export default Loader2

const styles = StyleSheet.create({
    bigCard : {
        backgroundColor : Colors.myLightGray,
        height : 100,
        width : '100%',
        borderRadius : 10
    },

    bigCard0 : {
        backgroundColor : Colors.myLightGray,
        height : 20,
        width : '100%',
        marginVertical : 20,
        borderRadius : 10
    }
})