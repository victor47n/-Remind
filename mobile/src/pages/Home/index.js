import React, { useState, useEffect } from 'react';
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
    const [dateNow, setDateNow] = useState(new Date());

    moment.locale('pt-br')
    let dateUp = new Date();

    async function loadReminders() {
        const token = await AsyncStorage.getItem('token');
        const getList = await api.get(`reminders/${userId}`);

        if (getList) {
            let arrayReminders = getList.data.reminders;

            await setReminders(arrayReminders.filter(reminder =>
                moment(new Date(reminder.dateActivity)).format("YYYY-MM-DD")
                ===
                moment(new Date(dateUp)).format("YYYY-MM-DD")
            ));
        }
        setDateNow(moment().format('ll'));
    };

    useEffect(() => {
        // const timer = setInterval(() => {
        loadReminders()
        // }, 1000);

        // return () => clearInterval(timer);
    }, []);

    function navigateToReminder() {
        navigation.navigate('Reminder');
    }

    function navigateToDetail(reminder) {
        console.log("REMINDER", reminder)
        navigation.navigate('OpenReminder', { reminder });
    }

    function navigateToCalendar() {
        navigation.navigate('CalendarReminder');
    }

    function handleStateReminder(id) {
        const alreadySelected = remindCheck.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = remindCheck.filter(item => item !== id)

            setRemindCheck(filteredItems);
        } else {
            setRemindCheck([...remindCheck, id]);
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
                                        tintColors={{ true: '#6C64FB', false: '#E0E0E0' }}
                                        style={styles.reminderCheck}
                                    />
                                    <View>
                                        <Text style={remindCheck.includes(reminder._id) ? styles.reminderTextDescriptionSelected : styles.reminderTextDescription}>{reminder.description}</Text>
                                        <Text style={remindCheck.includes(reminder._id) ? styles.reminderTextTimeSelected : styles.reminderTextTime}>
                                            {`${moment(new Date(reminder.dateActivity), "hmm").format("HH:mm")}`}
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

