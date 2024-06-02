import { Text, View, StyleSheet, Animated, ActivityIndicator, PanResponder, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BarChart, EdgePosition, LineChart, PieChart, PopulationPyramid } from 'react-native-gifted-charts';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import moment from "moment";
moment.locale('en-gb'); 
import { updateDayData } from '../../../components/helpers/DayData';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

export default function DailyScreen({selectedDate, dayDataInput, totalTimeInput, completedPercentageInput, notCompletedPercentageInput}) {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [searchDate, setSearchDate] = useState(selectedDate);
  const [date, setDate] = useState(moment(searchDate, "YYYY:MM:DD").utcOffset('+12:00').format("dddd Do MMMM"));
  const [completedPercentage, setCompletedPercentage] = useState(completedPercentageInput);
  const [notCompletedPercentage, setNotCompletedPercentage] = useState(notCompletedPercentageInput);
  const [dayData, setDayData] = useState(dayDataInput);
  const [totalTime, setTotalTime] = useState(totalTimeInput);
  const [sensorId, setSensorId] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [dailyGoal, setDailyGoal] = useState(2);
  const isFocus = useIsFocused();
  const today = useState(moment().utcOffset('+12:00').format("YYYY:MM:DD"));

  const resetDate = () => {
    if (searchDate != moment(today, "YYYY:MM:DD").utcOffset('+12:00').format("YYYY:MM:DD")) {
      setSearchDate(moment(today, "YYYY:MM:DD").utcOffset('+12:00').format("YYYY:MM:DD"));
      setDate(moment(today, "YYYY:MM:DD").utcOffset('+12:00').format("dddd Do MMMM"));
      fadeAnim.stopAnimation();
      fadeAnim.setValue(0);
      setIsLoading(true);
    }
  };

  const goToNextDay = () => {
    setSearchDate(prev => moment(prev, "YYYY:MM:DD").add(1, 'days').format("YYYY:MM:DD"));
    setDate(prev => moment(prev, "dddd Do MMMM").add(1, 'days').format("dddd Do MMMM"));
    fadeAnim.stopAnimation();
    fadeAnim.setValue(0);
    setIsLoading(true);
  };
  
  const goToPreviousDay = () => {
    setSearchDate(prev => moment(prev, "YYYY:MM:DD").subtract(1, 'days').format("YYYY:MM:DD"));
    setDate(prev => moment(prev, "dddd Do MMMM").subtract(1, 'days').format("dddd Do MMMM"));
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
        
        SecureStore.getItemAsync('sensorId').then((sensorId) => {
          setSensorId(sensorId);
          updateDayData(searchDate, sensorId).then((values) => {
            const newDayData = values[0];
            const newTotalTime = values[1];
            const newCompletedPercentage = Math.round(Math.min(newTotalTime / (parsedGoal * 60) * 100, 100));
            const newNotCompletedPercentage = 100 - newCompletedPercentage;
  
            setDayData(newDayData);
            setTotalTime(newTotalTime);
            setCompletedPercentage(newCompletedPercentage);
            setNotCompletedPercentage(newNotCompletedPercentage);
            
            setIsLoading(false);
          });
        });
      });
    }, [searchDate])
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 10) {
          goToPreviousDay();
        } else if (gestureState.dx < -10) {
          goToNextDay();
        }
      },
    })
  ).current;

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#23A0FF" />
      </View>
    );
  }

  const PieDay = [
    { value: completedPercentage, color: '#FFBC1F' },
    { value: notCompletedPercentage, color: '#F6D78D' }
  ];

  const [year, month, day] = searchDate.split(':');

  return (
    <>
      {isFocus && (
        <Animated.View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }, { opacity: fadeAnim }]}>
          <View {...panResponder.panHandlers} style={styles.dateSpace}>
            <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>{date}, {year}</Text>
            {date != moment(today, "YYYY:MM:DD").utcOffset('+12:00').format("dddd Do MMMM") && (
              <TouchableOpacity style={{marginLeft: '1%'}} onPress={resetDate}>
                <Ionicons name="return-down-back-outline" size={17} color={Colors[colorScheme ?? 'light'].subTitle} />
              </TouchableOpacity>
            )}
          </View>
          <View {...panResponder.panHandlers} style={styles.pieSpace}>
            <Ionicons 
              style={{ left: '0%', position: 'absolute', opacity: 0.4, top: '40%'}} 
              name="chevron-back" 
              size={50} 
              color={Colors[colorScheme ?? 'light'].chevron} 
            />
            <Ionicons 
              style={{ right: '0%', position: 'absolute', opacity: 0.4, top: '40%' }} 
              name="chevron-forward" 
              size={50} 
              color={Colors[colorScheme ?? 'light'].chevron} 
            />
            <PieChart
              donut
              innerRadius={80}
              borderRadius={15}
              data={PieDay}
              innerCircleColor={Colors[colorScheme ?? 'light'].background}
              centerLabelComponent={() => {
                return <Text style={{ fontSize: 30, color: Colors[colorScheme ?? 'light'].text }}>{completedPercentage}%</Text>;
              }}
            />
          </View>
          <View style={styles.goal}>
            <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>{totalTime}/{dailyGoal * 60} Minutes</Text>
          </View>
          <View style={styles.lineSpace}>
            <LineChart
              yAxisThickness={0}
              noOfSections={1}
              stepValue={1}
              spacing={5}
              stepHeight={100}
              hideDataPoints
              xAxisLabelTextStyle={{ color: Colors[colorScheme ?? 'light'].text, width: 40 }}
              data={dayData}
              hideRules={true}
              areaChart={true}
              startFillColor={'#FFBC1F'}
              endFillColor={'#F6D78D'}
              color={Colors[colorScheme ?? 'light'].background}
              xAxisColor={Colors[colorScheme ?? 'light'].background}
              hideYAxisText={true}
              initialSpacing={0}
            />
          </View>
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
  goal: {
    height: '5%',
    marginTop: '10%',
    width: '100%',
    alignSelf: 'center',
  },
  pieSpace: {
    height: '40%',
    minWidth: '100%',
    alignItems: 'center',
  },
  lineSpace: {
    marginTop: '10%',
    height: '25%',
    maxWidth: '90%',
    marginLeft: '5%',
  },
});
