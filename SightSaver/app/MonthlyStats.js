import { StyleSheet, Button, Pressable, onPress, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { StatusBar } from 'react-native';

var date = moment()
      .utcOffset('+12.00')
      .format("dddd Do MMMM");   ;
import { BarChart, LineChart, PieChart, PopulationPyramid } from 'react-native-gifted-charts';

export default function MonthlyScreen() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation()
    return (
      <View style={[styles.container, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
        <StatusBar barStyle={barStyle=Colors[colorScheme ?? 'light'].barStyle}/>

        <View style={styles.titleSpace}>
            <Text style={[styles.title, {color:Colors[colorScheme ?? 'light'].text},]}>Monthly Sunlight</Text>
        </View>
        <View style={styles.dateSpace}>
            <Text style={{color:Colors[colorScheme ?? 'light'].text}}>{date}</Text>
        </View>

        <View style={styles.menuSpace}>
            <Pressable style={[styles.buttonStyle, {backgroundColor:Colors[colorScheme ?? 'light'].buttonColor}, {borderWidth:0}]} onPress={() => navigation.navigate("learn")}>
                <Text style={[styles.text,{color:Colors[colorScheme ?? 'light'].text}]}>{title="Weekly "}<AntDesign name="down" size={10} style={{color:Colors[colorScheme ?? 'light'].text}} /></Text>
            </Pressable> 
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