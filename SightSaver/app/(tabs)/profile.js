import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from '@/constants/themeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeButton, setActiveButton] = useState(2); // Changed state for active button

    // Access theme context
    const theme = useContext(themeContext);

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

    return (
        <View style={[themedStyles.container]}>
            {/* Parent Profile */}
            <View style={themedStyles.header}>
                <View style={themedStyles.headerContent}>
                    <MaterialCommunityIcons name="face-man-profile" size={50} color="black" />
                    
                    <View style={themedStyles.headerText}>
                        <Text style={themedStyles.name}>Jane Doe</Text>
                        <Text style={themedStyles.userInfo}>info@company.com</Text>
                    </View>
                </View>
            </View>

            {/* Options */}
            <View style={themedStyles.body}>
                {/* Dark Mode toggle */}
                <View style={themedStyles.darkModeToggle}>
                    <Text style={themedStyles.title}>Dark Mode</Text>
                    <Switch
                        value={darkMode}
                        onValueChange={toggleDarkMode}
                    />
                </View>
            </View>

            {/* Children buttons */}
            <View>
              {/* Child 1 Button */}
              <TouchableOpacity
                  style={themedStyles.button}
                  onPress={() => handlePress(1)} // Pass index 1
              >
                  <Text>Child 1</Text>
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
                  <Text>Child 2</Text>
                  <View
                      style={[
                          themedStyles.circle,
                          activeButton === 2 && themedStyles.circlePressed, // Apply style when button 2 is active
                      ]}
                  />
              </TouchableOpacity>
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
        header: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        headerContent: {
            padding: 30,
            flexDirection: 'row',
            // borderBottomWidth: 1,

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
        body: {
          alignItems: 'center',
        },
        darkModeToggle: {
            marginTop: 20,
        },
        title: {
          fontSize: 18,
          marginBottom: 10,
          color: theme.color,
        },
        button: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 5,
        },
        circle: {
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: theme.color,
        },
        circlePressed: {
            backgroundColor: 'green',
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
