import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

import Login from './pages/Login';
import Register from './pages/Register';
import RecoverPassword from './pages/RecoverPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import Reminder from './pages/Reminder';
import Profile from './pages/Profile';
import OpenReminder from './pages/OpenReminder';
import CalendarReminder from './pages/CalendarReminder';
import { DrawerContent } from './pages/Navigation/DrawerContent'

// RN >= 0.52
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
function DrawerScreen() {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Notifications" component={Reminder} />
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="OpenReminder" component={OpenReminder} />
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
                <AppStack.Screen name="Register" component={Register} />
                <AppStack.Screen name="RecoverPassword" component={RecoverPassword} />
                <AppStack.Screen name="Home" component={DrawerScreen} />
                <AppStack.Screen name="Reminder" component={Reminder} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}