import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";
import { Buffer } from 'buffer';
import * as ExpoDevice from "expo-device";

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
  SensorData: number;
}

let dataChunks: string[] = [];

function useBLE(): BluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [SensorData, setSensorData] = useState<number>(0);

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
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      console.log("Connected to Device", deviceConnection.id);
      startStreamingData(deviceConnection);
    } catch (e) {
      console.log("FAILED TO CONNECT", e);
    }
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setSensorData(0);
    }
  };
  
  const startStreamingData = async (device: Device) => {
    if (device) {
      console.log("Device is connected, starting to read characteristic");
      try {
        // Request the next chunk of data
        await device.writeCharacteristicWithResponseForService(
          Sensor_RATE_UUID,
          Sensor_RATE_CHARACTERISTIC,
          Buffer.from("NEXT").toString('base64')
        );
  
        const characteristic = await device.readCharacteristicForService(
          Sensor_RATE_UUID,
          Sensor_RATE_CHARACTERISTIC
        );
  
        if (characteristic.value) {
          const chunk = base64.decode(characteristic.value);
          console.log("Read characteristic value", chunk);
          dataChunks.push(chunk);
  
          // If the characteristic value is less than 20 bytes, we've received all the data
          if (chunk.length < 20 || chunk == null) {
            const data = dataChunks.join('');
            const jsonData = JSON.parse(data);
            console.log("Received JSON data", jsonData);
            dataChunks = [];
            setSensorData(jsonData);
            console.log("Sensor Data", SensorData);
          }
        } else {
          console.log("Characteristic value is null");
        }
      } catch (e) {
        console.log("Failed to read characteristic", e);
      }
    } else {
      console.log("No Device Connected");
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
  };
}

export default useBLE;