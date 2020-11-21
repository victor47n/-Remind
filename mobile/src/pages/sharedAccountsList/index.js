import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api';

export default function SharedAccList({route}) {
    //Recebe se o usúario possui ou não uma conta vinculada.
    const [acc, setAcc] = useState('');
    const [vinculos, setVinculos] = useState([]);
    const [selectedUser, setSelectedUser] = useState();

    const navigation = useNavigation();

    const vinculo = route.params.vinculo;
    console.log(vinculo._id);
    
    async function loadEmailVinc() {

        const userId = await AsyncStorage.getItem('@Reminder:userId');
        const response = await api.get(`/reminders-today/${vinculo._id}`);
        
        setVinculos(response.data.user.dadosVinculos);
        // const vinculos = await AsyncStorage.getItem('@Reminder:vinculos');
        // console.log(vinculos);
        console.log(response.data.user.vinculos);
        //const getList = await api.get(`reminders-today/${userEmailAuth}`);

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
