import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    background: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#FAFAFA',
    },

    statusBar: {
        backgroundColor: '#6C64FB',
        paddingHorizontal: 16,
        height: Constants.statusBarHeight
    },

    container: {
        flex: 1,
        alignSelf: 'center',
        paddingHorizontal: 40,
    },

    buttonBack: {
        justifyContent: "center",
        alignItems: "center",
        width: 48,
        height: 48,
        borderRadius: 25,
    },

    head: {
        marginTop: 8,
        marginBottom: 56,
    },

    title: {
        fontFamily: 'Roboto',
        fontSize: 34,
        letterSpacing: 0.25,
        width: '60%',
    },

    description: {
        display: 'flex',
        color: '#636363',
        fontFamily: 'Roboto',
        marginTop: 8,
        letterSpacing: 0.15,
        lineHeight: 19,
        fontSize: 16
    },

    input: {
        shadowOffset: { width: 0, height: 3, },
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 13,
        paddingLeft: 28,
        backgroundColor: '#FAFAFA',
        fontFamily: 'Roboto',
        borderRadius: 25,
        height: 48,
        marginBottom: 40,
        fontSize: 16
    },

    button: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#9B67FF',
        borderRadius: 25,
        alignSelf: 'center',
        elevation: 13,
        alignItems: 'center',
        width: '100%',
        height: 36,
        shadowOffset: { width: 0, height: 3, },
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },

    buttonText: {
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontSize: 14,
        letterSpacing: 0.0125,
        fontWeight: '500',
        color: '#F5F5F5'
    }
});