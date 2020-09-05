import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Login({ navigation }) {
    return <View style={styles.background}>

        <View style={styles.head}>

            <TouchableOpacity style={styles.headContainer}>
                <Text style={styles.headTextEntered}>Log In</Text>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate('Register') }} style={styles.headContainer}>
                <Text style={styles.headText}>Sign Up</Text>
            </TouchableOpacity>

        </View>
        <View style={styles.formulario}>
            <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" placeholderTextColor="#E0E0E0" autoCorrect={false}>

            </TextInput>


            <TextInput style={styles.input} placeholder="Senha" autoCapitalize="none" placeholderTextColor="#E0E0E0" autoCorrect={false}>

            </TextInput>



        </View>

        <TouchableOpacity onPress={() => { navigation.navigate('RecoverPassword') }} style={styles.lostSenha}>

            <Text style={styles.lostSenhaText}>Esqueceu a senha?</Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} >
            <LinearGradient style={styles.entrar}
                colors={['#6C64FB', '#9B67FF']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
                <Text style={styles.entrarTexto} >ENTRAR</Text>

            </LinearGradient>
        </TouchableOpacity>

    </View>

}


    


