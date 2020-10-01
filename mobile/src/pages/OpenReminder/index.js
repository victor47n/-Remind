import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api';



export default function OpenReminder() {
    return (
        <View style={styles.background}>

       
            <LinearGradient colors={["#6C64FB", "#9B67FF"]} style={styles.statusBar} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <StatusBar translucent={true} backgroundColor={'transparent'} style="light" />
            <View style={styles.iconsContainer}>      
                <TouchableOpacity style={styles.buttonClose} >
                    <MaterialIcons name="close" size={24} color="#ffffff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonEdit}>
                    <MaterialIcons name="mode-edit" size={24} color="#ffffff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDots}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color="#ffffff" />
                </TouchableOpacity>
            </View>

            <View style={styles.container}> 

                <Text style={styles.reminderName}>Nome Lembrete</Text>
                <Text style={styles.reminderHour}>Hoje • 19:00</Text>
                <Text style={styles.reminderRepeat}>Repete Repetição</Text>
            </View>
          
            </LinearGradient >

            <TouchableOpacity >
                <LinearGradient colors={["#FE9DA4", "#FC81A7"]} style={styles.buttonBar} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text style={styles.buttonText} >Marcar como concluído</Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>

    )
}