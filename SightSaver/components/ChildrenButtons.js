// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useAuth } from '../ctx';
import Colors from '../constants/Colors'; // Assuming this is where the color scheme is defined

// Define the component for rendering children buttons
const ChildrenButtons = ({ colorScheme }) => {
  // Get fetchChildrenCount function from useAuth hook
  const { fetchChildrenCount } = useAuth();
  
  // State to hold the count of children
  const [childrenCount, setChildrenCount] = useState(0);

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
    // Add your logic here for handling button press
  };

  // Function to handle adding a new child
  const handleAddChild = () => {
    // Add your logic here for adding a new child
    console.log('Add new child');
  };

  // Render children buttons based on the number of children
  const renderChildrenButtons = () => {
    // If there are no children, render a button to add new
    if (childrenCount === 0) {
        console.log('No children found')
      return (
        <TouchableOpacity
          style={[styles.button, {backgroundColor: Colors[colorScheme ?? 'light'].buttonColor, width: '70%'}]}
          // onPress={() => handlePress(1)} // Pass index 1
        >
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'left'}}>
            <Text style={[styles.buttonText, {backgroundColor: Colors[colorScheme ?? 'light'].buttonColor}]}>Child 1</Text>
            <Text style={[styles.buttonText, {fontSize: 10, backgroundColor: Colors[colorScheme ?? 'light'].buttonColor}]}>Device: Sun Sensor 1</Text>
          </View>             
          <View
              style={[
                  styles.circle,
                  {backgroundColor: Colors[colorScheme ?? 'light'].buttonColor},
              ]}
          />
        </TouchableOpacity>
      );
    }

    // Otherwise, render buttons for each child
    const buttons = [];
    for (let i = 0; i < childrenCount; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          style={[styles.childButton, { backgroundColor: Colors[colorScheme ?? 'light'].buttonColor, width: '70%' }]}
          onPress={() => handleChildButtonPress(i)}
        >
          <Text style={styles.buttonText}>Child {i + 1}</Text>
        </TouchableOpacity>
      );
    }
    return buttons;
  };

  return (
    // Render the generated buttons
    <View style={styles.container}>
      {renderChildrenButtons()}
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Align buttons to the center of the screen horizontally
  },
  buttonText: {
    fontSize: 16,
  },
  button: {
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
    borderWidth: 1,
    marginRight: 10, // Add margin between the circle and the text
  },
  childButton: {
    flexDirection: 'row', // Set the button layout to row
    alignItems: 'center', // Center the text and circle within the button
    justifyContent: 'space-between', // Center the text and circle within the button
    paddingHorizontal: 20, // Add padding on the left and right (20px from the edge)
    paddingVertical: 20, // Add padding on the top and bottom (20px from the edge)
    borderWidth: 0,
    borderRadius: 5, // Rounded corners
    marginVertical: 5, // Add vertical margin for spacing between buttons
  }
});

export default ChildrenButtons; // Export the component
