import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useColorScheme } from '../../../../components/useColorScheme';
import Colors from '../../../../constants/Colors';
import { changeUserDetails } from '../../../../ctx';

export default function EditProfile() {
  const [name, setName] = useState('');
  const colorScheme = useColorScheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    // Check if the new passwords match
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return; // Exit the function if passwords don't match
    }
  
    // Check password constraints (e.g., minimum length)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      alert('Password does not meet constraints. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
      console.log('Password does not meet constraints');
      return; // Exit the function if password doesn't meet constraints
    }
  
    // Implement logic to save the edited profile data
    console.log('Saving profile:', { name, currentPassword, newPassword, confirmPassword });
    changeUserDetails({ name, currentPassword, newPassword });
  };
  
  return (
    <View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
      <Text style={[styles.text, {color:Colors[colorScheme ?? 'light'].text, marginBottom:10, fontSize:18, fontWeight:'semibold'}]}>
          To change your password, please enter your current password and then enter your new password twice to confirm.
      </Text>
      <Text style={[styles.label, {color:Colors[colorScheme ?? 'light'].text}]}>Name:</Text>
      <TextInput
        style={styles.input}
        color={Colors[colorScheme ?? 'light'].text}
        value={name}
        placeholder="Enter your name"
        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
        onChangeText={setName}
      />
      {/* <Text style={[styles.label, {color:Colors[colorScheme ?? 'light'].text}]}>Email:</Text>
      <TextInput
        style={styles.input}
        color={Colors[colorScheme ?? 'light'].text}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
        keyboardType="email-address"
        autoCapitalize="none"
      /> */}
      <View style={styles.inputContainer}>
          <Text style={[styles.label, {color:Colors[colorScheme ?? 'light'].text}]}>Current Password:</Text>
          <TextInput
              style={styles.input}
              color={Colors[colorScheme ?? 'light'].text}
              secureTextEntry={true}
              value={currentPassword}
              placeholder="Enter Current Password"
              placeholderTextColor={Colors[colorScheme ?? 'light'].text}
              onChangeText={setCurrentPassword}
          />
      </View>
      <View style={styles.inputContainer}>
          <Text style={[styles.label, {color:Colors[colorScheme ?? 'light'].text}]}>New Password:</Text>
          <TextInput
              style={styles.input}
              color={Colors[colorScheme ?? 'light'].text}
              secureTextEntry={true}
              value={newPassword}
              placeholder="Enter New Password"
              placeholderTextColor={Colors[colorScheme ?? 'light'].text}
              onChangeText={setNewPassword}
          />
      </View>
      <View style={styles.inputContainer}>
          <Text style={[styles.label, {color:Colors[colorScheme ?? 'light'].text}]}>Confirm New Password:</Text>
          <TextInput
              style={styles.input}
              color={Colors[colorScheme ?? 'light'].text}
              secureTextEntry={true}
              value={confirmPassword}
              placeholder="Confirm New Password"
              placeholderTextColor={Colors[colorScheme ?? 'light'].text}
              onChangeText={setConfirmPassword}
          />
      </View>
      <Button title="Update details" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
