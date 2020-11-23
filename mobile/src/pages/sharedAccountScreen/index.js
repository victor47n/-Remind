import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api';

export default function SharedAccScreen() {
    
    const [emailAuth, setEmailAuth] = useState('');

    async function handleVincAcc() {
        const userEmail = await AsyncStorage.getItem('@Reminder:userEmail');
        const data = {
            email: userEmail,
            emailAuth,
        }
        try {
            const response = await api.post('/autorizacao_vinculo', data);
            Alert.alert(
                'Sucesso',
                'Solicitação de vinculo enviada!',
                [
                    { text: 'OK', onPress: () => navigateBack() }
                ],
                { cancelable: false }
            );

        } catch (error) {
            Alert.alert(
                'Aconteceu um erro!',
                'error',
                [
                    { text: 'OK', onPress: () => navigateBack() }
                ],
                { cancelable: false }
            );
            // alert(error);
        }
    }

    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack();
    }

    return (
        <View style={styles.background}>
            <LinearGradient
                colors={["#6C64FB", "#9B67FF"]}
                style={styles.statusBar}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <StatusBar
                    translucent={true}
                    backgroundColor={"transparent"}
                    style="light"
                />
            </LinearGradient>

            <TouchableOpacity style={styles.buttonBack} onPress={navigateBack}>
                <MaterialIcons name="arrow-back" size={24} color="#000000" />
            </TouchableOpacity>

            <View style={styles.container}>

                <View style={styles.head}>
                    <Text style={styles.title} >Vincular Contas</Text>

                    <Text style={styles.description} >Insira o email da conta a ser vinculada, que enviaremos um email de confirmação para essa conta :)</Text>
                </View>

                <Text style={styles.description} ></Text>
                <TextInput style={styles.input}
                    value={emailAuth}
                    onChangeText={setEmailAuth}
                    autoCapitalize="none"
                    placeholderTextColor="#E0E0E0"
                    placeholder="Digite o email a ser vinculado"
                    autoCorrect={false} />

                <TouchableOpacity onPress={handleVincAcc} >
                    <LinearGradient style={styles.button}
                        colors={['#6C64FB', '#9B67FF']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.buttonText}>ENVIAR</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}
