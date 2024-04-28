import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function MonthlyScreen() {
  return (
    <View style={styles.container}>
      <Text>Monthly Stats</Text>
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