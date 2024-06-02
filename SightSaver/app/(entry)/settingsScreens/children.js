import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';
import * as SecureStore from 'expo-secure-store';

export default function NotificationSettings() {
    const colorScheme = useColorScheme();
    const [dailyGoal, setDailyGoal] = useState(2);
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const saveDailyGoal = async () => {
        await SecureStore.setItemAsync('dailyGoal', dailyGoal.toString());
        setConfirmationMessage('Daily goal saved successfully!');
        setTimeout(() => {
            setConfirmationMessage('');
        }, 3000);
    };

    useEffect(() => {
        const fetchDailyGoal = async () => {
            const goal = await SecureStore.getItemAsync('dailyGoal');
            setDailyGoal(parseInt(goal, 10));
        };

        fetchDailyGoal();
    }, []);

    const incrementGoal = () => {
        setDailyGoal((prevGoal) => Math.min(prevGoal + 1, 4));
    };

    const decrementGoal = () => {
        setDailyGoal((prevGoal) => Math.max(prevGoal - 1, 1));
    };

    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <View style={styles.textArea}>
                <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Daily Goal:</Text>
                <View style={styles.goalContainer}>
                    <TouchableOpacity style={styles.arrowButton} onPress={decrementGoal}>
                        <Text style={styles.arrowText}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.goalTextContainer}>
                        <Text style={[styles.text, { color: Colors[colorScheme ?? 'light'].text }]}>
                            {dailyGoal} {dailyGoal === 1 ? 'Hour' : 'Hours'}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.arrowButton} onPress={incrementGoal}>
                        <Text style={styles.arrowText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                style={styles.saveButton}
                onPress={saveDailyGoal}
            >
                <Text style={styles.saveButtonText}>Save Daily Goal</Text>
            </TouchableOpacity>
            {confirmationMessage ? (
                <View style={styles.confirmationContainer}>
                    <Text style={styles.confirmationText}>{confirmationMessage}</Text>
                </View>
            ) : null}
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
    goalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        alignItems: 'center',
        marginVertical: 20,
    },
    text: {
        fontSize: 24,
    },
    textArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    goalTextContainer: {
        width: 100,
        alignItems: 'center',
    },
    arrowButton: {
        backgroundColor: '#1970B4',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 10,
    },
    arrowText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    saveButton: {
        marginTop: 20,
        backgroundColor: '#1970B4',
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
    confirmationContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    confirmationText: {
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
