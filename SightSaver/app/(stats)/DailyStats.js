import { Text, View, StyleSheet, ScrollView} from 'react-native';
import { BarChart, EdgePosition, LineChart, PieChart, PopulationPyramid } from 'react-native-gifted-charts';
import { useColorScheme } from '../../components/useColorScheme';
import Colors from '../../constants/Colors';
//import ReactDOM from 'react-dom';
//
import moment from "moment";
var date = moment()
      .utcOffset('+12.00')
      .format("dddd Do MMMM");   
      
export default function DailyScreen() {
        const colorScheme = useColorScheme();
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
                data={PieDay}
                innerCircleColor={'#f2f2f2'}
                centerLabelComponent={() => {
                  return [<Text style={{fontSize: 30, color: 'black'}}>60%</Text>,
                  <Text style={{fontSize: 12, color: 'black'}}>72 Minutes</Text>];
                }}
                
              />
            </View>
              <View style={styles.lineSpace}>
                  <LineChart  
                  yAxisThickness={0}
                  noOfSections={1}
                  stepValue={1}
                  spacing={4}
                  stepHeight={100}
                  hideDataPoints
                  xAxisLabelTextStyle={{color:'black', width:40}}
                  data={dayData}
                  hideRules={true}
                  areaChart={true}
                  startFillColor={'#FFBC1F'}
                  endFillColor={'#F6D78D'}
                  color={'#f2f2f2'}
                  xAxisColor={'#f2f2f2'}
                  hideYAxisText={true}
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
                data={PieDay}
                innerCircleColor={'#404040'}
                centerLabelComponent={() => {
                  return [<Text style={{fontSize: 30, color: 'white'}}>60%</Text>,
                  <Text style={{fontSize: 12, color: 'white'}}>72 Minutes</Text>];
                }}
                />
                </View>
                  <View style={styles.lineSpace}>
                  <LineChart  
                  yAxisThickness={0}
                  noOfSections={1}
                  stepValue={1}
                  spacing={4}
                  stepHeight={100}
                  hideDataPoints
                  xAxisLabelTextStyle={{color:'white', width:40}}
                  data={dayData}
                  hideRules={true}
                  areaChart={true}
                  startFillColor={'#FFBC1F'}
                  endFillColor={'#F6D78D'}
                  color={'#404040'}
                  xAxisColor={'#404040'}
                  hideYAxisText={true}
                  />
                </View>
            </View>
        );
 }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  pieSpace: {
    height: '40%',
    alignItems: 'center',
  },
  lineSpace: {
    height: '30%',
    marginLeft: 80,
    marginRight: 80,
    marginTop: 20,
  },
  dateSpace:{
    height: '10%',
    textAlign: 'center',
    marginLeft: '57%',
    width: '100%',
  },
});

PieDay = [
  {value: 65, color: '#FFBC1F'},
  {value: 35, color: '#F6D78D'}
];
           
dayData = [
  {value: 0, label:'8am'}, //8.00 
  {value: 0, }, //8.05
  {value: 0, }, //8.10
  {value: 0, }, //8.15
  {value: 0, }, //8.20
  {value: 0, }, //8.25
  {value: 0, }, //8.30
  {value: 0, }, //8.35
  {value: 0, }, //8.40
  {value: 0, }, //8.45
  {value: 0, }, //8.50
  {value: 0, }, //8.55
  {value: 1, label:'9am' },
  {value: 0, }, //9.05
  {value: 0, }, //9.10
  {value: 0, }, //9.15
  {value: 0, }, //9.20
  {value: 0, }, //9.25
  {value: 0, }, //9.30
  {value: 0, }, //9.35
  {value: 0, }, //9.40
  {value: 0, }, //9.45
  {value: 0, }, //9.50
  {value: 0, }, //9.55
  {value: 0, label:'10am' },
  {value: 0, }, //10.05
  {value: 0, }, //10.10
  {value: 0, }, //10.15
  {value: 0, }, //10.20
  {value: 0, }, //10.25
  {value: 0, }, //10.30
  {value: 0, }, //10.35
  {value: 0, }, //10.40
  {value: 0, }, //10.45
  {value: 0, }, //10.50
  {value: 0, }, //10.55
  {value: 0, label:'11am' },
  {value: 0, }, //11.05
  {value: 0, }, //11.10
  {value: 0, }, //11.15
  {value: 0, }, //11.20
  {value: 0, }, //11.25
  {value: 0, }, //11.30
  {value: 0, }, //11.35
  {value: 0, }, //11.40
  {value: 0, }, //11.45
  {value: 0, }, //11.50
  {value: 0, }, //11.55
  {value: 0, label:'12pm' },
  {value: 1, //dataPointLabelComponent=() =><Text style={{fontSize: 10, color: 'white'}}>55 minutes</Text>]
    }, //12.05
  {value: 1, }, //12.10
  {value: 1, }, //12.15
  {value: 1, }, //12.20
  {value: 1, }, //12.25
  {value: 1, }, //12.30
  {value: 1, }, //12.35
  {value: 1, }, //12.40
  {value: 1, }, //12.45
  {value: 1, }, //12.50
  {value: 1, }, //12.55
  {value: 1, label:'1pm' },
  {value: 0, }, //1.05
  {value: 0, }, //1.10
  {value: 0, }, //1.15
  {value: 0, }, //1.20
  {value: 0, }, //1.25
  {value: 0, }, //1.30
  {value: 0, }, //1.35
  {value: 0, }, //1.40
  {value: 0, }, //1.45
  {value: 0, }, //1.50
  {value: 0, }, //1.55
  {value: 0, label:'2pm' },
  {value: 0, }, //2.05
  {value: 0, }, //2.10
  {value: 0, }, //2.15
  {value: 0, }, //2.20
  {value: 0, }, //2.25
  {value: 0, }, //2.30
  {value: 0, }, //2.35
  {value: 0, }, //2.40
  {value: 0, }, //2.45
  {value: 0, }, //2.50
  {value: 0, }, //2.55
  {value: 0, label:'3pm' },
  {value: 0, }, //2.10
  {value: 0, }, //2.15
  {value: 0, }, //2.20
  {value: 0, }, //2.25
  {value: 1, }, //2.30
  {value: 1, }, //2.35
  {value: 1, }, //2.40
  {value: 0, }, //2.45
  {value: 0, }, //2.50
  {value: 0, }, //2.55
  {value: 0, label:'4pm' },
  {value: 0, }, //4.10
  {value: 0, }, //4.15
  {value: 0, }, //4.20
  {value: 0, }, //4.25
  {value: 0, }, //4.30
  {value: 0, }, //4.35
  {value: 0, }, //4.40
  {value: 0, }, //4.45
  {value: 0, }, //4.50
  {value: 0, }, //4.55
  {value: 0, label:'5pm'},
  ];
