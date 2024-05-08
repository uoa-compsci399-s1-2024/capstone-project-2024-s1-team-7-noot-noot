import React, {useState} from 'react';
import {StyleSheet } from 'react-native';
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../../constants/Colors';
import { Text, View } from '../../../components/Themed';
import { useColorScheme } from '../../../components/useColorScheme';
import moment from 'moment';
// import {*} from 'date-fns';

export default function MonthlyScreen(props) {
  const onDateChange = (date) => {
    const formattedDate = moment(date).format('YYYY:MM:DD');
    props.changeSelectedItem(props.dropdownData.find(item => item.label === 'Daily'), formattedDate);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.CalendarPicker, ]}>
        <CalendarPicker
          onDateChange={onDateChange}
          textStyle={{color: Colors[colorScheme].text}}
          todayBackgroundColor='#f2e6ff'
          dayTextStyle={{color: Colors[colorScheme].text}}
          borderColor={Colors[colorScheme].text}
          selectedDayStyle={{backgroundColor: '#FFBD20'}}
        />
      {selectedDate && <Text>Selected Date: {moment(selectedDate).format('LL')}</Text>}
      </View>
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
  CalendarPicker: {
    width: '95%',
    opacity: 0.8,
    flex:1,
    marginTop: '10%',
  }
});