import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Back button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            {/* Settings options */}
            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>Accessibility</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>Data Safety</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>Device</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: 'black',
    },
    optionsContainer: {
        flex: 1,
    },
    option: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    optionText: {
        fontSize: 18,
        color: 'black',
    },
});
