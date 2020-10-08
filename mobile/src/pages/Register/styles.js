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
        marginTop: 88,
        alignSelf: 'center',
        paddingHorizontal: 40,
    },

    header: {
        alignSelf: 'center',
        flexDirection: 'row',
    },

    headContainer: {
        marginHorizontal: 16,
        display: 'flex'
    },

    headText: {
        color: '#636363',
        display: 'flex',
        fontFamily: 'Roboto',
        fontSize: 16,
        letterSpacing: 0.15,
        lineHeight: 19
    },

    headTextEntered: {
        display: 'flex',
        color: '#9B67FF',
        fontFamily: 'Roboto',
        fontSize: 16,
        letterSpacing: 0.15,
        lineHeight: 19
    },

    formulario: {
        alignSelf: 'center',
        marginTop: 22,
    },

    input: {
        shadowOffset: { width: 0, height: 3, },
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 13,
        backgroundColor: '#F9F9F9',
        borderRadius: 25,
        marginVertical: 16,
        paddingLeft: 28,
        fontFamily: 'Roboto',
        height: 48,
        width: 280,
        fontSize: 16

    },

    registrar: {
        paddingVertical: 10,
        borderRadius: 25,
        alignSelf: 'center',
        alignItems: 'center',
        elevation: 13,
        width: 280,
        height: 36,
        shadowOffset: { width: 0, height: 3, },
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        marginTop: 40

    },

    registrarTexto: {
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: 0.125,
        fontFamily: 'Roboto',
        color: '#F5F5F5'
    }
});