import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { JSONToEncoded } from '../../components/helpers/JSONToEncoded';
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
  connectToDevice: (device: Device, connecting: Boolean) => Promise<string>;  
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

  const scanForPeripherals = () => {
    const uuids = [Sensor_RATE_UUID, Sensor_RATE_CHARACTERISTIC]; // replace with your UUIDs
    bleManager.startDeviceScan(uuids, null, (error, device) => {
      if (error) {
        // handle error
      }
      if (device?.name) {
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicateDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  };

  const connectToDevice = async (device: Device, connecting: Boolean): Promise<string> => {
    const deviceConnection = await bleManager.connectToDevice(device.id);
    setConnectedDevice(deviceConnection);
    // Store the MAC address
    const macAddress = device.id;
    // You can now use the macAddress variable to store the MAC address as needed
    await deviceConnection.discoverAllServicesAndCharacteristics();
    bleManager.stopDeviceScan();
    
    if (connecting) {
      startStreamingData(deviceConnection);
    }

    return macAddress;
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
      onDeviceDisconnect();
      return -1;
    } else if (!characteristic?.value) {
      return -1;
    }

    rawData += characteristic.value;
  };

  let formattedData = "";
  let sensor_id = "";
  const onDeviceDisconnect = async () => {
    const decodedData = base64.decode(rawData);
  
    const fileUri = FileSystem.documentDirectory + 'tempData.json';
    const outputUri = FileSystem.documentDirectory + 'data.txt';
  
    // Delete the previous file
    await FileSystem.deleteAsync(fileUri, { idempotent: true });
  
    // Process the data in chunks of 20 characters
    for (let i = 0; i < decodedData.length; i += 20) {
      const chunk = decodedData.slice(i, i + 20);
  
      // Extract the time and light values from the chunk
      let year = chunk.slice(0, 4);
      let month = chunk.slice(4, 6);
      let day = chunk.slice(6, 8);
      let hour = chunk.slice(8, 10);
      let minute = chunk.slice(10, 12);
      let second = chunk.slice(12, 14);
  
      let time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  
      let light = chunk.slice(14, 19);
  
      // Create a JSON object
      let dataObject = {
        lux_value: light,
        date_time: time,
        sensorId: sensor_id,
      };
  
      // Convert the JSON object to a string and append it to formattedData

      if (dataObject.lux_value === "" || dataObject.date_time === "" || dataObject.sensorId === "") {
        continue;
      } else {
        formattedData += JSON.stringify(dataObject) + '\n';
      }
    }
  
    console.log('JSON data written to file');
    setDataSyncCompleted(true);
    await FileSystem.writeAsStringAsync(fileUri, formattedData).then(() => {
      JSONToEncoded(fileUri, outputUri);
    });
  };

  const startStreamingData = async (device: Device) => {
    if (device) {
      // console.log("Starting to Stream Data");
      sensor_id = `${device.id}`;
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