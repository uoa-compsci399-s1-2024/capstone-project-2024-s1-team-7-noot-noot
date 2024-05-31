import { View, Text } from '../Themed';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../useColorScheme';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import useBLE from "../../app/(entry)/useBLE.ts";
import { getChildrenInfo } from '../../ctx';
import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput';
import { StyleSheet, TouchableOpacity, Modal, ScrollView, TextInput, Button } from 'react-native';

export default function AddChildModal({ childrenInfo, visible, onClose, onAdd }) {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [childName, setChildName] = useState('');
  const colorScheme = useColorScheme();
  const {
      requestPermissions,
      scanForPeripherals,
      allDevices,
      setAllDevices,
  } = useBLE();

  const handleNextPage = () => {
    setCurrentPage(2);
  };

  useEffect(() => {
    const requestAndScan = async () => {
      const permissionsGranted = await requestPermissions();
      if (permissionsGranted) {
        scanForPeripherals();
      }
    };
    requestAndScan();
    setCurrentPage(1);
  }, []);

  const handleSync = async () => {
    if (selectedDevice) {
      if (childName === '') {
        alert('Please enter a child name');
      } else if (childrenInfo.length > 0) {
        // if (childrenInfo.some(child => child.sensorId == selectedDevice.id)) {
        //   alert('This device is already assigned to a child');
        // } else {
        //   onAdd(childName, selectedDevice.id);
        //   setCurrentPage(1);
        //   onClose();
        // }
      // } else {
        onAdd(childName, selectedDevice.id);
        setCurrentPage(1);
        onClose();
      } else if (childrenInfo.length === 0) {
        onAdd(childName, selectedDevice.id);
        setCurrentPage(1);
        onClose();
      }
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
      {/* Device Modal */}
      <Modal
          animationType="fade"
          transparent={false}
          visible={visible}
          onRequestClose={() => {
              onClose();
          }}
          >
          <View style={[styles.deviceModal, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
            <TouchableOpacity style={styles.closeButton} onPress={() => {setAllDevices([]), onClose(), scanForPeripherals(), setCurrentPage(1);}}>
              <Ionicons name="close" size={22} color={Colors[colorScheme ?? 'light'].text} />
            </TouchableOpacity>
            {currentPage === 1 ? (
              <View style={[styles.pageContainer, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
                <Text style={[styles.title,{color:Colors[colorScheme ?? 'light'].text}, {alignSelf:'center', marginBottom:10}, {fontSize: 21, fontWeight: 'bold'}]}>Searching for devices...</Text>
                <ScrollView>
                  {allDevices.map((device) => (
                    <TouchableOpacity
                    key={device.id}
                    onPress={() => {
                        setSelectedDevice(device);
                        setAllDevices([]);
                        handleNextPage();
                    }}
                    style={styles.deviceButton}
                    >
                    <Text style={styles.deviceButtonText}>{device.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            ) : (
              <View style={[styles.pageContainer, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
                <Text style={[styles.title,{color:Colors[colorScheme ?? 'light'].text}, {alignSelf:'center', marginBottom:10}, {fontSize: 21, fontWeight: 'bold'}]}>Set Child Name</Text>
                <View style={styles.input}>
                  <CustomInput
                    placeholder="Child Name"
                    value={childName}
                    setValue={setChildName}
                    keyboardType="default"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <CustomButton                    
                    onPress={handleSync} 
                    text={"Add Child"}
                  />
                </View>
              </View>
            )}
          </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginTop: '5%',
    marginBottom: '-5%',
  },
  deviceModal: {
    paddingTop: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  closeButton: {
    flex: 1,
    right: 0,
    top: 0,
    padding: 15,
    position: 'absolute',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deviceButton: {
    width: '100%',
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
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    width: '85%',
  }, 
  buttonContainer: {
    marginTop: 0,
    width: '100%',
  },
});
