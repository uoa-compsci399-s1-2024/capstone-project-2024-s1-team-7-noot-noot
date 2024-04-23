import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const colorScheme = useColorScheme();

    const handleChangePassword = () => {
        // Add logic to handle password change
    };

    return (
        <View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
            <Text style={[styles.title, {color:Colors[colorScheme ?? 'light'].text}]}>Change Password</Text>
            <Text style={[styles.text, {color:Colors[colorScheme ?? 'light'].text}]}>
                To change your password, please enter your current password and then enter your new password twice to confirm.
            </Text>
            <View style={styles.inputContainer}>
                <Text style={[styles.label, {color:Colors[colorScheme ?? 'light'].text}]}>Current Password</Text>
                <TextInput
                    style={styles.input}
                    color={Colors[colorScheme ?? 'light'].text}
                    secureTextEntry={true}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={[styles.label, {color:Colors[colorScheme ?? 'light'].text}]}>New Password</Text>
                <TextInput
                    style={styles.input}
                    color={Colors[colorScheme ?? 'light'].text}
                    secureTextEntry={true}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={[styles.label, {color:Colors[colorScheme ?? 'light'].text}]}>Confirm New Password</Text>
                <TextInput
                    style={styles.input}
                    color={Colors[colorScheme ?? 'light'].text}
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>
            <Button title="Change Password" onPress={handleChangePassword} />
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
        marginBottom: 20,
    },
    text: {
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
});
