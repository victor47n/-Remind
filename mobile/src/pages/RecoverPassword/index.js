import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

export default function RecuperarSenha( {navigation} ) {
    return <View style={styles.background}>
        <View style={styles.head}>
            <Text style={styles.titulo} >Recuperar Senha</Text>

            <Text style={styles.descricao} >Insira o email de sua conta e enviaremos um token para redefinição de senha</Text>
        </View>

        <View style={styles.body}>

            <TextInput style={styles.input} autoCapitalize="none" placeholderTextColor="#E0E0E0" placeholder="Email" autoCorrect={false}></TextInput>

            <TouchableOpacity  onPress={() => { navigation.navigate('ResetPassword') }} >
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
