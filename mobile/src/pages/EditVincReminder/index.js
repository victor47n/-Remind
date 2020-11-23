import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Text, TextInput, TouchableOpacity, Switch, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import api from '../../services/api';
import styles from './styles';

export default function EditReminder({ route, navigation }) {
    moment.locale('pt-BR');
    moment.updateLocale('pt-br', { weekdaysMin: 'D_S_T_Q_Q_S_S'.split('_') });
    const toggleSwitch = () => setRepeat(previousState => !previousState);
    const [dayWeek, setDayWeek] = useState([]);
    const [reminder, setReminder] = useState({});
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(false);

    const [description, setDescription] = useState('');
    const [repeat, setRepeat] = useState(false);

    let reminderInfo = route.params.reminder;
    
    
    async function showReminder(){
        const response = await api.get(`reminder/${reminderInfo._id}`);
        const detail = response.data.reminder;
        setReminder(detail);
        console.log(detail._id);
    }

    const data = [
        {
            number: '0',
        },
        {
            number: '1',
        },
        {
            number: '2',
        },
        {
            number: '3',
        },
        {
            number: '4',
        },
        {
            number: '5',
        },
        {
            number: '6',
        },
    ];

    function compareDayWeek() {
        setDescription(reminderInfo.description);
        setRepeat(reminderInfo.repeat);
        setDate(new Date(reminderInfo.dateActivity));
        setTime(new Date(reminderInfo.dateActivity));
        setStatus(reminderInfo.status);
        reminderInfo.dayWeek.forEach(item => setDayWeek(prevState => [...prevState, `${item.number}`]));
        
    }

    useEffect(() => {
        showReminder();
        compareDayWeek();
    }, []);

    const onChange = (event, selectedDate) => {
        if (mode == 'date') {
            const currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
            setDate(currentDate);
        } else {
            const currentDate = selectedDate || time;
            setShow(Platform.OS === 'ios');
            setTime(currentDate);
        }
    };
    function goToBack() {
        navigation.navigate('OpenVincReminder');
    }

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

    const formatDate = (date) => {
        return `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
    };

    const formatHours = (time) => {
        return `${("0" + time.getHours()).slice(-2)}:${("0" + time.getMinutes()).slice(-2)}`;
    };

    function navigateToHome() {
        navigation.goBack();
    }

    function handleDayWeek(number) {
        const alreadySelected = dayWeek.findIndex(item => item === number);

        console.log("Entrou aqui: ", alreadySelected);

        if (alreadySelected >= 0) {
            const filteredItems = dayWeek.filter(item => item !== number)

            setDayWeek(filteredItems);
        } else {
            setDayWeek([...dayWeek, number]);
        }
    }

    async function handleRegisterReminder() {
        const reminderId = reminder._id;

        if (repeat === true) {
            
            const data = {
                description,
                dateActivity: new Date(0, 0, 0, time.getHours(), time.getMinutes()),
                status,
                repeat,
                dayWeek:
                    dayWeek.map(_day => {
                        return { number: _day }
                    }),
                reminderId,
            }
            try {
                const token = await AsyncStorage.getItem('@Reminder:token')
                const response = await api.put('reminder/edit', data);
                goToBack();
            } catch (error) {
                alert(error);
            }
        } else {
            setDayWeek([]);
            const data = {
                description,
                dateActivity: new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes()),
                status,
                repeat,
                dayWeek,
                reminderId,
            }

            try {
                const token = await AsyncStorage.getItem('@Reminder:token')
                const response = await api.put('reminder/edit', data);
                goToBack();
            } catch (error) {
                alert(error);
            }
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} style="light" />
            <LinearGradient style={styles.header}
                colors={['#6C64FB', '#9B67FF']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
                <TouchableOpacity style={styles.buttonBack} onPress={goToBack}>
                    <MaterialIcons name="arrow-back" size={24} color="#FAFAFA" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Editar Lembrete</Text>
            </LinearGradient>

            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Lembre-me de..."
                    placeholderTextColor="#E0E0E0"
                    autoCapitalize="sentences"
                    autoCorrect={false}
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
                        keyExtractor={_week => String(_week.number)}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item: _week }) => (
                            <TouchableOpacity style={dayWeek.includes(_week.number) ? styles.weekDaySelected : styles.weekDay} onPress={() => handleDayWeek(_week.number)}>
                                <Text style={dayWeek.includes(_week.number) ? styles.weekDayTextSelected : styles.weekDayText}>{moment(new Date(_week.number), "d").format('dd')}</Text>
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