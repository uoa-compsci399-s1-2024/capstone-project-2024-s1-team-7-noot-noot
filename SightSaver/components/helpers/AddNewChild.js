import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddChildModal = ({ visible, onClose, onAdd }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [childName, setChildName] = useState('');
  const [sensorId, setSensorId] = useState('');

  const handleNextPage = () => {
    setCurrentPage(2);
  };

  const handlePreviousPage = () => {
    setCurrentPage(1);
  };

  const handleAdd = () => {
    if (currentPage === 1) {
      // Validate sensor id
      if (sensorId.trim() === '') {
        alert('Please enter sensor id.');
        return;
      }
      // Proceed to the next page
      handleNextPage();
    } else if (currentPage === 2) {
      // Validate child name
      if (childName.trim() === '') {
        alert('Please enter child name.');
        return;
      }
      // Pass the child name and sensor id to the parent component
      onAdd({ childName, sensorId });

      // Reset input fields
      setChildName('');
      setSensorId('');

      // Close the modal
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add New Child</Text>
        {currentPage === 1 ? (
          <View style={styles.pageContainer}>
            <TextInput
              style={styles.input}
              placeholder="Sensor ID"
              value={sensorId}
              onChangeText={setSensorId}
            />
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={onClose} />
              <Button title="Next" onPress={handleAdd} />
            </View>
          </View>
        ) : (
          <View style={styles.pageContainer}>
            <TextInput
              style={styles.input}
              placeholder="Child Name"
              value={childName}
              onChangeText={setChildName}
            />
            <View style={styles.buttonContainer}>
              <Button title="Previous" onPress={handlePreviousPage} />
              <Button title="Add" onPress={handleAdd} />
            </View>
          </View>
        )}
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
  pageContainer: {
    width: '100%',
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
