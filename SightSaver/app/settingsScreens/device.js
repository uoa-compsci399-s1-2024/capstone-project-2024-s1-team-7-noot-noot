import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useColorScheme } from '../../components/useColorScheme';
import Colors from '../../constants/Colors';

export default function DeviceSettings({ route }) {
    const [deviceId, setDeviceId] = useState(0); // Default value if not found in AsyncStorage

    const [setting1, setSetting1] = useState(false);
    const [setting2, setSetting2] = useState(true);

    const toggleSetting1 = () => setSetting1(previousState => !previousState);
    const toggleSetting2 = () => setSetting2(previousState => !previousState);

    const colorScheme = useColorScheme();

    useEffect(() => {
        const fetchActiveButton = async () => {
            try {
                const storedActiveButton = await AsyncStorage.getItem('activeButton');
                if (storedActiveButton !== null) {
                    setDeviceId(parseInt(storedActiveButton)); // Parse storedActiveButton instead of deviceId
                }
            } catch (error) {
                console.error('Error fetching activeButton:', error);
            }
        };

        fetchActiveButton();
    }, []);

    return (
        <View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
            <Text style={[styles.title, {color:Colors[colorScheme ?? 'light'].text}]}>Device Settings for Sun Sensor {deviceId}:</Text>

            <View style={styles.setting}>
                <Text style={[styles.settingLabel, {color:Colors[colorScheme ?? 'light'].text}]}>Setting 1</Text>
                <Switch value={setting1} onValueChange={toggleSetting1} />
            </View>

            <View style={styles.setting}>
                <Text style={[styles.settingLabel, {color:Colors[colorScheme ?? 'light'].text}]}>Setting 2</Text>
                <Switch value={setting2} onValueChange={toggleSetting2} />
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
