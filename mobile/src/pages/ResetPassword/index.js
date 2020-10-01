import React,  { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../services/api';

export default function ResetarSenha() {
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [token, setToken] = useState('');


    const navigation = useNavigation();

    async function handleResetPassword(e) {
        if (password === passwordConf) {
           const data = {
            email,
            token,
            password,
        };
        console.log(data);
        try {
            const response = await api.post('/reset_password', data);
            alert('Senha Alterada com Sucesso');
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

    return <View style={styles.background}>
        <LinearGradient style={styles.header}
            colors={['#6C64FB', '#9B67FF']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        >

        </LinearGradient>
        <TouchableOpacity style={styles.buttonBack} onPress={navigateBack}>
            <MaterialIcons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <View style={styles.head}>
            <Text style={styles.titulo} >Recuperar Senha</Text>

            <Text style={styles.descricao} >Preencha os campos corretamente para que sua senha seja redefinida.</Text>
        </View>

        <View style={styles.body}>

            <TextInput style={styles.input} autoCapitalize="none" value={password} onChange={e => setPassword(e.target.value)} placeholderTextColor="#E0E0E0" placeholder="Senha" autoCorrect={false}></TextInput>

            <TextInput style={styles.input} autoCapitalize="none" value={passwordConf} onChange={e => setPasswordConf(e.target.value)} placeholderTextColor="#E0E0E0" placeholder="Confirmar Senha" autoCorrect={false}></TextInput>

            <TextInput style={styles.input} autoCapitalize="none" value={token} onChange={e => setToken(e.target.value)} placeholderTextColor="#E0E0E0" placeholder="Token" autoCorrect={false}></TextInput>

            <TouchableOpacity onPress={handleResetPassword}>
                <LinearGradient style={styles.botao}
                    colors={['#6C64FB', '#9B67FF']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.botaoTexto} >ENVIAR</Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>



    </View>
}