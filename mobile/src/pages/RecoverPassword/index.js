import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function RecuperarSenha() {
    const [email, setEmail] = useState('');

    async function handleRecoveryToken() {     
        const data = {
            
            email,
        }
        try {
        const response = await api.post('/forgot_password', data);
        navigateToResetPassword();
        } catch (error) {
            alert(error);
        }
    }

    const navigation = useNavigation();

    function navigateBack(){
        navigation.goBack();
    }
    function navigateToResetPassword(){
        navigation.navigate('ResetPassword');
    }
    
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

            <Text style={styles.descricao} >Insira o email de sua conta e enviaremos um token para redefinição de senha</Text>
        </View>

        <View style={styles.body}>

            <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" placeholderTextColor="#E0E0E0" placeholder="Email" autoCorrect={false}></TextInput>

            <TouchableOpacity  onPress={handleRecoveryToken} >
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
