import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';
import * as SecureStore from 'expo-secure-store';
import CustomButton from '../../../components/CustomButton';

export default function NotificationSettings() {
    const colorScheme = useColorScheme();
    const [dailyGoal, setDailyGoal] = useState(2);
    const [initialGoal, setInitialGoal] = useState(2);

    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <View style={styles.textArea}>
                <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Daily Goal:</Text>
                <Text style={[styles.text, { color: Colors[colorScheme ?? 'light'].text, marginLeft: '5%' }]}>{dailyGoal} Hours</Text>
            </View>
            <View>
                <CustomButton 
                    style={styles.saveButton}
                    onPress={() => {
                        //SecureStore.setItemAsync('dailyGoal', dailyGoal.toString());
                    }}
                    text="Save Daily Goal"
                >
                </CustomButton>
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
    goalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        marginTop: 20,
        backgroundColor: '#1970B4',
        width: '85%',
        alignSelf: 'center',
        borderRadius: 5,
    },
    slider: {
        minWidth: '85%',
        height: 40
    }
});
