import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, Pressable, onPress, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import themeContext from '@/constants/themeContext';
import { StatusBar } from 'react-native';
import moment from "moment";
import { AntDesign } from '@expo/vector-icons';
var date = moment()
      .utcOffset('+12.00')
      .format("dddd Do MMMM");   ;
import { BarChart, LineChart, PieChart, PopulationPyramid } from 'react-native-gifted-charts';
const barData = [
  {value: 1.7, label: 'M',},
  {value: 1.1, label: 'T', frontColor: '#B28009'},
  {value: 1.5, label: 'W', frontColor: '#B28009'},
  {value: 2.05, label: 'T'},
  {value: 2.8, label: 'F', frontColor: '#B28009'},
  {value: 1.8, label: 'S'},
  {value: 1.2, label: 'S'},
];

const pieData = [
  {value: 70, color: '#FFBC1F'},
  {value: 30, color: '#F6D78D'}
];
export default function IndexScreen() {
  const theme = useContext(themeContext)
  const navigation = useNavigation()
  return (
    <View style={[styles.container, {backgroundColor:theme.backgroundColor}]}>
      <StatusBar barStyle={theme.barStyle}/>
      <View style={styles.logoSpace}>
          <Image source={theme.image} style={styles.imageStyle}/>
      </View>
      <View style={styles.titleSpace}>
          <Text style={[styles.title, {color:theme.color}]}>Weekly Sunlight</Text>
      </View>
      <View style={styles.dateSpace}>
          <Text style={{color:theme.color}}>{date}</Text>
      </View>
      <View style={styles.menuSpace}>
          <Pressable style={[styles.buttonStyle, {backgroundColor:theme.backgroundColor}, {borderColor:theme.color}]} onPress={() => navigation.navigate("learn")}>
              <Text style={[styles.text,{color:theme.color}]}>{title="Weekly "}<AntDesign name="down" size={10} style={{color:theme.color}} /></Text>
          </Pressable> 
      </View>
      <View style={styles.pieSpace}>
            <PieChart
                donut
                innerRadius={80}
                borderRadius={15}
                data={pieData}
                centerLabelComponent={() => {
                return <Text style={{fontSize: 30}}>70%</Text>;
                }}
            />
            </View>
            <View style={styles.barSpace}>
                < BarChart style={{textColor:theme.color}}
                    barWidth={22}
                    noOfSections={3}
                    barBorderRadius={8}
                    frontColor="#E6AA1F"
                    data={barData}
                    yAxisThickness={0}
                    xAxisThickness={0}
                />
            </View>
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
  logoSpace:{
    height: '10%',
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
    height:'30%',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  imageStyle: {
    width:205,
    height: 20,
    paddingHorizontal: 5,
    marginTop: 10,
  },
});