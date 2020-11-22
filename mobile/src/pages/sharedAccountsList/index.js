import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList,Text, View, TouchableOpacity, TouchableHighlight, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api';
import CheckBox from '@react-native-community/checkbox';
import 'moment/locale/pt-br';
import moment from "moment";

export default function SharedAccList({ route }) {
    //Recebe se o usúario possui ou não uma conta vinculada.
    const [acc, setAcc] = useState('');
    const [vinculos, setVinculos] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [reminders, setReminders] = useState([]);
    const [remindCheck, setRemindCheck] = useState([]);

    const navigation = useNavigation();

    const vinculo = route.params.vinculo;

    async function loadEmailVinc() {
        
        const getListLembretes = await api.get(`reminders-today/${vinculo._id}`);
        console.log(`\n`);
        console.log(`\n`);
        console.log("lembrete",vinculo._id);
        console.log(`\n`);
        console.log(`\n`);
        if (getListLembretes.data.reminders) {
            let arrayReminders = getListLembretes.data.reminders;
            setReminders(arrayReminders);
        } else {
            // console.log("Sem lembretes para hoje");
            alert("OIOI");
        }

    };

    function navigateBack() {
        navigation.goBack();

    }

    function navigateToVincCad() {
        navigation.navigate('Reminder');
    }

    // function navigateAdd() {
    //     navigation.navigate('SharedAccScreen');
    //     setAcc(true)
    // }

    useEffect(() => {
        loadEmailVinc()
        setAcc(false);

    }, []);

    async function handleStateReminder(id) {
        const alreadySelected = remindCheck.findIndex(item => item === id);
        const getReminder = await api.get(`reminder/${id}`);
        const  getDetails = getReminder.data.reminder;
        if (getDetails.status === true) {
                try {
                    let data = {
                        reminderId: id,
                        status: false,
                    }
                    console.log("false");
                    const response = await api.put('reminder/status', data);
                    setRemindCheck([...remindCheck, id]);    
                    
                } catch (error) {
                    console.log(error)  
                }
            }    
            if(getDetails.status === false){
                const filteredItems = remindCheck.filter(item => item !== id);
                setRemindCheck(filteredItems);
                
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

    let createScreen = () => {
        return (
            <View style={styles.container}>
                <LinearGradient
                    style={styles.trueBox}
                    colors={["#6C64FB", "#9B67FF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View >
                        <Text style={styles.trueTextBoxName}>{vinculo.name}</Text>
                        <Text style={styles.trueTextBoxEmail}>{vinculo.email}</Text>

                        <TouchableOpacity>
                            <Text style={styles.trueDeleteText}>EXCLUIR VINCULO</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                <LinearGradient
                    style={styles.trueAddButton}
                    colors={["#6C64FB", "#9B67FF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <TouchableOpacity onPress={navigateToVincCad} >
                        <Text style={styles.trueAddText}>NOVA TAREFA</Text>
                    </TouchableOpacity>
                </LinearGradient>

                <LinearGradient
                    style={styles.trueBoxReminder}
                    colors={["#6C64FB", "#9B67FF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View>
                        <FlatList
                            style={styles.containerReminder}
                            data={reminders}
                            keyExtractor={reminder => String(reminder._id)}
                            onEndReached={loadEmailVinc}
                            onEndReachedThreshold={0.2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item: reminder }) => {
                            console.log(reminder);

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
                                                    <Text style={remindCheck.includes(reminder._id) ? styles.reminderTextDescriptionSelected : styles.reminderTextDescription}>{reminder !== null ? reminder.description : "Apagado"}</Text>
                                                    <Text style={remindCheck.includes(reminder._id) ? styles.reminderTextTimeSelected : styles.reminderTextTime}>
                                                        {reminder !== null ? `${moment(new Date(reminder.dateActivity), "hmm").format("HH:mm")}` : "Apagado"}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                )
                            }}
                        />
                        
                    </View>
                </LinearGradient>

            </View>
        )

    }
    function navigateBack() {
        navigation.goBack();
    }

    return (
        <View style={styles.background}>
            <View style={styles.header}>

                <TouchableOpacity style={styles.buttonBack} onPress={navigateBack}>
                    <MaterialIcons name="arrow-back" size={24} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.title}>Conta vinculada</Text>
            </View>
            {createScreen()}
        </View>
    )

}
