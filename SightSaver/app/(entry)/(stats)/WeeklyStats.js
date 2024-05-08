import { StyleSheet, Animated } from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import { Text, View } from '../../../components/Themed';
import moment from "moment";
moment.locale('en-gb'); 
import Colors from '../../../constants/Colors';
import { useColorScheme } from '../../../components/useColorScheme';
import { updateWeekData } from '../../../components/helpers/WeekData';
import { BarChart, LineChart, PieChart, PopulationPyramid } from 'react-native-gifted-charts';
import { Ionicons } from '@expo/vector-icons';

export default function WeeklyScreen({selectedDate, changeSelectedItem, dropdownData}) {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [monday, setMonday] = useState(0);
  const [tuesday, setTuesday] = useState(0);
  const [wednesday, setWednesday] = useState(0);
  const [thursday, setThursday] = useState(0);
  const [friday, setFriday] = useState(0);
  const [saturday, setSaturday] = useState(0);
  const [sunday, setSunday] = useState(0);
  const [searchWeek, setSearchWeek] = useState(moment(selectedDate, "YYYY:MM:DD").utcOffset('+12:00').format("YYYY:WW"));
  const [totalHours, setTotalHours] = useState(0);
  const [completedPercentage, setCompletedPercentage] = useState(0);
  const [notCompletedPercentage, setNotCompletedPercentage] = useState(100);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const onDateChange = (date) => {
    changeSelectedItem(dropdownData.find(item => item.label === 'Daily'), date);
  };
  
  // Helper function to get date of a day in a specific week and year
  function getDateOfWeek(week, year, dayIndex) {
    // Offset dayIndex by 1 because your week starts on Monday
    const date = moment().year(year).isoWeek(week).day(dayIndex + 1);
    return date.format('YYYY:MM:DD');
  }

  const goToNextWeek = () => {
    setSearchWeek(moment(searchWeek, "YYYY:WW").add(1, 'weeks').format("YYYY:WW"));
    setIsLoading(true);
  };
  
  const goToPreviousWeek = () => {
    setSearchWeek(moment(searchWeek, "YYYY:WW").subtract(1, 'weeks').format("YYYY:WW"));
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) {
      fadeAnim.stopAnimation();
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading]);

  useEffect(() => {
    updateWeekData(searchWeek).then((weekData) => {
      setMonday((weekData[0]));
      setTuesday((weekData[1]));
      setWednesday((weekData[2]));
      setThursday((weekData[3]));
      setFriday((weekData[4]));
      setSaturday((weekData[5]));
      setSunday((weekData[6]));

      const newTotalTime = (weekData[0] + weekData[1] + weekData[2] + weekData[3] + weekData[4] + weekData[5] + weekData[6]).toFixed(1);
      const newCompletedPercentage = Math.floor(Math.min(newTotalTime / 14 * 100, 100));
      const newNotCompletedPercentage = 100 - newCompletedPercentage;

      setTotalHours(newTotalTime);
      setCompletedPercentage(newCompletedPercentage);
      setNotCompletedPercentage(newNotCompletedPercentage);

      setIsLoading(false);
    });
  }, [searchWeek]);

  if (isLoading) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <Text style={{color:Colors[colorScheme ?? 'light'].text}}>Loading...</Text>
      </View>
    );
  }

  var pieData = [
    {value: completedPercentage, color: '#FFBC1F'},
    {value: notCompletedPercentage, color: '#F6D78D'}
  ];

  function getColor(value) {
    if (value >= 2) {
      return '#B28009';
    } else {
      return '#E6AA1F';
    }
  }

  const [year, week] = searchWeek.split(':');

  return (
    <Animated.View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}, {opacity: fadeAnim}]}>
      <View style={styles.dateSpace}>
        <Text style={{color:Colors[colorScheme ?? 'light'].text}}>{`Week ${week}, ${year}`}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: '25%'}}>
        <Ionicons style={{ left: '-2%', position: 'absolute', opacity: 0.4  }} name="chevron-back" size={50} color={Colors[colorScheme ?? 'light'].text} onPress={goToPreviousWeek} />
        <Ionicons style={{ right: '-2%', position: 'absolute', opacity: 0.4 }} name="chevron-forward" size={50} color={Colors[colorScheme ?? 'light'].text} onPress={goToNextWeek} />
      </View>
      <View style={styles.pieSpace}>
        <PieChart style= {styles.PieChart}
          donut
          innerRadius={80}
          borderRadius={15}
          data={pieData}
          innerCircleColor={Colors[colorScheme ?? 'light'].background}
          centerLabelComponent={() => {
            return <Text style={{fontSize: 30, color:Colors[colorScheme ?? 'light'].text}}>{completedPercentage}%</Text>;
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
          height={100}
          barBorderRadius={8}
          yAxisTextStyle={{color:Colors[colorScheme ?? 'light'].text}}
          xAxisLabelTextStyle={{color:Colors[colorScheme ?? 'light'].text}}
          stepValue={1}
          hideRules={true}
          data={[
            {value: monday, label: 'Mo', frontColor: getColor(monday), onPress: () => {onDateChange(getDateOfWeek(week, year, 0))}},
            {value: tuesday, label: 'Tu', frontColor: getColor(tuesday), onPress: () => {onDateChange(getDateOfWeek(week, year, 1))}},
            {value: wednesday, label: 'We', frontColor: getColor(wednesday), onPress: () => {onDateChange(getDateOfWeek(week, year, 2))}},
            {value: thursday, label: 'Th', frontColor: getColor(thursday), onPress: () => {onDateChange(getDateOfWeek(week, year, 3))}},
            {value: friday, label: 'Fr', frontColor: getColor(friday), onPress: () => {onDateChange(getDateOfWeek(week, year, 4))}},
            {value: saturday, label: 'Sa', frontColor: getColor(saturday), onPress: () => {onDateChange(getDateOfWeek(week, year, 5))}},
            {value: sunday, label: 'Su', frontColor: getColor(sunday), onPress: () => {onDateChange(getDateOfWeek(week, year, 6))}},
          ]}
          yAxisThickness={0}
          xAxisThickness={0}
          showReferenceLine1={true}
          referenceLine1Position={2}
          referenceLine1Config={{
            color: '#23A0FF',
          }}
        />
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
  goal: {
    height: '5%',
    marginTop: '10%',
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