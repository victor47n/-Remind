import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    const navigation = useNavigation();

    async function handleRegister() {
        if (password === passwordConf) {
            const data = {
                name,
                email,
                password,
            };
            
            try {
                const response = await api.post('register', data);
                if (response.status >= 200 && response.status < 300) {
                    alert("Usuario cadastrado com sucesso!");
                    Clear();
                    navigateBack();
                }
            } catch (error) {
                alert(error);
            }
        } else {
            alert('Senhas incorretas');
        }
    }

    function navigateBack() {
        navigation.goBack();
    };

    function Clear(){
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConf("");
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

            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={navigateBack} style={styles.headContainer}>
                        <Text style={styles.headTextEntered}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.headContainer}>
                        <Text style={styles.headText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formulario}>
                    <TextInput style={styles.input}
                        value={name} onChangeText={setName}
                        autoCapitalize="none"
                        placeholderTextColor="#E0E0E0"
                        placeholder="Nome"
                        autoCorrect={false}
                    />

                    <TextInput style={styles.input}
                        value={email} onChangeText={setEmail}
                        autoCapitalize="none"
                        placeholderTextColor="#E0E0E0"
                        placeholder="Email"
                        autoCorrect={false}
                    />

                    <TextInput secureTextEntry={true}
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        placeholderTextColor="#E0E0E0"
                        placeholder="Senha"
                        autoCorrect={false}
                    />

                    <TextInput secureTextEntry={true}
                        style={styles.input}
                        value={passwordConf}
                        onChangeText={setPasswordConf}
                        autoCapitalize="none"
                        placeholderTextColor="#E0E0E0"
                        placeholder="Confirmar Senha"
                        autoCorrect={false}
                    />
                </View>

                <TouchableOpacity onPress={handleRegister} >
                    <LinearGradient style={styles.registrar}
                        colors={['#6C64FB', '#9B67FF']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.registrarTexto} >REGISTRAR</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}