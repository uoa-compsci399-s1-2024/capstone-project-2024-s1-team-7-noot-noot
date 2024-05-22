import React, {useState, useRef, useEffect, } from 'react';
import {StyleSheet, Animated } from 'react-native';
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../../constants/Colors';
import { Text, View } from '../../../components/Themed';
import { useColorScheme } from '../../../components/useColorScheme';
import moment from 'moment';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';

export default function MonthlyScreen(props) {
  const yearMonth = props.selectedDate.split(":");
  const selectedDate = new Date(yearMonth[0], yearMonth[1] - 1, 2);
  const colorScheme = useColorScheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  //const DatesStyles = [DatesStyles, setDatesStyles];
  const onDateChange = (date) => {
    const formattedDate = moment(date).format('YYYY:MM:DD');
    props.changeSelectedItem(props.dropdownData.find(item => item.label === 'Daily'), formattedDate);
  };

  function getTotalDays(month) {
    const totalDays = new Date(currentYear, month+1, 0).getDate();
    return totalDays; 
  }

  async function getCustomStyling(searchMonth, year) {
    const totalDays = getTotalDays(searchMonth);
    monthArray = new Array(totalDays).fill(0);
    for (let i = 0; i < totalDays; i++) { 
      const monthArray = await getMonthData(searchMonth, totalDays);
      for (let i of monthArray) {
        const newDate = new date (year, searchMonth, i+1, 13);
        if (i >= 2) {
          monthArray[i] = {date: newDate, style: {backgroundColor: '#FFBC1F'}};
        } else {
          monthArray[i] = {date: newDate, style: {backgroundColor: '#F6D78D'}};
        }
      }
    }
    return monthArray;
  }
  //Temporary values :'(
  const May1 = new Date(2024, 4, 1, 13);const May2 = new Date(2024, 4, 2, 13); const May3 = new Date(2024, 4, 3, 13);const May4 = new Date(2024, 4, 4, 13);const May5 = new Date(2024, 4, 5, 13);const May6 = new Date(2024, 4, 6, 13);const May7 = new Date(2024, 4, 7, 13);const May8 = new Date(2024, 4, 8, 13);const May9 = new Date(2024, 4, 9, 13);const May10 = new Date(2024, 4, 10, 13);const May11 = new Date(2024, 4, 11, 13);const May12 = new Date(2024, 4, 12, 13);const May13 = new Date(2024, 4, 13, 13);const May14 = new Date(2024, 4, 14, 13);const May15 = new Date(2024, 4, 15, 13); const May16 = new Date(2024, 4, 16, 13);const May17 = new Date(2024, 4, 17, 13);const May18 = new Date(2024, 4, 18, 13);const May19 = new Date(2024, 4, 19, 13);const May20 = new Date(2024, 4, 20, 13);const May21 = new Date(2024, 4, 21, 13);
  const basicStyling = [{date: May1, style: {backgroundColor: '#FFBC1F'}}, {date: May2, style: {backgroundColor: '#F6D78D'}}, {date: May3, style: {backgroundColor: '#FFBC1F'}}, {date: May4, style: {backgroundColor: '#FFBC1F'}}, {date: May5, style: {backgroundColor: '#FFBC1F'}}, {date: May6, style: {backgroundColor: '#FFBC1F'}}, {date: May7, style: {backgroundColor: '#FFBC1F'}}, {date: May8, style: {backgroundColor: '#FFBC1F'}}, {date: May9, style: {backgroundColor: '#FFBC1F'}}, {date: May10, style: {backgroundColor: '#FFBC1F'}}, {date: May11, style: {backgroundColor: '#F6D78D'}}, {date: May12, style: {backgroundColor: '#FFBC1F'}}, {date: May13, style: {backgroundColor: '#FFBC1F'}}, {date: May14, style: {backgroundColor: '#F6D78D'}}, {date: May15, style: {backgroundColor: '#FFBC1F'}}, {date: May16, style: {backgroundColor: '#F6D78D'}}, {date: May17, style: {backgroundColor: '#FFBC1F'}}, {date: May18, style: {backgroundColor: '#FFBC1F'}}, {date: May19, style: {backgroundColor: '#F6D78D'}}, {date: May20, style: {backgroundColor: '#FFBC1F'}}, {date: May21, style: {backgroundColor: '#F6D78D'}}];
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
            initialDate={selectedDate}
            textStyle={{color: Colors[colorScheme].text}}
            todayBackgroundColor='#FFBC1F'
            dayTextStyle={{color: Colors[colorScheme].text}}
            borderColor={Colors[colorScheme].text}
            customDatesStyles={basicStyling}

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