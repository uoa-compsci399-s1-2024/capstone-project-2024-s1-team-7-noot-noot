import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';
import Slider from '@react-native-community/slider';
import * as SecureStore from 'expo-secure-store';

export default function NotificationSettings() {
    const colorScheme = useColorScheme();
    const [dailyGoal, setDailyGoal] = useState(2);

    const saveDailyGoal = async () => {
        await SecureStore.setItemAsync('dailyGoal', dailyGoal.toString());
    }

    useEffect(() => {
        SecureStore.getItemAsync('dailyGoal').then((goal) => {
            if (goal) {
                setDailyGoal(parseInt(goal, 10));
            }
        });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <View style={styles.textArea}>
                <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Daily Goal:</Text>
                <Text style={[styles.text, { color: Colors[colorScheme ?? 'light'].text, marginLeft: '5%' }]}>
                    {dailyGoal} {dailyGoal === 1 ? 'Hour' : 'Hours'}
                </Text>
            </View>
            <View style={styles.section}>
                {/* <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={1}
                    maximumValue={12}
                    step={1}
                    value={dailyGoal}
                    onValueChange={(value) => setDailyGoal(value)}
                    minimumTrackTintColor="#1970B4"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#1970B4"
                /> */}
            </View>
            <TouchableOpacity
                style={styles.saveButton}
                onPress={saveDailyGoal}
            >
                <Text style={styles.saveButtonText}>Save Data</Text>
            </TouchableOpacity>
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
});
