import { StyleSheet, Animated, ActivityIndicator, PanResponder, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View } from '../../../components/Themed';
import moment from "moment";
moment.locale('en-gb'); 
import Colors from '../../../constants/Colors';
import { useColorScheme } from '../../../components/useColorScheme';
import { updateWeekData } from '../../../components/helpers/WeekData';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

export default function WeeklyScreen({ selectedDate, changeSelectedItem, dropdownData }) {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [monday, setMonday] = useState(0);
  const [tuesday, setTuesday] = useState(0);
  const [wednesday, setWednesday] = useState(0);
  const [thursday, setThursday] = useState(0);
  const [friday, setFriday] = useState(0);
  const [saturday, setSaturday] = useState(0);
  const [sunday, setSunday] = useState(0);
  const [searchWeek, setSearchWeek] = useState(moment(selectedDate, "YYYY:MM:DD").utcOffset('+12:00').format("YYYY:WW"));
  const [totalHours, setTotalHours] = useState(0);
  const [completedPercentage, setCompletedPercentage] = useState(0);
  const [notCompletedPercentage, setNotCompletedPercentage] = useState(100);
  const [sensorId, setSensorId] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [dailyGoal, setDailyGoal] = useState(2);
  const isFocus = useIsFocused();
  const today = useState(moment().utcOffset('+12:00').format("YYYY:WW"));

  const onDateChange = (date) => {
    changeSelectedItem(dropdownData.find(item => item.label === 'Daily'), date);
  };  

  function getDateOfWeek(week, year, dayIndex) {
    const adjustedDayIndex = (dayIndex + 1) % 7;
    const date = moment().year(year).week(week).day(adjustedDayIndex);
    return date.format('YYYY:MM:DD');
  }

  const resetDate = () => {
    if (searchWeek != moment(today, "YYYY:MM:DD").utcOffset('+12:00').format("YYYY:WW")) {
      setSearchWeek(moment(today, "YYYY:WW").utcOffset('+12:00').format("YYYY:WW"));
      fadeAnim.stopAnimation();
      fadeAnim.setValue(0);
      setIsLoading(true);
    }
  };

  const goToNextWeek = () => {
    setSearchWeek(prev => moment(prev, "YYYY:WW").add(1, 'weeks').format("YYYY:WW"));
    fadeAnim.stopAnimation();
    fadeAnim.setValue(0);
    setIsLoading(true);
  };

  const goToPreviousWeek = () => {
    setSearchWeek(prev => moment(prev, "YYYY:WW").subtract(1, 'weeks').format("YYYY:WW"));
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
          updateWeekData(searchWeek, sensorId).then((weekData) => {;
            const newTotalTime = (weekData[0] + weekData[1] + weekData[2] + weekData[3] + weekData[4] + weekData[5] + weekData[6]).toFixed(1);
            const newCompletedPercentage = Math.round(Math.min(newTotalTime / (parsedGoal * 7) * 100, 100));
            const newNotCompletedPercentage = 100 - newCompletedPercentage;

            setMonday(weekData[0]);
            setTuesday(weekData[1]);
            setWednesday(weekData[2]);
            setThursday(weekData[3]);
            setFriday(weekData[4]);
            setSaturday(weekData[5]);
            setSunday(weekData[6]);
            setTotalHours(newTotalTime);
            setCompletedPercentage(newCompletedPercentage);
            setNotCompletedPercentage(newNotCompletedPercentage);

            setIsLoading(false);
          });
        });
      });
    }, [searchWeek])
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 10) {
          goToPreviousWeek();
        } else if (gestureState.dx < -10) {
          goToNextWeek();
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

  var pieData = [
    { value: completedPercentage, color: '#FFBC1F' },
    { value: notCompletedPercentage, color: '#F6D78D' }
  ];

  function getColor(value) {
    return value >= 2 ? '#B28009' : '#E6AA1F';
  }

  const [year, week] = searchWeek.split(':');
    // Calculate start and end dates of the week
  const startDate = moment().year(year).isoWeek(week).startOf('isoWeek').format('D MMMM YYYY');
  const endDate = moment().year(year).isoWeek(week).endOf('isoWeek').format('D MMMM YYYY');

  return (
    <>
      {isFocus && (
        <Animated.View {...panResponder.panHandlers} style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }, { opacity: fadeAnim }]}>
          <View style={styles.dateSpace}>
            <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>{`${startDate} - ${endDate}`}</Text>
            {searchWeek != moment(today, "YYYY:WW").utcOffset('+12:00').format("YYYY:WW") && (
              <TouchableOpacity style={{marginLeft: '1%'}} onPress={resetDate}>
                <Ionicons name="return-down-back-outline" size={17} color={Colors[colorScheme ?? 'light'].subTitle} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.pieSpace}>
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
              data={pieData}
              innerCircleColor={Colors[colorScheme ?? 'light'].background}
              centerLabelComponent={() => {
                return <Text style={{ fontSize: 30, color: Colors[colorScheme ?? 'light'].text }}>{completedPercentage}%</Text>;
              }}
            />
          </View>
          <View style={styles.goal}>
            <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>{totalHours}/{dailyGoal * 7} Hours</Text>
          </View>
          <View style={styles.barSpace}>
            <BarChart
              barWidth={22}
              noOfSections={4}
              height={100}
              barBorderRadius={8}
              yAxisTextStyle={{ color: Colors[colorScheme ?? 'light'].text }}
              xAxisLabelTextStyle={{ color: Colors[colorScheme ?? 'light'].text }}
              stepValue={1}
              hideRules={true}
              data={[
                { value: monday, label: 'Mo', frontColor: getColor(monday), onPress: () => { onDateChange(getDateOfWeek(week, year, 0)) } },
                { value: tuesday, label: 'Tu', frontColor: getColor(tuesday), onPress: () => { onDateChange(getDateOfWeek(week, year, 1)) } },
                { value: wednesday, label: 'We', frontColor: getColor(wednesday), onPress: () => { onDateChange(getDateOfWeek(week, year, 2)) } },
                { value: thursday, label: 'Th', frontColor: getColor(thursday), onPress: () => { onDateChange(getDateOfWeek(week, year, 3)) } },
                { value: friday, label: 'Fr', frontColor: getColor(friday), onPress: () => { onDateChange(getDateOfWeek(week, year, 4)) } },
                { value: saturday, label: 'Sa', frontColor: getColor(saturday), onPress: () => { onDateChange(getDateOfWeek(week, year, 5)) } },
                { value: sunday, label: 'Su', frontColor: getColor(sunday), onPress: () => { onDateChange(getDateOfWeek(week, year, 6)) } },
              ]}
              yAxisThickness={0}
              xAxisThickness={0}
              showReferenceLine1={true}
              referenceLine1Position={dailyGoal}
              referenceLine1Config={{
                color: '#23A0FF',
              }}
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
  barSpace: {
    flex:1,
    marginTop: '10%',
    width: '100%',
    height: '25%',
    right: '3%',
    // marginLeft: '12.5%',
    alignSelf: 'center',
  },
});
