import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';
import { Slider } from '@rneui/themed';
import * as SecureStore from 'expo-secure-store';

export default function NotificationSettings() {
    const colorScheme = useColorScheme();
    const [dailyGoal, setDailyGoal] = useState(2);
    const [initialGoal, setInitialGoal] = useState(2);

    const saveDailyGoal = async () => {
        try {
            await SecureStore.setItemAsync('dailyGoal', dailyGoal.toString());
        } catch (error) {
            console.error('Error saving daily goal:', error);
        }
    };

    useEffect(() => {
        const loadDailyGoal = async () => {
            try {
                const goal = await SecureStore.getItemAsync('dailyGoal');
                if (goal) {
                    const parsedGoal = parseInt(goal, 10);
                    setInitialGoal(parsedGoal);
                    setDailyGoal(parsedGoal);
                }
            } catch (error) {
                console.error('Error loading daily goal:', error);
            }
        };
        loadDailyGoal();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <View style={styles.textArea}>
                <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Daily Goal:</Text>
                <Text style={[styles.text, { color: Colors[colorScheme ?? 'light'].text, marginLeft: '5%' }]}>{dailyGoal} Hours</Text>
            </View>
            <View style={styles.section}>
                <Slider
                    animateTransitions
                    animationType="timing"
                    maximumTrackTintColor="#ccc"
                    maximumValue={24}
                    minimumTrackTintColor="#222"
                    minimumValue={0}
                    onValueChange={value => setDailyGoal(value)}
                    orientation="horizontal"
                    step={1}
                    style={styles.slider}
                    thumbStyle={{ height: 20, width: 20 }}
                    thumbTintColor="#0c0"
                    thumbTouchSize={{ width: 40, height: 40 }}
                    trackStyle={{ height: 10, borderRadius: 20 }}
                    value={initialGoal}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={saveDailyGoal}
                >
                    <Text style={styles.saveButtonText}>Save Data</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    section: {
        alignItems: 'center',
        minWidth: '80%',
    },
    text: {
        fontSize: 24,
    },
    textArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '5%',
    },
    saveButton: {
        marginTop: '20%',
        backgroundColor: '#1970B4',
        color: 'white',
        width: '85%',
        alignSelf: 'center',
        borderRadius: 5,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
    },
    slider: {
        minWidth: '85%',
        height: 40
    }
});