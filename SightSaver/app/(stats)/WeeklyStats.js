import { StyleSheet, Button, Pressable, onPress, SafeAreaView, Image } from 'react-native';
import React, {useState} from 'react';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../components/useColorScheme';
import { StatusBar } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

var date = moment()
      .utcOffset('+12.00')
      .format("dddd Do MMMM");   ;
import { BarChart, LineChart, PieChart, PopulationPyramid } from 'react-native-gifted-charts';
const pieData = [
  {value: 70, color: '#FFBC1F'},
  {value: 30, color: '#F6D78D'}
];

export default function WeeklyScreen() {
  const colorScheme = useColorScheme();

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
            <Text style={{color:Colors[colorScheme ?? 'light'].text}}>{date}</Text>
          </View>
          <View style={styles.pieSpace}>
            <PieChart style= {styles.PieChart}
              donut
              innerRadius={80}
              borderRadius={15}
              data={pieData}
              innerCircleColor={'#f2f2f2'}
              centerLabelComponent={() => {
                return <Text style={{fontSize: 30, color: 'black'}}>70%</Text>;
              }}
            />
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
              data={[{value: 1.7, label: 'M', frontColor: getColor(1.7), onPress: () => alert('Monday')},
                {value: 2.0, label: 'W', frontColor: getColor(2.0), onPress: () => alert('Wednesday')},
                {value: 1.3, label: 'T', frontColor: getColor(1.3), onPress: () => alert('Thursday')},
                {value: 2.8, label: 'F', frontColor: getColor(2.8), onPress: () => alert('Friday')},
                {value: 1.1, label: 'S', frontColor: getColor(1.1), onPress: () => alert('Saturday')},
                {value: 0.2, label: 'S', frontColor: getColor(0.2), onPress: () => alert('Sunday')},
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
            <Text style={{color:Colors[colorScheme ?? 'light'].text}}>{date}</Text>
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
          <View style={styles.barSpace}>

            <BarChart 
              barWidth={22}
              noOfSections={3}
              height={80}
              barBorderRadius={8}
              yAxisTextStyle={{color:'white'}}
              xAxisLabelTextStyle={{color:'white'}}
              stepValue={1}
              hideRules={true}
              data={[{value: 1.7, label: 'M', frontColor: getColor(1.7), onPress: () => alert('Monday')},
                {value: 2.0, label: 'W', frontColor: getColor(2.0), onPress: () => alert('Wednesday')},
                {value: 1.3, label: 'T', frontColor: getColor(1.3), onPress: () => alert('Thursday')},
                {value: 2.8, label: 'F', frontColor: getColor(2.8), onPress: () => alert('Friday')},
                {value: 1.1, label: 'S', frontColor: getColor(1.1), onPress: () => alert('Saturday')},
                {value: 0.2, label: 'S', frontColor: getColor(0.2), onPress: () => alert('Sunday')},
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateSpace:{
    height: '10%',
    textAlign: 'center',
    marginLeft: '22%',
    width: '100%',
  },
  pieSpace: {
    height: '40%',
    alignItems: 'center',
  },

  barSpace: {
    justifyContent: 'center',
    height: '30%',
  },
  imageStyle: {
    width:205,
    height: 20,
    paddingHorizontal: 5,
    marginTop: 10,
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    height: 1,
    width: '100%',
  },
  
});