import { View, Text } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../components/useColorScheme';
import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import useBLE from "../useBLE";
import { 
  StyleSheet, 
  Switch, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert, 
  StatusBar, 
  FlatList, 
  Modal, 
  ScrollView,
  Button
} from 'react-native';

export default function ProfileScreen() {
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
        await connectToDevice(selectedDevice);
        setAlertMessage('Connected. Syncing...');
        await new Promise((resolve) => setTimeout(resolve, 2000));
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

  const handlePress = (index) => {
      setActiveButton(index);
      AsyncStorage.setItem('activeButton', index.toString());
  };

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle={barStyle=Colors[colorScheme ?? 'light'].barStyle}/>

      {/* Parent Profile */}
          <View style={styles.headerContent}>
              <Ionicons name="person-circle-outline" size={50} color={Colors[colorScheme ?? 'light'].text} />
              <View style={styles.headerText}>
                  <Text style={styles.name}>John Doe</Text>
                  <Text style={styles.userInfo}>info@company.com</Text>
              </View>
          </View>

      {/* Children buttons */}
      <View style={{justifyContent:"center", alignItems:"center", marginTop:20}}>
        <Text style={[styles.title,{fontWeight:"bold",fontSize:20}]}>Display Data for:</Text>

        {/* Child 1 Button */}
        <TouchableOpacity
            style={[styles.button, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}
            onPress={() => handlePress(1)} // Pass index 1
        >
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'left'}}>
            <Text style={[styles.buttonText, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}>Child 1</Text>
            <Text style={[styles.buttonText, {fontSize: 10, backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}>Device: Sun Sensor 1</Text>
          </View>             
          <View
              style={[
                  styles.circle,
                  {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor},
                  activeButton === 1 && styles.circlePressed, // Apply style when button 1 is active
              ]}
          />
        </TouchableOpacity>

        {/* Child 2 Button */}
        <TouchableOpacity
          style={[styles.button, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}
          onPress={() => handlePress(2)} // Pass index 2
        >
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems:'left'}}>
          <Text style={[styles.buttonText, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}>Child 2</Text>
          <Text style={[styles.buttonText, {fontSize: 10, backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}>Device: Sun Sensor 2</Text>
        </View>      
          <View
            style={[
              styles.circle,
              {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor},
              activeButton === 2 && styles.circlePressed, // Apply style when button 1 is active
          ]}
          />
        </TouchableOpacity>
      </View>

      {/* Sync Data Button */}
      <View>
        <TouchableOpacity
          style={[styles.syncButton, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.syncButtonText}>Sync Data</Text>
        </TouchableOpacity>
      </View>

      {/* Device Modal */}
      <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
        <View style={styles.overlay}>
          <View style={styles.deviceModal}>
            <TouchableOpacity style={styles.closeButton} onPress={() => {setAllDevices([]), setModalVisible(false), scanForPeripherals();}}>
              <Ionicons name="close" size={22} color={Colors[colorScheme ?? 'light'].text} />
            </TouchableOpacity>
            <Text style={[styles.title,{color:Colors[colorScheme ?? 'light'].text}, {alignSelf:'center', marginBottom:10}, {fontSize: 21, fontWeight: 'bold'}]}>Searching for devices...</Text>
            <ScrollView>
              {allDevices.map((device) => (
                <TouchableOpacity
                  key={device.id}
                  onPress={() => {
                    setSelectedDevice(device);
                    setAllDevices([]);
                    setModalVisible(false);
                    setTriggerSync(true);
                  }}
                  style={styles.deviceButton}
                >
                  <Text style={styles.deviceButtonText}>{device.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Alert Modal */ }
      <Modal
        animationType="fade"
        transparent={true}
        visible={alertVisible}
        onRequestClose={() => {
          if (
            alertMessage === 'Data Synced' ||
            alertMessage === 'Device Connecting Failed' ||
            alertMessage === 'No device selected'
          ) {
            setAlertVisible(!alertVisible);
            scanForPeripherals();
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
              alertMessage === 'No device selected'
            ) {
              setAlertVisible(!alertVisible);
              scanForPeripherals();
            }
          }}
        >
          <View style={styles.alertModal}>
            <Text style={[styles.alertMessage, {color:'white'}]}>{alertMessage}</Text>
            {(alertMessage === 'Data Synced' || alertMessage === 'Device Connecting Failed' || alertMessage === 'No device selected') && (
              <TouchableOpacity
                onPress={() => {setAlertVisible(false), setAllDevices([]), scanForPeripherals()}}
              >
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Seperator */}
      <View style={[styles.separator, {backgroundColor:Colors[colorScheme ?? 'light'].seperator}]}/>
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    height: 1,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  headerContent: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    fontWeight: '600',
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
  circle: {
    width: 20, // Circle size
    height: 20, // Circle size
    borderRadius: 10, // Full circle
    borderWidth:1,
    marginRight: 10, // Add margin between the circle and the text
  },
  circlePressed: {
    backgroundColor: '#539DF3',
  },
  settingsIconContainer: {
    alignSelf: 'flex-end', // Position the icon to the right side
    marginRight: 15,
  },
  settingsIcon: {
    paddingRight: 10,
  },
  deviceModal: {
    width: '80%',
    height: '50%',
    borderRadius: 10,
    padding: 40,
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  closeButton: {
    flex: 1,
    right: 0,
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
