import React from 'react';
import { View, Text } from '../components/Themed';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { useColorScheme } from '../components/useColorScheme';

export default function CustomInput({ value, setValue, placeholder, secureTextEntry }) {
    const colorScheme = useColorScheme();
    return (
        <View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}>
            <TextInput 
                style={styles.input} 
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={Colors[colorScheme ?? 'light'].text}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 50,
        paddingHorizontal: 20,
        marginVertical: 5,
        paddingVertical: 5,
        marginBottom: '5%',
    },
    input: {
    },
});