import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';
import { Dropdown } from 'react-native-element-dropdown';
import DailyScreen from '../(stats)/DailyStats';
import WeeklyScreen from '../(stats)/WeeklyStats';
import MonthlyScreen from '../(stats)/MonthlyStats';
import YearlyScreen from '../(stats)/YearlyStats';
import DataScreen from '../(stats)/Data';
import moment from "moment";
moment.locale('en-gb'); 
import { updateDayData } from '../../../components/helpers/DayData'

var dropdownData = [
  { label: 'Daily', value: 'Daily Sunlight' },
  { label: 'Weekly', value: 'Weekly Sunlight' },
  { label: 'Monthly', value: 'Monthly Sunlight' },
  { label: 'Yearly', value: 'Yearly Sunlight' },
  { label: 'Data', value: 'Raw Data' },
];

export default function IndexScreen() {
  const colorScheme = useColorScheme();
  const [selectedItem, setSelectedItem] = useState(dropdownData.find(item => item.label === 'Weekly'));
  const [dropdownDataState, setDropdownDataState] = useState(dropdownData);
  const [selectedDate, setSelectedDate] = useState(moment().utcOffset('+12:00').format("YYYY:MM:DD"));
  const [dayData, setDayData] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [completedPercentage, setCompletedPercentage] = useState(0);
  const [notCompletedPercentage, setNotCompletedPercentage] = useState(100);

  const changeSelectedItem = async (item, date) => {
    setSelectedItem(item);
    setSelectedDate(date);
    await updateDayData(date).then((dayValues) => {
      const newDayData = dayValues[0];
      const newTotalTime = dayValues[1];
      const newCompletedPercentage = Math.floor(Math.min(newTotalTime / 120 * 100, 100));
      const newNotCompletedPercentage = 100 - newCompletedPercentage;
  
      setDayData(newDayData);
      setTotalTime(newTotalTime);
      setCompletedPercentage(newCompletedPercentage);
      setNotCompletedPercentage(newNotCompletedPercentage);
    });
  };

  const renderContent = () => {
    switch (selectedItem?.value) {
      case 'Daily Sunlight':
        return <DailyScreen selectedDate={selectedDate} dayDataInput={dayData} totalTimeInput={totalTime} completedPercentage={completedPercentage} notCompletedPercentage={notCompletedPercentage}/>;
      case 'Weekly Sunlight':
        return <WeeklyScreen selectedDate={selectedDate} changeSelectedItem={changeSelectedItem} dropdownData={dropdownData}/>;
      case 'Monthly Sunlight':
        return <MonthlyScreen selectedDate={selectedDate} changeSelectedItem={changeSelectedItem} dropdownData={dropdownData}/>;
      case 'Yearly Sunlight':
        return <YearlyScreen selectedDate={selectedDate} changeSelectedItem={changeSelectedItem} dropdownData={dropdownData}/>;
      case 'Raw Data':
        return <DataScreen/>;
      default:
        return <WeeklyScreen/>;
    }
  };

  useEffect(() => {
    setDropdownDataState(dropdownData.filter(item => item.label !== selectedItem.label));
  }, [selectedItem]);

  return (
    <View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
      <StatusBar barStyle={barStyle=Colors[colorScheme ?? 'light'].barStyle}/>
      <View style={styles.titleSpace}>
          <Text style={[styles.title, {color:Colors[colorScheme ?? 'light'].text},]}>{selectedItem?.value || "Select a page"}</Text>
      </View>
      <Dropdown
        style={[Dropdownstyles.dropdown, {backgroundColor: Colors[colorScheme ?? 'light'].buttonColor}]}
        iconColor={Colors[colorScheme ?? 'light'].text}
        containerStyle={[
          {backgroundColor: Colors[colorScheme ?? 'light'].buttonColor}, 
          {borderRadius: 8}, 
          {borderColor: Colors[colorScheme ?? 'light'].buttonColor},
          {marginTop: 5},
        ]}
        itemTextStyle={{color: Colors[colorScheme ?? 'light'].text}}
        placeholderStyle={{color: Colors[colorScheme ?? 'light'].text}}
        data={dropdownDataState}
        iconStyle={Dropdownstyles.dropdownIcon}
        labelField="label"
        valueField="value"
        placeholder={selectedItem?.label || "Select a page"}
        onChange={item => {
          setSelectedItem(item);
          setSelectedDate(moment().utcOffset('+12:00').format("YYYY:MM:DD"));
        }}
      />
        {renderContent()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'light',
  },
  titleSpace: {
    height: '10%',
  },
});

const Dropdownstyles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: '30%',
    borderRadius: 8,
    elevation: 1,
    paddingLeft: '5%'
  },
  dropdownIcon: {
    marginRight: '15%',
  },
  dropdownItem: {
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
  },
});