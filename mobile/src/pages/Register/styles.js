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
        fontSize: 16,
        fontFamily: 'Roboto',
    },
    headTextEntered: {
        display: 'flex',
        color: '#9B67FF',
        fontFamily: 'Roboto',
        fontSize: 16
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
        marginTop: 40,
        
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
    entrarTexto: {
        marginVertical: 7,
        fontFamily: 'Roboto',
        color: '#F5F5F5'
    }
});