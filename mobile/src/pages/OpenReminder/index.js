import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api';

import moment from "moment";

export default function OpenReminder({ route, navigation }) {
    // const [daysWeek, setDaysWeek] = useState([])
    const reminder = route.params.reminder;

    function goToBack() {
        navigation.goBack();
    }
    // function Semana() {
    //     reminder.dayWeek.map(_day => {
    //         const arrayWeek = moment(_day, "d").format("ddd");
    //         setDaysWeek(...daysWeek, arrayWeek);

    //         console.log("PRIMEIRO:",arrayWeek)
    //         // console.log("SEGUNDO: ",daysWeek)
    //     })
    // }
    // useEffect(()=>{
    //     // Semana()
    // }, [])

    return (
        <View style={styles.background}>
            <LinearGradient colors={["#6C64FB", "#9B67FF"]} style={styles.statusBar} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <StatusBar translucent={true} backgroundColor={'transparent'} style="light" />
            <View style={styles.iconsContainer}>      
                <TouchableOpacity style={styles.buttonClose} onPress={goToBack} >
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

                <Text style={styles.reminderName}>{reminder.description}</Text>
                <Text style={styles.reminderHour}>Hoje • {`${moment(new Date(reminder.dateActivity),"hmm").format("HH:mm")}`}</Text>
       
                
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