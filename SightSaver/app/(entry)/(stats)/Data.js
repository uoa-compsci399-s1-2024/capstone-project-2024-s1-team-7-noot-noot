import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function DataScreen() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fileUri = FileSystem.documentDirectory + 'data.json';

    FileSystem.readAsStringAsync(fileUri)
      .then(jsonString => {
        const jsonData = jsonString.split('\n').filter(Boolean).map(JSON.parse);
        setData(jsonData);
      })
      .catch(error => {
        console.error('Failed to read data from file', error);
      });
  }, []);
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={index}>
          <Text>Time: {item.time}</Text>
          <Text>Light: {item.light}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});