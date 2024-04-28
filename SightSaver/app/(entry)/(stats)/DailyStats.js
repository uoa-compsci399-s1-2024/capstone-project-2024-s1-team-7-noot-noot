import { Text, View, StyleSheet, ScrollView} from 'react-native';
import { BarChart, LineChart, PieChart, PopulationPyramid } from 'react-native-gifted-charts';
import moment from "moment";


var date = moment()
      .utcOffset('+12.00')
      .format("dddd Do MMMM");   

//VERSION A
/*
dayData = [
  {value: 0, barWidth :5, label:'8am'}, //8.00
  {value: 0, barWidth :5}, //8.05
  {value: 0, barWidth :5}, //8.10
  {value: 0, barWidth :5}, //8.15
  {value: 0, barWidth :5}, //8.20
  {value: 0, barWidth :5}, //8.25
  {value: 0, barWidth :5}, //8.30
  {value: 0, barWidth :5}, //8.35
  {value: 0, barWidth :5}, //8.40
  {value: 0, barWidth :5}, //8.45
  {value: 0, barWidth :5}, //8.50
  {value: 0, barWidth :5}, //8.55
  {value: 1, barWidth :5, label:'9am' },
  {value: 0, barWidth :5}, //9.05
  {value: 0, barWidth :5}, //9.10
  {value: 0, barWidth :5}, //9.15
  {value: 0, barWidth :5}, //9.20
  {value: 0, barWidth :5}, //9.25
  {value: 0, barWidth :5}, //9.30
  {value: 0, barWidth :5}, //9.35
  {value: 0, barWidth :5}, //9.40
  {value: 0, barWidth :5}, //9.45
  {value: 0, barWidth :5}, //9.50
  {value: 0, barWidth :5}, //9.55
  {value: 0, barWidth :5, label:'10am' },
  {value: 0, barWidth :5}, //10.05
  {value: 0, barWidth :5}, //10.10
  {value: 0, barWidth :5}, //10.15
  {value: 0, barWidth :5}, //10.20
  {value: 0, barWidth :5}, //10.25
  {value: 0, barWidth :5}, //10.30
  {value: 0, barWidth :5}, //10.35
  {value: 0, barWidth :5}, //10.40
  {value: 0, barWidth :5}, //10.45
  {value: 0, barWidth :5}, //10.50
  {value: 0, barWidth :5}, //10.55
  {value: 0, barWidth :5, label:'11am' },
  {value: 0, barWidth :5}, //11.05
  {value: 0, barWidth :5}, //11.10
  {value: 0, barWidth :5}, //11.15
  {value: 0, barWidth :5}, //11.20
  {value: 0, barWidth :5}, //11.25
  {value: 0, barWidth :5}, //11.30
  {value: 0, barWidth :5}, //11.35
  {value: 0, barWidth :5}, //11.40
  {value: 0, barWidth :5}, //11.45
  {value: 0, barWidth :5}, //11.50
  {value: 0, barWidth :5}, //11.55
  {value: 0, barWidth :5, label:'12pm' },
  {value: 1, barWidth :5}, //12.05
  {value: 1, barWidth :5}, //12.10
  {value: 1, barWidth :5}, //12.15
  {value: 1, barWidth :5}, //12.20
  {value: 1, barWidth :5}, //12.25
  {value: 1, barWidth :5}, //12.30
  {value: 1, barWidth :5}, //12.35
  {value: 1, barWidth :5}, //12.40
  {value: 1, barWidth :5}, //12.45
  {value: 1, barWidth :5}, //12.50
  {value: 1, barWidth :5}, //12.55
  {value: 0, barWidth :5, label:'1pm' },
  {value: 0, barWidth :5}, //1.05
  {value: 0, barWidth :5}, //1.10
  {value: 0, barWidth :5}, //1.15
  {value: 0, barWidth :5}, //1.20
  {value: 0, barWidth :5}, //1.25
  {value: 0, barWidth :5}, //1.30
  {value: 0, barWidth :5}, //1.35
  {value: 0, barWidth :5}, //1.40
  {value: 0, barWidth :5}, //1.45
  {value: 0, barWidth :5}, //1.50
  {value: 0, barWidth :5}, //1.55
  {value: 0, barWidth :5, label:'2pm' },
  {value: 0, barWidth :5}, //2.05
  {value: 0, barWidth :5}, //2.10
  {value: 0, barWidth :5}, //2.15
  {value: 0, barWidth :5}, //2.20
  {value: 0, barWidth :5}, //2.25
  {value: 0, barWidth :5}, //2.30
  {value: 0, barWidth :5}, //2.35
  {value: 0, barWidth :5}, //2.40
  {value: 0, barWidth :5}, //2.45
  {value: 0, barWidth :5}, //2.50
  {value: 0, barWidth :5}, //2.55
  {value: 0, barWidth :5, label:'3pm' },
  {value: 0, barWidth :5}, //2.10
  {value: 0, barWidth :5}, //2.15
  {value: 0, barWidth :5}, //2.20
  {value: 0, barWidth :5}, //2.25
  {value: 1, barWidth :5}, //2.30
  {value: 1, barWidth :5}, //2.35
  {value: 1, barWidth :5}, //2.40
  {value: 0, barWidth :5}, //2.45
  {value: 0, barWidth :5}, //2.50
  {value: 0, barWidth :5}, //2.55
  {value: 0, barWidth :5, label:'4pm' },
  {value: 0, barWidth :5}, //4.10
  {value: 0, barWidth :5}, //4.15
  {value: 0, barWidth :5}, //4.20
  {value: 0, barWidth :5}, //4.25
  {value: 0, barWidth :5}, //4.30
  {value: 0, barWidth :5}, //4.35
  {value: 0, barWidth :5}, //4.40
  {value: 0, barWidth :5}, //4.45
  {value: 0, barWidth :5}, //4.50
  {value: 0, barWidth :5}, //4.55
  {value: 0, barWidth :5, label:'5pm'},
  ];*/
/*export default function DailyScreen() {
  return (
    <View style={[styles.container]}>
      <View style={styles.barSpace}>
            <BarChart  
            horizontal
            yAxisThickness={0}
            noOfSections={1}
            stepValue={1}
            stepHeight={300}
            spacing={0}
            frontColor={'#F6D78D'}
            xAxisLabelTextStyle={{color:'white', height:40, width: 40}}
            //xAxisLabelTexts={['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']}
            hideRules={true}
              data={dayData}
            />
          </View>
        </View>
  );
}
*/
dayData = [
  {value: 0, spacing:30, barWidth:0, }, 
  {value: 1, spacing:25, barWidth:5, },
  {value: 0, spacing:30, barWidth:0, },
  {value: 0, spacing:30, barWidth:0, },
  {value: 1, spacing:0, barWidth:30, },
  {value: 0, spacing:30, barWidth:0, },
  {value: 1, spacing:23, barWidth:7, },
  {value: 0, spacing:30, barWidth:0, },
  {value: 0, spacing:30, barWidth:0, },
  {value: 0, spacing:30, barWidth:0, },
  ];

  export default function DailyScreen() {
    return (
      <View style={[styles.container]}>
        <View style={styles.barSpace}>
              <BarChart  
              horizontal
              yAxisThickness={0}
              noOfSections={1}
              stepValue={1}
              stepHeight={300}
              spacing={0}
              frontColor={'#F6D78D'}
              xAxisLabelTextStyle={{color:'white', height:40, width: 40}}
              xAxisLabelTexts={['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']}
              data={dayData}
              hideRules={true}
              />
            </View>
          </View>
    );
  }
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  barSpace: {
    marginLeft: '5%',
    height: '100%',
  },
});