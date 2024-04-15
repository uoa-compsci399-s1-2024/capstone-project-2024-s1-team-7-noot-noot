import { StyleSheet, Text, View } from 'react-native';
import themeContext from '@/constants/themeContext';
import { StatusBar } from 'react-native';
import React, { useState, useContext } from 'react';

export default function IndexScreen() {
  const theme = useContext(themeContext)
  return (
    <View style={[styles.container, {backgroundColor:theme.backgroundColor}]}>
      <StatusBar barStyle={theme.barStyle}/>
      <Text style={[styles.title, {color:theme.color}]}>Index</Text>
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
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
