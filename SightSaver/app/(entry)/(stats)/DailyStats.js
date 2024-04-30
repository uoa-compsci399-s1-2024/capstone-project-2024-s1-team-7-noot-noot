import { Text, View, StyleSheet, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';
import { BarChart, EdgePosition, LineChart, PieChart, PopulationPyramid } from 'react-native-gifted-charts';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
//import ReactDOM from 'react-dom';
import moment from "moment";

var dayData = [
  {value: 0, label:'8am'}, //8.00 
  {value: 0, }, //8.05
  {value: 0, }, //8.10
  {value: 0, }, //8.15
  {value: 0, }, //8.20
  {value: 0, }, //8.25
  {value: 0, }, //8.30
  {value: 0, }, //8.35
  {value: 0, }, //8.40
  {value: 0, }, //8.45
  {value: 0, }, //8.50
  {value: 0, }, //8.55
  {value: 0, label:'9am' },
  {value: 0, }, //9.05
  {value: 0, }, //9.10
  {value: 0, }, //9.15
  {value: 0, }, //9.20
  {value: 0, }, //9.25
  {value: 0, }, //9.30
  {value: 0, }, //9.35
  {value: 0, }, //9.40
  {value: 0, }, //9.45
  {value: 0, }, //9.50
  {value: 0, }, //9.55
  {value: 0, label:'10am' },
  {value: 0, }, //10.05
  {value: 0, }, //10.10
  {value: 0, }, //10.15
  {value: 0, }, //10.20
  {value: 0, }, //10.25
  {value: 0, }, //10.30
  {value: 0, }, //10.35
  {value: 0, }, //10.40
  {value: 0, }, //10.45
  {value: 0, }, //10.50
  {value: 0, }, //10.55
  {value: 0, label:'11am' },
  {value: 0, }, //11.05
  {value: 0, }, //11.10
  {value: 0, }, //11.15
  {value: 0, }, //11.20
  {value: 0, }, //11.25
  {value: 0, }, //11.30
  {value: 0, }, //11.35
  {value: 0, }, //11.40
  {value: 0, }, //11.45
  {value: 0, }, //11.50
  {value: 0, }, //11.55
  {value: 0, label:'12pm' },
  {value: 0, }, //12.05
  {value: 0, }, //12.10
  {value: 0, }, //12.15
  {value: 0, }, //12.20
  {value: 0, }, //12.25
  {value: 0, }, //12.30
  {value: 0, }, //12.35
  {value: 0, }, //12.40
  {value: 0, }, //12.45
  {value: 0, }, //12.50
  {value: 0, }, //12.55
  {value: 0, label:'1pm' },
  {value: 0, }, //1.05
  {value: 0, }, //1.10
  {value: 0, }, //1.15
  {value: 0, }, //1.20
  {value: 0, }, //1.25
  {value: 0, }, //1.30
  {value: 0, }, //1.35
  {value: 0, }, //1.40
  {value: 0, }, //1.45
  {value: 0, }, //1.50
  {value: 0, }, //1.55
  {value: 0, label:'2pm' },
  {value: 0, }, //2.05
  {value: 0, }, //2.10
  {value: 0, }, //2.15
  {value: 0, }, //2.20
  {value: 0, }, //2.25
  {value: 0, }, //2.30
  {value: 0, }, //2.35
  {value: 0, }, //2.40
  {value: 0, }, //2.45
  {value: 0, }, //2.50
  {value: 0, }, //2.55
  {value: 0, label:'3pm' },
  {value: 0, }, //2.10
  {value: 0, }, //2.15
  {value: 0, }, //2.20
  {value: 0, }, //2.25
  {value: 0, }, //2.30
  {value: 0, }, //2.35
  {value: 0, }, //2.40
  {value: 0, }, //2.45
  {value: 0, }, //2.50
  {value: 0, }, //2.55
  {value: 0, label:'4pm' },
  {value: 0, }, //4.10
  {value: 0, }, //4.15
  {value: 0, }, //4.20
  {value: 0, }, //4.25
  {value: 0, }, //4.30
  {value: 0, }, //4.35
  {value: 0, }, //4.40
  {value: 0, }, //4.45
  {value: 0, }, //4.50
  {value: 0, }, //4.55
  {value: 0, label:'5pm'},
  {value: 0, }, //5.10
  {value: 0, }, //5.15
  {value: 0, }, //5.20
  {value: 0, }, //5.25
  {value: 0, }, //5.30
  {value: 0, }, //5.35
  {value: 0, }, //5.40
  {value: 0, }, //5.45
  {value: 0, }, //5.50
  {value: 0, }, //5.55
  ];

var totalTime = 0;
var completedPercentage = 0;
var notCompletedPercentage = 100;

async function updateDayData(searchDate) {
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

      if (dateStr == searchDate) {
        totalTime += parseInt(minutes);

        const startTime = moment(timeStr, "HH:mm:ss");
        const endTime = moment(timeStr, "HH:mm:ss").add(minutes, 'minutes');
        
        const startIndex = Math.floor(((startTime.hours() - 8) * 60 + startTime.minutes()) / 5);
        const endIndex = Math.ceil(((endTime.hours() - 8) * 60 + endTime.minutes()) / 5);
        
        for (let index = startIndex; index < endIndex; index++) {
          if (index >= 0 && index < dayData.length) {
            dayData[index].value = 1;
          }
        }
      }
    }
  }
}
      
export default function DailyScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchDate, setSearchDate] = useState(moment().utcOffset('+12:00').format("YYYY:MM:DD"));
  const [date, setDate] = useState(moment().utcOffset('+12:00').format("dddd Do MMMM"));

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
    totalTime = 0;
    dayData = [
      {value: 0, label:'8am'}, //8.00 
      {value: 0, }, //8.05
      {value: 0, }, //8.10
      {value: 0, }, //8.15
      {value: 0, }, //8.20
      {value: 0, }, //8.25
      {value: 0, }, //8.30
      {value: 0, }, //8.35
      {value: 0, }, //8.40
      {value: 0, }, //8.45
      {value: 0, }, //8.50
      {value: 0, }, //8.55
      {value: 0, label:'9am' },
      {value: 0, }, //9.05
      {value: 0, }, //9.10
      {value: 0, }, //9.15
      {value: 0, }, //9.20
      {value: 0, }, //9.25
      {value: 0, }, //9.30
      {value: 0, }, //9.35
      {value: 0, }, //9.40
      {value: 0, }, //9.45
      {value: 0, }, //9.50
      {value: 0, }, //9.55
      {value: 0, label:'10am' },
      {value: 0, }, //10.05
      {value: 0, }, //10.10
      {value: 0, }, //10.15
      {value: 0, }, //10.20
      {value: 0, }, //10.25
      {value: 0, }, //10.30
      {value: 0, }, //10.35
      {value: 0, }, //10.40
      {value: 0, }, //10.45
      {value: 0, }, //10.50
      {value: 0, }, //10.55
      {value: 0, label:'11am' },
      {value: 0, }, //11.05
      {value: 0, }, //11.10
      {value: 0, }, //11.15
      {value: 0, }, //11.20
      {value: 0, }, //11.25
      {value: 0, }, //11.30
      {value: 0, }, //11.35
      {value: 0, }, //11.40
      {value: 0, }, //11.45
      {value: 0, }, //11.50
      {value: 0, }, //11.55
      {value: 0, label:'12pm' },
      {value: 0, }, //12.05
      {value: 0, }, //12.10
      {value: 0, }, //12.15
      {value: 0, }, //12.20
      {value: 0, }, //12.25
      {value: 0, }, //12.30
      {value: 0, }, //12.35
      {value: 0, }, //12.40
      {value: 0, }, //12.45
      {value: 0, }, //12.50
      {value: 0, }, //12.55
      {value: 0, label:'1pm' },
      {value: 0, }, //1.05
      {value: 0, }, //1.10
      {value: 0, }, //1.15
      {value: 0, }, //1.20
      {value: 0, }, //1.25
      {value: 0, }, //1.30
      {value: 0, }, //1.35
      {value: 0, }, //1.40
      {value: 0, }, //1.45
      {value: 0, }, //1.50
      {value: 0, }, //1.55
      {value: 0, label:'2pm' },
      {value: 0, }, //2.05
      {value: 0, }, //2.10
      {value: 0, }, //2.15
      {value: 0, }, //2.20
      {value: 0, }, //2.25
      {value: 0, }, //2.30
      {value: 0, }, //2.35
      {value: 0, }, //2.40
      {value: 0, }, //2.45
      {value: 0, }, //2.50
      {value: 0, }, //2.55
      {value: 0, label:'3pm' },
      {value: 0, }, //2.10
      {value: 0, }, //2.15
      {value: 0, }, //2.20
      {value: 0, }, //2.25
      {value: 0, }, //2.30
      {value: 0, }, //2.35
      {value: 0, }, //2.40
      {value: 0, }, //2.45
      {value: 0, }, //2.50
      {value: 0, }, //2.55
      {value: 0, label:'4pm' },
      {value: 0, }, //4.10
      {value: 0, }, //4.15
      {value: 0, }, //4.20
      {value: 0, }, //4.25
      {value: 0, }, //4.30
      {value: 0, }, //4.35
      {value: 0, }, //4.40
      {value: 0, }, //4.45
      {value: 0, }, //4.50
      {value: 0, }, //4.55
      {value: 0, label:'5pm'},
      {value: 0, }, //5.10
      {value: 0, }, //5.15
      {value: 0, }, //5.20
      {value: 0, }, //5.25
      {value: 0, }, //5.30
      {value: 0, }, //5.35
      {value: 0, }, //5.40
      {value: 0, }, //5.45
      {value: 0, }, //5.50
      {value: 0, }, //5.55
      ];
    updateDayData(searchDate).then(() => setIsLoading(false));
  }, [searchDate]);

  const colorScheme = useColorScheme();

  if (isLoading) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <Text style={{color:Colors[colorScheme ?? 'light'].text}}>Loading...</Text>
      </View>
    );
  }

  completedPercentage = Math.floor(Math.min(totalTime/120*100, 100))
  notCompletedPercentage = 100 - completedPercentage;

  var PieDay = [
    {value: completedPercentage, color: '#FFBC1F'},
    {value: notCompletedPercentage, color: '#F6D78D'}
  ];

  if (colorScheme == 'light') {
    return (
      <View styles={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
        <View style={styles.dateSpace}>
          <Ionicons name="chevron-back" size={20} color="black" onPress={goToPreviousDay} />
          <Text style={[{color:Colors[colorScheme ?? 'light'].text}, {}]}>{date}</Text>
          <Ionicons name="chevron-forward" size={20} color="black" onPress={goToNextDay} />
        </View>
        <View style={styles.pieSpace}>
          <PieChart style= {styles.PieChart}
            donut
            innerRadius={80}
            borderRadius={15}
            data={PieDay}
            innerCircleColor={'#f2f2f2'}
            centerLabelComponent={() => {
              return (
                <Text style={{fontSize: 30, color: 'black'}}>{completedPercentage}%</Text>
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
          xAxisLabelTextStyle={{color:'black', width:40}}
          data={dayData}
          hideRules={true}
          areaChart={true}
          startFillColor={'#FFBC1F'}
          endFillColor={'#F6D78D'}
          color={'#f2f2f2'}
          xAxisColor={'#f2f2f2'}
          hideYAxisText={true}
          initialSpacing={0}
          />
        </View>
      </View>
    );
  }
  else {  
    return (
      <View styles={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
        <View style={styles.dateSpace}>
          <Button title="Previous Day" onPress={goToPreviousDay} />
          <Text style={{color:Colors[colorScheme ?? 'light'].text}}>{date}</Text>
          <Button title="Next Day" onPress={goToNextDay} />
        </View>
        <View style={styles.pieSpace}>
          <PieChart style= {styles.PieChart}
            donut
            innerRadius={80}
            borderRadius={15}
            data={PieDay}
            innerCircleColor={'#404040'}
            centerLabelComponent={() => {
              return (
                <Text style={{fontSize: 30, color: 'white'}}>60%</Text>
              );
            }}
            />
        </View>
        <View style={styles.goal}>
          <Text style={{color:Colors[colorScheme ?? 'light'].text}}>72/120 Minutes</Text>
        </View>
        <View style={styles.lineSpace}>
          <LineChart  
            yAxisThickness={0}
            noOfSections={1}
            stepValue={1}
            spacing={5}
            stepHeight={100}
            hideDataPoints
            xAxisLabelTextStyle={{color:'white', width:40}}
            data={dayData}
            hideRules={true}
            areaChart={true}
            startFillColor={'#FFBC1F'}
            endFillColor={'#F6D78D'}
            color={'#404040'}
            xAxisColor={'#404040'}
            hideYAxisText={true}
            initialSpacing={0}
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
    flexDirection: 'row',
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
  lineSpace: {
    marginTop: '10%',
    maxWidth: '90%',
    height: '25%',
  },
});