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
        paddingVertical: 40,
    },

    input: {
        height: 48,
        borderRadius: 25,
        backgroundColor: '#FAFAFA',
        paddingLeft: 24,
        shadowColor: '#000', // iOS
        shadowOpacity: 0.39, // iOS
        shadowRadius: 8.3,  // iOS
        shadowOffset: {width: 0, height: 6}, // iOS
        elevation: 13, // Android
    },

    datePick: {
        paddingTop: 24,
        flexDirection: 'row',
        alignContent: 'space-between'
    },

    inputDate: {
        height: 48,
        width: 160,
        borderRadius: 25,
        backgroundColor: '#FAFAFA',
        paddingLeft: 24,
        shadowColor: '#000', // iOS
        shadowOpacity: 0.39, // iOS
        shadowRadius: 8.3,  // iOS
        shadowOffset: {width: 0, height: 6}, // iOS
        elevation: 13, // Android
    },

    inputHours: {
        marginLeft: 20,
        height: 48,
        width: 100,
        borderRadius: 25,
        backgroundColor: '#FAFAFA',
        paddingLeft: 24,
        shadowColor: '#000', // iOS
        shadowOpacity: 0.39, // iOS
        shadowRadius: 8.3,  // iOS
        shadowOffset: {width: 0, height: 6}, // iOS
        elevation: 13, // Android
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
    }
});