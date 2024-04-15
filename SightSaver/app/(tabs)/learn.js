import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import themeContext from '@/constants/themeContext';
import { StatusBar } from 'react-native';

export default function LearnScreen() {
  const theme = useContext(themeContext)
  return (
    <View style={[styles.container, {backgroundColor:theme.backgroundColor}]}>
      <StatusBar barStyle={theme.barStyle}/>
      <Text style={[styles.title, {color:theme.color}]}>Learn</Text>
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
});
