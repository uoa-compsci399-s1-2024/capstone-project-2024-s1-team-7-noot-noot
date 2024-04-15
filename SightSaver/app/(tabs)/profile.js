import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from '@/constants/themeContext';
import { StatusBar } from 'react-native';

export default function ProfileScreen() {
    const [darkMode, setDarkMode] = useState(false);
    const theme = useContext(themeContext);

    useEffect(() => {
        (async () => {
            const savedDarkMode = await DarkModeManager.getDarkMode();
            setDarkMode(savedDarkMode);
        })();
    }, []);

    const toggleDarkMode = async (value) => {
        setDarkMode(value);
        EventRegister.emit('ChangeTheme', value);
        await DarkModeManager.setDarkMode(value);
    };

    return (
        <View style={[styles.container, {backgroundColor:theme.backgroundColor}]}>
            <StatusBar barStyle={theme.barStyle}/>
            <Text style={[styles.title, {color:theme.color}]}>t</Text>
            <Switch
                value={darkMode}
                onValueChange={toggleDarkMode}
            />
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
});

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
