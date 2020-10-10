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
    // const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setRepeat(previousState => !previousState);
    const [dayWeek, setDayWeek] = useState([]);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(false);

    const [description, setDescription] = useState('');
    const [repeat, setRepeat] = useState(false);

    const reminder = route.params.reminder;

    const data = [
        {
            number: '0',
            title: 'Domingo',
            first_letter: 'D'
        },
        {
            number: '1',
            title: 'Segunda',
            first_letter: 'S'
        },
        {
            number: '2',
            title: 'Terça',
            first_letter: 'T'
        },
        {
            number: '3',
            title: 'Quarta',
            first_letter: 'Q'
        },
        {
            number: '4',
            title: 'Quinta',
            first_letter: 'Q'
        },
        {
            number: '5',
            title: 'Sexta',
            first_letter: 'S'
        },
        {
            number: '6',
            title: 'Sabado',
            first_letter: 'S'
        },
    ];

    function compareDayWeek(){
        setDescription(reminder.description);
        setRepeat(reminder.repeat);
        setDate(new Date(reminder.dateActivity));
        setTime(new Date(reminder.dateActivity));
        setStatus(reminder.status);
        setDayWeek(reminder.dayWeek);
      
        console.log("COMEÇA AQUIII: ",dayWeek);
        reminder.dayWeek.map(day => {
            handleDayWeek(day.number);
            // setDayWeek(day.number)
        });  
    }

    useEffect(() => {
        compareDayWeek();
       
       
        

      },[dayWeek]);
     
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
        navigation.navigate('Home');
    }

    function handleDayWeek(number) {
        const alreadySelected = dayWeek.findIndex(item => item === number);

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
                repeat:true, 
                dayWeek,
                reminderId,
            }
            console.log("Teste01:", data);
            try {
                const token = await AsyncStorage.getItem('@Reminder:token')
                const response = await api.put('reminder/edit', data);
                navigation.navigate("OpenReminder");
            } catch (error) {
                console.log("Teste Erro 01:", error)
                alert(error);
            }
        } else {
            setRepeat(false);
            const data = {
                description,
                dateActivity: new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes()),
                status,
                repeat:false, 
                dayWeek,
                reminderId,
            }

            try {
                console.log("Teste02:", data);
                const token = await AsyncStorage.getItem('@Reminder:token')
                const response = await api.put('reminder/edit', data);
                navigation.navigate("OpenReminder");
            } catch (error) {
                console.log(reminderId)
                console.log("Teste Erro 02:", error.message);
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
                <TouchableOpacity style={styles.buttonBack} onPress={navigateToHome}>
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