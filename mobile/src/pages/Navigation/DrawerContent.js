import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';

export function DrawerContent(props) {
    const navigation = useNavigation();

    function navigateToProfile() {
        navigation.navigate('Profile');
    }
    
    return (
        <View style={{ flex: 1 }}>
            <LinearGradient style={styles.background}
                colors={['#6C64FB', '#9B67FF']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
                <View style={styles.content}>
                    <Text style={styles.headerName}>Lorem Ipsum</Text>
                    <Text style={styles.headerEmail}>Lorem Ipsum</Text>

                    <TouchableOpacity style={styles.options} onPress={navigateToProfile} >
                        <MaterialIcons name="perm-identity" size={24} color="#FAFAFA" />
                        <Text style={styles.optionsText}>Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.options} >
                        <MaterialIcons name="power-settings-new" size={24} color="#FAFAFA" />
                        <Text style={styles.optionsText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },

    content: {
        paddingHorizontal: 16,
        paddingTop: Constants.statusBarHeight + 16,
        paddingBottom: 16,
    },

    headerName: {
        fontFamily: 'Roboto',
        fontWeight: '500',
        fontSize: 20,
        letterSpacing: 0.15,
        color: '#FAFAFA'
    },

    headerEmail: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: 16,
        letterSpacing: 0.15,
        color: '#E0E0E0'
    },

    options: {
        marginTop: 26,
        flexDirection: 'row'
    },

    optionsText: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: 16,
        letterSpacing: 0.5,
        color: '#FAFAFA',
        marginLeft: 8
    }
});