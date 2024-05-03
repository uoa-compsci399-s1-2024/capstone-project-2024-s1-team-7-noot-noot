import React, {useState} from 'react';
import {StyleSheet } from 'react-native';
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../../constants/Colors';
import { Text, View } from '../../../components/Themed';
import { useColorScheme } from '../../../components/useColorScheme';
import moment from 'moment';
// import {*} from 'date-fns';

export default function MonthlyScreen() {
  const colorScheme = useColorScheme();
  const [selectedDate, setSelectedDate] = useState(null);

  const onDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <View style={styles.container}>
      <View style={[styles.CalendarPicker, ]}>
      <CalendarPicker
        onDateChange={onDateChange}
        todayBackgroundColor='#f2e6ff'
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
    backgroundColor: Colors.light.background,
    color: Colors.light.text,
    opacity: 0.8,
  }
});