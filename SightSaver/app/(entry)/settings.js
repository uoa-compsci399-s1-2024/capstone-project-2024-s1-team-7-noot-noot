import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Pressable } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../components/useColorScheme';
import AccessibilityScreen from './settingsScreens/accessibility';
import DataSafetyScreen from './settingsScreens/dataSafety';
import ChildrenScreen from './settingsScreens/children';
import CustomButton from '../../components/CustomButton';
import { useAuth } from '../../ctx';
import SupportScreen from './settingsScreens/support';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons'; // Add Ionicons for the back button
import { TransitionPresets } from '@react-navigation/stack';

let data = `2024:01:01 11:08:05 45 E4:5F\n`;

const dummyData = async () => {
    await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data.txt', data);
    console.log('Data written');
}

function Settings({ navigation }) {
    const colorScheme = useColorScheme();
    const { onLogout } = useAuth();
    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <StatusBar barStyle={barStyle = Colors[colorScheme ?? 'light'].barStyle} />
            {/* Settings options */}
            <TouchableOpacity style={[styles.option, { borderBottomColor: Colors[colorScheme ?? 'light'].seperator }]} onPress={() => navigation.navigate('Accessibility')}>
                <Text style={[styles.optionText, { color: Colors[colorScheme ?? 'light'].text }]}>Accessibility</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.option, { borderBottomColor: Colors[colorScheme ?? 'light'].seperator }]} onPress={() => navigation.navigate('Data Safety')}>
                <Text style={[styles.optionText, { color: Colors[colorScheme ?? 'light'].text }]}>Data Safety</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.option, { borderBottomColor: Colors[colorScheme ?? 'light'].seperator }]} onPress={() => navigation.navigate('Change Daily Goal')}>
                <Text style={[styles.optionText, { color: Colors[colorScheme ?? 'light'].text }]}>Change Daily Goal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.option, { borderBottomColor: Colors[colorScheme ?? 'light'].seperator }]} onPress={() => navigation.navigate('Support')}>
                <Text style={[styles.optionText, { color: Colors[colorScheme ?? 'light'].text }]}>Support</Text>
            </TouchableOpacity>

            <View style={styles.signout}>
                <CustomButton
                    onPress={() => {
                        onLogout();
                    }}
                    text={"Sign Out"}
                />
                <Button
                    title="TEST DUMMY DATA"
                    onPress={() => { dummyData() }}
                />
            </View>
        </View>
    );
}

const Stack = createStackNavigator();

export default function SettingsScreens() {
    const colorScheme = useColorScheme();
    const forFade = ({ current }) => ({
        cardStyle: {
          opacity: current.progress,
        },
      });
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settingsinside" component={Settings} options={({ navigation }) => ({
                headerShown: true,
                headerTitle: 'Settings',
                headerLeft: () => (
                    <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 10, marginRight: 40 }}>
                        <Ionicons
                            name="arrow-back"
                            size={25}
                            color={Colors[colorScheme ?? 'light'].text}
                        />
                    </Pressable>
                ),
            })} />
            <Stack.Screen name="Accessibility" component={AccessibilityScreen} options={{
                ...TransitionPresets.FadeFromBottomAndroid,
                        }} />
            <Stack.Screen name="Data Safety" component={DataSafetyScreen} options={{
                ...TransitionPresets.FadeFromBottomAndroid,
                        }} />
            <Stack.Screen name="Change Daily Goal" component={ChildrenScreen} options={{
                ...TransitionPresets.FadeFromBottomAndroid,
                        }} />
            <Stack.Screen name="Support" component={SupportScreen} options={{
                ...TransitionPresets.FadeFromBottomAndroid,
                        }} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    option: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        paddingHorizontal: 16,
    },
    optionText: {
        fontSize: 18,
    },
    signout: {
        position: 'absolute',
        bottom: '5%',
        width: '100%',
        alignSelf: 'center',
    }
});
