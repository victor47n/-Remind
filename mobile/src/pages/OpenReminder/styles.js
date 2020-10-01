import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    background:{
        flex: 1,
        alignContent: 'center',
        
    },

    statusBar: {
        flex: 1,
        backgroundColor: '#6C64FB',
        paddingHorizontal: 16,
        height: Constants.statusBarHeight
        
    },

    iconsContainer: {
        flexDirection: 'row',
        marginTop: 32,
    },
    buttonClose: {
        display: 'flex',
        paddingVertical: 12,
        
        marginRight: 240,
        width: 24,
        height: 24
    },
    buttonEdit: {
        display: 'flex',
        paddingVertical: 12,
        marginRight: 16,
        width: 24,
        height: 24
    },
    buttonDots: {
        display: 'flex',
        paddingVertical: 12,
        width: 24,
        height: 24
    },
    container: {
        marginTop: 28,
        
    },  
    reminderName: {
    color: '#FAFAFA',
    fontFamily: 'Roboto',
    fontSize: 24,
    lineHeight: 28,
 
    },
    reminderHour: {
        color: '#E0E0E0',
        fontFamily: 'Roboto',
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: 0.0015,
    },
    reminderRepeat: {
        color: '#E0E0E0',
        fontFamily: 'Roboto',
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: 0.0015,
    },
    buttonBar: {
        height: 48,
        alignItems: 'flex-end',
        paddingVertical: 16,
        paddingRight: 16,
    },
    buttonText: {
        color: '#FAFAFA',
        fontFamily: 'Roboto',
        fontSize: 14,
        lineHeight: 16,
        letterSpacing: 0.0025,
    }
});