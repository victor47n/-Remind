import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ResetarSenha() {
    const navigation = useNavigation();

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

            <TextInput style={styles.input} autoCapitalize="none" placeholderTextColor="#E0E0E0" placeholder="Senha" autoCorrect={false}></TextInput>

            <TextInput style={styles.input} autoCapitalize="none" placeholderTextColor="#E0E0E0" placeholder="Confirmar Senha" autoCorrect={false}></TextInput>

            <TextInput style={styles.input} autoCapitalize="none" placeholderTextColor="#E0E0E0" placeholder="Token" autoCorrect={false}></TextInput>

            <TouchableOpacity onPress={() => { }} >
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