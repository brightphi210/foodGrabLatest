import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Modal from "react-native-modal";
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const MyModal = (
        {
            isModalOpen, 
            isModalOpen1, isModalOpen2, 
            emptyField, closeModal, 
            samePassword, statusMessage,
            closeModal1, closeModal2
        } : any) => {
  return (
    <View>
        {
            isModalOpen && 
            (
                <Modal 
                isVisible={isModalOpen} backdropOpacity={0.50} 
                animationIn={'slideInDown'} animationOut={'fadeOut'} 
                animationInTiming={500} animationOutTiming={10}
            >
                <View style={styles.container}>
    
                    <View>
                        <Ionicons name='warning-outline' size={25}  style={styles.iconDivs}/>
                        {emptyField && <Text style={styles.textField}>{emptyField}</Text>}
                    </View>
    
                    <TouchableOpacity onPress={closeModal} style={styles.btn}>
                        <Text style={styles.close}>Close</Text>
                    </TouchableOpacity>
    
                </View>
            </Modal>
            )
        }


        {
            isModalOpen1 && 
            (
                <Modal 
                isVisible={isModalOpen1} backdropOpacity={0.50} 
                animationIn={'slideInDown'} animationOut={'fadeOut'} 
                animationInTiming={500} animationOutTiming={10}
            >
                <View style={styles.container}>
    
                    <View>
                        <Ionicons name='warning-outline' size={25}  style={styles.iconDivs}/>
                        {samePassword && <Text style={styles.textField}>{samePassword}</Text>}
                    </View>
    
                    <TouchableOpacity onPress={closeModal1} style={styles.btn}>
                        <Text style={styles.close}>Close</Text>
                    </TouchableOpacity>
    
                </View>
            </Modal>
            )
        }




        {
            isModalOpen2 && 
            (
                <Modal 
                isVisible={isModalOpen2} backdropOpacity={0.50} 
                animationIn={'slideInDown'} animationOut={'fadeOut'} 
                animationInTiming={500} animationOutTiming={10}
            >
                <View style={styles.container}>
    
                    <View >
                        <Ionicons name='warning-outline' size={25}  style={styles.iconDivs}/>
                        {statusMessage && <Text style={styles.textField}>{statusMessage}</Text>}
                    </View>
    
                    <TouchableOpacity onPress={closeModal2} style={styles.btn}>
                        <Text style={styles.close}>Close</Text>
                    </TouchableOpacity>
    
                </View>
            </Modal>
            )
        }


    </View>
  );
};

export default MyModal;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        width: '90%',
        maxHeight: '25%',
        alignSelf : 'center',
        borderRadius : 20
    },

    btn : {
        backgroundColor : Colors.myRed,
        paddingHorizontal : 20,
        paddingVertical : 10,
        borderRadius : 5,
        width : "30%",
        textAlign : 'center',
        alignSelf : 'center',
        alignItems : 'center',
        fontSize : 13
    }, 

    close : {
        color : 'white'
    },

    textField : {
        fontFamily : 'Railway3',
        fontSize : 15,
        paddingVertical : 15,
    },
    
    iconDivs : {
        textAlign : 'center',
        
    }


});
