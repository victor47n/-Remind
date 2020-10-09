import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Text, TextInput, TouchableOpacity, Switch, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
// import MethodContext from '../../components/MethodContext'
// import 'moment-timezone';

// moment.tz.setDefault('UTC');


import styles from './styles';
import api from '../../services/api';

export default function Reminder({ navigation }) {
    moment.locale('pt-BR');
    const toggleSwitch = () => setRepeat(previousState => !previousState);
    const [dayWeek, setDayWeek] = useState([]);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [description, setDescription] = useState('');
    const [repeat, setRepeat] = useState(false);

    const dataWeek = [
        {
            id: '0',
            title: 'Domingo',
            first_letter: 'D'
        },
        {
            id: '1',
            title: 'Segunda',
            first_letter: 'S'
        },
        {
            id: '2',
            title: 'Terça',
            first_letter: 'T'
        },
        {
            id: '3',
            title: 'Quarta',
            first_letter: 'Q'
        },
        {
            id: '4',
            title: 'Quinta',
            first_letter: 'Q'
        },
        {
            id: '5',
            title: 'Sexta',
            first_letter: 'S'
        },
        {
            id: '6',
            title: 'Sabado',
            first_letter: 'S'
        },
    ];

    const onChange = (event, selectedDate) => {
        if (mode == 'date') {
            const currentDate = selectedDate || dataWeek;
            setShow(Platform.OS === 'ios');
            setDate(currentDate);
        } else {
            const currentDate = selectedDate || dataWeek;
            setShow(Platform.OS === 'ios');
            setTime(currentDate);
        }
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('dataWeek');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const formatDate = (dataWeek) => {
        return `${("0" + dataWeek.getDate()).slice(-2)}/${("0" + (dataWeek.getMonth() + 1)).slice(-2)}/${dataWeek.getFullYear()}`;
    };

    const formatHours = (time) => {
        return `${("0" + time.getHours()).slice(-2)}:${("0" + time.getMinutes()).slice(-2)}`;
    };

    function navigateToHome() {
        navigation.navigate('Home');
    }

    function handleDayWeek(id) {
        const alreadySelected = dayWeek.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = dayWeek.filter(item => item !== id)

            setDayWeek(filteredItems);
        } else {
            setDayWeek([...dayWeek, id]);
        }
    }

    async function handleRegisterReminder() {
        if (repeat === true) {
            const data = {
                description,
                dateActivity: new Date(0, 0, 0, time.getHours(), time.getMinutes()),
                repeat,
                dayWeek:
                    dayWeek.map(_day => {
                        return { number: _day }
                    })
                ,
                userId: await AsyncStorage.getItem('@Reminder:userId'),
            }

            try {
                // alert(dayWeek.length);
                const response = await api.post('reminder', data);
                if (response.status >= 200 && response.status < 300) {
                    // Clear();
                    navigateBack();
                }
            } catch (error) {
                alert(error);
            }
        } else {
            const data = {
                description,
                dateActivity: new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes()),
                userId: await AsyncStorage.getItem('@Reminder:userId'),
                repeat:false,
            }

            try {
                const response = await api.post('reminder', data);
                if (response.status >= 200 && response.status < 300) {
                    // Clear();
                    navigateBack();
                }
            } catch (error) {
                alert(error);
            }
        }
    }
    function Clear(){
        setDescription("");
        setRepeat("");
        setDayWeek("");
    }

    function navigateBack() {
        navigation.navigate("Home");
    };
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} style="light" />
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
                    value={description}
                    onChangeText={setDescription}
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
                        thumbColor={repeat ? "#FC81A7" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={repeat}
                    />
                    <Text style={styles.switchText}>Repetir</Text>
                </View>

                <View style={styles.datePick}>
                    <TouchableOpacity style={repeat ? styles.inputDateSelected : styles.inputDate} onPress={repeat ? null : showDatepicker}>
                        <Text style={repeat ? styles.inputDateTextSelected : styles.inputDateText}>
                            {formatDate(date)}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.inputHours} onPress={showTimepicker}>
                        <Text style={styles.inputDateText}>{formatHours(time)}</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            minimumDate={new Date()}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>
            </View>
            {repeat && (
                <View style={styles.repeatBox}>
                    <Text style={styles.repeatTitle}>Repetir às/aos</Text>
                    <FlatList
                        style={styles.week}
                        data={data}
                        numColumns={7}
                        contentContainerStyle={{ paddingBottom: 24, paddingTop: 16, paddingHorizontal: 40, }}
                        keyExtractor={_week => String(_week.id)}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item: _week }) => (
                            <TouchableOpacity style={dayWeek.includes(_week.id) ? styles.weekDaySelected : styles.weekDay} onPress={() => handleDayWeek(_week.id)}>
                                <Text style={dayWeek.includes(_week.id) ? styles.weekDayTextSelected : styles.weekDayText}>{_week.first_letter}</Text>
                            </TouchableOpacity>
                        )}
                    >
                    </FlatList>
                </View>
            )}

            <TouchableOpacity style={styles.buttonSave} onPress={handleRegisterReminder}>
                <Text style={styles.textButtonSave}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}