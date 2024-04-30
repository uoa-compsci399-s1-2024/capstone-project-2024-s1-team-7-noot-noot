import { StyleSheet, Button, Pressable, onPress, SafeAreaView, Image } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Text, View } from '../../../components/Themed';
import moment from "moment";
import Colors from '../../../constants/Colors';
import { useColorScheme } from '../../../components/useColorScheme';
import * as FileSystem from 'expo-file-system';

var searchDate = moment()
      .utcOffset('+12.00')
      .format("dddd Do MMMM");   ;
import { BarChart, LineChart, PieChart, PopulationPyramid } from 'react-native-gifted-charts';
const pieData = [
  {value: 70, color: '#FFBC1F'},
  {value: 30, color: '#F6D78D'}
];

async function updateWeekData(searchDate) {
  // Initialize an array to store the total time for each day of the week
  const weekData = new Array(7).fill(0);

  // Read the file
  const fileUri = FileSystem.documentDirectory + 'dummyData.txt';
  const data = await FileSystem.readAsStringAsync(fileUri);
  const lines = data.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim(); // Remove leading and trailing spaces
    
    if (trimmedLine.length > 1) {
      const parts = trimmedLine.split(' ');
      const dateStr = parts[0];
      const timeStr = parts[1];
      const minutes = parts[2];

      // Parse the searchDate string into a moment object
      const date = moment(dateStr, "YYYY:MM:DD");

      // Check if the searchDate is within the same week as the search searchDate
      if (date.isSame(date, 'week')) {
        // Add the minutes to the correct day of the week
        const dayOfWeek = date.day();
        weekData[dayOfWeek] += parseInt(minutes) / 60; // Convert minutes to hours
      }
    }
  }
  return weekData;
}

export default function WeeklyScreen() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [monday, setMonday] = useState(0);
  const [tuesday, setTuesday] = useState(0);
  const [wednesday, setWednesday] = useState(0);
  const [thursday, setThursday] = useState(0);
  const [friday, setFriday] = useState(0);
  const [saturday, setSaturday] = useState(0);
  const [sunday, setSunday] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const weekData = await updateWeekData(searchDate);
      setMonday((weekData[0]));
      setTuesday((weekData[1]));
      setWednesday((weekData[2]));
      setThursday((weekData[3]));
      setFriday((weekData[4]));
      setSaturday((weekData[5]));
      setSunday((weekData[6]));
      setTotalHours((weekData[0] + weekData[1] + weekData[2] + weekData[3] + weekData[4] + weekData[5] + weekData[6]).toFixed(1));
      setIsLoading(false);
    }
  
    fetchData();
  });

  if (isLoading) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <Text style={{color:Colors[colorScheme ?? 'light'].text}}>Loading...</Text>
      </View>
    );
  }

  function getColor(value) {
    if (value >= 2) {
      return '#B28009';
    } else {
      return '#E6AA1F';
    }
  }
  if (colorScheme == 'light') {
      return (
        <View styles={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
          <View style={styles.dateSpace}>
            <Text style={{color:Colors[colorScheme ?? 'light'].text}}>{searchDate}</Text>
          </View>
          <View style={styles.pieSpace}>
            <PieChart style= {styles.PieChart}
              donut
              innerRadius={80}
              borderRadius={15}
              data={pieData}
              innerCircleColor={'#f2f2f2'}
              centerLabelComponent={() => {
                return <Text style={{fontSize: 30, color: 'black'}}>{Math.floor(Math.min(totalHours/14*100, 100))}%</Text>;
              }}
            />
          </View>
          <View style={styles.goal}>
            <Text style={{color:Colors[colorScheme ?? 'light'].text}}>{totalHours}/14 Hours</Text>
          </View>
          <View style={styles.barSpace}>
            <BarChart 
              barWidth={22}
              noOfSections={3}
              height={80}
              barBorderRadius={8}
              yAxisTextStyle={{color:'black'}}
              xAxisLabelTextStyle={{color:'black'}}
              stepValue={1}
              hideRules={true}
              data={[
                {value: monday, label: 'Mo', frontColor: getColor(monday), onPress: () => alert('Monday')},
                {value: tuesday, label: 'Tu', frontColor: getColor(tuesday), onPress: () => alert('Tuesday')},
                {value: wednesday, label: 'We', frontColor: getColor(wednesday), onPress: () => alert('Wednesday')},
                {value: thursday, label: 'Th', frontColor: getColor(thursday), onPress: () => alert('Thursday')},
                {value: friday, label: 'Fr', frontColor: getColor(friday), onPress: () => alert('Friday')},
                {value: saturday, label: 'Sa', frontColor: getColor(saturday), onPress: () => alert('Saturday')},
                {value: sunday, label: 'Su', frontColor: getColor(sunday), onPress: () => alert('Sunday')},
              ]}
              yAxisThickness={0}
              xAxisThickness={0}
              showReferenceLine1={true}
              referenceLine1Position={2}
              referenceLine1Config={{
                color: '#B28009',
              }}
            />
          </View>
        </View>
      );
  }
  
  else {
   return (
        <View styles={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
          <View style={styles.dateSpace}>
            <Text style={{color:Colors[colorScheme ?? 'light'].text}}>{searchDate}</Text>
          </View>
          <View style={styles.pieSpace}>
            <PieChart style= {styles.PieChart}
              donut
              innerRadius={80}
              borderRadius={15}
              data={pieData}
              innerCircleColor={'#404040'}
              centerLabelComponent={() => {
                return <Text style={{fontSize: 30, color: 'white'}}>70%</Text>;
              }}
            />
          </View>
          <View style={styles.goal}>
            <Text style={{color:Colors[colorScheme ?? 'light'].text}}>9.8/14 Hours</Text>
          </View>
          <View style={styles.barSpace}>
            <BarChart 
              barWidth={22}
              noOfSections={3}
              height={100}
              barBorderRadius={8}
              yAxisTextStyle={{color:'white'}}
              xAxisLabelTextStyle={{color:'white'}}
              stepValue={1}
              hideRules={true}
              data={[
                {value: monday, label: 'Mo', frontColor: getColor(monday), onPress: () => alert('Monday')},
                {value: tuesday, label: 'Tu', frontColor: getColor(tuesday), onPress: () => alert('Tuesday')},
                {value: wednesday, label: 'We', frontColor: getColor(wednesday), onPress: () => alert('Wednesday')},
                {value: thursday, label: 'Th', frontColor: getColor(thursday), onPress: () => alert('Thursday')},
                {value: friday, label: 'Fr', frontColor: getColor(friday), onPress: () => alert('Friday')},
                {value: saturday, label: 'Sa', frontColor: getColor(saturday), onPress: () => alert('Saturday')},
                {value: sunday, label: 'Su', frontColor: getColor(sunday), onPress: () => alert('Sunday')},
              ]}
              yAxisThickness={0}
              xAxisThickness={0}
              showReferenceLine1={true}
              referenceLine1Position={2}
              referenceLine1Config={{
                color: '#F6D78D',
              }}
            />
          </View>
        </View>
      );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  dateSpace:{
    height: '5%',
    marginTop: '5%',
    width: '100%',
    alignSelf: 'center',
    marginBottom: '5%',
  },
  goal: {
    height: '5%',
    marginTop: '5%',
    width: '100%',
    alignSelf: 'center',
  },
  pieSpace: {
    height: '40%',
    width: '100%',
    alignSelf: 'center',
  },
  barSpace: {
    marginTop: '10%',
    width: '100%',
    height: '25%',
    right: '3%',
  },
  
});