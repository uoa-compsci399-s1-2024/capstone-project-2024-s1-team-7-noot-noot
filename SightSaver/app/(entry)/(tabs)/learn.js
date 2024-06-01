import { StyleSheet, ScrollView, Image, useWindowDimensions} from 'react-native';
import { Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import { useColorScheme } from '../../../components/useColorScheme';
import { StatusBar } from 'react-native';


export default function LearnScreen() {
  const colorScheme = useColorScheme();
  const { height } = useWindowDimensions();
  return (
    <ScrollView>
    <View style={styles.container}>
      <StatusBar barStyle={barStyle=Colors[colorScheme ?? 'light'].barStyle}/>
      <View style={styles.textContainer}>
      <Text style={[styles.title, {color: Colors[colorScheme ?? 'light'].text}]}>
        Learn about Myopia
      </Text>
      <Text style={[styles.subTitle, {color: Colors[colorScheme ?? 'light'].subTitle}]}>
        What is myopia?{"\n"}
      </Text>

          <Text style={styles.centerText}>
              Myopia, also known as nearsightedness, is a common condition that usually starts in childhood. 
              While myopia itself isn't new, the alarming rate at which it's increasing is. 
              {"\n"}A 2016 Sydney Myopia Study revealed a concerning trend: in 2000, only 22.9% of the global population was myopic. 
              By 2050, that number is expected to skyrocket to nearly 50%. {"\n"}
          </Text>
        
            <Image source={require('../../../assets/images/myopiaComp.jpg')}  style={[styles.logo, {height:height*0.3, width:height*0.435,}]}/>
        
            <Text style={[styles.subTitle, {color: Colors[colorScheme ?? 'light'].subTitle}]}>
            Sight Saver goals{"\n"}
          </Text>

          <Text style={styles.centerText} >
          Studies have shown that the chances of kids becoming myopic is reduced by around one-third if time spent outdoors is 
          increased from 0 to 5 hours per week to 14 or more hours per week.”  {"\n"}
          Another suggested that with an increase in time spent outdoors from 1 hour to 3 hours per day, 
          the risk of myopia could be reduced by 50%. Not only that, but spending more time outdoors also has other positive 
          outcomes for children and adolescents, such as obesity prevention and promoting a healthier lifestyle.” 
          {"\n"}{"\n"}
        Despite the many benefits of myopia management through sunlight, there are currently no full-scale solutions involving 
        light-sensing devices and applications to help parents and children preserve their vision. {"\n"}
        Our solution aims to create an app to help parents keep track of their child’s time outside and automate this process 
        through a purpose-built wearable light-sensing device. Not only this but we also plan to use this device to record
         accurate and ethical data for use in further studies into myopia by optometrist researchers at the 
         University of Auckland.
 {"\n"}
          </Text>

      <Text style={[styles.subTitle, {color: Colors[colorScheme ?? 'light'].subTitle}]}>
        Myopia Treatment options{"\n"}
      </Text>
          <Text style={styles.centerText} > 
          There are several effective ways to help prevent and reduce myopia, particularly in children, 
          such as 1% atropine eye drops and multifocal contact lenses. 
          These measures, however, require the child to visit an optometrist and be at risk of, or already in the process of developing myopia. 
                {"\n"}{"\n"}
                Fortunately, there is evidence that the management of environmental factors such as sunlight is 
                effective in lowering the risk of developing myopia and slowing its progression.
                 We also know this can be provided for all children without the same monetary or medical barriers as pharmaceutical measures. 
                 {"\n"}
          </Text>
      
      <Text style={[styles.subTitle, {color: Colors[colorScheme ?? 'light'].subTitle}]}>
        Research{"\n"}
      </Text>
      
          <Text style={styles.centerText} >
          Why is the prevalence of myopia growing at such a rate? This global rise is not due to genetic factors alone. 
          Environmental factors are key here; less time spent outdoors has been shown to be a significant risk factor for myopia and its progression. 
          {"\n"}There is also evidence that increased ‘near work’, such as writing or looking at a device from a short distance, can worsen this risk further.
           In highly urbanised areas with long schooling hours, we see the number of students with myopia increase significantly, backing this claim. 
           </Text>
           <Image source={require('../../../assets/images/myopiaGraph.webp')}  style={[styles.logo, {height:height*0.3, width:height*0.435,marginTop: 10}]}/>
           <Text style={styles.centerText} >{"\n"}{"\n"}A study on high school students in Beijing found a staggering 80% of the students had myopia. 
           It is understood that long school hours, high amounts of near work, 
           and the lack of outdoor activities are the leading causes of these concerningly high statistics. {"\n"}{"\n"}

          It is not only the number of individuals with myopia increasing, however, 
           but also the severity of myopia itself that is worsening. 
           It is said that high and pathological myopia is expected to be the “most common cause of irreversible vision impairment and blindness worldwide”.
            From this, we can see the severity and scale of this issue demand better prevention technologies. 
        
{"\n"}
          </Text>
          
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '90%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 15,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerText:{
    textAlign: 'center',
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    height: 1,
    width: '100%',
  },
});
