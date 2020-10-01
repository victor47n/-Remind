import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
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
        console.log(data);
        try {
            const response = await api.post('register', data);
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


    return( <View style={styles.background}>
        <LinearGradient style={styles.header}
            colors={['#6C64FB', '#9B67FF']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        >

        </LinearGradient>
        <View style={styles.head}>

            <TouchableOpacity onPress={navigateBack} style={styles.headContainer}>
                <Text style={styles.headText}>Log In</Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.headContainer}>
                <Text style={styles.headTextEntered}>Sign Up</Text>
            </TouchableOpacity>

        </View>
        <View style={styles.formulario}>
        
         
            <TextInput style={styles.input} value={name} onChangeText={setName}  autoCapitalize="none" placeholderTextColor="#E0E0E0" placeholder="Nome" autoCorrect={false}>

            </TextInput>

            <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" placeholderTextColor="#E0E0E0" placeholder="Email" autoCorrect={false}>

            </TextInput>

            <TextInput secureTextEntry={true}  style={styles.input} value={password} onChangeText={setPassword} autoCapitalize="none" placeholderTextColor="#E0E0E0" placeholder="Senha" autoCorrect={false}>

            </TextInput>

            <TextInput secureTextEntry={true} style={styles.input} value={passwordConf} onChangeText={setPasswordConf} autoCapitalize="none" placeholderTextColor="#E0E0E0" placeholder="Confirmar Senha" autoCorrect={false}>

            </TextInput>
       

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
    )
}