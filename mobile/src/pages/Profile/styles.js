import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({

    container: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#FAFAFA'
    },
    header: {
        backgroundColor: '#6C64FB',
        paddingTop: Constants.statusBarHeight + 16,
        paddingBottom: 16,
    },

    buttonBack: {
        marginTop: 16,
        marginLeft: 16,
        width: 24,
        height: 24
    },

    headerProfile: {
        alignSelf: 'center',
        marginBottom: 71,
    },
    profileName: {
        alignSelf: 'center',
        color: '#FAFAFA',
        fontSize: 34,
        lineHeight: 40,
        letterSpacing: 0.25,
        fontFamily: 'Roboto',
    },
    profileEmail: {
        alignSelf: 'center',
        color: '#E0E0E0',
        lineHeight: 19,
        fontSize: 16,
        letterSpacing: 0.15,
        fontFamily: 'Roboto',
    },
    formulary: {
        alignSelf: 'center',
        top: 40
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
        marginBottom: 32,
        fontSize: 16
    },
    buttonBox: {
        marginTop: 147,
        alignSelf: 'center',
    },
    botao: {
        backgroundColor: '#9B67FF',
        borderRadius: 25,
        
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