import { View, Text } from './Themed';
import { useColorScheme } from './useColorScheme';
import React, { useState, useEffect } from 'react';
import useBLE from "../app/(entry)/useBLE.ts";
import { StyleSheet, TouchableOpacity, StatusBar, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';

export default function BluetoothSync({ childrenInfo, visible, onClose, selectedChildIndex }) {
  const colorScheme = useColorScheme();
  const [activeButton, setActiveButton] = useState(2); // Changed state for active button
  const [showDevices, setShowDevices] = useState(false); // Whether to show the list of devices
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    SensorData,
    disconnectFromDevice,
    setAllDevices,
    dataSyncCompleted,
  } = useBLE();

  const [triggerSync, setTriggerSync] = useState(false);

  useEffect(() => {
    if (selectedDevice && triggerSync) {
      handleSync();
      setTriggerSync(false);
    }
  }, [selectedDevice, triggerSync]);

  useEffect(() => {
    const requestAndScan = async () => {
      const permissionsGranted = await requestPermissions();
      if (permissionsGranted) {
        scanForPeripherals();
      }
    };

    requestAndScan();
  }, []);

  useEffect(() => {
    if (dataSyncCompleted) {
      setAlertMessage('Data Synced');
    }
  }, [dataSyncCompleted]);

  const handleSync = async () => {
    if (selectedDevice) {
      setAlertMessage('Connecting...');
      setAlertVisible(true);
      try {
        setAlertMessage('Connected. Syncing...');
        await connectToDevice(selectedDevice, true);
      } catch (error) {
        setAlertMessage('Device Connecting Failed');
      } finally {
        setShowDevices(false);
        setModalVisible(false);
      }
    } else {
      setAlertMessage('No device selected');
      setAlertVisible(true);
    }
  };

  const getChildNameBySensorId = (sensorId) => {
    if (childrenInfo.length > 0) {
      const child = childrenInfo.find(child => child.sensorId === sensorId);
      return child ? child.childName : '';
    } else {
      return '';
    }
  };

  return (
    <View style={[styles.container]}>
      {/* Device Modal */}
      <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            onClose();
          }}
        >
        <View style={styles.overlay}>
          <View style={styles.deviceModal}>
            <TouchableOpacity style={styles.closeButton} onPress={() => { setAllDevices([]); onClose(); scanForPeripherals(); }}>
              <Ionicons name="close" size={22} color={Colors[colorScheme ?? 'light'].text} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }, { alignSelf: 'center', marginBottom: 10 }, { fontSize: 21, fontWeight: 'bold' }]}>Searching for devices...</Text>
            <ScrollView>
              {allDevices.map((device) => (
                <TouchableOpacity
                  key={device.id}
                  onPress={() => {
                    setSelectedDevice(device);
                    setAllDevices([]);
                    onClose();
                    setTriggerSync(true);
                  }}
                  style={styles.deviceButton}
                >
                  <Text style={styles.deviceButtonText}>{getChildNameBySensorId(device?.id)} - {device?.id}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Alert Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={alertVisible}
        onRequestClose={() => {
          if (alertMessage === 'Data Synced' || alertMessage === 'Device Connecting Failed' || alertMessage === 'No device selected') {
            setAlertVisible(false);
          }
        }}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => {           
            if (alertMessage === 'Data Synced' || alertMessage === 'Device Connecting Failed' || alertMessage === 'No device selected') {
              setAlertVisible(false);
            } 
          }}
        >
          <View style={styles.alertModal}>
            <Text style={styles.alertMessage}>{alertMessage}</Text>
            {(alertMessage === 'Data Synced' || alertMessage === 'Device Connecting Failed' || alertMessage === 'No device selected') && (
              <TouchableOpacity
                onPress={() => { setAlertVisible(false); setAllDevices([]); }}
              >
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  syncButton: {
    width: '85%',
    marginVertical: 20,
    justifyContent: 'center',
    paddingVertical: 20,
    borderWidth: 0,
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
  syncButtonText: {
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  button: {
    flexDirection: 'row', // Set the button layout to row
    alignItems: 'center', // Center the text and circle within the button
    justifyContent: 'space-between', // Center the text and circle within the button
    width: '85%',
    paddingHorizontal: 20, // Add padding on the left and right (20px from the edge)
    paddingVertical: 20, // Add padding on the top and bottom (10px from the edge)
    borderWidth: 0,
    borderRadius: 5, // Rounded corners
    marginVertical: 5, // Add vertical margin for spacing between buttons
  },
  deviceModal: {
    paddingTop: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  alertModal: {
    width: '80%',
    height: '20%',
    borderRadius: 10,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  alertMessage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  closeButton: {
    flex: 1,
    right: 0,
    top: 0,
    padding: 15,
    position: 'absolute',
  },
  deviceButton: {
    width: '100%',
    height: '100%',
    marginVertical: 0,
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 0,
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
  deviceButtonText: {
    fontSize: 18,
  }
});
