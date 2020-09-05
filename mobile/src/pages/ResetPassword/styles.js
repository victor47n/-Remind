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
        fontFamily: 'Roboto',
        lineHeight: 40,
        display: 'flex',
        alignItems: 'flex-end',
        fontSize: 34,
        margin: 0

    },
    descricao: {
        display: 'flex',
        fontFamily: 'Roboto',
        color: '#636363',
        marginTop: 8,
        fontSize: 16
    },

    input: {
        shadowOffset: { width: 0, height: 3, },
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        paddingLeft: 28,
        backgroundColor: '#F9F9F9',
        borderStyle: 'solid',
        fontFamily: 'Roboto',
        elevation: 13,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 32,
        height: 48,
        width: 280,
        fontSize: 16
    },
    botao: {
        marginTop: 8,
        backgroundColor: '#9B67FF',
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
    botaoTexto: {
        marginVertical: 7,
        fontFamily: 'Roboto',
        color: '#F5F5F5'
    }
});