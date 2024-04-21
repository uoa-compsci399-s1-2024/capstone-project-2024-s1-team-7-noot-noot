import { StyleSheet, Button, Pressable, onPress, Image } from 'react-native';
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
var dropdownData = [
  { label: 'Daily',value:'DailyStats'},
  { label: 'Weekly',value:'index'},
  { label: 'Monthly',value:'MonthlyStats'},
  { label: 'Yearly',value:'YearlyStats'},
];
export default function DailyScreen({navigation}) {
    const colorScheme = useColorScheme();
    
    return (
      
      <View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
        <StatusBar barStyle={barStyle=Colors[colorScheme ?? 'light'].barStyle}/>

        <View style={styles.titleSpace}>
            <Text style={[styles.title, {color:Colors[colorScheme ?? 'light'].text},]}>Daily Sunlight</Text>
        </View>
        <View style={styles.dateSpace}>
            <Text style={{color:Colors[colorScheme ?? 'light'].text}}>{date}</Text>
        </View>
        <Dropdown
            style={[Dropdownstyles.dropdown, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}
            data={dropdownData}
            maxHeight={300}
            itemTextStyle={[styles.text,{color:Colors[colorScheme ?? 'light'].text}]}
            placeholderStyle={[styles.text,{color:Colors[colorScheme ?? 'light'].text}]}
            containerStyle={[{backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}]}
            selectedTextStyle={[styles.text,{color:Colors[colorScheme ?? 'light'].text}]}
            activeColor={[{backgroundColor:Colors[colorScheme ?? 'light'].buttonColorSelected}]}
            labelField="label"
            valueField="value"
            placeholder="Weekly"
            searchPlaceholder="Search..."
            onChange={(item) => 
              navigation.navigate(item.value)
            }
            //onPress={() => navigation.navigate("learn")}
          />      
     </View>
    )
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
    
  }
);
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