import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, CheckBox, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';

export default function Home() {
    const navigation = useNavigation();
    const [isSelected, setSelection] = useState(false);

    function navigateToReminder() {
        navigation.navigate('Reminder');
    }

    function navigateToDetail() {
        navigation.navigate('Reminder');
    }

    return (
        <View style={styles.container}>
            <LinearGradient style={styles.header}
                colors={['#6C64FB', '#9B67FF']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
                <MaterialIcons name="menu" size={24} color="#FAFAFA" />
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
                            <Text style={styles.newReminderButtonText}>Nova Tarefa</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <FlatList
                style={styles.containerReminder}
                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                keyExtractor={remind => String(remind)}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <View style={styles.remind}>
                        <TouchableHighlight
                            style={isSelected ? styles.reminderBoxSelected : styles.reminderBox}
                            onPress={navigateToDetail}
                            underlayColor="#FE9DA4"
                        // activeOpacity={0.6}
                        >
                            <View style={styles.remindContent}>
                                <CheckBox
                                    value={isSelected}
                                    onValueChange={setSelection}
                                    tintColors={{ true: '#6C64FB', false: '#E0E0E0' }}
                                    style={styles.reminderCheck}
                                />
                                <View>
                                    <Text style={isSelected ? styles.reminderTextDescriptionSelected : styles.reminderTextDescription}>Alguma tarefa</Text>
                                    <Text style={isSelected ? styles.reminderTextTimeSelected : styles.reminderTextTime}>13:00 - 14:00</Text>
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