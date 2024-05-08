import { Text, View, StyleSheet, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { BarChart, EdgePosition, LineChart, PieChart, PopulationPyramid } from 'react-native-gifted-charts';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
//import ReactDOM from 'react-dom';
import moment from "moment";
moment.locale('en-gb'); 
import { updateDayData } from '../../../components/helpers/DayData'
      
export default function DailyScreen({selectedDate, dayDataInput, totalTimeInput, completedPercentageInput, notCompletedPercentageInput}) {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [searchDate, setSearchDate] = useState(selectedDate);
  const [date, setDate] = useState(moment(searchDate, "YYYY:MM:DD").utcOffset('+12:00').format("dddd Do MMMM"));
  const [completedPercentage, setCompletedPercentage] = useState(completedPercentageInput);
  const [notCompletedPercentage, setNotCompletedPercentage] = useState(notCompletedPercentageInput);
  const [dayData, setDayData] = useState(dayDataInput);
  const [totalTime, setTotalTime] = useState(totalTimeInput);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const goToNextDay = () => {
    setSearchDate(moment(searchDate, "YYYY:MM:DD").add(1, 'days').format("YYYY:MM:DD"));
    setDate(moment(date, "dddd Do MMMM").add(1, 'days').format("dddd Do MMMM"));
    setIsLoading(true);
  };
  
  const goToPreviousDay = () => {
    setSearchDate(moment(searchDate, "YYYY:MM:DD").subtract(1, 'days').format("YYYY:MM:DD"));
    setDate(moment(date, "dddd Do MMMM").subtract(1, 'days').format("dddd Do MMMM"));
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) {
      fadeAnim.stopAnimation();
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading]);

  useEffect(() => {
    updateDayData(searchDate).then((values) => {
      const newDayData = values[0];
      const newTotalTime = values[1];
      const newCompletedPercentage = Math.floor(Math.min(newTotalTime / 120 * 100, 100));
      const newNotCompletedPercentage = 100 - newCompletedPercentage;
  
      setDayData(newDayData);
      setTotalTime(newTotalTime);
      setCompletedPercentage(newCompletedPercentage);
      setNotCompletedPercentage(newNotCompletedPercentage);
  
      setIsLoading(false);
    });
  }, [searchDate]);

  if (isLoading) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <Text style={{color:Colors[colorScheme ?? 'light'].text}}>Loading...</Text>
      </View>
    );
  }

  var PieDay = [
    {value: completedPercentage, color: '#FFBC1F'},
    {value: notCompletedPercentage, color: '#F6D78D'}
  ];

  return (
    <Animated.View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}, {opacity: fadeAnim}]}>
      <View style={styles.dateSpace}>
        <Text style={[{color:Colors[colorScheme ?? 'light'].text}, {}]}>{date}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: '25%'}}>
        <Ionicons style={{ left: '-2%', position: 'absolute', opacity: 0.4  }} name="chevron-back" size={50} color={Colors[colorScheme ?? 'light'].text} onPress={goToPreviousDay} />
        <Ionicons style={{ right: '-2%', position: 'absolute', opacity: 0.4 }} name="chevron-forward" size={50} color={Colors[colorScheme ?? 'light'].text} onPress={goToNextDay} />
      </View>
      <View style={styles.pieSpace}>
        <PieChart style= {styles.PieChart}
          donut
          innerRadius={80}
          borderRadius={15}
          data={PieDay}
          innerCircleColor={Colors[colorScheme ?? 'light'].background}
          centerLabelComponent={() => {
            return (
              <Text style={{fontSize: 30, color:Colors[colorScheme ?? 'light'].text}}>{completedPercentage}%</Text>
            );
          }}
        />
      </View>
      <View style={styles.goal}>
        <Text style={{color:Colors[colorScheme ?? 'light'].text}}>{totalTime}/120 Minutes</Text>
      </View>
      <View style={styles.lineSpace}>
        <LineChart  
          yAxisThickness={0}
          noOfSections={1}
          stepValue={1}
          spacing={5}
          stepHeight={100}
          hideDataPoints
          xAxisLabelTextStyle={{color:Colors[colorScheme ?? 'light'].text, width:40}}
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
  );
}
const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
  },
  dateSpace:{
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
    width: '100%',
    alignSelf: 'center',
  },
  lineSpace: {
    marginTop: '10%',
    height: '25%',
    maxWidth: '90%',
  },
});