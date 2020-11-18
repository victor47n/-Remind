import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
import EditReminder from './pages/EditReminder';
import Profile from './pages/Profile';
import OpenReminder from './pages/OpenReminder';
import CalendarReminder from './pages/CalendarReminder';
import { DrawerContent } from './pages/Navigation/DrawerContent'
// import hasNotificationPermission from './services/notification/NotificationPermission';
// import getPushToken from './services/notification/PushToken';
// import updatePushToken from './services/notification/UpdatePushToken';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';


function DrawerScreen() {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Reminder" component={Reminder} />
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="OpenReminder" component={OpenReminder} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="CalendarReminder" component={CalendarReminder} />
        </Drawer.Navigator>
    );
}

export default function Routes() {
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
                alert('Failed to get push token for push notification!');
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
            // const idUser = await AsyncStorage.setItem('@Reminder:userId');

            const data = {
                token: expoPushToken,
                // idUser
            }

            const response = await api.post('expo-token', data);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Register" component={Register} />
                <AppStack.Screen name="RecoverPassword" component={RecoverPassword} />
                <AppStack.Screen name="Home" component={DrawerScreen} />
                <AppStack.Screen name="Reminder" component={Reminder} />
                <AppStack.Screen name="EditReminder" component={EditReminder} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}