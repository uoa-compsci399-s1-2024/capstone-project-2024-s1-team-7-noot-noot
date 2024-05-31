import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';

export default function SupportScreen() {
    const colorScheme = useColorScheme();

    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
                Support
            </Text>
            
            <View style={styles.instructionsContainer}>
                <Text style={[styles.instructionsText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    If you have any questions or concerns, please contact us at:
                </Text>
                <Text style={[styles.contactText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    Email: <Text style={styles.contactHighlight}>Help@sightsaver.com</Text>
                </Text>
                <Text style={[styles.contactText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    Phone: <Text style={styles.contactHighlight}>1-800-123-4567</Text>
                </Text>
                <Text style={[styles.instructionsText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    Alternatively, you can fill out our contact form on our website.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    instructionsContainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 10,
    },
    instructionsText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    contactText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    contactHighlight: {
        fontWeight: 'bold',
    },
});

