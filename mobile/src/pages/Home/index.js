import React, { useState, useEffect } from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationContainer, useRoute } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api'
import'../Login'
import 'moment/locale/pt-br';
// import locale from '../../config/moment-with-locales'
import moment from "moment";

import styles from './styles';


export default function Home({ navigation  }) {
    const [remindCheck, setRemindCheck] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [dateNow, setDateNow] = useState(new Date());
    
    moment.locale('pt-br')    
    let dateUp = new Date();

    async function loadReminders(){
        const  token = await AsyncStorage.getItem('token');
        const  userId = await AsyncStorage.getItem('@Reminder:userId');
        
        setDateNow(moment().format('ll'));
        
       const getList = await api.get('reminders');
       let array = getList.data.reminders._id;
       console.log("Teste>:",array);

       if(getList){
           let arrayReminders = getList.data.reminders;
           await setReminders(arrayReminders.filter(reminder => moment(new Date(reminder.dateActivity),"YYYY-MM-DD").format("YYYY-MM-DD")  ==  moment(new Date(dateUp),"YYYY-MM-DD").format("YYYY-MM-DD"))
           );
        //    && reminder.user._id == userId
        //    const list = arrayReminders.map(reminder => (console.log(reminder.user._id)));
       }
    };
    
    useEffect(() => {
        // const timer = setInterval(() => {
            loadReminders()    
        // }, 10000);
          
        // return () => clearInterval(timer);
    }, []);

    function navigateToReminder() {
        navigation.navigate('Reminder');
    }

    function navigateToDetail() {
        navigation.navigate('Reminder');
    }
 
    function handleStateReminder(_id) {
        const alreadySelected = remindCheck.findIndex(item => item === _id);

        if (alreadySelected >= 0) {
            const filteredItems = remindCheck.filter(item => item !== _id)

            setRemindCheck(filteredItems);
        } else {
            setRemindCheck([...remindCheck, _id]);
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
                    <MaterialCommunityIcons name="calendar-blank" size={24} color="#FAFAFA" />
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
                keyExtractor={ reminder => String(reminder._id) }
                
                showsVerticalScrollIndicator={false}
                renderItem={({ item: reminder }) => {
                    
                        
                        return(
                            <View style={styles.remind}>
                            <TouchableHighlight
                                style={remindCheck.includes(reminder._id) ? styles.reminderBoxSelected : styles.reminderBox}
                                onPress={navigateToDetail}
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
                                            {`${moment(new Date(reminder.dateActivity),"hmm").utc().format("HH:mm")}`}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                        )
                    
               
              
}}
            >
            </FlatList>
        </View>
    );
}

    // const data = [
    //     {
    //         id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    //         title: 'First Item',
    //         status: 'open'
    //     },
    //     {
    //         id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    //         title: 'Second Item',
    //         status: 'close'
    //     },
    //     {
    //         id: '58694a0f-3da1-471f-bd96-145571e29d72',
    //         title: 'Third Item',
    //         status: 'open'
    //     },
    // ];