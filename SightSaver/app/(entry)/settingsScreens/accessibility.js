import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';

export default function AccessibilityScreen() {
    const colorScheme = useColorScheme();
    const [highContrastMode, setHighContrastMode] = useState(false);

    const toggleHighContrastMode = () => {
        setHighContrastMode((prevMode) => !prevMode);
    };

    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>Accessibility Settings</Text>
            <View style={styles.option}>
                <Text style={styles.optionText}>High Contrast Mode</Text>
                <Switch
                    value={highContrastMode}
                    onValueChange={toggleHighContrastMode}
                    trackColor={{ false: 'gray', true: 'blue' }}
                    thumbColor={highContrastMode ? 'white' : 'gray'}
                />
            </View>
            {/* Add more accessibility options here */}
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
});
