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
    const [name, setName] = useState('');
    const [emailTitulo, setEmailTitulo] = useState('');
    const [nameTitulo, setNameTitulo] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [user, setUser] = useState({});

    async function handleChangeInfo() {
        try {
            if (password === passwordConf) {

                const userId = await AsyncStorage.getItem('@Reminder:userId');
                const data = {
                    userId,
                    name,
                    email,
                    password
                }
                

                const response = await api.put('/profile/edit', data)
                await AsyncStorage.setItem('@Reminder:userName', name);
                await AsyncStorage.setItem('@Reminder:userEmail', email);
                                
                setPassword('');
                setPasswordConf('');
                setEmailTitulo(email);
                setNameTitulo(name);

                alert("Mudança concluida com sucesso");
            } else {
                alert("Senhas Diferentes");
            }



        } catch (error) {

            console.log(error)
        }


    }

    async function navigateToBack() {
        navigation.goBack();
    }

    async function loadInfos() {
        const name = await AsyncStorage.getItem('@Reminder:userName');
        const email = await AsyncStorage.getItem('@Reminder:userEmail');

        const response = await api.get(`/profile_list/${AsyncStorage.getItem('@Reminder:userId')}`);

        setEmail(email);
        setEmailTitulo(email)
        setName(name);
        setNameTitulo(name);
    }

    useEffect(() => {
        loadInfos()
    }, []);

    function navigateToBack() {
        navigation.navigate('Home');
    }

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
                    <Text style={styles.profileName}>{nameTitulo}</Text>

                    <Text style={styles.profileEmail}> {emailTitulo}</Text>
                </View>

            </LinearGradient>

            <View style={styles.formulary}>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="none"
                    placeholderTextColor="#E0E0E0"
                    placeholder="Nome"
                    autoCorrect={false}>

                </TextInput>

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    placeholderTextColor="#E0E0E0"
                    placeholder="E-mail"
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