import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useColorScheme } from '../components/useColorScheme';

export default function CustomInput({ value, setValue, placeholder, secureTextEntry }) {
    const colorScheme = useColorScheme();
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].buttonColor }]}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                secureTextEntry={secureTextEntry && !showPassword}
                placeholderTextColor={Colors[colorScheme ?? 'light'].text}
            />
            {secureTextEntry && (
                <MaterialCommunityIcons
                    name={showPassword ? "eye-off" : "eye"}
                    size={28}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={styles.icon}
                    onPress={toggleShowPassword}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 20,
        paddingHorizontal: 20,
        marginVertical: 5,
        paddingVertical: 5,
        marginBottom: '5%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
    },
    icon: {
        position: 'absolute',
        right: 10,
    },
});
