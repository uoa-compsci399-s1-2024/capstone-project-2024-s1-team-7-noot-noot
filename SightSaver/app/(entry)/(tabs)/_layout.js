import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable } from 'react-native';
import Colors from '../../../constants/Colors';
import { useColorScheme } from '../../../components/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './index'; // Make sure to replace with the actual path to your HomeScreen component
import LearnScreen from './learn'; // Make sure to replace with the actual path to your LearnScreen component
import ProfileScreen from './profile'; // Make sure to replace with the actual path to your ProfileScreen component

const Tab = createBottomTabNavigator();

function TabBarIcon(props) {
  return <Ionicons size={28} style={{ marginBottom: -5}} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: '',
        headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background, borderTopWidth: 0, elevation: 0 },
        tabBarStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background, borderColor: Colors[colorScheme ?? 'light'].seperator, borderTopWidth: 1, elevation: 0, height: 60, paddingBottom: 5 },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon 
              name="home-outline" 
              color={focused ? Colors[colorScheme ?? 'light'].tabIconSelected : Colors[colorScheme ?? 'light'].tabIconDefault} 
            />
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Settings')}>
              {({ pressed }) => (
                <Ionicons
                  name="settings-outline"
                  size={25}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  color={Colors[colorScheme ?? 'light'].text}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnScreen}
        options={{
          title: 'Learn',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon 
              name="glasses-outline" 
              color={focused ? Colors[colorScheme ?? 'light'].tabIconSelected : Colors[colorScheme ?? 'light'].tabIconDefault} 
            />
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Settings')}>
              {({ pressed }) => (
                <Ionicons
                  name="settings-outline"
                  size={25}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  color={Colors[colorScheme ?? 'light'].text}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon 
              name="person-outline" 
              color={focused ? Colors[colorScheme ?? 'light'].tabIconSelected : Colors[colorScheme ?? 'light'].tabIconDefault} 
            />
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Settings')}>
              {({ pressed }) => (
                <Ionicons
                  name="settings-outline"
                  size={25}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  color={Colors[colorScheme ?? 'light'].text}
                />
              )}
            </Pressable>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
