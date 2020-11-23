import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    background: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#FAFAFA',
    },
    header: {
        marginTop: 24,
        flexDirection: 'row',
        display: 'flex'
    },
    buttonBack: {
        justifyContent: "center",
        alignItems: "center",
        width: 48,
        margin: 10,
        height: 48,
        borderRadius: 25,
        display: 'flex'
    },
    title: {
        alignSelf: 'center',
        display: 'flex',
        color: '#2A2A2A',
        fontFamily: 'Roboto',
        fontSize: 20,
        lineHeight: 23,
        letterSpacing: 0.0015

    },
    personIcon:{
        alignSelf: 'flex-end',
        opacity: 0.25,
        zIndex: 10,
        marginRight: 16,


    },
    falseBox: {
        borderRadius: 20,
        marginBottom: 15,
        paddingBottom: 32,
        elevation: 13,
        alignSelf: 'center',
        width: 280,
        height: 140,
        zIndex: -1
    },
    falseTextBox: {
        fontFamily: 'Roboto',
        fontSize: 14,
        letterSpacing: 0.0025,
        lineHeight: 16,
        paddingLeft: 24,
        paddingTop: 24,
        color: '#FAFAFA'
        
    },
    falseAddButton: {
        marginTop: 64,
        width: 72,
        height: 72,
        borderRadius: 50,
        paddingVertical: 20,
        alignSelf: 'center',
        alignItems: 'center'

    },
    //.............................................................................................................................................
    container: {
        paddingHorizontal: 40,
        alignSelf: 'center',
        marginTop: 16
    },
    trueBox: {
        borderRadius: 20,
        elevation: 13,
        paddingTop: 24,
        paddingLeft: 24,
        marginBottom: 32,
        height: 140
    },
    trueTextBoxName: {
        fontFamily: 'Roboto',
        fontSize: 14,
        lineHeight: 16,
        letterSpacing: 0.0025,
        color: '#FAFAFA'
    },
    trueTextBoxEmail: {
        fontFamily: 'Roboto',
        fontSize: 12,
        lineHeight: 14,
        marginBottom: 58,
        letterSpacing: 0.004,
        color: '#FAFAFA'
    },
    trueDeleteText: {
        fontFamily: 'Roboto',
        fontSize: 10,
        lineHeight: 12,
        textDecorationLine: "underline",
        letterSpacing: 0.015,
        color: '#FAFAFA'
    },
    trueAddButton: {
        paddingVertical: 10,
        alignItems: 'center',
        alignSelf: 'flex-end',
        display: 'flex',
        width: 124,
        height: 36,
        borderRadius: 10
    },
    trueAddText: {
        color: '#FAFAFA'
    },
    trueBoxReminder: {
        marginTop: 16,
        width: 280,
        height: 320,
        borderRadius: 20,
        elevation: 0.8,
        padding: 10,
    },
    
    sectionHeader: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 24,
    },
    sectionTitle: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#FAFAFA',
        letterSpacing: 0.25,
    },

    sectionDate: {
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#FAFAFA',
        letterSpacing: 0.4,
        marginLeft: 24,
    },

    item: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
    },
    reminderCheck: {
        marginRight: 8,
    },

    itemHours: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#FAFAFA',
        letterSpacing: 0.4,
        marginRight: 8,
    },

    containerItemDescription: {
        backgroundColor: '#FE9DA4',
        alignItems:"center",
        height: 60,
        borderRadius: 20,
        padding: 16,
        flex: 1,
    },
    itemDescription: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#FAFAFA',
        letterSpacing: 0.4,
    },

});