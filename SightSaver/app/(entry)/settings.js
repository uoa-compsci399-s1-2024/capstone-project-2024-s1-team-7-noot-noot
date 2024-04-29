import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../components/useColorScheme';
import AccessibilityScreen from './settingsScreens/accessibility';
import DataSafetyScreen from './settingsScreens/dataSafety';
import DeviceScreen from './settingsScreens/device';
import AccountScreen from './settingsScreens/account';

function Settings({navigation}) {
    // const navigation = useNavigation();
    const colorScheme = useColorScheme();
    
    return (
        <View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
            <StatusBar barStyle={barStyle=Colors[colorScheme ?? 'light'].barStyle}/>
            {/* Settings options */}
            <TouchableOpacity style={[styles.option, {borderBottomColor:Colors[colorScheme ?? 'light'].seperator}]} onPress={() => navigation.navigate('Accessibility')}>
                <Text style={[styles.optionText, {color:Colors[colorScheme ?? 'light'].text}]}>Accessibility</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.option, {borderBottomColor:Colors[colorScheme ?? 'light'].seperator}]} onPress={() => navigation.navigate('Data Safety')}>
                <Text style={[styles.optionText, {color:Colors[colorScheme ?? 'light'].text}]}>Data Safety</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.option, {borderBottomColor:Colors[colorScheme ?? 'light'].seperator}]} onPress={() => navigation.navigate('Device')}>
                <Text style={[styles.optionText, {color:Colors[colorScheme ?? 'light'].text}]}>Device</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.option, {borderBottomColor:Colors[colorScheme ?? 'light'].seperator}]} onPress={() => navigation.navigate('Account')}>
                <Text style={[styles.optionText, {color:Colors[colorScheme ?? 'light'].text}]}>Account</Text>
            </TouchableOpacity>
        </View>
    );
}


const Stack = createNativeStackNavigator();
export default function SettingsScreens() {
    return (
        console.debug('settings'),
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Accessibility" component={AccessibilityScreen} />
            <Stack.Screen name="Data Safety" component={DataSafetyScreen} />
            <Stack.Screen name="Device" component={DeviceScreen} />
            <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }}/>
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
});
