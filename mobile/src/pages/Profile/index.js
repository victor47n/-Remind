import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

export default function Profile({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [name, setName] = useState('');

    async function handleChangeInfo() {
        try {
            if (password === passwordConf) {

                const userId = await AsyncStorage.getItem('@Reminder:userId');




                const response = await api.put(`/profile_edit/${userId}`, { name, email, password })
                await AsyncStorage.setItem('@Reminder:userEmail', email);
                await AsyncStorage.setItem('@Reminder:userName', name);
                alert("Mudança foi um sucesso");

            } else {
                alert("Senhas Diferentes");
            }
            console.log(response)
        } catch (error) {

            console.log(error)
        }


    }

    async function navigateToBack() {
        navigation.goBack();
        setName(await AsyncStorage.getItem('@Reminder:userName'));
        setEmail(await AsyncStorage.getItem('@Reminder:userEmail'));
        setPassword("");
        setPasswordConf("");
    }



    async function loadInfos() {
        const name = await AsyncStorage.getItem('@Reminder:userName');
        const email = await AsyncStorage.getItem('@Reminder:userEmail');

        setEmail(email);
        setName(name);
    }

    useEffect(() => {
        loadInfos()
    }, []);


    return (
        <View style={styles.container}>

            <LinearGradient style={styles.header}
                colors={['#6C64FB', '#9B67FF']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
                <TouchableOpacity onPress={navigateToBack} style={styles.buttonBack}>
                    <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={styles.headerProfile}>
                    <Text style={styles.profileName}>{name}</Text>

                    <Text style={styles.profileEmail}> {email}</Text>
                </View>

            </LinearGradient>



            <View style={styles.formulary}>

                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="none"
                    autoCorrect={false}>

                </TextInput>

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}>

                </TextInput>

                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    placeholderTextColor="#E0E0E0"
                    placeholder="Senha"
                    autoCorrect={false}>

                </TextInput>

                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    value={passwordConf}
                    onChangeText={setPasswordConf}
                    autoCapitalize="none"
                    placeholderTextColor="#E0E0E0"
                    placeholder="Confirmar Senha"
                    autoCorrect={false}>

                </TextInput>

            </View>

            <View style={styles.buttonBox}>

                <TouchableOpacity onPress={handleChangeInfo} >
                    <LinearGradient style={styles.botao}
                        colors={['#6C64FB', '#9B67FF']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.botaoTexto} >SALVAR</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>

        </View>



    );







}