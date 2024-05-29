import React, { Children, useEffect, useState, useRef } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ScrollView, Animated, ActivityIndicator } from 'react-native';
import { getUserDetails, getChildrenInfo } from '../ctx';
import Colors from '../constants/Colors'; 
import AddChildModal from './helpers/AddNewChild'; 
import { useColorScheme } from './useColorScheme';
import BluetoothSync from './BluetoothSync';

// Define the component for rendering children buttons
export const ChildrenButtons = ({ childrenInfo, handleAddChild }) => {
  // State to hold the count of children and the index of the selected child
  const [selectedChildIndex, setSelectedChildIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [syncVisible, setSyncVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading]);

  // Fetch user details and set email
  useEffect(() => {
    getUserDetails()
      .then((userDetails) => {
        setEmail(userDetails.email);
        // setIsLoading(false);
      })
      .catch((error) => {
        // console.error('Error fetching user details:', error);
      });
  });

  // Function to handle button press
  const handleChildButtonPress = (childIndex, childName) => {
    // // console.log(`Child button ${childName} pressed`);
    setSelectedChildIndex(childIndex); // Update the selected child index
    // Add your logic here for handling button press
  };

  if (isLoading) {
    fadeAnim.stopAnimation();
    fadeAnim.setValue(0);
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size="large" color="#23A0FF" />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
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
              <View style={[styles.circle, selectedChildIndex === index ? { backgroundColor: 'lightblue' } : null]} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {childrenInfo.length > 0 && (
        <View style={styles.syncContainer}>
          <TouchableOpacity
            style={[styles.syncDataButton]} // Apply syncButton and addButton styles
            onPress={() => setSyncVisible(true)}
          >
            <Text style={styles.syncButtonText}>Sync Data</Text>
          </TouchableOpacity>
        </View>
      )}
  
      {/* Add New Button */}
      <TouchableOpacity
        style={[styles.addButton]} // Apply syncButton and addButton styles
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.syncButtonText}>Add New Child</Text>
      </TouchableOpacity>
  
      {/* Modal for adding a new child */}
      <AddChildModal childrenInfo={childrenInfo} visible={modalVisible} onClose={() => setModalVisible(false)} onAdd={handleAddChild} />
      <BluetoothSync childrenInfo={childrenInfo} visible={syncVisible} onClose={() => setSyncVisible(false)} selectedChildIndex={selectedChildIndex}/>
    </Animated.View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Align items to the center horizontally
  },
  syncContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30%',
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
  circle: {
    width: 20, // Circle size
    height: 20, // Circle size
    borderRadius: 10, // Full circle
    backgroundColor: 'transparent', // Transparent background
    borderWidth: 1, // Border
    borderColor: 'lightgray', // Hollow circle color
    marginRight: 10, // Add margin between the circle and the text
  },
  scrollView: {
    width: '100%',
    marginTop: 0, // Add marginTop to create space between ScrollView and the title
    marginBottom: 10, // Add marginBottom to create space between ScrollView and Add new button
  },
  syncButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    width: '85%',
    paddingVertical: 20,
    borderWidth: 0,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#1970B4',
    bottom: '5%',
    position: 'absolute',
  },    
  syncDataButton: {
    width: '85%',
    paddingVertical: 20,
    borderWidth: 0,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#1970B4',
    bottom: '18%',
    position: 'absolute',
  },  
});
