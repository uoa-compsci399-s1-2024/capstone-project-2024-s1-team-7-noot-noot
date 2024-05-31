import React, { Children, useEffect, useState, useRef } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ScrollView, Animated, ActivityIndicator, Button } from 'react-native';
import Colors from '../constants/Colors'; 
import AddChildModal from './helpers/AddNewChild'; 
import { useColorScheme } from './useColorScheme';
import BluetoothSync from './BluetoothSync';
import CustomButton from './CustomButton';
import useBLE from '../app/(entry)/useBLE.ts';
import * as SecureStore from 'expo-secure-store';

// Define the component for rendering children buttons
export const ChildrenButtons = ({ childrenInfo, handleAddChild }) => {
  // State to hold the count of children and the index of the selected child
  const [selectedChildIndex, setSelectedChildIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [syncVisible, setSyncVisible] = useState(false);
  const colorScheme = useColorScheme();
  const {
    setAllDevices,
  } = useBLE();

  const handleChildButtonPress = (childIndex) => {
    setSelectedChildIndex(childIndex);
  };

  useEffect(() => {
    SecureStore.getItemAsync('sensorId').then((sensorId) => {
      if (sensorId) {
        const index = childrenInfo.findIndex((child) => child.sensorId === sensorId);
        if (index !== -1) {
          setSelectedChildIndex(index);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (childrenInfo.length > 0) {
      SecureStore.setItemAsync('sensorId', childrenInfo[selectedChildIndex].sensorId);
    }
  }, [selectedChildIndex]);

  return (
    <View style={[styles.container]}>
      {childrenInfo.length > 0 && (
        <ScrollView style={[styles.scrollView, {minHeight: '60%', maxHeight: '60%'}]}>
          {/* Render the children buttons */}
          {childrenInfo.map((child, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].buttonColor }]}
              onPress={() => handleChildButtonPress(index, child.childName)}
            >
              <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].text }]}>
                {child.childName}
              </Text>
              <Text
                style={[styles.buttonText, { fontSize: 12, color: Colors[colorScheme ?? 'light'].text }]}
              >
                Sensor: {child.sensorId}
              </Text>
              <View style={[styles.circle, selectedChildIndex === index ? { backgroundColor: '#1970B4', borderColor: Colors[colorScheme ?? 'light'].borderColor } : null]} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {childrenInfo.length > 0 && (
        <View style={styles.syncContainer}>
          <CustomButton
            onPress={() => [setSyncVisible(true), setAllDevices([])]}
            text="Sync Data"
          />
        </View>
      )}

      <View style={styles.addChildContainer}>
        <CustomButton
          onPress={() => [setModalVisible(true), setAllDevices([])]}
          text="Add New Child"
        />
      </View>

      <View style={styles.dummyChild}>
        <Button 
          title="Add Dummy Child"
          onPress={() => handleAddChild('Test 4', '52:74:A2:97:91:42')}
        />
      </View>

      {/* Modal for adding a new child */}
      <AddChildModal childrenInfo={childrenInfo} visible={modalVisible} onClose={() => setModalVisible(false)} onAdd={handleAddChild} />
      <BluetoothSync childrenInfo={childrenInfo} visible={syncVisible} onClose={() => setSyncVisible(false)} selectedChildIndex={selectedChildIndex}/>
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Align items to the center horizontally
  },
  syncContainer: {
    width: '85%',
    alignItems: 'center',
    marginTop: '5%',
  },
  buttonText: {
    fontSize: 18,
  },
  button: {
    alignSelf: 'center', // Center the button horizontally
    width: '85%', // Set the button width to 75% of the screen width
    flexDirection: 'row', // Set the button layout to row
    alignItems: 'center', // Center the text and circle within the button
    justifyContent: 'space-between', // Center the text and circle within the button
    paddingHorizontal: 20, // Add padding on the left and right (20px from the edge)
    paddingVertical: 20, // Add padding on the top and bottom (20px from the edge)
    borderWidth: 0,
    borderRadius: 5, // Rounded corners
    marginVertical: 5, // Add vertical margin for spacing between buttons
  },
  dummyChild: {
    width: '85%',
    alignItems: 'center',
    bottom: '32.5%',
    position: 'absolute',
  },
  circle: {
    width: 20, // Circle size
    height: 20, // Circle size
    borderRadius: 10, // Full circle
    backgroundColor: 'transparent', // Transparent background
    borderWidth: 1, // Border
    marginRight: 10, // Add margin between the circle and the text
  },
  scrollView: {
    width: '100%',
    marginTop: 0, // Add marginTop to create space between ScrollView and the title
    marginBottom: 10, // Add marginBottom to create space between ScrollView and Add new button
  },
  addButton: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
  },    
  addChildContainer: {
    width: '85%',
    alignItems: 'center',
    bottom: '5%',
    position: 'absolute',
  },
});
