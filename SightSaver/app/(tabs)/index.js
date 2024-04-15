import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import themeContext from '@/constants/themeContext';
import { StatusBar } from 'react-native';

export default function IndexScreen() {
  const theme = useContext(themeContext)
  return (
    <View style={[styles.container, {backgroundColor:theme.backgroundColor}]}>
      <StatusBar barStyle={theme.barStyle}/>
      <Image source={theme.image} style={styles.imageStyle}/>
      <Text style={[styles.title, {color:theme.color}]}>Weekly Sunlight</Text>
  
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
    fontSize: 40,
    fontWeight: 'light',
  },
});
