import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';

export default function AccessibilityScreen() {
    const colorScheme = useColorScheme();

    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <Text style={{ color: Colors[colorScheme ?? 'light'].text, fontSize: 24, fontWeight: 'bold' }}>
                Dark Mode
            </Text>
            
            <View style={styles.instructionsContainer}>
                <Text style={[styles.instructionsText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    To change the system from light mode to dark mode, follow these steps:
                </Text>
                <Text style={[styles.instructionsText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    1. Open the Settings app on your device.
                </Text>
                <Text style={[styles.instructionsText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    2. Navigate to Display & Brightness.
                </Text>
                <Text style={[styles.instructionsText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    3. Select the "Dark" option to switch to dark mode.
                </Text>
                <Text style={[styles.instructionsText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    4. You can switch back to light mode by selecting the "Light" option.
                </Text>
            </View>

            <Text style={{ color: Colors[colorScheme ?? 'light'].text, marginTop: 20 }}>Accessibility Settings</Text>
            <View style={styles.option}>
                <Text style={[styles.optionText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    More Accessibility Settings Soon...
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    optionText: {
        fontSize: 18,
    },
    instructionsContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 5,
    },
    instructionsText: {
        fontSize: 16,
        marginVertical: 4,
    },
});
