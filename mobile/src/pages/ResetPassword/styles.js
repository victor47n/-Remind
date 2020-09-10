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
    buttonBack: {
        padding: 12,
        width: 48,
        height: 48
    },
    head: {
        marginTop: 8,
        paddingLeft: 36,
        paddingRight: 44
    },
    titulo: {
        width: 155,
        height: 80,
        fontFamily: 'Roboto',
        letterSpacing: 0.25,
        lineHeight: 40,
        display: 'flex',
        alignItems: 'flex-end',
        fontSize: 34,
        margin: 0
    },
    descricao: {
        width: 280,
        height: 36,
        display: 'flex',
        alignItems: 'flex-end',
        fontFamily: 'Roboto',
        color: '#636363',
        marginTop: 8,
        letterSpacing: 0.15,
        lineHeight: 19,
        fontSize: 16
    },
    body: {
        marginHorizontal: 40,
        marginTop: 56,
        marginBottom: 8,
        alignSelf: 'center'
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
        paddingVertical: 10,
        fontFamily: 'Roboto',
        fontWeight: 400,
        letterSpacing: 0.125,
        lineHeight: 16,
        color: '#F5F5F5'
    }
});