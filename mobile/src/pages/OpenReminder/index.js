import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api';
import 'moment/locale/pt-br';
import moment from "moment";

import styles from './styles';

export default function OpenReminder({ route, navigation }) {
    const [reminder, setReminder] = useState([]);
    const detailReminder = route.params.reminder;

    moment.locale('pt-br')

    async function showReminder(){
        const response = await api.get(`reminder/${detailReminder._id}`);
        const detail = response.data.reminder;
        setReminder(detail);
    }
    
    function goToBack() {
        navigation.goBack();
    }

    useEffect(() => {
        showReminder()
    }, [reminder])

    function navigateToReminder(reminder) {
        navigation.navigate('EditReminder', { reminder });
    }

    function finishReminder() {
        const data = {
            reminderId: reminder._id,
            description: reminder.description,
            status: true,
            repeat: reminder.repeat,
            dateActivity: reminder.dateActivity,
            dayWeek: reminder.dayWeek,
        }

        try {
            const response = api.put('reminder', data);
        } catch (error) {
            alert(error);
        }
    }

    function excluir() {
        try {
            const response = api.delete(`reminder/${reminder._id}`);
            console.log(response);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <View style={styles.background}>
            <LinearGradient colors={["#6C64FB", "#9B67FF"]} style={styles.statusBar} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <StatusBar translucent={true} backgroundColor={'transparent'} style="light" />
                <View style={styles.iconsContainer}>
                    <TouchableOpacity style={styles.buttonClose} onPress={goToBack} >
                        <MaterialIcons name="close" size={24} color="#ffffff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonEdit} onPress={() => navigateToReminder(reminder)} >
                        <MaterialIcons name="mode-edit" size={24} color="#ffffff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonDots} onPress={excluir}>
                        <MaterialIcons name="delete" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.container}>

                    <Text style={styles.reminderName}>{reminder.description}</Text>
                    <Text style={styles.reminderHour}>{`${moment(new Date(reminder.dateActivity), "hmm").format("HH:mm")}`}</Text>
                    {/* <Text style={styles.reminderRepeat}>Repete Repetição</Text> */}
                </View>

            </LinearGradient >

            <TouchableOpacity onPress={finishReminder}>
                <LinearGradient colors={["#FE9DA4", "#FC81A7"]} style={styles.buttonBar} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text style={styles.buttonText} >Marcar como concluído</Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>

    )
}