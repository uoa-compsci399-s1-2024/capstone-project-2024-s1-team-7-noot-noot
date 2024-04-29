import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useColorScheme } from '../../../../components/useColorScheme';
import Colors from '../../../../constants/Colors';

export default function EditProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const colorScheme = useColorScheme();

  const handleSave = () => {
    // Implement logic to save the edited profile data
    console.log('Saving profile:', { name, email });
  };

  return (
    <View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
      <Text style={[styles.label, {color:Colors[colorScheme ?? 'light'].text}]}>Name:</Text>
      <TextInput
        style={styles.input}
        color={Colors[colorScheme ?? 'light'].text}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
      />

      <Text style={[styles.label, {color:Colors[colorScheme ?? 'light'].text}]}>Email:</Text>
      <TextInput
        style={styles.input}
        color={Colors[colorScheme ?? 'light'].text}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Button title="Save" onPress={handleSave} />
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
