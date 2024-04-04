import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackHeader from '@/components/BackHeader'
import BackHeaderAccount from '@/components/BackHeaderAccount'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const notification = () => {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style='dark'/>
        <BackHeaderAccount />
        <Text style={{fontFamily : 'Railway3', fontSize : 15}}>Notification</Text>

        <View style={{justifyContent : 'center', alignItems : 'center', flex : 1}}>
            <Ionicons name='notifications-circle' size={60} color={Colors.myGray}/>
            <Text style={{fontSize : 12, color : Colors.myGray}}>No notification yet !!</Text>
        </View>
    </SafeAreaView>
  )
}

export default notification

const styles = StyleSheet.create({
    container : {
        paddingHorizontal : 20,
        flex : 1,
    }
})