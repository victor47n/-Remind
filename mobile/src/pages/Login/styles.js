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
        marginLeft: 216,
        marginRight: 40,
        width: 104,
        height: 14,
        marginBottom: 40
    },
    lostSenhaText: {
        lineHeight: 14,
        letterSpacing: 0.4,
        fontSize: 12,
        fontFamily: 'Roboto',
        color: '#9B67FF'
    },
    entrar: {
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
    },
    entrarTexto: {
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: 0.125,
        fontFamily: 'Roboto',
        color: '#F5F5F5'
    }
});