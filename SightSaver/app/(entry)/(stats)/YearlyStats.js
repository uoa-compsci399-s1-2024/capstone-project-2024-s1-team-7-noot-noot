import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View, StyleSheet, Animated, ActivityIndicator, Pressable } from 'react-native';
import * as Progress from 'react-native-progress';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';
import moment from "moment";
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
import { getMonthData } from '../../../components/helpers/MonthlyData';

moment.locale('en-gb');

export default function YearlyScreen({ selectedDate, changeSelectedItem, dropdownData }) {
  const colorScheme = useColorScheme(); 
  const [isLoading, setIsLoading] = useState(true);
  const [yearData, setYearData] = useState(Array(12).fill([0, 0, 0]));
  const [searchYear, setSearchYear] = useState(moment(selectedDate, "YYYY:MM:DD").utcOffset('+12:00').format("YYYY"));
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [dailyGoal, setDailyGoal] = useState(2);

  function getTotalDays(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  async function getCompletedDays(year, parsedGoal) {
    const yearArray = new Array(12).fill(0).map(() => [0, 0, 0]);
    
    try {
      const promises = Array.from({ length: 12 }, (_, month) => getMonthData(new Date(year, month), getTotalDays(year, month)));
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

  const goToNextYear = () => {
    setSearchYear(moment(searchYear, "YYYY").add(1, 'years').format("YYYY"));
    fadeAnim.stopAnimation();
    fadeAnim.setValue(0);
    setIsLoading(true);
  };

  const goToPreviousYear = () => {
    setSearchYear(moment(searchYear, "YYYY").subtract(1, 'years').format("YYYY"));
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

      SecureStore.getItemAsync('dailyGoal').then((goal) => {
        const parsedGoal = parseInt(goal, 10);
        setDailyGoal(parsedGoal);

        getCompletedDays(searchYear, parsedGoal).then((yearData) => {
          setYearData(yearData);
          setIsLoading(false);
        });
      });
    }, [searchYear])
  );

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
    <Animated.View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }, { opacity: fadeAnim }]}>
      <View style={styles.dateSpace}>
        <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>{`${searchYear}`}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: '25%' }}>
        <Ionicons 
          style={{ left: '-23%', position: 'absolute', opacity: 0.4  }} 
          name="chevron-back" 
          size={50} 
          color={Colors[colorScheme ?? 'light'].text} 
          onPress={goToPreviousYear} 
        />
        <Ionicons 
          style={{ right: '-23%', position: 'absolute', opacity: 0.4 }} 
          name="chevron-forward" 
          size={50} 
          color={Colors[colorScheme ?? 'light'].text} 
          onPress={goToNextYear} 
        />
      </View>
      {yearData.map((month, index) => (
        <View style={styles.progressBars} key={index}>
          <Pressable onPress={() => {
            onDateChange(getMonthofYear(searchYear, index));
          }}>
            <Progress.Bar progress={month[2]} width={250} height={25} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'} />
            <Text style={[styles.text, { color: Colors[colorScheme ?? 'light'].text }]}>{`${moment().month(index).format('MMMM')} ${month[0]}/${month[1]}`}</Text>
          </Pressable>
        </View>
      ))}
    </Animated.View>
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
