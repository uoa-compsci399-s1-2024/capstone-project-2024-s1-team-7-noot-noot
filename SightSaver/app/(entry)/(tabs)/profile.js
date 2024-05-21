import { View, Text } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import { useColorScheme } from '../../../components/useColorScheme';
import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import useBLE from "../useBLE";
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
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
import { getUserDetails } from '../../../ctx';
import ChildrenButtons from '../../../components/ChildrenButtons';

var data = `
2024:05:01 10:23:06 45\n
2024:05:01 13:02:45 61\n
2024:05:01 15:45:03 40\n
2024:05:02 11:03:23 42\n
2024:05:02 13:56:32 31\n
2024:05:02 16:12:05 38\n
2024:05:03 09:12:44 63\n
2024:05:03 12:53:22 42\n
2024:05:03 15:32:04 15\n
2024:05:03 16:21:03 23\n
2024:05:04 10:47:32 63\n
2024:05:04 14:21:21 42\n
2024:05:04 15:32:04 15\n
2024:05:05 09:24:32 41\n
2024:05:05 11:42:25 32\n
2024:05:05 14:37:58 48\n
2024:05:06 09:51:17 39\n
2024:05:06 12:26:48 54\n
2024:05:06 15:24:24 47\n
2024:05:07 09:43:40 45\n
2024:05:07 12:19:22 35\n
2024:05:07 15:27:19 42\n
2024:05:08 09:39:56 50\n
2024:05:08 12:24:44 38\n
2024:05:08 15:46:58 43\n
2024:05:09 09:52:12 36\n
2024:05:09 12:42:01 47\n
2024:05:09 15:29:35 41\n
2024:05:10 09:55:46 42\n
2024:05:10 12:04:39 34\n
2024:05:10 15:30:15 49\n
2024:05:11 09:42:54 44\n
2024:05:11 12:27:26 33\n
2024:05:11 15:35:57 40\n
2024:05:12 09:48:03 38\n
2024:05:12 12:52:14 52\n
2024:05:12 15:26:48 37\n
2024:05:13 09:57:22 40\n
2024:05:13 12:46:38 38\n
2024:05:13 15:41:11 45\n
2024:05:14 09:57:50 36\n
2024:05:14 12:20:15 39\n
2024:05:14 15:54:39 41\n
2024:05:15 09:53:48 43\n
2024:05:15 12:38:09 35\n
2024:05:15 15:47:34 43\n
2024:05:16 09:56:07 39\n
2024:05:16 12:54:33 37\n
2024:05:16 15:55:57 43\n
2024:05:17 09:59:25 38\n
2024:05:17 12:52:59 45\n
2024:05:17 15:56:10 38\n
2024:05:18 09:48:16 47\n
2024:05:18 12:49:11 51\n
2024:05:18 15:53:39 44\n
2024:05:19 09:57:55 40\n
2024:05:19 12:33:07 41\n
2024:05:19 15:42:21 38\n
2024:05:20 09:51:32 43\n
2024:05:20 12:45:48 36\n
2024:05:20 15:40:13 45\n
2024:05:21 09:44:14 36\n
2024:05:21 12:50:19 42\n
2024:05:21 15:53:23 39\n
2024:05:22 09:41:51 44\n
2024:05:22 12:49:37 39\n
2024:05:22 15:53:14 45\n
2024:05:23 09:48:18 39\n
2024:05:23 12:58:43 37\n
2024:05:23 15:56:55 42\n
2024:05:24 09:57:47 35\n
2024:05:24 12:57:50 42\n
2024:05:24 15:42:25 38\n
2024:05:25 09:58:28 41\n
2024:05:25 12:52:04 39\n
2024:05:25 15:53:30 41\n
2024:05:26 09:54:16 37\n
2024:05:26 12:50:55 36\n
2024:05:26 15:45:18 40\n
2024:05:27 09:55:47 35\n
2024:05:27 12:56:20 39\n
2024:05:27 15:44:53 38\n
2024:05:28 09:42:38 46\n
2024:05:28 12:57:13 40\n
2024:05:28 15:59:39 44\n
2024:05:29 09:41:59 37\n
2024:05:29 12:48:07 40\n
2024:05:29 15:41:45 39\n
2024:05:30 09:42:17 45\n
2024:05:30 12:53:32 38\n
2024:05:30 15:58:59 45\n
2024:05:31 09:47:12 38\n
2024:05:31 12:42:44 42\n
2024:05:31 15:32:03 40\n
`;

async function importData () {
  const fileUri = FileSystem.documentDirectory + 'dummyData.txt';
  await FileSystem.writeAsStringAsync(fileUri, data);
};

function convertData() {
  if (typeof data === 'string') {
    const lines = data.trim().split('\n');
    // rest of your code...
  } else {
    console.error('Data is not defined or not a string:', data);
  }  
  
  const lines = [];
  const result = [];

  for (const line of lines) {
    console.log(line);
    const [date, time, minutes] = line.trim().split(' ');
    const [year, month, day] = date.split(':');
    const [hour, minute, second] = time.split(':');

    const startDate = new Date(year, month - 1, day, hour, minute, second);
    const totalSeconds = minutes * 60;

    for (let i = 0; i < totalSeconds; i++) {
      const newDate = new Date(startDate.getTime() + i * 1000);
      const dateTime = newDate.toISOString().replace('T', ' ').substring(0, 19);
      result.push({ date_time: dateTime, lux_value: "1" });
    }
  }

  return result;
}

function deleteData () {
  const fileUri = FileSystem.documentDirectory + 'dummyData.txt';

  FileSystem.deleteAsync(fileUri);
};

function pushData () {
  const convertedData = convertData();
  console.log(convertedData);
  axios.post('https://sightsaver-api.azurewebsites.net/api/lux', convertedData)
  .then(response => {
    // Handle success, log the response
    console.log('Response data:', response.data.token);
  })
  .catch(error => {
    // Handle error, log the error message
    console.error('Error posting data:', error);
  });
}

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const [activeButton, setActiveButton] = useState(2); // Changed state for active button
  const [showDevices, setShowDevices] = useState(false); // Whether to show the list of devices
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    // Fetch user details when component mounts
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const userDetails = await getUserDetails();
      if (userDetails) {
        setUsername(userDetails.username || 'USERNAME');
        setEmail(userDetails.email || '');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
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
                  <Text style={styles.name}>{username}</Text>
                  <Text style={styles.userInfo}>{email}</Text>
              </View>
          </View>

      {/* Children buttons */}
      <View style={styles.childrenContainer}>
        <ChildrenButtons />
      </View>

      {/* Sync Data Button */}
      <View>
        <TouchableOpacity
          style={[styles.syncButton, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.syncButtonText}>Sync Data</Text>
        </TouchableOpacity>
      </View>

      {/* Import Dummy Data Button */}
      <View style={styles.import}>
        <Button title="Import Dummy Data (for testing only)" onPress={importData()}></Button>
      </View>

      <View style={[styles.import, {marginTop: '5%'}]}>
        <Button title="Delete Dummy Data (for testing only)" onPress={deleteData}></Button>
      </View>

      <View style={[styles.import, {marginTop: '5%'}]}>
        <Button title="Push Dummy Data to Database (for testing only)" onPress={pushData}></Button>
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
  import: {
    width: '85%',
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
  },

  childrenContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  }
});
