import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View, StyleSheet, Animated, ActivityIndicator, Pressable, PanResponder, TouchableOpacity, useWindowDimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';
import moment from "moment";
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { getMonthData } from '../../../components/helpers/MonthlyData';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

moment.locale('en-gb');

export default function YearlyScreen({ selectedDate, changeSelectedItem, dropdownData }) {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [yearData, setYearData] = useState(Array(12).fill([0, 0, 0]));
  const [searchYear, setSearchYear] = useState(moment(selectedDate, "YYYY:MM:DD").utcOffset('+12:00').format("YYYY"));
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [dailyGoal, setDailyGoal] = useState(2);
  const isFocus = useIsFocused();
  const [sensorId, setSensorId] = useState('');
  const { height, width } = useWindowDimensions();

  function getTotalDays(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  async function getCompletedDays(year, parsedGoal, sensorId) {
    const yearArray = new Array(12).fill(0).map(() => [0, 0, 0]);

    try {
      const promises = Array.from({ length: 12 }, (_, month) => getMonthData(new Date(year, month), getTotalDays(year, month), sensorId));
      const allMonthData = await Promise.all(promises);

      allMonthData.forEach((monthData, month) => {
        const totalDays = getTotalDays(year, month);
        const completedDays = monthData.filter(hours => hours >= parsedGoal).length;
        const progress = completedDays / totalDays;
        yearArray[month] = [completedDays, totalDays, progress];
      });

    } catch (error) {
      console.error("Failed to read data file:", error);
      return yearArray;
    }

    return yearArray;
  }

  const onDateChange = (date) => {
    changeSelectedItem(dropdownData.find(item => item.label === 'Monthly'), date);
  };

  function getMonthofYear(year, monthIndex) {
    const date = moment().year(year).month(monthIndex);
    return date.format('YYYY:MM');
  }

  const resetDate = () => {
    if (searchYear != moment(selectedDate, "YYYY:MM:DD").utcOffset('+12:00').format("YYYY")) {
      setSearchYear(moment(selectedDate, "YYYY:MM:DD").utcOffset('+12:00').format("YYYY"));
      fadeAnim.stopAnimation();
      fadeAnim.setValue(0);
      setIsLoading(true);
    }
  };

  const goToNextYear = () => {
    setSearchYear(prev => moment(prev, "YYYY").add(1, 'years').format("YYYY"));
    fadeAnim.stopAnimation();
    fadeAnim.setValue(0);
    setIsLoading(true);
  };

  const goToPreviousYear = () => {
    setSearchYear(prev => moment(prev, "YYYY").subtract(1, 'years').format("YYYY"));
    fadeAnim.stopAnimation();
    fadeAnim.setValue(0);
    setIsLoading(true);
  };

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

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      SecureStore.getItemAsync('sensorId').then((sensorId) => {
        setSensorId(sensorId);

        SecureStore.getItemAsync('dailyGoal').then((goal) => {
          const parsedGoal = parseInt(goal, 10);
          setDailyGoal(parsedGoal);

          getCompletedDays(searchYear, parsedGoal, sensorId).then((yearData) => {
            setYearData(yearData);
            setIsLoading(false);
          });
        });
      });
    }, [searchYear])
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 10) {
          goToPreviousYear();
        } else if (gestureState.dx < -10) {
          goToNextYear();
        }
      },
    })
  ).current;

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
        <Animated.View {...panResponder.panHandlers} style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }, { opacity: fadeAnim }]}>
          <View style={styles.dateSpace}>
            <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>{`${searchYear}`}</Text>
            {searchYear != moment(selectedDate, "YYYY:MM:DD").utcOffset('+12:00').format("YYYY") && (
              <TouchableOpacity style={{marginLeft: '1%'}} onPress={resetDate}>
                <Ionicons name="refresh" size={15} color={Colors[colorScheme ?? 'light'].text} />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: '25%', minWidth: '100%' }}>
            <Ionicons 
              style={{ left: '0%', position: 'absolute', opacity: 0.4  }} 
              name="chevron-back" 
              size={50} 
              color={Colors[colorScheme ?? 'light'].chevron} 
            />
            <Ionicons 
              style={{ right: '0%', position: 'absolute', opacity: 0.4 }} 
              name="chevron-forward" 
              size={50} 
              color={Colors[colorScheme ?? 'light'].chevron} 
            />
          </View>
          {yearData.map((month, index) => (
            <View style={styles.progressBars} key={index}>
              <Pressable onPress={() => {
                onDateChange(getMonthofYear(searchYear, index));
              }}>
                <Progress.Bar progress={month[2]} width={width*0.75} height={height*0.03} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'} />
                <Text style={[styles.text, { color: Colors[colorScheme ?? 'light'].text }]}>{`${moment().month(index).format('MMMM')} ${month[0]}/${month[1]}`}</Text>
              </Pressable>
            </View>
          ))}
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
  },
  dateSpace: {
    height: '5%',
    marginTop: '5%',
    width: '100%',
    alignSelf: 'center',
    marginBottom: '5%',
    flexDirection: 'row',
  },
  progressBars: {
    height: '7%',
    width: '100%',
    alignSelf: 'center',
  },
  text: {
    position: 'absolute',
    marginLeft: '3%',
    marginTop: '1.4%',
  },
});
