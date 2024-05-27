import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';

export default function DataScreen() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 25;
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fileUri = FileSystem.documentDirectory + 'tempData.json';

    FileSystem.readAsStringAsync(fileUri)
      .then(fileContent => {
        const lines = fileContent.split('\n');
        setData(lines);
      })
      .catch(error => {
        // console.error('Failed to read data from file', error);
      });
  }, []);

  const handleNext = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrev = () => {
    setPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = data.slice(start, end);

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        {pageData.map((line, index) => (
          <Text style={{color:Colors[colorScheme ?? 'light'].text}} key={index}>{line}</Text>
        ))}
      </View>
      <View style={styles.pagination}>
        <TouchableOpacity style={[styles.button, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]} onPress={handlePrev} disabled={page === 0}>
          <Text style={[styles.buttonText, {color:Colors[colorScheme ?? 'light'].text}]}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]} onPress={handleNext} disabled={end >= data.length}>
          <Text style={[styles.buttonText, {color:Colors[colorScheme ?? 'light'].text}]}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  dataContainer: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: '8%'
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '5%',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});