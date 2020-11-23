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
    const [vinculos, setVinculos] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [reminders, setReminders] = useState([]);
    const [remindCheck, setRemindCheck] = useState([]);
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");

    const navigation = useNavigation();

    const vinculo = route.params.vinculo;

    async function loadEmailVinc() {
        
        const getListLembretes = await api.get(`reminders-today/${vinculo._id}`);
        await AsyncStorage.setItem('@Reminder:vinculoId', vinculo._id);
        const mainId = await AsyncStorage.getItem('@Reminder:userId');
        if (getListLembretes.data.reminders) {
            let arrayReminders = getListLembretes.data.reminders;
            setReminders(arrayReminders);
            setEmail(vinculo.email);
            setUserId(mainId);

        } else {
            alert("Error");
        }

    };

    function navigateBack() {
        navigation.goBack();

    }

    function navigateToVincCad() {
        navigation.navigate('ReminderVinculo');
    }

    // function navigateAdd() {
    //     navigation.navigate('SharedAccScreen');
    //     setAcc(true)
    // }

    useEffect(() => {
        const timer = setInterval(() => {
            loadEmailVinc()
         }, 1000);
         
         return () => clearInterval(timer);

    }, []);

    async function DeleteVinc(){
        try {
            const deleteAccountVinc = await api.put(`vinc/delete`, {email, userId});
            navigateBack();
        } catch (error) {
            console.log(error);
            alert(error);
        }

    }
    
    function navigateToDetail(reminder) {
        navigation.navigate('OpenVincReminder', { reminder });
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
                            <Text style={styles.trueDeleteText} onPress={DeleteVinc}>EXCLUIR VINCULO</Text>
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
                        // style={styles.containerReminder}
                        data={reminders}
                        keyExtractor={reminder => String(reminder._id)}
                        onEndReached={loadEmailVinc}
                        onEndReachedThreshold={0.2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item: reminder }) => {
                            
                                return (
                                    <View>
                                   
                                        <View style={styles.item}>
                                            <Text style={styles.itemHours}>{moment(new Date(reminder.dateActivity)).add(3, 'hours').format('kk:mm A')}</Text>
                                            <TouchableOpacity style={styles.containerItemDescription} onPress={() => navigateToDetail(reminder)}>
                                                <Text style={styles.itemDescription}>{reminder.description}</Text>
                                            </TouchableOpacity>
                                        </View>
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
