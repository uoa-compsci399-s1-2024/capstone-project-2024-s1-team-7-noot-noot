import { View, Text } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import { useColorScheme } from '../../../components/useColorScheme';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import useBLE from "../useBLE.ts";
import { StyleSheet, TouchableOpacity, StatusBar, Modal, ScrollView, ActivityIndicator, Animated } from 'react-native';
import { getChildrenInfo, newChildAdded } from '../../../ctx';
import { ChildrenButtons } from '../../../components/ChildrenButtons';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const [childrenInfo, setChildrenInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const addChild = (childName, sensorId) => {
    setIsLoading(true);
    newChildAdded(childName, sensorId).then(() => {
      const newChild = { childName, sensorId };
      setChildrenInfo([...childrenInfo, newChild]);
    });
  };
  
  useEffect(() => {
    SecureStore.getItemAsync('email').then((email) => {
        setEmail(email);
    });
    SecureStore.getItemAsync('username').then((username) => {
        setUsername(username);
    });
    SecureStore.getItemAsync('childrenInfo').then((children) => {
        if (children) {
            setChildrenInfo(JSON.parse(children));
        }
        setIsLoading(false);
    });
}, [childrenInfo]);

  if (isLoading) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size="large" color="#23A0FF" />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
      <StatusBar barStyle={barStyle=Colors[colorScheme ?? 'light'].barStyle}/>

      {/* Parent Profile */}
      <View style={styles.headerContent}>
          <Ionicons name="person-circle-outline" size={50} color={Colors[colorScheme ?? 'light'].text} />
          <View style={styles.headerText}>
              <Text style={styles.name}>{username}</Text>
              <Text style={styles.userInfo}>{email}</Text>
          </View>
      </View>

      {/* Children buttons */}
      <View style={[styles.childrenContainer]}>
        <ChildrenButtons childrenInfo={childrenInfo} handleAddChild={addChild}/>
      </View>
    </Animated.View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleSpace: {
    marginTop: 10,
    marginBottom: 0,
    alignItems: 'center',
  },
  headerContent: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText: {
    fontSize: 16,
  },
  childrenContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
