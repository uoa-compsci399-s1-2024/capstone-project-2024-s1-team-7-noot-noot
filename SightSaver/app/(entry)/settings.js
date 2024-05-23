import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../components/useColorScheme';
import AccessibilityScreen from './settingsScreens/accessibility';
import DataSafetyScreen from './settingsScreens/dataSafety';
import ChildrenScreen from './settingsScreens/children';
import CustomButton from '../../components/CustomButton';
import { useAuth, getUserDetails } from '../../ctx';
import axios from 'axios';

function Settings({navigation}) {
    // const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const handlePress = async () => {
        try {
            console.log('Attempting to get data');
            await axios.get(`https://sightsaver-api.azurewebsites.net/api/sensor/exportToExcel`).then((res) => console.log(res.data));

            // const token = await getUserDetails();
            // console.log('Data:', token);
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
    };

    const { onLogout } = useAuth();
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
            <TouchableOpacity style={[styles.option, {borderBottomColor:Colors[colorScheme ?? 'light'].seperator}]} onPress={() => navigation.navigate('Children')}>
                <Text style={[styles.optionText, {color:Colors[colorScheme ?? 'light'].text}]}>Children</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={[styles.option, {borderBottomColor:Colors[colorScheme ?? 'light'].seperator}]} onPress={() => navigation.navigate('Notifications')}>
                <Text style={[styles.optionText, {color:Colors[colorScheme ?? 'light'].text}]}>Notifications</Text>
            </TouchableOpacity> */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CustomButton
                onPress={() => {
                onLogout();
                }}
                    text={"Sign Out"}
            />
            <CustomButton
                onPress={
                    handlePress
                }
                    text={"test"}
            />
            </View>
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
            <Stack.Screen name="Children" component={ChildrenScreen} />
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
