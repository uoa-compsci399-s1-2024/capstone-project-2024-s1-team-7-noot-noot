import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';


function getProgressData(completedDays, month) {
  const totalDays = new Date(2024, month, 0).getDate(); // total number of days in the month
  return (completedDays / totalDays);
}
// function getCompletedDays(month) {
//   return completedDays;
// }
function getTotalDays(month) {
  const totalDays = new Date(2024, month, 0).getDate(); // total number of days in the month
  return totalDays;
}
export default function YearlyScreen() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <View style={styles.progressBars}>
          <Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Jan</Text>
          <Progress.Bar progress={getProgressData(19,1)} label={'January'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/>
          <Text style={styles.progressNum}>19/{getTotalDays(1)}</Text>
      </View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Feb</Text><Progress.Bar progress={getProgressData(18,2)} label={'February'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>18/{getTotalDays(2)}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Mar</Text><Progress.Bar progress={getProgressData(25,3)} label={'March'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>25/{getTotalDays(3)}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Apr</Text><Progress.Bar progress={getProgressData(22,4)} label={'April'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>22/{getTotalDays(4)}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>May</Text><Progress.Bar progress={getProgressData(2,5)} label={'May'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>2/{getTotalDays(5)}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Jun</Text><Progress.Bar progress={getProgressData(0,6)} label={'June'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>-/{getTotalDays(6)}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Jul</Text><Progress.Bar progress={getProgressData(0,7)} label={'July'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>-/{getTotalDays(7)}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Aug</Text><Progress.Bar progress={getProgressData(0,8)} label={'August'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>-/{getTotalDays(8)}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Sep</Text><Progress.Bar progress={getProgressData(0,9)} label={'September'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>-{getTotalDays(9)}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Oct</Text><Progress.Bar progress={getProgressData(0,10)} label={'October'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>-/{getTotalDays(10)}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Nov</Text><Progress.Bar progress={getProgressData(0,11)} label={'November'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>-/{getTotalDays(11)}</Text></View>
      <View style={styles.progressBars}><Text style={[styles.month, {color: Colors[colorScheme ?? 'light'].text}]}>Dec</Text><Progress.Bar progress={getProgressData(0,12)} label={'December'} width= {350} height={20} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/><Text style={styles.progressNum}>-/{getTotalDays(12)}</Text></View>
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
    margin: '3%',
    width: '100%',
    flexDirection:"row",
  },
  month: {
    marginLeft: 10,
    marginRight: 15,
  },
  progressNum: {
    marginLeft: -200,
    color: 'black',
  },
});