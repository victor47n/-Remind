import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1
    },

    content: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 16,
    },

    iconsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },

    calendar: {
        marginTop: 24,
        marginHorizontal: 40,
    },

    reminderList: {
        backgroundColor: '#FAFAFA',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 32,
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
        flex: 1,
    },

    sectionHeader: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 24,
    },

    sectionTitle: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#2A2A2A',
        letterSpacing: 0.25,
    },

    sectionDate: {
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#636363',
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
        fontSize: 12,
        color: '#2A2A2A',
        letterSpacing: 0.4,
        marginRight: 8,
    },

    containerItemDescription: {
        backgroundColor: '#FE9DA4',
        height: 60,
        borderRadius: 20,
        padding: 16,
        flex: 1,
    },

    containerGradient: {
        flex: 1,
        borderRadius: 20,
    },

    itemDescription: {
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#FAFAFA',
        letterSpacing: 0.4,
    },

})