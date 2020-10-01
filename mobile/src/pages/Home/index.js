import React, { useState, useEffect } from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
//import CheckBox from '@react-native-community/checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import styles from './styles';

export default function Home() {
    const navigation = useNavigation();
    const [remindCheck, setRemindCheck] = useState([]);
    const [state, setState] = useState(false);

    const data = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
            status: 'open'
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
            status: 'close'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
            status: 'open'
        },
    ];

    function navigateToReminder() {
        navigation.navigate('Reminder');
    }

    function navigateToDetail() {
        navigation.navigate('Reminder');
    }

    function handleStateReminder(id) {
        const alreadySelected = remindCheck.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = remindCheck.filter(item => item !== id)

            setRemindCheck(filteredItems);
        } else {
            setRemindCheck([...remindCheck, id]);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} style="light" />
            <LinearGradient style={styles.header}
                colors={['#6C64FB', '#9B67FF']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
                <View style={styles.iconsHeader}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <MaterialIcons name="menu" size={24} color="#FAFAFA" />
                    </TouchableOpacity>
                    <MaterialCommunityIcons name="calendar-blank" size={24} color="#FAFAFA" />
                </View>

                <View style={styles.headerDate}>
                    <Text style={styles.headerText}>5 ago.</Text>
                </View>
                <View style={styles.headerReminder}>
                    <View>
                        <Text style={styles.headerReminderTitle}>Hoje</Text>
                        <Text style={styles.headerReminderSub}>8 tarefas</Text>
                    </View>

                    <TouchableOpacity onPress={navigateToReminder}>
                        <LinearGradient style={styles.newReminderButton}
                            colors={['#FE9DA4', '#FC81A7']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        >
                            <Text style={styles.newReminderButtonText}>Novo Lembrete</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <FlatList
                style={styles.containerReminder}
                data={data}
                keyExtractor={remind => String(remind.id)}

                showsVerticalScrollIndicator={false}
                renderItem={({ item: remind }) => (
                    <View style={styles.remind}>
                        <TouchableHighlight
                            style={remindCheck.includes(remind.id) ? styles.reminderBoxSelected : styles.reminderBox}
                            onPress={navigateToDetail}
                            underlayColor="#FE9DA4"
                        // activeOpacity={0.6}
                        >
                            <View style={styles.remindContent}>
                                <CheckBox
                                    value={remindCheck.includes(remind.id) ? true : false}
                                    onValueChange={() => handleStateReminder(remind.id)}
                                    tintColors={{ true: '#6C64FB', false: '#E0E0E0' }}
                                    style={styles.reminderCheck}
                                />
                                <View>
                                    <Text style={remindCheck.includes(remind.id) ? styles.reminderTextDescriptionSelected : styles.reminderTextDescription}>{remind.title}</Text>
                                    <Text style={remindCheck.includes(remind.id) ? styles.reminderTextTimeSelected : styles.reminderTextTime}>13:00 - 14:00</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                )}
            >
            </FlatList>
        </View>
    );
}