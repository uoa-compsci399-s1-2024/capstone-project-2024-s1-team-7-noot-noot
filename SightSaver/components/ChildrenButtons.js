import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ScrollView } from 'react-native';
import { fetchChildrenCount, getUserDetails, fetchChildren } from '../ctx'; // Assuming these functions are asynchronous
import Colors from '../constants/Colors'; // Assuming this is where the color scheme is defined
import AddChildModal from './helpers/AddNewChild'; // Import the modal component
import axios from 'axios';

// Define the component for rendering children buttons
const ChildrenButtons = ({ colorScheme }) => {
  // State to hold the count of children and the index of the selected child
  const [childrenInfo, setChildrenInfo] = useState([]);
  const [selectedChildIndex, setSelectedChildIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');

  // Fetch the number of children when the component mounts
  useEffect(() => {
    console.log('Fetching children info...');
    // Fetch the children info
    fetchChildrenCount()
      .then((childrenData) => {
        console.debug('Children info:', childrenData);
        setChildrenInfo(childrenData.childrenInfo); // Update childrenInfo state with fetched data
      })
      .catch((error) => console.error('Error fetching children info:', error));
  }, []);
  

  // Fetch user details and set email
  useEffect(() => {
    getUserDetails()
      .then((userDetails) => {
        setEmail(userDetails.email);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  // Function to handle button press
  const handleChildButtonPress = (childIndex, childName) => {
    console.log(`Child button ${childName} pressed`);
    setSelectedChildIndex(childIndex); // Update the selected child index
    // Add your logic here for handling button press
  };

  // Function to handle adding a new child
  const handleAddChild = async (childName) => {
    // Add your logic here for adding a new child
    console.log('[On email]:', email, '[Adding new child]:', childName);
    try {
      await axios.post(`https://sightsaver-api.azurewebsites.net/api/child/addChild`, {
        email: email,
        name: childName,
        sensor_id: 5,
      })
      .then((response) => {console.log('Response:', response)})
    } catch (error) {
      console.log('Error adding new child:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* ScrollView for children buttons */}
      <ScrollView style={styles.scrollView}>
        {/* Render the children buttons */}
        {childrenInfo.map((child, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].buttonColor }]}
            onPress={() => handleChildButtonPress(index, child.childName)}
          >
            <Text style={[styles.buttonText, { backgroundColor: Colors[colorScheme ?? 'light'].buttonColor }]}>
              {child.childName}
            </Text>
            <Text
              style={[styles.buttonText, { fontSize: 10, backgroundColor: Colors[colorScheme ?? 'light'].buttonColor }]}
            >
              Device: Sun Sensor {child.sensorId}
            </Text>
            <View style={[styles.circle, selectedChildIndex === index ? { backgroundColor: 'lightblue' } : null]} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add New Button */}
      <TouchableOpacity
        style={[styles.addButton]} // Apply syncButton and addButton styles
        onPress={() => setModalVisible(true)}>
        <Text style={styles.syncButtonText}>Add New Sensor</Text>
      </TouchableOpacity>

      {/* Modal for adding a new child */}
      <AddChildModal visible={modalVisible} onClose={() => setModalVisible(false)} onAdd={handleAddChild} />
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Align items to the center horizontally
    justifyContent: 'center', // Align items to the center vertically
  },
  buttonText: {
    fontSize: 16,
  },
  button: {
    alignSelf: 'center', // Center the button horizontally
    width: '75%', // Set the button width to 75% of the screen width
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
    marginBottom: 20, // Add marginBottom to create space between ScrollView and Add new button
  },
  syncButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    width: '85%',
    marginVertical: 20,
    justifyContent: 'center',
    paddingVertical: 20,
    borderWidth: 0,
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#1970B4',
  },      
});

export default ChildrenButtons; // Export the component
