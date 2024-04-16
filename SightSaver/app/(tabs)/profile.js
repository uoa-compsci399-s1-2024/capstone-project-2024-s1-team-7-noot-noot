import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ActivityIndicator,Alert } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from '@/constants/themeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeButton, setActiveButton] = useState(2); // Changed state for active button
    const [isSyncing, setIsSyncing] = useState(false);

    const theme = useContext(themeContext);     // Access theme context
    
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


    // Initialize dark mode from AsyncStorage
    useEffect(() => {
        const initializeDarkMode = async () => {
            const savedDarkMode = await DarkModeManager.getDarkMode();
            setDarkMode(savedDarkMode);
        };
        initializeDarkMode();
    }, []);
 
    // Handle toggling dark mode
    const toggleDarkMode = async (value) => {
        setDarkMode(value);
        EventRegister.emit('ChangeTheme', value);
        await DarkModeManager.setDarkMode(value);
    };

    // Handle button press
    const handlePress = (index) => {
        setActiveButton(index);
    };

    // Get the styles based on the current theme
    const themedStyles = getThemedStyles(theme);

    // Render the profile screen
    return (
        <View style={[themedStyles.container]}>
           
           

            {/* Parent Profile */}
                <View style={themedStyles.headerContent}>
                    <MaterialCommunityIcons name="face-man-profile" size={100} color="black" />
                    
                    <View style={themedStyles.headerText}>
                        <Text style={themedStyles.name}>John Doe</Text>
                        <Text style={themedStyles.userInfo}>info@company.com</Text>
                    </View>
                </View>
            {/* Settings icon */}
            <View style={themedStyles.settingsIconContainer}>
              <Link 
              href= '/settings' asChild>
                  <TouchableOpacity style={themedStyles.settingsIcon}>
                      <Ionicons name="settings-outline" size={40} color={theme.color} />
                  </TouchableOpacity>
              </Link>
            </View>
          {/* Children buttons */}
            <View style={{justifyContent:"center", alignItems:"center"}}>
              <Text style={[themedStyles.title,{fontWeight:"bold",fontSize:20}]}>Display Data for:</Text>
              {/* Child 1 Button */}
              <TouchableOpacity
                  style={themedStyles.button}
                  onPress={() => handlePress(1)} // Pass index 1
              >
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'left'}}>
                  <Text style={themedStyles.buttonText}>Child 1</Text>
                  <Text style={[themedStyles.buttonText, { fontSize: 10 }]}>Device: Sun Sensor 1</Text>
                </View>      
                            
                <View
                    style={[
                        themedStyles.circle,
                        activeButton === 1 && themedStyles.circlePressed, // Apply style when button 1 is active
                    ]}
                />
              </TouchableOpacity>

              {/* Child 2 Button */}
                <TouchableOpacity
                  style={themedStyles.button}
                  onPress={() => handlePress(2)} // Pass index 2
                >
                  <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'left'}}>
                    <Text style={themedStyles.buttonText}>Child 2</Text>
                    <Text style={[themedStyles.buttonText, { fontSize: 10 }]}>Device: Sun Sensor 2</Text>
                  </View>
                  <View
                    style={[
                      themedStyles.circle,
                      activeButton === 2 && themedStyles.circlePressed, // Apply style when button 2 is active
                    ]}
                  />
                </TouchableOpacity>

              {/* Sync Data Button */}
              <View style={{marginTop:30}}>
              <TouchableOpacity
                  style={themedStyles.syncButton}
                  onPress={handleSyncDataPress}
                  disabled={isSyncing} // Disable button while syncing
              >
                  {/* Display loading indicator if syncing is in progress */}
                  {isSyncing ? (
                      <ActivityIndicator color="white" size="small" />
                  ) : (
                      <Text style={themedStyles.syncButtonText}>Sync Data</Text>
                  )}
              </TouchableOpacity>
              </View>
            </View>
            
              {/* Dark Mode toggle */}
              <View style={themedStyles.darkModeToggle}>
                  <Text style={themedStyles.title}>Dark Mode</Text>
                  <Switch
                      value={darkMode}
                      onValueChange={toggleDarkMode}
                  />
              </View>
        </View>
    );
}

// Function that returns styles based on the theme
function getThemedStyles(theme) {
    return StyleSheet.create({
      container: {
            flex: 1,
            backgroundColor: theme.backgroundColor,
          },
          // header: {
          // },
          headerContent: {
            marginHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            // borderWidth: 1,
            // borderColor: theme.color,
          },
          headerText: {
            marginLeft: 10,
          },
          name: {
            fontSize: 22,
            fontWeight: '600',
            color: theme.color,
          },
          userInfo: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.color,
          },
          syncButton: {
            width: 340,
            height: 50,
            backgroundColor: 'grey', // Customize button color as needed
            justifyContent: 'center',
            borderWidth: 1.5,
            borderColor: theme.color,
            alignItems: 'center',
            borderRadius: 5,
            alignSelf: 'center',
        },
        syncButtonText: {
            color: theme.color, // Customize text color as needed
            fontSize: 18,
        },
          // body: {
          // },
          darkModeToggle: {
            position: 'absolute',
            bottom: 20,
            right: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,

          },
          title: {
            fontSize: 18,
            color: theme.color,
            marginBottom: 5,
          },
          buttonText: {
            color: theme.color,
            fontSize: 16,
          },
      button: {
        flexDirection: 'row', // Set the button layout to row
        alignItems: 'center', // Center the text and circle within the button
        justifyContent: 'space-between', // Center the text and circle within the button
        width: 340, // Set button width
        height: 70, // Set button height
        paddingHorizontal: 20, // Add padding on the left and right (20px from the edge)
        borderWidth: 1,
        borderColor: theme.color, // Set border color to the text color
        borderRadius: 5, // Rounded corners
        marginVertical: 5, // Add vertical margin for spacing between buttons
      },
      circle: {
        width: 20, // Circle size
        height: 20, // Circle size
        borderRadius: 10, // Full circle
        borderColor: theme.Color, // Set the background color to the theme background color
        borderWidth:1,
        marginRight: 10, // Add margin between the circle and the text
        },
        circlePressed: {
            backgroundColor: 'green',
        },
        settingsIconContainer: {
          alignSelf: 'flex-end', // Position the icon to the right side
          marginRight: 15,
          // marginTop: 10,
      },
      settingsIcon: {
          paddingRight: 10,
      },
    });
}

class DarkModeManager {
    static DARK_MODE_KEY = 'darkMode';

    static async setDarkMode(enabled) {
        try {
            await AsyncStorage.setItem(this.DARK_MODE_KEY, JSON.stringify(enabled));
        } catch (error) {
            console.error('Error saving dark mode state:', error);
        }
    }

    static async getDarkMode() {
        try {
            const darkModeStr = await AsyncStorage.getItem(this.DARK_MODE_KEY);
            return darkModeStr ? JSON.parse(darkModeStr) : false;
        } catch (error) {
            console.error('Error retrieving dark mode state:', error);
            return false;
        }
    }
}

