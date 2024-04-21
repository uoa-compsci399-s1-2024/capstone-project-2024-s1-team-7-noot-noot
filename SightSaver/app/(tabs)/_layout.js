import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={28} style={{ marginBottom: -5}} {...props} />;
}


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerTitle: '',
        headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background, borderTopWidth: 0, elevation: 0 },
        tabBarStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background, borderColor: Colors[colorScheme ?? 'light'].background, borderTopWidth: 1, elevation: 0, height: 60, paddingBottom: 5 },
        tabBarLabelStyle: { fontSize: 12 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon 
              name="home-outline" 
              color={focused ? Colors[colorScheme ?? 'light'].tabIconSelected : Colors[colorScheme ?? 'light'].tabIconDefault} 
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="menu"
                    size={25}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    color={Colors[colorScheme ?? 'light'].text}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon 
              name="glasses-outline" 
              color={focused ? Colors[colorScheme ?? 'light'].tabIconSelected : Colors[colorScheme ?? 'light'].tabIconDefault} 
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="menu"
                    size={25}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    color={Colors[colorScheme ?? 'light'].text}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon 
              name="person-outline" 
              color={focused ? Colors[colorScheme ?? 'light'].tabIconSelected : Colors[colorScheme ?? 'light'].tabIconDefault} 
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="menu"
                    size={25}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    color={Colors[colorScheme ?? 'light'].text}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
  
}