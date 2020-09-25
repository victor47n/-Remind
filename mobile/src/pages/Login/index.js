import React,{useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e) {
       
  
        try {
          const response = await api.post('auth', {email,password});
            
          await AsyncStorage.setItem('@Reminder:token', response.data.token);
          navigateToRegister();
          console.log(response.data.token);
          return alert('Deu certo');
        } catch (error) {
            console.log(response.token);
            console.log(response.email);
            console.log(response.password);
            console.log(error);
            alert('Algo de errado');
        } 
    }
    const navigation = useNavigation();

    function navigateToRegister() {
        navigation.navigate('Register');
        console.log("teste");
    }

    function navigateToRecoverPassword() {
        navigation.navigate('RecoverPassword');
        console.log("teste");
    }

    function navigateToHome() {
        navigation.navigate('Home');
        console.log("teste");
    }

    return (
        <View style={styles.background}>
            <LinearGradient colors={["#6C64FB", "#9B67FF"]} style={styles.statusBar} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <StatusBar translucent={true} backgroundColor={'transparent'} style="light" />
            </LinearGradient >
            {/* <StatusBar style="light" backgroundColor={'#6C64FB'} /> */}

            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headContainer}>
                        <Text style={styles.headTextEntered}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={navigateToRegister} style={styles.headContainer}>
                        <Text style={styles.headText}>Sign Up</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.formulario}>
                    <TextInput style={styles.input} value={email} onChange={e =>  setEmail(e.target.value)} placeholder="Email" autoCapitalize="none" placeholderTextColor="#E0E0E0" autoCorrect={false} />

                    <TextInput style={styles.input} value={password} onChange={e =>  setPassword(e.target.value)} secureTextEntry={true} placeholder="Senha" autoCapitalize="none" placeholderTextColor="#E0E0E0" autoCorrect={false} />
                </View>

                <TouchableOpacity onPress={navigateToRecoverPassword} style={styles.lostSenha}>
                    <Text style={styles.lostSenhaText}>Esqueceu a senha?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogin} >
                    <LinearGradient style={styles.entrar}
                        colors={['#6C64FB', '#9B67FF']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.entrarTexto} >ENTRAR</Text>

                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </View>
    )

}





