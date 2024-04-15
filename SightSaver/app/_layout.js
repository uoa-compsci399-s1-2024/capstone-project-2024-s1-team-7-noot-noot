import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import themeContext from '@/constants/themeContext';
import theme from '@/constants/theme';
import { EventRegister } from 'react-native-event-listeners';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';

export { ErrorBoundary } from 'expo-router';

// Define DarkModeManager for managing dark mode state
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

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        (async () => {
            const savedDarkMode = await DarkModeManager.getDarkMode();
            setDarkMode(savedDarkMode);
        })();
    }, []);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        const listener = EventRegister.addEventListener('ChangeTheme', async (data) => {
            setDarkMode(data);
            // Persist dark mode state using AsyncStorage
            await DarkModeManager.setDarkMode(data);
        });
        return () => {
            EventRegister.removeAllListeners(listener);
        };
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
            <StatusBar barStyle={theme.barStyle}/>
            <Stack theme={darkMode === true ? DarkTheme : DefaultTheme}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            </Stack>
        </themeContext.Provider>
    );
}
