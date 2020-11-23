import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, SectionList, FlatList } from 'react-native';
import * as CalendarExpo from 'expo-calendar';
import { Calendar, LocaleConfig } from 'react-native-calendars';
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
    const [reminder, setReminder] = useState([]);
    const [dates, setDates] = useState([]);

    moment.locale('pt-br')
    let now = new Date();

    moment.updateLocale('pt-br', {
        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split(
            '_'
        ),
        weekdays: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split(
            '_'
        ),
    });

    function navigateToHome() {
        navigation.navigate('Home');
    }

    function navigateToReminder() {
        navigation.navigate('ReminderCalendar');
    }

    function navigateToDetail(reminder) {
        navigation.navigate('OpenCalendReminder', { reminder });
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

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const getAbleDates = () => {
        const ableDates = {};
        reminder.forEach(element => {
            ableDates[moment(new Date(element.dateActivity)).utc(-3).format('YYYY-MM-DD')] = { marked: true };
        });
        // console.log(ableDates);
        return ableDates;
    };

    async function loadReminders() {
        const userId = await AsyncStorage.getItem('@Reminder:userId');
        // setReminder(null);
        const getList = await api.get(`reminders/${userId}`);
        let arrayReminders = getList.data.reminders;

        setReminder(arrayReminders);

    };

    useEffect(() => {
        const timer = setInterval(() => {
            loadReminders();
        }, 1000);
        return () => clearInterval(timer);
    }, [])

    const reloadAgenda = () => {
        setReminder(null)
    }

    // const Item = ({ _id, dateActivity, description }) => (
    //     console.log("Veio pra ca"),
    //     <View style={styles.item}>
    //         <CheckBox
    //             value={remindCheck.includes(_id) ? true : false}
    //             onValueChange={() => handleStateReminder(_id)}
    //             tintColors={{ true: '#6C64FB', false: '#E0E0E0' }}
    //             style={styles.reminderCheck}
    //         />
    //         <Text style={styles.itemHours}>{moment(dateActivity).format('kk:mm A')}</Text>
    //         <TouchableOpacity style={styles.containerItemDescription}>
    //             <Text style={styles.itemDescription}>{description}</Text>
    //         </TouchableOpacity>
    //     </View >
    // );

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
                    monthFormat={'MMMM yyyy'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => { }}
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

                    // onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}

                    // onRefresh={() => { reloadAgenda() }}

                    style={styles.calendar}

                    // onRefresh={() => console.log('refreshing...')}
                    refreshing={true}

                    markedDates={{ ...getAbleDates() }}
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
                    {/* <SectionList
                        sections={reminder}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <Item info={item} />}
                        renderSectionHeader={({ section: { dateActivity } }) => (
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>oi</Text>
                                <Text style={styles.sectionDate}>oi</Text>
                            </View>
                        )}
                    /> */}
                    <FlatList
                        // style={styles.containerReminder}
                        data={reminder}
                        keyExtractor={reminder => String(reminder._id)}
                        onEndReached={loadReminders}
                        onEndReachedThreshold={0.2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item: reminder }) => {
                            
                                return (
                                    <View>
                                        <View style={styles.sectionHeader}>
                                            <Text style={styles.sectionTitle}>{moment(new Date(reminder.dateActivity)).utc(-3).format('dddd')}</Text>
                                            <Text style={styles.sectionDate}>{moment(new Date(reminder.dateActivity)).utc(-3).format('LL')}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <CheckBox
                                                value={remindCheck.includes(reminder._id) ? true : false}
                                                onValueChange={() => handleStateReminder(reminder._id)}
                                                tintColors={{ true: '#6C64FB', false: '#E0E0E0' }}
                                                style={styles.reminderCheck}
                                            />
                                            <Text style={styles.itemHours}>{moment(new Date(reminder.dateActivity)).add(3, 'hours').format('kk:mm A')}</Text>
                                            <TouchableOpacity style={styles.containerItemDescription} onPress={() => navigateToDetail(reminder)}>
                                                <Text style={styles.itemDescription}>{reminder.description}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                )
                            
                        }}
                    />
                </View>

            </LinearGradient>
        </View>
    );
}
