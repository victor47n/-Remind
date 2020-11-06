import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import api from '../../services/api';

export default function SharedAcc() {
    //Recebe se o usúario possui ou não uma conta vinculada.
    const [acc, setAcc] = useState('');

    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack();
       
    }

    function navigateAdd(){
        navigation.navigate('SharedAccScreen');
        setAcc(true)
    }

    useEffect(() => {
        setAcc(false);
    
    }, []);

    let createScreen = () => {

        if (acc == true) {
            return (
                <View style={styles.container}> 
                    <LinearGradient
                        style={styles.trueBox}
                        colors={["#6C64FB", "#9B67FF"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View >
                            <Text style={styles.trueTextBoxName}>Lorem Ipsum</Text>
                            <Text style={styles.trueTextBoxEmail}>loremipsum@ipsum.com</Text>
                            

                            <TouchableOpacity>
                                <Text style={styles.trueDeleteText}>EXCLUIR VINCULO</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>

                    
                        <LinearGradient
                            style={styles.trueAddButton}
                            colors={["#6C64FB", "#9B67FF"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <TouchableOpacity >
                            <Text style={styles.trueAddText}>NOVA TAREFA</Text>
                        </TouchableOpacity>
                        </LinearGradient>

                   

                    <LinearGradient
                        style={styles.trueBoxReminder}
                        colors={["#6C64FB", "#9B67FF"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View>
                        </View>
                    </LinearGradient>

                </View>
            )
        }
        else {
            //
            //Caso seja falso.
            return (
                <>
                    <LinearGradient
                        style={styles.falseBox}
                        colors={["#6C64FB", "#9B67FF"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View>
                            <Text style={styles.falseTextBox}>Nenhuma conta vinculada</Text>
                            <MaterialIcons name="people-outline" size={128} color="#FAFAFA" style={styles.personIcon} />
                        </View>
                    </LinearGradient>
                    
                        <LinearGradient
                            style={styles.falseAddButton}
                            colors={["#6C64FB", "#9B67FF"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <TouchableOpacity  onPress={navigateAdd}>
                            <MaterialIcons name="add" size={32} color="white" />
                            </TouchableOpacity>
                        </LinearGradient>
                    
                </>
            )
        }

    }

    function navigateBack() {
        navigation.goBack();
    }

    return (
        <View style={styles.background}>
            <View style={styles.header}>
                
            <TouchableOpacity style={styles.buttonBack} onPress={navigateBack}>
                <MaterialIcons name="arrow-back" size={24} color="#000000" />
            </TouchableOpacity>
            <Text  style={styles.title}>Conta vinculada</Text>
            </View>
            {createScreen()}
        </View>
    )
}
