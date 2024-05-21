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
      return (
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: Colors[colorScheme ?? 'light'].buttonColor }]}
          onPress={() => handleAddChild()}
        >
          <Text style={styles.buttonText}>No children add new?</Text>
        </TouchableOpacity>
      );
    }

    // Otherwise, render buttons for each child
    const buttons = [];
    for (let i = 0; i < childrenCount; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          style={[styles.childButton, { backgroundColor: Colors[colorScheme ?? 'light'].buttonColor }]}
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
    <View>
      {renderChildrenButtons()}
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  addButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  childButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ChildrenButtons; // Export the component
