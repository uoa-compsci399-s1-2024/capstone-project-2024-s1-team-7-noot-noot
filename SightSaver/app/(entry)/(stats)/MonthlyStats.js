import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Animated, ActivityIndicator } from 'react-native';
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../../constants/Colors';
import { Text, View } from '../../../components/Themed';
import { useColorScheme } from '../../../components/useColorScheme';
import moment from 'moment';
import { getMonthData } from '../../../components/helpers/MonthlyData';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

moment.locale('en-gb');

export default function MonthlyScreen({ selectedDate, changeSelectedItem, dropdownData }) {
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [datesStyles, setDatesStyles] = useState([]);
  const [searchMonth, setSearchMonth] = useState(moment(selectedDate, "YYYY:MM:DD").add(1, 'days').utcOffset('+12:00'));
  const currentYear = searchMonth.year();
  const currentMonth = searchMonth.month();
  const [dailyGoal, setDailyGoal] = useState(2);
  const isFocus = useIsFocused();

  const onDateChange = (date) => {
    let finalDate = '';
    const formattedDate = moment(date, 'YYYY:MM:DD').format('YYYY:MM:DD');
    console.log('formattedDate', formattedDate);
  
    // Check if the formattedDate is within DST
    if (moment(formattedDate, "YYYY:MM:DD").isDST()) {
      console.log('dst', formattedDate);
      finalDate = moment(formattedDate, 'YYYY:MM:DD').add(1, 'days').format('YYYY:MM:DD');
    } else {
      finalDate = moment(formattedDate, 'YYYY:MM:DD').format('YYYY:MM:DD');
    }
  
    changeSelectedItem(dropdownData.find(item => item.label === 'Daily'), finalDate);
  };
  

  function getTotalDays(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  async function getCustomStyling(year, month, parsedGoal) {
    const customDatesStyles = [];
    const totalDays = getTotalDays(year, month);
    const monthArray = await getMonthData(searchMonth, totalDays);
    for (let i = 0; i < totalDays; i++) {
      const newDate = new Date(year, month, i + 1, 13);
      if (monthArray[i] >= parsedGoal) {
        customDatesStyles.push({
          date: newDate,
          style: { backgroundColor: '#efa800' },
          textStyle: { color: 'black' },
          containerStyle: [],
          allowDisabled: true,
        });
      } else if (monthArray[i] >= (parsedGoal / 3) * 2 && monthArray[i] < parsedGoal) {
        customDatesStyles.push({
          date: newDate,
          style: { backgroundColor: '#ffba17' },
          textStyle: { color: 'black' },
          containerStyle: [],
          allowDisabled: true,
        });
      } else if (monthArray[i] >= (parsedGoal / 3) && monthArray[i] < (parsedGoal / 3) * 2) {
        customDatesStyles.push({
          date: newDate,
          style: { backgroundColor: '#ffcc55' },
          textStyle: { color: 'black' },
          containerStyle: [],
          allowDisabled: true,
        });
      } else if (monthArray[i] < (parsedGoal / 3 && monthArray[i] > 0)) {
        customDatesStyles.push({
          date: newDate,
          style: { backgroundColor: '#ffe9b7' },
          textStyle: { color: 'black' },
          containerStyle: [],
          allowDisabled: true,
        });
      } else {
        customDatesStyles.push({
          date: newDate,
          style: { backgroundColor: '#fff5dd' },
          textStyle: { color: 'black' },
          containerStyle: [],
          allowDisabled: true,
        });
      }
    }
    return customDatesStyles;
  }

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      SecureStore.getItemAsync('dailyGoal').then((goal) => {
        const parsedGoal = parseInt(goal, 10);
        setDailyGoal(parsedGoal);
        getCustomStyling(currentYear, currentMonth, parsedGoal).then((customDatesStyles) => {
          setDatesStyles(customDatesStyles);
          setTimeout(() => {
            setIsLoading(false);
          }, 100);
        });
      });
    }, [searchMonth])
  );

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading]);

  if (isLoading) {
    fadeAnim.stopAnimation();
    fadeAnim.setValue(0);
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#23A0FF" />
      </View>
    );
  }

  return (
    <>
      {isFocus && (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <View style={[styles.CalendarPicker]}>
            <CalendarPicker
              onDateChange={onDateChange}
              initialDate={searchMonth.toDate()}
              textStyle={{ color: Colors[colorScheme].text }}
              todayBackgroundColor='#FFBC1F'
              dayTextStyle={{ color: 'black' }}
              borderColor={Colors[colorScheme].text}
              customDatesStyles={datesStyles}
              startFromMonday={true}
              onMonthChange={(date) => {
                setSearchMonth(moment(date));
              }}
            />
          </View>
        </Animated.View>
  )
      }
    </>
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
    flex: 1,
    marginTop: '10%',
  }
});
