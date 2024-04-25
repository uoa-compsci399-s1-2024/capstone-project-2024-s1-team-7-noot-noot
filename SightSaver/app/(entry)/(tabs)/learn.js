import { StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import { useColorScheme } from '../../../components/useColorScheme';
import { StatusBar } from 'react-native';


export default function LearnScreen() {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <StatusBar barStyle={barStyle=Colors[colorScheme ?? 'light'].barStyle}/>
      <Text style={[styles.title, {color: Colors[colorScheme ?? 'light'].text}]}>Learn</Text>
      <View style={[styles.separator, {backgroundColor: Colors[colorScheme ?? 'light'].seperator}]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    height: 1,
    width: '100%',
  },
});
