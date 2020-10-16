import React, { useState, useEffect, useCallback } from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api'
import 'moment/locale/pt-br';

import moment from "moment";

import styles from './styles';

export default function Home({ navigation }) {
    const [remindCheck, setRemindCheck] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [reminder, setReminder] = useState({});
    const [dateNow, setDateNow] = useState(new Date());
    
    let dateUp = new Date();

    async function loadReminders() {
        moment.locale('pt-br')
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('@Reminder:userId');

        setDateNow(moment().format('ll'));

        const getList = await api.get(`reminders-today/${userId}`);

        if (getList.data.reminders) {
            let arrayReminders = getList.data.reminders;
            setReminders(arrayReminders);
        } else {
            console.log("Sem lembretes para hoje");
        }
    };

    useEffect(() => {
        loadReminders();
    }, [reminders]);

    function navigateToReminder() {
        navigation.navigate('Reminder');
    }

    function navigateToDetail(reminder) {
        navigation.navigate('OpenReminder', { reminder });
    }

    function navigateToCalendar() {
        navigation.navigate('CalendarReminder');
    }

    async function handleStateReminder(id) {
        const alreadySelected = remindCheck.findIndex(item => item === id);
        const getReminder = await api.get(`reminder/${id}`);
        const  getDetails = getReminder.data.reminder;

        if (alreadySelected >= 0) {
            const filteredItems = remindCheck.filter(item => item !== id);
            setRemindCheck(filteredItems);
            
            if(getDetails.status === true){
                try {
                    let data = {
                        reminderId: id,
                        status: false,
                    }
                    console.log("false");
                    const response = await api.put('reminder/status', data);
                } catch (error) {
                    console.log(error)  
                }
            }    
        } else {
            setRemindCheck([...remindCheck, id]);    

            if(getDetails.status === false){
                try {
                    let data = {
                        reminderId: id,
                        status: true,
                    }
                    console.log("true");
                    const response = await api.put('reminder/status', data);    
                } catch (error) {
                    console.log(error)  
                }
            }
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} style="light" />
            <LinearGradient style={styles.header}
                colors={['#6C64FB', '#9B67FF']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
                <View style={styles.iconsHeader}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <MaterialIcons name="menu" size={24} color="#FAFAFA" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateToCalendar}>
                        <MaterialCommunityIcons name="calendar-blank" size={24} color="#FAFAFA" />
                    </TouchableOpacity>
                </View>

                <View style={styles.headerDate}>
                    <Text style={styles.headerText}>{`${dateNow}`}</Text>
                </View>
                <View style={styles.headerReminder}>
                    <View>
                        <Text style={styles.headerReminderTitle}>Hoje</Text>
                        <Text style={styles.headerReminderSub}>{reminders.length}</Text>
                    </View>

                    <TouchableOpacity onPress={navigateToReminder}>
                        <LinearGradient style={styles.newReminderButton}
                            colors={['#FE9DA4', '#FC81A7']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        >
                            <Text style={styles.newReminderButtonText}>Novo Lembrete</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <FlatList
                style={styles.containerReminder}
                data={reminders}
                keyExtractor={reminder => String(reminder._id)}
                onEndReached={loadReminders}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: reminder }) => {


                    return (
                        <View style={styles.remind}>
                            <TouchableHighlight
                                style={remindCheck.includes(reminder._id) ? styles.reminderBoxSelected : styles.reminderBox}
                                onPress={() => navigateToDetail(reminder)}
                                underlayColor="#FE9DA4"
                            // activeOpacity={0.6}
                            >
                                <View style={styles.remindContent}>
                                    <CheckBox
                                        value={remindCheck.includes(reminder._id) ? true : false}
                                        onValueChange={() => handleStateReminder(reminder._id)}
                                        // onPress={handleStateReminder}
                                        tintColors={{ true: '#6C64FB', false: '#E0E0E0' }}
                                        style={styles.reminderCheck}
                                    />
                                    <View>
                                        <Text style={remindCheck.includes(reminder._id) ? styles.reminderTextDescriptionSelected : styles.reminderTextDescription}>{reminder !== null ? reminder.description:"Apagado"}</Text>
                                        <Text style={remindCheck.includes(reminder._id) ? styles.reminderTextTimeSelected : styles.reminderTextTime}>
                                            {reminder !== null ?`${moment(new Date(reminder.dateActivity), "hmm").format("HH:mm")}`:"Apagado"}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                    )
                }}
            />
        </View>
    );
}

