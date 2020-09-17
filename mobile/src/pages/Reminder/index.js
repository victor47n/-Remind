import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity, Switch, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';


export default function Home() {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    function navigateToHome() {
        navigation.navigate('Home');
    }
    return (
        <View style={styles.container}>
            <LinearGradient style={styles.header}
                colors={['#6C64FB', '#9B67FF']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
                <TouchableOpacity style={styles.buttonBack} onPress={navigateToHome}>
                    <MaterialIcons name="arrow-back" size={24} color="#FAFAFA" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Lembrete</Text>
            </LinearGradient>

            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder="Lembre-me de..."
                    placeholderTextColor="#E0E0E0"
                    // keyboardType="text"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                // selectionColor="#6C64FB"
                // underlineColorAndroid="#6C64FB"
                />

                <View style={styles.toggleSwitch}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#FC81A780" }}
                        thumbColor={isEnabled ? "#FC81A7" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                    <Text style={styles.switchText}>Repetir</Text>
                </View>

                <View style={styles.datePick}>
                    <TouchableOpacity style={styles.inputDate} onPress={showDatepicker} title="Show date picker!" />
                    <TouchableOpacity styles={styles.inputHours} onPress={showTimepicker} title="Show time picker!" />

                    {/* <TextInput
                        style={styles.inputHours}
                        placeholder="00:00"
                        placeholderTextColor="#E0E0E0"
                        // keyboardType="text"
                        autoCapitalize="sentences"
                        autoCorrect={false}
                    // selectionColor="#6C64FB"
                    // underlineColorAndroid="#6C64FB"
                    /> */}
                </View>

                <View>
                    <View>
                        {/* <Button styles={styles.inputDate} onPress={showTimepicker} title="Show time picker!" /> */}
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>

            </View>
        </View>
    );
}