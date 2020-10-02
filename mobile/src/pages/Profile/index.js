import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { MaterialIcons } from '@expo/vector-icons';

export default function Profile({ navigation }) {

    function navigateToBack() {
        navigation.navigate('Home');
    }
    return (
        <View style={styles.container}>

            <LinearGradient style={styles.header}
                colors={['#6C64FB', '#9B67FF']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
                <TouchableOpacity style={styles.buttonBack} onPress={navigateToBack}>
                    <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                
                <View style={styles.headerProfile}>
                    <Text style={styles.profileName}> Markinhu </Text>

                    <Text style={styles.profileEmail}> relampago@gmail.com </Text>
                </View>

            </LinearGradient>



            <View style={styles.formulary}>

                <TextInput style={styles.input} autoCapitalize="none" placeholderTextColor="#636363" placeholder="Markinhu" autoCorrect={false}></TextInput>

                <TextInput style={styles.input} autoCapitalize="none" placeholderTextColor="#636363" placeholder="relampago@gmail.com" autoCorrect={false}></TextInput>

                <TextInput style={styles.input} autoCapitalize="none" placeholderTextColor="#E0E0E0" placeholder="Senha" autoCorrect={false}></TextInput>

            </View>

            <View style={styles.buttonBox}>

                <TouchableOpacity onPress={() => { }} >
                    <LinearGradient style={styles.botao}
                        colors={['#6C64FB', '#9B67FF']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.botaoTexto} >SALVAR</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>

        </View>



    );







}