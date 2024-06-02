import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Animated, ActivityIndicator, View, PanResponder } from 'react-native'; // Import PanResponder along with other components
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../../constants/Colors';
import { Text } from '../../../components/Themed';
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
  const [sensorId, setSensorId] = useState('');

  const onDateChange = (date) => {
    let finalDate = '';
    const formattedDate = moment(date, 'YYYY:MM:DD').format('YYYY:MM:DD');
  
    // Check if the formattedDate is within DST
    if (moment(formattedDate, "YYYY:MM:DD").isDST()) {
      finalDate = moment(formattedDate, 'YYYY:MM:DD').add(1, 'days').format('YYYY:MM:DD');
    } else {
      finalDate = moment(formattedDate, 'YYYY:MM:DD').format('YYYY:MM:DD');
    }
  
    changeSelectedItem(dropdownData.find(item => item.label === 'Daily'), finalDate);
  };
  

  function getTotalDays(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 10) {
          goToPreviousMonth();
        } else if (gestureState.dx < -10) {
          goToNextMonth();
        }
      },
    })
  ).current;
  
  const goToNextMonth = () => {
    setSearchMonth(prev => prev.clone().add(1, 'month'));
  };
  
  const goToPreviousMonth = () => {
    setSearchMonth(prev => prev.clone().subtract(1, 'month'));
  };

  async function getCustomStyling(year, month, parsedGoal, sensorId) {
    const customDatesStyles = [];
    const totalDays = getTotalDays(year, month);
    const monthArray = await getMonthData(searchMonth, totalDays, sensorId);
    for (let i = 0; i < totalDays; i++) {
      const newDate = new Date(year, month, i + 1, 13);
      if (monthArray[i] >= parsedGoal) {
        customDatesStyles.push({
          date: newDate,
          style: { backgroundColor: '#EEA700' },
          textStyle: { color: 'black' },
          containerStyle: [],
          allowDisabled: true,
        });
      } else if (monthArray[i] >= (parsedGoal / 2) && monthArray[i] < parsedGoal) {
        customDatesStyles.push({
          date: newDate,
          style: { backgroundColor: '#FFDB86' },
          textStyle: { color: 'black' },
          containerStyle: [],
          allowDisabled: true,
        });
      } else {
        customDatesStyles.push({
          date: newDate,
          style: { backgroundColor: '#FFECC0' },
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
      SecureStore.getItemAsync('sensorId').then((sensorId) => {
        setSensorId(sensorId);
        SecureStore.getItemAsync('dailyGoal').then((goal) => {
          const parsedGoal = parseInt(goal, 10);
          setDailyGoal(parsedGoal);
          getCustomStyling(currentYear, currentMonth, parsedGoal, sensorId).then((customDatesStyles) => {
            setDatesStyles(customDatesStyles);
            setTimeout(() => {
              setIsLoading(false);
            }, 100);
          });
        });
      });
    }, [searchMonth])
  );

  useEffect(() => {
    fadeAnim.stopAnimation();
    fadeAnim.setValue(0);
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
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
          <View style={[styles.CalendarPicker]} {...panResponder.panHandlers}>
            <CalendarPicker
              onDateChange={onDateChange}
              initialDate={searchMonth.toDate()}
              textStyle={{ color: Colors[colorScheme].text }}
              todayBackgroundColor='#FFBC1F'
              dayTextStyle={{ color: 'black' }}
              borderColor={Colors[colorScheme].text}
              customDatesStyles={datesStyles}
              dayLabelsWrapper={{ borderColor: Colors[colorScheme].chevron }}
              startFromMonday={true}
              nextTitle=' '
              previousTitle=' '
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
    width: '100%',
    opacity: 1,
    flex: 1,
    marginTop: '10%',
  }
});
