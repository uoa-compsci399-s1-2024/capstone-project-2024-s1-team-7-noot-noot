import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';
import { Dropdown } from 'react-native-element-dropdown';
import DailyScreen from '../(stats)/DailyStats';
import WeeklyScreen from '../(stats)/WeeklyStats';
import MonthlyScreen from '../(stats)/MonthlyStats';
import YearlyScreen from '../(stats)/YearlyStats';

var dropdownData = [
  { label: 'Daily', value: 'Daily Sunlight' },
  { label: 'Weekly', value: 'Weekly Sunlight' },
  { label: 'Monthly', value: 'Monthly Sunlight' },
  { label: 'Yearly', value: 'Yearly Sunlight' },
];

export default function IndexScreen() {
  const colorScheme = useColorScheme();
  const [selectedItem, setSelectedItem] = useState(dropdownData.find(item => item.label === 'Weekly'));
  const [dropdownDataState, setDropdownDataState] = useState(dropdownData);

  const renderContent = () => {
    switch (selectedItem?.value) {
      case 'Daily Sunlight':
        return <DailyScreen/>;
      case 'Weekly Sunlight':
        return <WeeklyScreen/>;
      case 'Monthly Sunlight':
        return <MonthlyScreen/>;
      case 'Yearly Sunlight':
        return <YearlyScreen/>;
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
      <View style={styles.menuSpace}>
      <Dropdown
        style={[Dropdownstyles.dropdown, {backgroundColor: Colors[colorScheme ?? 'light'].buttonColor}]}
        iconColor={Colors[colorScheme ?? 'light'].text}
        itemTextStyle={{color: Colors[colorScheme ?? 'light'].text}}
        placeholderStyle={{color: Colors[colorScheme ?? 'light'].text}}
        itemContainerStyle={{backgroundColor: Colors[colorScheme ?? 'light'].background}}
        data={dropdownDataState}
        //maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={selectedItem?.label || "Select a page"}
        onChange={item => setSelectedItem(item)}
      />
      </View>
        {renderContent()}
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
    height: '10%',
  },
  menuSpace: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: 'white',
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    borderWidth: 1,
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    height: 1,
    width: '100%',
  },
  
});

const Dropdownstyles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: '25%',
    borderRadius: 8,
    padding: 12,
    elevation: 1,
  },
  dropdownIcon: {
    marginRight: 5,
  },
  dropdownItem: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});