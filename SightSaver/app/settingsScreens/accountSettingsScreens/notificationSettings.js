import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function NotificationSettings() {
    const [pushNotifications, setPushNotifications] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [notificationSound, setNotificationSound] = useState(true);
    const [notificationFrequency, setNotificationFrequency] = useState('Daily');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notification Settings</Text>
            <Text style={styles.text}>Customize your notification preferences here.</Text>

            <View style={styles.setting}>
                <Text style={styles.settingLabel}>Push Notifications</Text>
                <Switch value={pushNotifications} onValueChange={setPushNotifications} />
            </View>

            <View style={styles.setting}>
                <Text style={styles.settingLabel}>Email Notifications</Text>
                <Switch value={emailNotifications} onValueChange={setEmailNotifications} />
            </View>

            <View style={styles.setting}>
                <Text style={styles.settingLabel}>Notification Sound</Text>
                <Switch value={notificationSound} onValueChange={setNotificationSound} />
            </View>

            <View style={styles.setting}>
                <Text style={styles.settingLabel}>Notification Frequency</Text>
                <Text>{notificationFrequency}</Text>
                {/* Replace the text with a dropdown or other input component for selecting frequency */}
            </View>
        </View>
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
    text: {
        marginBottom: 20,
    },
    setting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    settingLabel: {
        fontSize: 18,
    },
});
