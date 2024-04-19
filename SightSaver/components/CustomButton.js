import React from 'react';
import { Pressable } from 'react-native';
import { View, Text } from '@/components/Themed';
import { StyleSheet, Image, Button, useWindowDimensions } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import CustomInput from '../components/CustomInput';
import { useState } from 'react';

export default function CustomButton({ onPress, text }) {
    const colorScheme = useColorScheme();
    return (
    <Pressable onPress={onPress} style={styles.container}>
        <Text style={styles.text}>{text}</Text>
    </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1970B4',
        width: '100%',
        padding: '5%',
        marginVertical: '5%',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: '10%',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
})