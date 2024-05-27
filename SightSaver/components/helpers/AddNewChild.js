import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddChildModal = ({ visible, onClose, onAdd }) => {
  const [childName, setChildName] = useState('');
//   const [deviceName, setDeviceName] = useState('');

  const handleAdd = () => {
    // Validate input
    if (childName.trim() === '') {
      alert('Please enter child name.');
      return;
    }

    // Pass the child name and device name to the parent component
    onAdd(childName);

    // Reset input fields
    setChildName('');
    // setDeviceName('');

    // Close the modal
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add New Child</Text>
        <TextInput
          style={styles.input}
          placeholder="Child Name"
          value={childName}
          onChangeText={setChildName}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Device Name"
          value={deviceName}
          onChangeText={setDeviceName}
        /> */}
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={onClose} />
          <Button title="Add" onPress={handleAdd} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default AddChildModal;
