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
        letterSpacing: 0.25,
        lineHeight: 40,
        
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
        letterSpacing: 0.15,
        lineHeight: 19,
        fontSize: 16
    },
    body: {
        marginHorizontal: 40,
        marginTop: 56,
        alignSelf: 'center'
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
        marginBottom: 40,
        fontSize: 16
    },
    botao: {
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
        paddingVertical: 10,
        fontFamily: 'Roboto',
        letterSpacing: 0.125,
        lineHeight: 16,
        fontWeight: '500',
        color: '#F5F5F5'
    }
});