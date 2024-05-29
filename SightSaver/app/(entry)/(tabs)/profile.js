import { View, Text } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import { useColorScheme } from '../../../components/useColorScheme';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import useBLE from "../useBLE";
import { StyleSheet, TouchableOpacity, StatusBar, Modal, ScrollView, ActivityIndicator, Animated } from 'react-native';
import { getChildrenInfo, getUserDetails } from '../../../ctx';
import { ChildrenButtons } from '../../../components/ChildrenButtons';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [childrenInfo, setChildrenInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const addChild = async (childName, sensorId) => {
    setIsLoading(true);
    console.log('[Email]:', email, '[Child Name]:', childName, '[Sensor ID]:', sensorId);
    await axios.post(`https://sightsaver-api.azurewebsites.net/api/child/addChild`, {
      email: email,
      name: childName,
      sensor_id: sensorId,
    }).catch((error) => {
      alert('Failed to add child, Try Again.');
      console.log('Failed to add child:', error)
    });
    await SecureStore.deleteItemAsync('childrenInfo');
    await getChildrenInfo().then((childrenData) => {
      setChildrenInfo(childrenData);
      setTimeout (() => {
        setIsLoading(false);
      }, 1500);
    }).catch((error) => {
      console.error('Failed to get children info:', error);
    });
  };
  
  useEffect(() => {
    getUserDetails().then((userDetails) => {
      if (userDetails) {
        setUsername(userDetails.username);
        setEmail(userDetails.email);
        setTimeout (() => {
          setIsLoading(false);
        }, 1500);
      } else {
        //console.error('User details is null');
      }
    }).catch((error) => {
      console.error('Failed to get user details:', error);
    });
  
    getChildrenInfo().then((childrenData) => {
      setChildrenInfo(childrenData);
      setTimeout (() => {
        setIsLoading(false);
      }, 1500);
    }).catch((error) => {
      console.error('Failed to get children info:', error);
    });
  });

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading]);

  if (isLoading) {
    fadeAnim.stopAnimation();
    fadeAnim.setValue(0);
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size="large" color="#23A0FF" />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
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
