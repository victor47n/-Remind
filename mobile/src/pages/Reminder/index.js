import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Text, TextInput, TouchableOpacity, Switch, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';

import styles from './styles';

export default function Home() {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [dayWeek, setDayWeek] = useState([]);

    const [date, setDate] = useState(new Date(1598051730000));
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const data = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Domingo',
            first_letter: 'D'
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Segunda',
            first_letter: 'S'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Terça',
            first_letter: 'T'
        },
        {
            id: '5d4f2v1g8-3da1-471f-bd96-54584d12f54s',
            title: 'Quarta',
            first_letter: 'Q'
        },
        {
            id: '965g8t5r4-7da2-471f-bd96-65989d8a99ad',
            title: 'Quinta',
            first_letter: 'Q'
        },
        {
            id: 'vf23e586-38w5-471f-bd96-54g87r61tr2l',
            title: 'Sexta',
            first_letter: 'S'
        },
        {
            id: 'a5w87r4f-3da1-471f-bd96-22swrt6y9h4f',
            title: 'Sabado',
            first_letter: 'S'
        },
    ];

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
        return `${date.getDate()}/${date.getMonth() +
            1}/${date.getFullYear()}`;
    };

    const formatHours = (time) => {
        return `${time.getHours()}:${time.getMinutes()}`;
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
                    <TouchableOpacity style={isEnabled ? styles.inputDateSelected : styles.inputDate} onPress={isEnabled ? null : showDatepicker}>
                        <Text style={isEnabled ? styles.inputDateTextSelected : styles.inputDateText}>{formatDate(date)}</Text>
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
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>
            </View>
            {isEnabled && (
                // <View style={styles.repeatBox}>
                //     <Text style={styles.repeatTitle}>Repetir às/aos</Text>

                //     <View style={styles.week}>
                //         <TouchableOpacity style={dayWeek.includes(1) ? styles.weekDaySelected : styles.weekDay} onPress={() => handleDayWeek(1)}>
                //             <Text>D</Text>
                //         </TouchableOpacity>
                //         <TouchableOpacity style={dayWeek.includes(2) ? styles.weekDaySelected : styles.weekDay} onPress={() => handleDayWeek(2)}>
                //             <Text>S</Text>
                //         </TouchableOpacity>
                //         <TouchableOpacity style={dayWeek.includes(3) ? styles.weekDaySelected : styles.weekDay} onPress={() => handleDayWeek(3)}>
                //             <Text>T</Text>
                //         </TouchableOpacity>
                //         <TouchableOpacity style={dayWeek.includes(4) ? styles.weekDaySelected : styles.weekDay} onPress={() => handleDayWeek(4)}>
                //             <Text>Q</Text>
                //         </TouchableOpacity>
                //         <TouchableOpacity style={dayWeek.includes(5) ? styles.weekDaySelected : styles.weekDay} onPress={() => handleDayWeek(5)}>
                //             <Text>Q</Text>
                //         </TouchableOpacity>
                //         <TouchableOpacity style={dayWeek.includes(6) ? styles.weekDaySelected : styles.weekDay} onPress={() => handleDayWeek(6)}>
                //             <Text>S</Text>
                //         </TouchableOpacity>
                //         <TouchableOpacity style={dayWeek.includes(7) ? styles.weekDaySelected : styles.weekDay} onPress={() => handleDayWeek(7)}>
                //             <Text>S</Text>
                //         </TouchableOpacity>
                //     </View>
                // </View>
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
        </View>
    );
}