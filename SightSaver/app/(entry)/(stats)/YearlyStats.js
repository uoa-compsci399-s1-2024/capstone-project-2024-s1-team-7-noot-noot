import React, {useState, useEffect, useRef} from 'react';
import { Text, View, StyleSheet, Animated, ActivityIndicator} from 'react-native';
import * as Progress from 'react-native-progress';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';
import { getMonthData } from '../../../components/helpers/MonthlyData';
moment.locale('en-gb'); 
import moment from "moment";
import { TouchableOpacity } from 'react-native'; // Import the TouchableOpacity component
import { Ionicons } from '@expo/vector-icons';

const currentYear = moment().year();

function getTotalDays(month) {
  const totalDays = new Date(currentYear, month+1, 0).getDate(); // total number of days in the month
  //console.log("Total Days: ", totalDays);
  return totalDays; 
}

  //const searchMonth = moment(`${year}:${(month)}:${1}`, "YYYY:MM:DD");
async function getCompletedDays(year) {
  yearArray = new Array(12).fill(0);
  for (let i = 0; i < 12; i++) {
    const searchMonth = new Date(year, i, 1, 13); 
    const totalDays = getTotalDays(i);
    const monthArray = await getMonthData(searchMonth, totalDays);
    //console.log(monthArray)
    var completedDays = 0;
    for (let i of monthArray) {
      //console.log(i);
      if (i > 2) {
        completedDays += 1;
      }
    }
    //console.log('Completed Days:', completedDays);
    const progress = (completedDays / totalDays);
    yearArray[i] = [completedDays, totalDays, progress];
  }
  //console.log('Year array:', yearArray)
  return yearArray;

}
export default function YearlyScreen(selectedDate, changeSelectedItem, dropdownData) {
  const colorScheme = useColorScheme(); 
  const [isLoading, setIsLoading] = useState(true);
  const [January, setJanuary] = useState(0);
  const [February, setFebruary] = useState(0);
  const [March, setMarch] = useState(0);
  const [April, setApril] = useState(0);
  const [May, setMay] = useState(0);
  const [June, setJune] = useState(0);
  const [July, setJuly] = useState(0);
  const [August, setAugust] = useState(0);
  const [September, setSeptember] = useState(0);
  const [October, setOctober] = useState(0);
  const [November, setNovember] = useState(0);
  const [December, setDecember] = useState(0);
  const [searchYear, setSearchYear] = useState(moment(selectedDate, "YYYY:MM:DD").utcOffset('+12:00').format("YYYY"));
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // const goToNextYear = () => {
  //   setSearchYear(moment(searchYear, "YYYY:WW").add(1, 'years').format("YYYY"));
  //   setIsLoading(true);
  // };
  
  // const goToPreviousYear = () => {
  //   setSearchYear(moment(searchYear, "YYYY").subtract(1, 'years').format("YYYY"));
  //   setIsLoading(true);
  // };

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading]);
  useEffect(() => {
    getCompletedDays(searchYear).then((yearData) => {
      console.log(yearData);
      setJanuary((yearData[0]));
      setFebruary((yearData[1]));
      setMarch((yearData[2]));
      setApril((yearData[3]));
      setMay((yearData[4]));
      setJune((yearData[5]));
      setJuly((yearData[6]));
      setAugust((yearData[7]));
      setSeptember((yearData[8]));
      setOctober((yearData[9]));
      setNovember((yearData[10]));
      setDecember((yearData[11]));
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    });
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => getCompletedDays(2024)}> 
        <Text style={{color: Colors[colorScheme ?? 'light'].text}}>Yearly Stats</Text>
      </TouchableOpacity>
      <View style={styles.progressBars}>
          <Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Jan</Text>
          <Progress.Bar progress={January[2]} label={'January'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/>
          <Text style={styles.progressNum}>{January[0]}/{January[1]}</Text>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Feb</Text><Progress.Bar progress={February[2]} label={'February'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>{February[0]}/{February[1]}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Mar</Text><Progress.Bar progress={March[2]} label={'March'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>{March[0]}/{March[1]}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Apr</Text><Progress.Bar progress={April[2]} label={'April'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>{April[0]}/{April[1]}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>May</Text><Progress.Bar progress={May[2]} label={'May'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>{May[0]}/{May[1]}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Jun</Text><Progress.Bar progress={June[2]} label={'June'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>{June[0]}/{June[1]}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Jul</Text><Progress.Bar progress={July[2]} label={'July'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>{July[0]}/{July[1]}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Aug</Text><Progress.Bar progress={August[2]} label={'August'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>{August[0]}/{August[1]}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Sep</Text><Progress.Bar progress={September[2]} label={'September'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>{September[0]}/{September[1]}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Oct</Text><Progress.Bar progress={October[2]} label={'October'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>{October[0]}/{October[1]}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Nov</Text><Progress.Bar progress={November[2]} label={'November'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>{November[0]}/{November[1]}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Dec</Text><Progress.Bar progress={December[2]} label={'December'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>{December[0]}/{December[1]}</Text></View>
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    flex: 1,

  },
  progressBars: {
    width: '100%',
    marginLeft: '1%',
    justifyContent: 'column',
  },
  month: {
    marginLeft: 10,
    marginRight: 15,
  },
  progressNum: {
    alignSelf: 'center',
    color: 'black',
    marginTop: -20,
    marginBottom: 10,
  },
});