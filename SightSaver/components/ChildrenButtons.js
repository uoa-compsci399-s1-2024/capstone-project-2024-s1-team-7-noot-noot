// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Button } from 'react-native';
import { useAuth } from '../ctx';
import Colors from '../constants/Colors'; // Assuming this is where the color scheme is defined
import AddChildModal from './helpers/AddNewChild'; // Import the modal component
import axios from 'axios';
import { getUserDetails } from '../ctx';

// Define the component for rendering children buttons
const ChildrenButtons = ({ colorScheme }) => {
  // Get fetchChildrenCount function from useAuth hook
  const { fetchChildrenCount } = useAuth();

  // State to hold the count of children and the index of the selected child
  const [childrenCount, setChildrenCount] = useState(0);
  const [selectedChildIndex, setSelectedChildIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch the number of children when the component mounts
  useEffect(() => {
    // Fetch the number of children
    fetchChildrenCount()
      .then(count => setChildrenCount(count)) // Update childrenCount state with fetched count
      .catch(error => console.error('Error fetching children count:', error));
  }, [fetchChildrenCount]);

  // Function to handle button press
  const handleChildButtonPress = (childIndex) => {
    console.log(`Child button ${childIndex + 1} pressed`);
    setSelectedChildIndex(childIndex); // Update the selected child index
    // Add your logic here for handling button press
  };

  // Function to handle adding a new child
  const handleAddChild = async (childName) => {
    const userDetails = await getUserDetails();
    const email = userDetails.email;
    // Add your logic here for adding a new child
    console.log('[On email]:', email, '[Adding new child]:', childName);
    try{
        await axios.post(`https://sightsaver-api.azurewebsites.net/api/child/addChild`, {
            email: email,
            name: childName,
            sensor_id: 3,
        }).then((res) => console.log(res.data));
    } catch (error) {
        console.log('Error adding new child:', error);
    }
    // You can add logic here to actually add the new child
  };

  return (
    // Render the generated buttons
    <View style={styles.container}>
      {/* Button to open the modal */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].buttonColor }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.buttonText, { backgroundColor: Colors[colorScheme ?? 'light'].buttonColor }]}>Add new...</Text>
      </TouchableOpacity>

      {/* Render the children buttons */}
      {childrenCount > 0 && Array.from({ length: childrenCount }).map((_, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].buttonColor }]}
          onPress={() => handleChildButtonPress(i)}
        >
          <Text style={[styles.buttonText, { backgroundColor: Colors[colorScheme ?? 'light'].buttonColor }]}>Child {i + 1}</Text>
          <Text style={[styles.buttonText, { fontSize: 10, backgroundColor: Colors[colorScheme ?? 'light'].buttonColor }]}>Device: Sun Sensor {i + 1}</Text>
          <View style={[styles.circle, selectedChildIndex === i ? { backgroundColor: 'lightblue' } : null]} />
        </TouchableOpacity>
      ))}

      {/* Modal for adding a new child */}
      <AddChildModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddChild}
      />
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Align buttons to the center of the screen horizontally
  },
  buttonText: {
    fontSize: 16,
  },
  button: {
    flex: 1,
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
  }
});

export default ChildrenButtons; // Export the component
