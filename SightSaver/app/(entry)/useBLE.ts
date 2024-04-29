import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";
import * as ExpoDevice from "expo-device";
import * as FileSystem from 'expo-file-system';

import base64 from "react-native-base64";

const Sensor_RATE_UUID = "A07498CA-AD5B-474E-940D-16F1FBE7E8CD";
const Sensor_RATE_CHARACTERISTIC = "51FF12BB-3ED8-46E5-B4F9-D64E2FEC021B";

interface BluetoothLowEnergyApi {
  requestPermissions(): Promise<boolean>;
  scanForPeripherals(): void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  setAllDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  SensorData: JSON | null;
  dataSyncCompleted: boolean;
}

function useBLE(): BluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [SensorData, setSensorData] = useState<JSON | null>(null);
  const [dataSyncCompleted, setDataSyncCompleted] = useState(false);

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }
      if (device?.name == 'SightSaver') {
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicateDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });

  const connectToDevice = async (device: Device) => {
    const deviceConnection = await bleManager.connectToDevice(device.id);
    setConnectedDevice(deviceConnection);
    await deviceConnection.discoverAllServicesAndCharacteristics();
    bleManager.stopDeviceScan();
    console.log("Connected to Device", deviceConnection.id);
    startStreamingData(deviceConnection);
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setSensorData(null);
    }
  };

  let rawData = "";
  const onValueUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null
  ) => {
    if (error) {
      console.log("Deviced Disconnected");
      onDeviceDisconnect();
      return -1;
    } else if (!characteristic?.value) {
      console.log("No Data was recieved");
      return -1;
    }

    rawData += characteristic.value;
  };

  const onDeviceDisconnect = () => {
    const decodedData = base64.decode(rawData);
  
    // Process the data in chunks of 20 characters
    for (let i = 0; i < decodedData.length; i += 20) {
      const chunk = decodedData.slice(i, i + 20);

      // Extract the time and light values from the chunk
      let time = chunk.slice(0, 12);
      let light = chunk.slice(12, 20);

      // Remove trailing zeros from the light value
      light = light.replace(/0+$/, '');

      // Create a JSON object
      const data = {
        time: time,
        light: light
      };

      // Convert the JSON object to a string
      const jsonString = JSON.stringify(data);

      // Write the JSON string to a file, followed by a newline character
      const fileUri = FileSystem.documentDirectory + 'data.json';
      FileSystem.writeAsStringAsync(fileUri, jsonString + '\n');
    }

    console.log('JSON data written to file');
    setDataSyncCompleted(true);
  };

  const startStreamingData = async (device: Device) => {
    if (device) {
      console.log("Starting to Stream Data");
      device.monitorCharacteristicForService(
        Sensor_RATE_UUID,
        Sensor_RATE_CHARACTERISTIC,
        onValueUpdate
      );
    }
  };
  
  return {
    scanForPeripherals,
    setAllDevices,
    requestPermissions,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    SensorData,
    dataSyncCompleted,
  };
}

export default useBLE;