import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api';

export default function SharedAcc() {
    //Recebe se o usúario possui ou não uma conta vinculada.
    const [acc, setAcc] = useState('');
    const [vinculos, setVinculos] = useState([]);
    const [selectedUser, setSelectedUser] = useState();

    const navigation = useNavigation();

    async function loadEmailVinc() {
        const userId = await AsyncStorage.getItem('@Reminder:userId');
        const response = await api.get(`/profile_list/${userId}`);
        if(response){
            setVinculos(response.data.user.dadosVinculos);
        }
        // const vinculos = await AsyncStorage.getItem('@Reminder:vinculos');
        //const getList = await api.get(`reminders-today/${userEmailAuth}`);
    };

    async function recordVincAndNavigation(vinculo) {
        // await AsyncStorage.setItem('@Remider:vinculo', selectedUser);
        navigation.navigate('SharedAccList', {vinculo});
    }

    function navigateBack() {
        navigation.goBack();

    }

    function navigateToVincCad() {
        navigation.navigate('Reminder');
    }

    function navigateAdd() {
        navigation.navigate('SharedAccScreen');
        setAcc(true)
    }

    useEffect(() => {
        const timer = setInterval(() => {
            loadEmailVinc()
        }, 1000);
        
        return () => clearInterval(timer);
    }, []);

    let createScreen = () => {

        return (
            <>
                {vinculos.length ?
                    vinculos.map(vinculo => {
                        return (
                            <LinearGradient
                                style={styles.falseBox}
                                colors={["#6C64FB", "#9B67FF"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            // onPress={
                            //     recordVincAndNavigation
                            // }
                            >
                                <TouchableOpacity onPress={() => recordVincAndNavigation(vinculo)}>


                                    <View key={vinculo._id}>
                                        <Text style={styles.falseTextBox}>{vinculo.email}</Text>
                                        <MaterialIcons name="people-outline" size={128} color="#FAFAFA" style={styles.personIcon} />
                                    </View>
                                </TouchableOpacity>
                            </LinearGradient>

                        )
                    })
                    :
                    <Text style={styles.falseTextBox}>Nenhuma conta vinculada</Text>

                }
                <LinearGradient
                    style={styles.falseAddButton}
                    colors={["#6C64FB", "#9B67FF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <TouchableOpacity onPress={navigateAdd}>
                        <MaterialIcons name="add" size={32} color="white" />
                    </TouchableOpacity>
                </LinearGradient>

            </>
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
