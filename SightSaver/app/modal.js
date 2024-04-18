import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { StatusBar } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function ModalScreen() {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <StatusBar barStyle={barStyle=Colors[colorScheme ?? 'light'].barStyle}/>
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
});
