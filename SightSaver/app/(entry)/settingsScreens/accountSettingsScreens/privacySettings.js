import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useColorScheme } from '../../../../components/useColorScheme';
import Colors from '../../../../constants/Colors';

export default function PrivacySettings() {
    const [profileVisibility, setProfileVisibility] = useState(true);
    const [activityTracking, setActivityTracking] = useState(true);
    const [locationSharing, setLocationSharing] = useState(false);
    const [dataSharing, setDataSharing] = useState(false);
    const colorScheme = useColorScheme();

    return (
        <View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
            <Text style={[styles.title, {color:Colors[colorScheme ?? 'light'].text}]}>Privacy Settings</Text>
            <Text style={[styles.text, {color:Colors[colorScheme ?? 'light'].text}]}>Customize your privacy preferences here.</Text>

            <View style={styles.setting}>
                <Text style={[styles.settingLabel, {color:Colors[colorScheme ?? 'light'].text}]}>Profile Visibility</Text>
                <Switch value={profileVisibility} onValueChange={setProfileVisibility} />
            </View>

            <View style={styles.setting}>
                <Text style={[styles.settingLabel, {color:Colors[colorScheme ?? 'light'].text}]}>Activity Tracking</Text>
                <Switch value={activityTracking} onValueChange={setActivityTracking} />
            </View>

            <View style={styles.setting}>
                <Text style={[styles.settingLabel, {color:Colors[colorScheme ?? 'light'].text}]}>Location Sharing</Text>
                <Switch value={locationSharing} onValueChange={setLocationSharing} />
            </View>

            <View style={styles.setting}>
                <Text style={[styles.settingLabel, {color:Colors[colorScheme ?? 'light'].text}]}>Data Sharing</Text>
                <Switch value={dataSharing} onValueChange={setDataSharing} />
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
