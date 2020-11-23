import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

import api from './services/api';

import Login from './pages/Login';
import Register from './pages/Register';
import RecoverPassword from './pages/RecoverPassword';
import Home from './pages/Home';
import Reminder from './pages/Reminder';
import ReminderVinc from './pages/ReminderVinc';
import ReminderCalend from './pages/ReminderCalend';
import EditReminder from './pages/EditReminder';
import EditVincReminder from './pages/EditVincReminder';
import EditCalendReminder from './pages/EditCalendReminder';
import Profile from './pages/Profile';
import OpenReminder from './pages/OpenReminder';
import OpenVincReminder from './pages/OpenVincReminder';
import OpenCalendReminder from './pages/OpenCalendReminder';
import CalendarReminder from './pages/CalendarReminder';
import { DrawerContent } from './pages/Navigation/DrawerContent'
// import hasNotificationPermission from './services/notification/NotificationPermission';
// import getPushToken from './services/notification/PushToken';
// import updatePushToken from './services/notification/UpdatePushToken';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

import SharedAcc from './pages/sharedAccounts';
import SharedAccList from './pages/sharedAccountsList';
import SharedAccScreen from './pages/sharedAccountScreen';
import { DrawerContent } from './pages/Navigation/DrawerContent';

function DrawerScreen() {
    const [expoPushToken, setExpoPushToken] = useState(null);

    useEffect(() => {
        registerForPushNotificationsAsync();
    }, [])

    useEffect(() => {
        if (expoPushToken !== null) {
            sendToken();
        }
    }, [expoPushToken]);

    // Registrar token do usuário
    async function registerForPushNotificationsAsync() {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                Alert.alert(
                    'Warning',
                    'You will not receive reminders if you do not enable push notifications. If you would like to receive reminders, please enable push notifications for Fin in your settings.',
                    [
                        { text: 'Cancel' },
                        // If they said no initially and want to change their mind,
                        // we can automatically open our app in their settings
                        // so there's less friction in turning notifications on
                        { text: 'Enable Notifications', onPress: () => Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings() }
                    ]
                )
                return;
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
            setExpoPushToken(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    };

    async function sendToken() {
        try {
            const idUser = await AsyncStorage.getItem('@Reminder:userId');

            const data = {
                token: expoPushToken,
                idUser
            }

            const response = await api.post('expo-token', data);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Reminder" component={Reminder} />
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="CalendarReminder" component={CalendarReminder} />
        </Drawer.Navigator>
    );
}

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="SharedAcc" component={SharedAcc} />
                <AppStack.Screen name="SharedAccScreen" component={SharedAccScreen} />
                <AppStack.Screen name="SharedAccList" component={SharedAccList} />
                <AppStack.Screen name="Register" component={Register} />
                <AppStack.Screen name="RecoverPassword" component={RecoverPassword} />
                <AppStack.Screen name="Home" component={DrawerScreen} />
                <AppStack.Screen name="Reminder" component={Reminder} />
                <AppStack.Screen name="ReminderVinculo" component={ReminderVinc} />
                <AppStack.Screen name="ReminderCalendar" component={ReminderCalend} />
                <Drawer.Screen name="OpenReminder" component={OpenReminder} />
                <Drawer.Screen name="OpenVincReminder" component={OpenVincReminder} />
                <Drawer.Screen name="OpenCalendReminder" component={OpenCalendReminder} />
                <AppStack.Screen name="EditReminder" component={EditReminder} />
                <AppStack.Screen name="EditVincReminder" component={EditVincReminder} />
                <AppStack.Screen name="EditCalendReminder" component={EditCalendReminder} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}