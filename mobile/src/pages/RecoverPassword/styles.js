import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    background: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#F5F5F5'
    },
    head: {
        marginTop: 56,
        marginLeft: 36,
        marginRight: 44
    },
    body: {
        marginHorizontal: 40,
        marginTop: 56,
        alignSelf: 'center'
    },
    titulo: {
        width: 155,
        height: 80,
        lineHeight: 40,
        display: 'flex',
        alignItems: 'flex-end',
        fontSize: 34,
        fontFamily: 'Roboto',
        margin: 0

    },
    descricao: {
        display: 'flex',
        color: '#636363',
        fontFamily: 'Roboto',
        marginTop: 8,
        fontSize: 16
    },

    input: {
        shadowOffset: { width: 0, height: 3, },
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 13, 
        paddingLeft: 28,
        backgroundColor: '#F9F9F9',
        borderStyle: 'solid',
        borderColor: '#E0E0E0',
        fontFamily: 'Roboto',
        borderWidth: 1,
        borderRadius: 25,
        height: 48,
        width: 280,
        fontSize: 16
    },
    botao: {
        marginTop: 40,
        backgroundColor: '#9B67FF',
        borderRadius: 25,
        alignSelf: 'center',
        elevation: 13,
        alignItems: 'center',
        width: 280,
        height: 36,
        display: 'flex',
        shadowOffset: { width: 0, height: 3, },
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,

    },
    botaoTexto: {
        marginVertical: 7,
        fontFamily: 'Roboto',
        color: '#F5F5F5'
    }
});