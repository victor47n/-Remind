import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api';

export default function SharedAccScreen() {
    const [email, setEmail] = useState('');

    

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


                <TextInput style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    placeholderTextColor="#E0E0E0"
                    placeholder="Email"
                    autoCorrect={false} />

                <TouchableOpacity >
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
