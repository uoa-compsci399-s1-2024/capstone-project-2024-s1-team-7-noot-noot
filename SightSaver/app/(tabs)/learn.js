import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { StatusBar } from 'react-native';


export default function LearnScreen() {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <StatusBar barStyle={barStyle=Colors[colorScheme ?? 'light'].barStyle}/>
      <View style={styles.textContainer}>
      <Text style={[styles.title, {color: Colors[colorScheme ?? 'light'].text}]}>
        Learn
      </Text>
      <Text style={[styles.subTitle, {color: Colors[colorScheme ?? 'light'].subTitle}]}>
        Myopia{"\n"}
      </Text>

          <Text style={styles.centerText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  
              Ipsum dolor sit amet consectetur adipiscing elit ut. Risus ultricies tristique nulla aliquet. {"\n"}
          </Text>

      <Text style={[styles.subTitle, {color: Colors[colorScheme ?? 'light'].subTitle}]}>
            Sight Saver goals{"\n"}
      </Text>

          <Text style={styles.centerText} >
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. {"\n"}
          </Text>

      <Text style={[styles.subTitle, {color: Colors[colorScheme ?? 'light'].subTitle}]}>
        Myopia Treatment options{"\n"}
      </Text>
          <Text style={styles.centerText} > 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. {"\n"}
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                {"\n"}
                Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Non nisi est sit amet. Non blandit massa enim nec. 
                Cras tincidunt lobortis feugiat vivamus at augue eget. Ornare lectus sit amet est.{"\n"}
          </Text>
      
      <Text style={[styles.subTitle, {color: Colors[colorScheme ?? 'light'].subTitle}]}>
        Research{"\n"}
      </Text>
      
          <Text style={styles.centerText} >
                Ipsum dolor sit amet consectetur adipiscing elit ut. Risus ultricies tristique nulla aliquet. 
                Feugiat nibh sed pulvinar proin gravida hendrerit lectus a.
                Facilisi etiam dignissim diam quis enim lobortis scelerisque. Amet risus nullam eget felis eget nunc. 
                Ultrices eros in cursus turpis massa tincidunt.
                {"\n"}{"\n"}
                Ipsum dolor sit amet consectetur adipiscing elit ut.
                Ipsum dolor sit amet consectetur adipiscing elit ut. Risus ultricies tristique nulla aliquet. Feugiat nibh sed pulvinar proin gravida hendrerit lectus a.
                Facilisi etiam dignissim diam quis enim lobortis scelerisque. Amet risus nullam eget felis eget nunc. Ultrices eros in cursus turpis massa tincidunt.
                Ipsum dolor sit amet consectetur adipiscing elit ut.{"\n"}
          </Text>
      </View>
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

  textContainer: {
    width: '80%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'light',
  },
  centerText:{
    textAlign: 'center',
  },

  subTitle: {
    fontSize: 16,
    color: '#1970B4',
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    height: 1,
    width: '100%',
  },
});
