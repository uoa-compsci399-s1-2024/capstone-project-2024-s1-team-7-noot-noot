import { View, Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Switch, TouchableOpacity, ActivityIndicator,Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const [activeButton, setActiveButton] = useState(2); // Changed state for active button
  const [isSyncing, setIsSyncing] = useState(false);
 // Function to handle sync data button press
  const handleSyncDataPress = () => {
  // Start the sync process
  setIsSyncing(true);
  // Show an initial prompt to the user
  Alert.alert('Connecting to device', 'Please wait...');

  // Use setTimeout to provide status updates and stop loading after 5 seconds
  setTimeout(() => {
      // After 5 seconds, inform the user that syncing has started
      Alert.alert('Syncing device', 'Please wait...');
  }, 5000);

  setTimeout(() => {
      // After 5 seconds, stop syncing and inform the user that the device data has been synced
      setIsSyncing(false);
      Alert.alert('Success', 'Device data synced');
  }, 10000);
  };

  // Handle button press
  const handlePress = (index) => {
      setActiveButton(index);
  };

  return (
    <View style={[styles.container]}>
        <StatusBar barStyle={barStyle=Colors[colorScheme ?? 'light'].barStyle}/>
        {/* Parent Profile */}
            <View style={styles.headerContent}>
                <Ionicons name="person-circle-outline" size={50} color={Colors[colorScheme ?? 'light'].text} />
                <View style={styles.headerText}>
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.userInfo}>info@company.com</Text>
                </View>
            </View>
        {/* Settings icon */}
        <View style={styles.settingsIconContainer}>
          <Link 
          href= '/settings' asChild>
              <TouchableOpacity style={styles.settingsIcon}>
                  <Ionicons name="settings-outline" size={40} color={Colors[colorScheme ?? 'light'].text} />
              </TouchableOpacity>
          </Link>
        </View>
      {/* Children buttons */}
        <View style={{justifyContent:"center", alignItems:"center"}}>
          <Text style={[styles.title,{fontWeight:"bold",fontSize:20}]}>Display Data for:</Text>
          {/* Child 1 Button */}
          <TouchableOpacity
              style={[styles.button, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}
              onPress={() => handlePress(1)} // Pass index 1
          >
            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'left'}}>
              <Text style={[styles.buttonText, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}>Child 1</Text>
              <Text style={[styles.buttonText, {fontSize: 10, backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}>Device: Sun Sensor 1</Text>
            </View>      
                        
            <View
                style={[
                    styles.circle,
                    {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor},
                    activeButton === 1 && styles.circlePressed, // Apply style when button 1 is active
                ]}
            />
          </TouchableOpacity>

          {/* Child 2 Button */}
            <TouchableOpacity
              style={[styles.button, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}
              onPress={() => handlePress(2)} // Pass index 2
            >
            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'left'}}>
              <Text style={[styles.buttonText, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}>Child 2</Text>
              <Text style={[styles.buttonText, {fontSize: 10, backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}>Device: Sun Sensor 2</Text>
            </View>      
              <View
                style={[
                  styles.circle,
                  {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor},
                  activeButton === 2 && styles.circlePressed, // Apply style when button 1 is active
              ]}
              />
            </TouchableOpacity>

          {/* Sync Data Button */}
          <View style={{marginTop:30}}>
          <TouchableOpacity
              style={[styles.syncButton, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}
              onPress={handleSyncDataPress}
              disabled={isSyncing} // Disable button while syncing
          >
              {/* Display loading indicator if syncing is in progress */}
              {isSyncing ? (
                  <ActivityIndicator color={color=Colors[colorScheme ?? 'light'].text} size="small" />
              ) : (
                  <Text style={styles.syncButtonText}>Sync Data</Text>
              )}
          </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.separator, {backgroundColor: Colors[colorScheme ?? 'light'].seperator}]}/>
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    height: 1,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  headerContent: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    fontWeight: '600',
  },
  syncButton: {
    width: 340,
    height: 50,
    justifyContent: 'center',
    borderWidth: 0,
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
  syncButtonText: {
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  button: {
    flexDirection: 'row', // Set the button layout to row
    alignItems: 'center', // Center the text and circle within the button
    justifyContent: 'space-between', // Center the text and circle within the button
    width: 340, // Set button width
    height: 70, // Set button height
    paddingHorizontal: 20, // Add padding on the left and right (20px from the edge)
    borderWidth: 0,
    borderRadius: 5, // Rounded corners
    marginVertical: 5, // Add vertical margin for spacing between buttons
  },
  circle: {
    width: 20, // Circle size
    height: 20, // Circle size
    borderRadius: 10, // Full circle
    borderWidth:1,
    marginRight: 10, // Add margin between the circle and the text
  },
  circlePressed: {
    backgroundColor: '#539DF3',
  },
  settingsIconContainer: {
    alignSelf: 'flex-end', // Position the icon to the right side
    marginRight: 15,
  },
  settingsIcon: {
    paddingRight: 10,
  },
});
