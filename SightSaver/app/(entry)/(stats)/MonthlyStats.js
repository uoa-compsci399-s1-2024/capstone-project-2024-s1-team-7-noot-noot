import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Animated } from 'react-native';
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../../constants/Colors';
import { Text, View } from '../../../components/Themed';
import { useColorScheme } from '../../../components/useColorScheme';
import moment from 'moment';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';
// import {*} from 'date-fns';

export default function MonthlyScreen(props) {
  const colorScheme = useColorScheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const onDateChange = (date) => {
    const formattedDate = moment(date).format('YYYY:MM:DD');
    props.changeSelectedItem(props.dropdownData.find(item => item.label === 'Daily'), formattedDate);
  };

  useEffect(() => {
    fadeAnim.stopAnimation();
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  });

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <View style={[styles.CalendarPicker, ]}>
        <CalendarPicker
          onDateChange={onDateChange}
          textStyle={{color: Colors[colorScheme].text}}
          todayBackgroundColor='#f2e6ff'
          dayTextStyle={{color: Colors[colorScheme].text}}
          borderColor={Colors[colorScheme].text}
          selectedDayStyle={{backgroundColor: '#FFBD20'}}
        />
      </View>
    </Animated.View>
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
  CalendarPicker: {
    width: '95%',
    opacity: 0.8,
    flex:1,
    marginTop: '10%',
  }
});