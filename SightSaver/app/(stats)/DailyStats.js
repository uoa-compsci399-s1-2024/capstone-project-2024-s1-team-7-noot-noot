import { Text, View, StyleSheet, ScrollView} from 'react-native';
import { BarChart, EdgePosition, LineChart, PieChart, PopulationPyramid } from 'react-native-gifted-charts';
//import ReactDOM from 'react-dom';
//
import moment from "moment";
var date = moment()
      .utcOffset('+12.00')
      .format("dddd Do MMMM");   
      
      export default function DailyScreen() {
        return (
          //line chart
          
          <View style={[styles.container]}>
                <LineChart  
                yAxisThickness={0}
                noOfSections={1}
                stepValue={1}
                spacing={5}
                stepHeight={100}
                hideDataPoints
                xAxisLabelTextStyle={{color:'black', width:40}}
                //xAxisLabelTexts={['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']}
                //yAxisLabelTexts={['Indoors', 'Outdoors']}
                yAxisLabelTextStyles={{color:'white'}}
                data={dayData1}
                hideRules={true}
                areaChart={true}
                />
              <ScrollView>
              {/* bar chart VERSION A */}
              <View style={styles.barSpace}>
              <BarChart  
              horizontal
              yAxisThickness={0}
              noOfSections={1}
              stepValue={1}
              // showVerticalLines={true}
              // verticalLinesSpacing={60}
              stepHeight={300}
              spacing={0}
              //xAxisLength={300}
              frontColor={'#F6D78D'}
              xAxisLabelTextStyle={{color:'black', width: 50, height: 80}}
              xAxisLabelTexts={['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']}
              hideYAxisText={true}
              data={dayData2}
              hideRules={true}
              />
              </View>
              {/* bar chart VERSION B */}
              <View style={styles.barSpace2}>
          <BarChart  
            horizontal
            yAxisThickness={0}
            noOfSections={1}
            stepValue={1}
            stepHeight={300}
            spacing={0}
            frontColor={'#F6D78D'}
            xAxisLabelTextStyle={{color:'black', height:40, width: 40}}
            //xAxisLabelTexts={['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']}
            hideRules={true}
              data={dayData3}
            />
            </View>
            <View style={styles.barSpace3}>
            <BarChart  
            yAxisThickness={0}
            noOfSections={2}
            stepValue={0.5}
            stepHeight={100}
            spacing={0}
            barBorderRadius={8}
            frontColor={'#F6D78D'}
            xAxisLabelTextStyle={{color:'black', height:40, width: 40}}
            yAxisLabelTexts={[5, 10, 15]}
            hideRules={true}
              data={dayData4}
            />
            </View>
            </ScrollView>
        </View>
        
        );
      }
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  barSpace: {
    marginTop: '5%',
    marginBottom: 300,
    flex: 1,
  },
  barSpace2: {
    marginTop: '5%',
    marginBottom: 350,
    flex: 2,
  },
  barSpace3: {
    marginTop: '5%',
    marginBottom: 350,
    flex: 2,
  },
});










           
            dayData1 = [
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
              {value: 1, }, //12.05
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
              {value: 0, label:'1pm' },
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
              dayData2 = [
                {x:8.00, value: 0, barWidth: 60, }, //8.00
                {x:9.00, value: 0, barWidth: 60, },
                {x:10.00, value: 0, barWidth: 2, },
                {x:10.02, value: 1, barWidth: 7 },
                {x:10.03, value: 0, barWidth: 51 },
                {x:11.00, value: 0, barWidth: 60, },
                {x:12.00, value: 0, barWidth: 5, },
                {x:12.05, value: 1, barWidth: 60},
                {x:13.00, value: 1, barWidth: 2, },
                {x:13.02, value: 0, barWidth: 58},
                {x:14.00, value: 0, barWidth: 25, },
                {x:14.25, value: 1, barWidth: 27},
                {x:14.52, value: 0, barWidth: 8},
                {x:15.00, value: 0, barWidth: 60,},
                {x:16.00, value: 0, barWidth: 5,},
                {x:16.05, value: 1, barWidth: 2},
                {x:16.07, value: 0, barWidth: 53},
              
                ];
                dayData3 = [
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
                  ];
                  dayData4 = [
                    {value: 0, barWidth :15, label:'8am'}, //8.00 
                    {value: 0, barWidth :15}, //8.15
                    {value: 0, barWidth :15}, //8.30
                    {value: 0.2, barWidth :15}, //8.45
                    {value: 0.5, barWidth :15, label:'9am' },
                    {value: 0.2, barWidth :15}, //9.15
                    {value: 0, barWidth :15}, //9.30
                    {value: 0, barWidth :15}, //9.45
                    {value: 0, barWidth :15, label:'10am' },
                    {value: 0, barWidth :15}, //10.15
                    {value: 0, barWidth :15}, //10.30
                    {value: 0, barWidth :15}, //10.45
                    {value: 0, barWidth :15, label:'11am' },
                    {value: 0, barWidth :15}, //11.15
                    {value: 0, barWidth :15}, //11.30
                    {value: 0, barWidth :15}, //11.45
                    {value: 1, barWidth :15, label:'12pm' },
                    {value: 1, barWidth :15}, //12.15
                    {value: 1, barWidth :15}, //12.30
                    {value: 1, barWidth :15}, //12.45
                    {value: 0.5, barWidth :15, label:'1pm' },
                    {value: 0.2, barWidth :15}, //1.15
                    {value: 0, barWidth :15}, //1.30
                    {value: 0, barWidth :15}, //1.45
                    {value: 0, barWidth :15, label:'2pm' },
                    {value: 0, barWidth :15}, //2.15
                    {value: 0, barWidth :15}, //2.30
                    {value: 0, barWidth :15}, //2.45
                    {value: 0, barWidth :15, label:'3pm' },
                    {value: 0, barWidth :15}, //2.15
                    {value: 1, barWidth :15}, //2.30
                    {value: 0, barWidth :15}, //2.45
                    {value: 0, barWidth :15, label:'4pm' },
                    {value: 0, barWidth :15}, //4.15
                    {value: 0, barWidth :15}, //4.30
                    {value: 0, barWidth :15}, //4.45
                    {value: 0, barWidth :15, label:'5pm'},
                    ];