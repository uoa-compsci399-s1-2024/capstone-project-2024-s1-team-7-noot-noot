import { StyleSheet, Button, Pressable,useState, onPress, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { StatusBar } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
var date = moment()
      .utcOffset('+12.00')
      .format("dddd Do MMMM");   ;
import { BarChart, LineChart, PieChart, PopulationPyramid } from 'react-native-gifted-charts';
const pieData = [
  {value: 70, color: '#FFBC1F'},
  {value: 30, color: '#F6D78D'}
];
var dropdownData = [
  { label: 'Daily', value: '/DailyStats' }, //fix this
  { label: 'Monthly', value: 2 },
  { label: 'Yearly', value: 3 },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };
};


export default function IndexScreen() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation()
  return (
    <View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
      <StatusBar barStyle={barStyle=Colors[colorScheme ?? 'light'].barStyle}/>
      <View style={styles.titleSpace}>
          <Text style={[styles.title, {color:Colors[colorScheme ?? 'light'].text},]}>Weekly Sunlight</Text>
      </View>
      <View style={styles.dateSpace}>
          <Text style={{color:Colors[colorScheme ?? 'light'].text}}>{date}</Text>
      </View>
      <View style={styles.menuSpace}>
          <Pressable style={[styles.buttonStyle, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}, {borderWidth:0}]} onPress={() => navigation.navigate("DailyStats")}>
              <Text style={[styles.text,{color:Colors[colorScheme ?? 'light'].text}]}>{title="Weekly "}<AntDesign name="down" size={10} style={{color:Colors[colorScheme ?? 'light'].text}} /></Text>
          </Pressable> 
      </View>

    <Dropdown
      style={Dropdownstyles.dropdown}
      data={dropdownData}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Weekly"
      searchPlaceholder="Search..."
      onChange={item => {
        setValue(item.value);
      }}
    />      
      <View style={styles.pieSpace}>
            <PieChart
                donut
                innerRadius={80}
                borderRadius={15}
                data={pieData}
                centerLabelComponent={() => {
                return <Text style={{fontSize: 30, color: 'black'}}>70%</Text>;
                }}
            />
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
  buttonStyle: {
    backgroundColor: 'white',
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    borderWidth: 1,
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

const Dropdownstyles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: '30%',
    borderRadius: 5,
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