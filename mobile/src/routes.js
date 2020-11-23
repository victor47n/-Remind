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
import SharedAcc from './pages/sharedAccounts';
import SharedAccList from './pages/sharedAccountsList';
import SharedAccScreen from './pages/sharedAccountScreen';
import { DrawerContent } from './pages/Navigation/DrawerContent';

// RN >= 0.52
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
function DrawerScreen() {
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