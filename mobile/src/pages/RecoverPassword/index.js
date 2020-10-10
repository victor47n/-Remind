import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api';

export default function RecuperarSenha() {
    const [email, setEmail] = useState('');

    async function handleRecoveryToken() {
        const data = {

            email,
        }
        try {
            const response = await api.post('/forgot_password', data);
            Alert.alert(
                'Alert Title',
                'My Alert Msg',
                [
                    { text: 'OK', onPress: () => navigateToResetPassword() }
                ],
                { cancelable: false }
            );

        } catch (error) {
            Alert.alert(
                'Aconteceu um erro!',
                'error',
                [
                    { text: 'OK', onPress: () => navigateToResetPassword() }
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
    function navigateToResetPassword() {
        navigation.navigate('ResetPassword');
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
                    <Text style={styles.title} >Recuperar Senha</Text>

                    <Text style={styles.description} >Insira o email de sua conta e enviaremos um token para redefinição de senha</Text>
                </View>


                <TextInput style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    placeholderTextColor="#E0E0E0"
                    placeholder="Email"
                    autoCorrect={false} />

                <TouchableOpacity onPress={handleRecoveryToken} >
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
