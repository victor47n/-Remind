import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    background: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#FAFAFA'
    },
    header: {
        backgroundColor: '#6C64FB',
        paddingHorizontal: 16,
        paddingTop: Constants.statusBarHeight + 16,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    head: {
        alignSelf: 'center',
        marginTop: 85,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headContainer: {
        marginHorizontal: 16,
        display: 'flex'
    },
    headText: {
        color: '#636363',
        display: 'flex',
        fontSize: 16,
        fontFamily: 'Roboto',
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
        marginBottom: 24
    },
    input: {
        shadowOffset: { width: 0, height: 3, },
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        paddingLeft: 28,
        elevation: 13,
        backgroundColor: '#F9F9F9',
        borderStyle: 'solid',
        borderColor: '#E0E0E0',
        fontFamily: 'Roboto',
        borderWidth: 1,
        borderRadius: 25,
        marginVertical: 16,
        height: 48,
        width: 280,
        fontSize: 16

    },
    registrar: {
        paddingVertical: 10,
        borderRadius: 25,
        elevation: 13,
        alignSelf: 'center',
        alignItems: 'center',
        width: 280,
        height: 36,
        display: 'flex',
        shadowOffset: { width: 0, height: 3, },
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,

    },
    registrarTexto: {
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: 0.125,
        fontFamily: 'Roboto',
        color: '#F5F5F5'
    }
});