import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfile from './accountSettingsScreens/editProfile';
import ChangePassword from './accountSettingsScreens/changePassword';
import NotificationSettings from './accountSettingsScreens/notificationSettings';
import PrivacySettings from './accountSettingsScreens/privacySettings';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';
import CustomButton from '../../../components/CustomButton';
import { useSession } from '../../../ctx';

function AccountSettings({ navigation }) {
    const colorScheme = useColorScheme();
    const { signOut } = useSession();

    const handleEditProfile = () => {
        // Navigate to the EditProfile page
        navigation.navigate('EditProfile');
    };

    const handleChangePassword = () => {
        // Navigate to the ChangePassword page
        navigation.navigate('ChangePassword');
    };

    const handleNotificationSettings = () => {
        // Navigate to the NotificationSettings page
        navigation.navigate('NotificationSettings');
    };

    const handlePrivacySettings = () => {
        // Navigate to the PrivacySettings page
        navigation.navigate('PrivacySettings');
    };

    return (
        <View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
            <Text style={[styles.title, {color:Colors[colorScheme ?? 'light'].text}]}>Account Settings</Text>
            {/* Add your account settings options here */}
            <TouchableOpacity style={[styles.option, {borderColor:Colors[colorScheme ?? 'light'].seperator}]} onPress={handleEditProfile}>
                <Text style={[styles.optionText, {color:Colors[colorScheme ?? 'light'].text}]}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.option, {borderColor:Colors[colorScheme ?? 'light'].seperator}]} onPress={handleChangePassword}>
                <Text style={[styles.optionText, {color:Colors[colorScheme ?? 'light'].text}]}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.option, {borderColor:Colors[colorScheme ?? 'light'].seperator}]} onPress={handleNotificationSettings}>
                <Text style={[styles.optionText, {color:Colors[colorScheme ?? 'light'].text}]}>Notification Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.option, {borderColor:Colors[colorScheme ?? 'light'].seperator}]} onPress={handlePrivacySettings}>
                <Text style={[styles.optionText, {color:Colors[colorScheme ?? 'light'].text}]}>Privacy Settings</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CustomButton
                onPress={() => {
                signOut();
                }}
                    text={"Sign Out"}
            />
            </View>
        </View>
    );
}


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AccountSettings" component={AccountSettings} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
            <Stack.Screen name="PrivacySettings" component={PrivacySettings} />
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
