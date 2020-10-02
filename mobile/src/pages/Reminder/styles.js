import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },

    header: {
        backgroundColor: '#6C64FB',
        paddingHorizontal: 16,
        paddingTop: Constants.statusBarHeight + 16,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },

    buttonBack: {
        paddingRight: 32
    },

    headerTitle: {
        fontSize: 20,
        fontFamily: 'Roboto',
        color: '#FAFAFA',
        fontWeight: "500",
        letterSpacing: 0.15
    },

    content: {
        paddingHorizontal: 40,
        paddingTop: 40,
        paddingBottom: 32
    },

    input: {
        height: 48,
        borderRadius: 25,
        backgroundColor: '#FAFAFA',
        paddingLeft: 24,
        shadowColor: '#000', // iOS
        shadowOpacity: 0.39, // iOS
        shadowRadius: 8.3,  // iOS
        shadowOffset: { width: 0, height: 6 }, // iOS
        elevation: 13, // Android
    },

    datePick: {
        marginTop: 24,
        flexDirection: 'row',
    },

    inputDate: {
        height: 48,
        width: 160,
        borderRadius: 25,
        backgroundColor: '#FAFAFA',
        shadowColor: '#000', // iOS
        shadowOpacity: 0.39, // iOS
        shadowRadius: 8.3,  // iOS
        shadowOffset: { width: 0, height: 6 }, // iOS
        elevation: 13, // Android
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputDateSelected: {
        height: 48,
        minWidth: '60%',
        borderRadius: 25,
        backgroundColor: '#F5F5F5',
        shadowColor: '#000', // iOS
        shadowOpacity: 0.39, // iOS
        shadowRadius: 8.3,  // iOS
        shadowOffset: { width: 0, height: 6 }, // iOS
        elevation: 6, // Android
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputDateText: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: 16,
        letterSpacing: 0.15,
        color: '#616161',
    },

    inputDateTextSelected: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: 16,
        letterSpacing: 0.15,
        color: '#E0E0E0',
    },

    inputHours: {
        marginLeft: 20,
        height: 48,
        minWidth: '40%',
        borderRadius: 25,
        backgroundColor: '#FAFAFA',
        shadowColor: '#000', // iOS
        shadowOpacity: 0.39, // iOS
        shadowRadius: 8.3,  // iOS
        shadowOffset: { width: 0, height: 6 }, // iOS
        elevation: 13, // Android
        justifyContent: 'center',
        alignItems: 'center',
    },

    toggleSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 32
    },

    switchText: {
        marginLeft: 8,
        fontSize: 16,
        fontFamily: 'normal',
        color: '#636363',
        fontWeight: "normal",
        letterSpacing: 0.15
    },

    repeatBox: {
        // marginTop: 32,
    },

    repeatTitle: {
        fontSize: 10,
        fontFamily: 'Roboto',
        color: '#636363',
        fontWeight: "400",
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginLeft: 40
    },

    weekDay: {
        height: 30,
        width: 30,
        marginHorizontal: 4,
        borderRadius: 25,
        backgroundColor: '#FAFAFA',
        shadowColor: '#000', // iOS
        shadowOpacity: 0.39, // iOS
        shadowRadius: 8.3,  // iOS
        shadowOffset: { width: 0, height: 6 }, // iOS
        elevation: 4, // Android,
        justifyContent: 'center',
        alignItems: 'center'
    },

    weekDaySelected: {
        height: 30,
        width: 30,
        marginHorizontal: 4,
        borderRadius: 25,
        backgroundColor: '#FE9DA4',
        shadowColor: '#000', // iOS
        shadowOpacity: 0.39, // iOS
        shadowRadius: 8.3,  // iOS
        shadowOffset: { width: 0, height: 6 }, // iOS
        elevation: 15, // Android,
        justifyContent: 'center',
        alignItems: 'center'
    },

    weekDayText: {
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#636363',
        fontWeight: "500",
        letterSpacing: 0.4,
        textTransform: 'uppercase',
    },

    weekDayTextSelected: {
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#FAFAFA',
        fontWeight: "500",
        letterSpacing: 0.4,
        textTransform: 'uppercase',
    },

    buttonSave: {
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        minWidth: '80%',
        borderRadius: 25,
        position: 'absolute',
        bottom: 0,
        marginBottom: 16,
        backgroundColor: '#6C64FB',


        borderStyle: 'solid',
        borderColor: '#E0E0E0',
        fontFamily: 'Roboto',
        borderWidth: 1,
    },

    textButtonSave: {
        fontSize: 14,
        fontFamily: 'Roboto',
        color: '#FAFAFA',
        fontWeight: "500",
        letterSpacing: 1.25,
        textTransform: 'uppercase',
    },
});