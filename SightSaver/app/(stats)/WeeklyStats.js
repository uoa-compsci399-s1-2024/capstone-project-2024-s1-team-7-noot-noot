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
  return (
    <View styles={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
      <View style={styles.pieSpace}>
          { 

              <PieChart
                  donut
                  innerRadius={80}
                  borderRadius={15}
                  data={pieData}
                  centerLabelComponent={() => {
                  return <Text style={{fontSize: 30, color: 'black'}}>70%</Text>;
                  }}
              />
          }
        </View>
      
              <View style={styles.barSpace}>
                  < BarChart style={{textColor:Colors[colorScheme ?? 'light'].text}}
                      barWidth={22}
                      noOfSections={2}
                      height={80}
                      yAxisLabelTexts={['0', '2', '4']}
                      barBorderRadius={8}
                      frontColor="#E6AA1F"
                      data={[{value: 1.0, label: 'M',},
                            {value: 2.1, label: 'T', frontColor: '#B28009'},
                            {value: 2.0, label: 'W', frontColor: '#B28009'},
                            {value: 1.5, label: 'T'},
                            {value: 2.8, label: 'F', frontColor: '#B28009'},
                            {value: 0.8, label: 'S'},
                            {value: 0.2, label: 'S'},
                      ]}
                      yAxisThickness={0}
                      xAxisThickness={0}
                      showReferenceLine1
                      referenceLine1Position={4.9}
                      referenceLine1Config={{
                          color: '#B28009',
                      }}
                  />
              </View>
              <View style={[styles.separator, {backgroundColor: Colors[colorScheme ?? 'light'].seperator}]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'light',
  },
  titleSpace: {
    height: '7%',
  },
  dateSpace:{
    height: '3%',
  },
  menuSpace: {
    height: '8%',
    justifyContent: 'center',
  },
  pieSpace: {
    height:'40%',
    justifyContent: 'center',
  },
  barSpace: {
    justifyContent: 'center',
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