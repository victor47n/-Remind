import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    background: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#F5F5F5'
    },
    head: {
        alignSelf: 'center',
        marginTop: 85,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headText: {
        color: '#636363',
        display: 'flex',
        fontFamily: 'Roboto',
        fontSize: 16,
    },
    headTextEntered: {
        display: 'flex',
        color: '#9B67FF',
        fontFamily: 'Roboto',
        fontSize: 16,
    },
    headContainer: {
        margin: 10,
        display: 'flex'
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
        borderStyle: 'solid',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 25,
        marginVertical: 16,
        paddingLeft: 28,
        fontFamily: 'Roboto',
        height: 48,
        width: 280,
        fontSize: 16

    },
    lostSenha: {
        alignSelf: 'flex-end',
        display: 'flex',
        marginLeft: 216,
        width: 104,
        height: 14
    },
    lostSenhaText: {
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#9B67FF'
    },

    entrar: {
        marginTop: 40,
        borderRadius: 25,
        alignSelf: 'center',
        alignItems: 'center',
        elevation: 13,
        width: 280,
        height: 36,
        display: 'flex',
        shadowOffset: { width: 0, height: 3, },
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,

    },
    entrarTexto: {
        marginVertical: 7,
        fontFamily: 'Roboto',
        color: '#F5F5F5'
    }
});