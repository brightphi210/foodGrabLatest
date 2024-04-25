import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRouter } from 'expo-router'


const BackHeaderAccount = () => {
    const navigation = useRouter()

    const handleBackPress = () => {
      navigation.replace('/account'); 
    };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleBackPress}>
        <Ionicons name='arrow-back' size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default BackHeaderAccount

const styles = StyleSheet.create({
    container : {
        paddingVertical : 10
    }
})