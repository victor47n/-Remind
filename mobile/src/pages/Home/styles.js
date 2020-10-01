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
    },

    iconsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    headerDate: {
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    headerText: {
        fontSize: 20,
        fontFamily: 'Roboto',
        color: '#FAFAFA',
        fontWeight: "500",
        letterSpacing: 0.15,
    },

    headerReminder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 32,
    },

    headerReminderTitle: {
        fontSize: 24,
        fontFamily: 'Roboto',
        color: '#FAFAFA',
        fontWeight: '400',
        letterSpacing: 0,
    },

    headerReminderSub: {
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#E0E0E0',
        fontWeight: '400',
        letterSpacing: 0.4,
        // marginTop: 8
    },

    newReminderButton: {
        backgroundColor: '#FE9DA4',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },

    newReminderButtonText: {
        fontSize: 14,
        fontFamily: 'Roboto',
        color: '#FAFAFA',
        fontWeight: "500",
        letterSpacing: 1.25,
        textTransform: 'uppercase',
    },

    containerReminder: {
        flex: 1,
        paddingTop: 40,
    },

    remind: {
        marginTop: 8,
        marginBottom: 32,
        marginHorizontal: 40
    },

    reminderBox: {
        height: 70,
        shadowColor: '#000', // iOS
        shadowOpacity: 0.39, // iOS
        shadowRadius: 8.3,  // iOS
        shadowOffset: {width: 0, height: 6}, // iOS
        elevation: 13, // Android
        paddingHorizontal: 24,
        paddingVertical: 16,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        borderRadius: 20,
        // marginTop: 8,
        // marginBottom: 32,
        // marginHorizontal: 40
    },

    reminderBoxSelected: {
        height: 70,
        shadowColor: '#000', // iOS
        shadowOpacity: 0.18, // iOS
        shadowRadius: 1, // iOS
        shadowOffset: {width: 0, height: 1}, // iOS
        elevation: 1, // Android
        paddingHorizontal: 24,
        paddingVertical: 16,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
    },

    remindContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    reminderCheck: {
        marginRight: 24,
        // paddingVertical: 24,
    },

    reminderTextDescription: {
        fontSize: 14,
        fontFamily: 'Roboto',
        color: '#2A2A2A',
        fontWeight: "500",
        letterSpacing: 0.1,
    },

    reminderTextDescriptionSelected: {
        fontSize: 14,
        fontFamily: 'Roboto',
        color: '#E0E0E0',
        fontWeight: "500",
        letterSpacing: 0.1,
    },

    reminderTextTime: {
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#636363',
        fontWeight: "normal",
        letterSpacing: 0.4,
    },

    reminderTextTimeSelected: {
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#E0E0E0',
        fontWeight: "normal",
        letterSpacing: 0.4,
    },
});