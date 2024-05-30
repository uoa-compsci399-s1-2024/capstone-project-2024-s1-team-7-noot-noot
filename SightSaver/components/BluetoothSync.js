import { View, Text } from './Themed';
import { useColorScheme } from './useColorScheme';
import React, { useState, useEffect } from 'react';
import useBLE from "../app/(entry)/useBLE.ts";
import { StyleSheet, TouchableOpacity, Modal, ScrollView, } from 'react-native';

export default function BluetoothSync( { childrenInfo, visible, onClose, selectedChildIndex } ) {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [deviceFound, setDeviceFound] = useState(false);
  const colorScheme = useColorScheme();
  const {
      requestPermissions,
      scanForPeripherals,
      allDevices,
      connectToDevice,
      setAllDevices,
      dataSyncCompleted,
  } = useBLE();

  useEffect(() => {
      const requestAndScan = async () => {
        const permissionsGranted = await requestPermissions();
        if (permissionsGranted) {
          scanForPeripherals();
        }
      };
      requestAndScan();
      try {
        handleSync(childrenInfo[selectedChildIndex].sensorId);
      } catch (error) {
        console.log('Error Loading Details:', error);
      }
  }, [visible]);

  useEffect(() => {
      if (dataSyncCompleted) {
        setAlertMessage('Data Synced');
        setDeviceFound(false);
      }
  }, [dataSyncCompleted]);

  const handleSync = async (sensorId) => {
    setAlertMessage('Searching for Device...');
    setAllDevices([]);
    scanForPeripherals();
  
    const checkDevicesInterval = setInterval(() => {
      for (let i = 0; i < allDevices.length; i++) {
        if (allDevices[i].id === sensorId) {
          setAlertMessage('Device found');
          setSelectedDevice(allDevices[i]);
          clearInterval(checkDevicesInterval);
          handleDeviceConnection(allDevices[i]);
          break;
        }
      }
    }, 1000);
  
    setTimeout(() => {
      clearInterval(checkDevicesInterval);
      if (!selectedDevice) {
        setAlertMessage('Device not found');
      }
    }, 30000);
  };
  
  const handleDeviceConnection = async (device) => {
    const connected = await connectToDevice(device);
    if (connected) {
      if (dataSyncCompleted) {
        setAlertMessage('Data Synced');
        setDeviceFound(false);
      } else {
        setAlertMessage('Device Connecting Failed');
      }
    } else {
      setAlertMessage('Device Connecting Failed');
    }
  };

  return (
    <View style={styles.container}>
      <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
          if (
              alertMessage === 'Data Synced' ||
              alertMessage === 'Device Connecting Failed' ||
              alertMessage === 'No device selected' ||
              alertMessage === 'Device not found' ||
              alertMessage === 'Searching for Device...' ||
              alertMessage === ''
          ) {
              onClose();
              setAllDevices([]);
              setAlertMessage('');
          }
          }}
      >
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPressOut={() => {
              if (
              alertMessage === 'Data Synced' ||
              alertMessage === 'Device Connecting Failed' ||
              alertMessage === 'No device selected' ||
              alertMessage === 'Device not found' ||
              alertMessage === 'Searching for Device...' ||
              alertMessage === ''
              ) {
                onClose();
                setAllDevices([]);
                setAlertMessage('');
              }
          }}
          >
          <View style={styles.alertModal}>
            <Text style={[styles.alertMessage, {color:'white'}]}>{alertMessage}</Text>
            {(
              alertMessage === 'Data Synced' || 
              alertMessage === 'Device Connecting Failed' || 
              alertMessage === 'No device selected' || 
              alertMessage === 'Device not found' ||
              alertMessage === 'Searching for Device...' ||
              alertMessage === ''
            ) && (
            <TouchableOpacity
                onPress={() => {onClose(), setAllDevices([]), setAlertMessage('');}}
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
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  deviceModal: {
    width: '80%',
    height: '50%',
    borderRadius: 10,
    padding: 40,
  },
  closeButton: {
    flex: 1,
    right: 0,
    padding: 15,
    position: 'absolute',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
  syncButton: {
    width: '85%',
    justifyContent: 'center',
    paddingVertical: 20,
    borderWidth: 0,
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#1970B4',
  },
  syncButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});