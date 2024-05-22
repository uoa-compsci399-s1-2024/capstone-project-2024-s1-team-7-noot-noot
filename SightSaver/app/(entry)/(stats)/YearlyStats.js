import React, {useState, useEffect, useRef} from 'react';
import { Text, View, StyleSheet, Animated, ActivityIndicator, Pressable} from 'react-native';
import * as Progress from 'react-native-progress';
import { useColorScheme } from '../../../components/useColorScheme';
import Colors from '../../../constants/Colors';
import { getMonthData } from '../../../components/helpers/MonthlyData';
moment.locale('en-gb'); 
import moment from "moment";
import { TouchableOpacity } from 'react-native'; // Import the TouchableOpacity component
import { Ionicons } from '@expo/vector-icons';

export default function YearlyScreen({selectedDate, changeSelectedItem, dropdownData}) {
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

  function getTotalDays(month) {
    const totalDays = new Date(searchYear, month+1, 0).getDate();
    return totalDays; 
  }

  async function getCompletedDays(year) {
    yearArray = new Array(12).fill(0);
    for (let i = 0; i < 12; i++) {
      const searchMonth = new Date(year, i, 1, 13); 
      const totalDays = getTotalDays(i);
      const monthArray = await getMonthData(searchMonth, totalDays);
      var completedDays = 0;
      for (let i of monthArray) {

        if (i >= 2) {
          completedDays += 1;
        }
      }
      const progress = (completedDays / totalDays);
      yearArray[i] = [completedDays, totalDays, progress];
    }
    return yearArray;
  }

  const onDateChange = (date) => {
    changeSelectedItem(dropdownData.find(item => item.label === 'Monthly'), date);
  };
  
  function getMonthofYear(year, monthIndex) {
    const date = moment().year(year).month(monthIndex);
    return date.format('YYYY:MM');
  }

  const goToNextYear = () => {
    setSearchYear(moment(searchYear, "YYYY").add(1, 'years').format("YYYY"));
    setIsLoading(true);
  };
  
  const goToPreviousYear = () => {
    setSearchYear(moment(searchYear, "YYYY").subtract(1, 'years').format("YYYY"));
    setIsLoading(true);
  };

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
  }, [searchYear]);

  if (isLoading) {
    fadeAnim.stopAnimation();
    fadeAnim.setValue(0);
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size="large" color="#23A0FF" />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}, {opacity: fadeAnim}]}>
      <View style={styles.dateSpace}>
        <Text style={{color:Colors[colorScheme ?? 'light'].text}}>{`${searchYear}`}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: '25%'}}>
        <Ionicons 
          style={{ left: '-23%', position: 'absolute', opacity: 0.4  }} 
          name="chevron-back" 
          size={50} 
          color={Colors[colorScheme ?? 'light'].text} 
          onPress={goToPreviousYear} 
        />
        <Ionicons 
          style={{ right: '-23%', position: 'absolute', opacity: 0.4 }} 
          name="chevron-forward" 
          size={50} 
          color={Colors[colorScheme ?? 'light'].text} 
          onPress={goToNextYear} 
        />
      </View>
      <View style={styles.progressBars}>
        <Pressable onPress={() => {
          onDateChange(getMonthofYear(searchYear, 0));
        }}>
          <Progress.Bar progress={January[2]} label={'January'} width= {250} height={25} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/>
          <Text style={styles.text}>January {January[0]}/{January[1]}</Text>
        </Pressable>
      </View>
      <View style={styles.progressBars}>
        <Pressable onPress={() => {
          onDateChange(getMonthofYear(searchYear, 1));
        }}>
          <Progress.Bar progress={February[2]} label={'February'} width= {250} height={25} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/>
          <Text style={styles.text}>February {February[0]}/{February[1]}</Text>
        </Pressable> 
      </View>
      <View style={styles.progressBars}>
        <Pressable onPress={() => {
          onDateChange(getMonthofYear(searchYear, 2));
        }}>
          <Progress.Bar progress={March[2]} label={'March'} width= {250} height={25} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/>
          <Text style={styles.text}>March {March[0]}/{March[1]}</Text>
        </Pressable> 
      </View>
      <View style={styles.progressBars}>
        <Pressable onPress={() => {
          onDateChange(getMonthofYear(searchYear, 3));
        }}>
          <Progress.Bar progress={April[2]} label={'April'} width= {250} height={25} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/>
          <Text style={styles.text}>April {April[0]}/{April[1]}</Text>
        </Pressable> 
      </View>
      <View style={styles.progressBars}>
        <Pressable onPress={() => {
          onDateChange(getMonthofYear(searchYear, 4));
        }}>
          <Progress.Bar progress={May[2]} label={'May'} width= {250} height={25} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/>
          <Text style={styles.text}>May {May[0]}/{May[1]}</Text>
        </Pressable> 
      </View>
      <View style={styles.progressBars}>
        <Pressable onPress={() => {
          onDateChange(getMonthofYear(searchYear, 5));
        }}>
          <Progress.Bar progress={June[2]} label={'June'} width= {250} height={25} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/>
          <Text style={styles.text}>June {June[0]}/{June[1]}</Text>
        </Pressable> 
      </View>
      <View style={styles.progressBars}>
        <Pressable onPress={() => {
          onDateChange(getMonthofYear(searchYear, 6));
        }}>
          <Progress.Bar progress={July[2]} label={'July'} width= {250} height={25} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/>
          <Text style={styles.text}>July {July[0]}/{July[1]}</Text>
        </Pressable> 
      </View>
      <View style={styles.progressBars}>
        <Pressable onPress={() => {
          onDateChange(getMonthofYear(searchYear, 7));
        }}>
          <Progress.Bar progress={August[2]} label={'August'} width= {250} height={25} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/>
          <Text style={styles.text}>August {August[0]}/{August[1]}</Text>
        </Pressable> 
      </View>
      <View style={styles.progressBars}>
        <Pressable onPress={() => {
          onDateChange(getMonthofYear(searchYear, 8));
        }}>
          <Progress.Bar progress={September[2]} label={'September'} width= {250} height={25} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/>
          <Text style={styles.text}>September {September[0]}/{September[1]}</Text>
        </Pressable> 
      </View>
      <View style={styles.progressBars}>
        <Pressable onPress={() => {
          onDateChange(getMonthofYear(searchYear, 9));
        }}>
          <Progress.Bar progress={October[2]} label={'October'} width= {250} height={25} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/>
          <Text style={styles.text}>October {October[0]}/{October[1]}</Text>
        </Pressable> 
      </View>
      <View style={styles.progressBars}>
        <Pressable onPress={() => {
          onDateChange(getMonthofYear(searchYear, 10));
        }}>
          <Progress.Bar progress={November[2]} label={'November'} width= {250} height={25} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/>
          <Text style={styles.text}>November {November[0]}/{November[1]}</Text>
        </Pressable> 
      </View>
      <View style={styles.progressBars}>
        <Pressable onPress={() => {
          onDateChange(getMonthofYear(searchYear, 11));
        }}>
          <Progress.Bar progress={December[2]} label={'December'} width= {250} height={25} borderWidth={0} color={'#FFBD20'} unfilledColor={'rgba(255, 189, 32, 0.5)'}/>
          <Text style={styles.text}>December {December[0]}/{December[1]}</Text>
        </Pressable> 
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
  },
  progressBars: {
    height: '7%',
    width: '100%',
    alignSelf: 'center',
  },
  text: {
    position: 'absolute',
    color: 'white',
    marginLeft: '3%',
    marginTop: '1.4%',
  },
});