import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Text, TouchableOpacity, SectionList } from 'react-native';
import * as CalendarExpo from 'expo-calendar';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import CheckBox from '@react-native-community/checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api'
import styles from './styles';
import 'moment/locale/pt-br';
import moment from "moment";

export default function CalendarReminder() {
    const navigation = useNavigation();
    const [remindCheck, setRemindCheck] = useState([]);
    const [dates, setDates] = useState({});

    moment.locale('pt-br')
    let now = new Date();

    moment.updateLocale('pt-br', {
        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split(
            '_'
        ),
    });

    function navigateToHome() {
        navigation.navigate('Home');
    }

    function navigateToReminder() {
        navigation.navigate('Reminder');
    }

    LocaleConfig.locales['pt-br'] = {
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        today: 'Hoje'
    };
    LocaleConfig.defaultLocale = 'pt-br';

    function Arrow(props) {
        if (props.direction === 'left') {
            return <Ionicons name="ios-arrow-back" size={24} color="#FAFAFA" />
        } else {
            return <Ionicons name="ios-arrow-forward" size={24} color="#FAFAFA" />
        };
    }

    function DateHeader(props) {
        console.log("DATA CALENDARIO", props);
        return <Text style={styles.dateHeader}>{moment(props.date).format("MMMM")}</Text>
    }

    function handleStateReminder(id) {
        const alreadySelected = remindCheck.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = remindCheck.filter(item => item !== id)

            setRemindCheck(filteredItems);
        } else {
            setRemindCheck([...remindCheck, id]);
        }
    }

    const data = [
        {
            id: 'bd542gea-c1w1-4612-a4m5-358mfpa93bba',
            title: "Terça-Feira",
            date: '1 Setembro 2020',
            data: [
                { id: '1', hours: '00:00', description: 'Lorem Ipsum' },
                { id: '2', hours: '00:00', description: 'Lorem Ipsum' },
                { id: '3', hours: '00:00', description: 'Lorem Ipsum' },
            ]
        },
        {
            id: 'bsd69bea-e3g1-bd66-kjsx-25sfrel95bxp',
            title: "Quarta-Feira",
            date: '16 Setembro 2020',
            data: [
                { id: '4', hours: '00:00', description: 'Lorem Ipsum' },
                { id: '5', hours: '00:00', description: 'Lorem Ipsum' },
                { id: '6', hours: '00:00', description: 'Lorem Ipsum' },
            ]
        },
    ];

    async function loadReminders() {
        const userId = await AsyncStorage.getItem('@Reminder:userId');

        const getList = await api.get(`reminders/${userId}`);

        if (getList) {
            let arrayReminders = getList.data.reminders;

            arrayReminders.map(_data => {
                var teste = moment(new Date(_data.dateActivity)).format("YYYY-MM-DD");
                dates[teste] = { marked: true };
            })

            setDates(dates)
        }
    };

    useEffect(() => {
        loadReminders();
    }, [])

    const Item = ({ info }) => (
        <View style={styles.item}>
            <CheckBox
                value={remindCheck.includes(info.id) ? true : false}
                onValueChange={() => handleStateReminder(info.id)}
                tintColors={{ true: '#6C64FB', false: '#E0E0E0' }}
                style={styles.reminderCheck}
            />
            <Text style={styles.itemHours}>{info.hours}</Text>
            <TouchableOpacity style={styles.containerItemDescription}>
                <Text style={styles.itemDescription}>{info.description}</Text>
            </TouchableOpacity>
        </View >
    );

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} style="light" />
            <LinearGradient style={styles.content}
                colors={['#6C64FB', '#9B67FF']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >

                <View style={styles.iconsHeader}>
                    <TouchableOpacity onPress={navigateToHome}>
                        <Ionicons name="ios-arrow-back" size={24} color="#FAFAFA" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateToReminder}>
                        <MaterialCommunityIcons name="plus" size={24} color="#FAFAFA" />
                    </TouchableOpacity>
                </View>

                <Calendar
                    // Initially visible month. Default = Date()
                    // current={'2020-09-25'}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    // minDate={'2020-09-25'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    // maxDate={'2020-09-30'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => { console.log('selected day', day) }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => { console.log('selected day', day) }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => { console.log('month changed', month) }}
                    // Hide month navigation arrows. Default = false
                    hideArrows={false}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    renderArrow={(direction) => (<Arrow direction={direction} />)}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={false}
                    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={0}
                    // Hide day names. Default = false
                    hideDayNames={false}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={false}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}
                    // Disable left arrow. Default = false
                    disableArrowLeft={false}
                    // Disable right arrow. Default = false
                    disableArrowRight={false}
                    // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                    disableAllTouchEventsForDisabledDays={true}
                    // Replace default month and year title with custom one. the function receive a date as parameter.
                    // renderHeader={(date) => DateHeader(date) }
                    // Enable the option to swipe between months. Default = false
                    enableSwipeMonths={true}

                    style={styles.calendar}

                    markedDates={dates}

                    theme={{
                        backgroundColor: '#transparent',
                        calendarBackground: 'transparent',
                        textSectionTitleColor: '#E0E0E0',
                        textSectionTitleDisabledColor: '#FAFAFA80',
                        selectedDayBackgroundColor: '#FE9DA4',
                        selectedDayTextColor: '#FAFAFA',
                        todayTextColor: '#FE9DA4',
                        dayTextColor: '#FAFAFA',
                        textDisabledColor: '#FAFAFA80',
                        dotColor: '#FE9DA4',
                        selectedDotColor: '#FAFAFA',
                        arrowColor: '#FAFAFA',
                        disabledArrowColor: '#FAFAFA80',
                        monthTextColor: '#FAFAFA',
                        indicatorColor: '#FAFAFA',
                        textDayFontFamily: 'Roboto',
                        textMonthFontFamily: 'Roboto',
                        textDayHeaderFontFamily: 'Roboto',
                        textDayFontWeight: '400',
                        textMonthFontWeight: '400',
                        textDayHeaderFontWeight: '400',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                    }}
                />

                <View style={styles.reminderList}>
                    <SectionList
                        sections={data}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <Item info={item} />}
                        renderSectionHeader={({ section: { title, date } }) => (
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>{title}</Text>
                                <Text style={styles.sectionDate}>{date}</Text>
                            </View>
                        )}
                    />
                </View>

            </LinearGradient>
        </View>
    );
}