import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Switch, Image } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeContext from '@/constants/themeContext';
import { StatusBar } from 'react-native';

export default function ProfileScreen() {
    const [darkMode, setDarkMode] = useState(false);
    const theme = useContext(themeContext);
    const [darkModeText, changeText] = useState("Dark Mode")
    

    useEffect(() => {
        (async () => {
            const savedDarkMode = await DarkModeManager.getDarkMode();
            setDarkMode(savedDarkMode);
        })();
    }, []);

    const toggleDarkMode = async (value) => {
        setDarkMode(value);
        EventRegister.emit('ChangeTheme', value);
        await DarkModeManager.setDarkMode(value);
        changeText("Light Mode")
    };
    return (
        <View style={[styles.container, {backgroundColor:theme.backgroundColor}]}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                {/* Parent Profile  */}
              <Image
                style={styles.avatar}
                source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
              />
              <Text style={styles.name}>John Doe </Text>
              <Text style={styles.userInfo}>jhonnydoe@mail.com </Text>
              <Text style={styles.userInfo}>Florida </Text>
            </View>
          </View>
                {/* Profile Options  */}
          <View style={styles.body}>
            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image
                  style={styles.icon}
                  source={{ uri: 'https://img.icons8.com/color/70/000000/cottage.png' }}
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Home</Text>
              </View>
            </View>
    
            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image
                  style={styles.icon}
                  source={{ uri: 'https://img.icons8.com/color/70/000000/administrator-male.png' }}
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Settings</Text>
              </View>
            </View>
    
            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image
                  style={styles.icon}
                  source={{ uri: 'https://img.icons8.com/color/70/000000/filled-like.png' }}
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>News</Text>
              </View>
            </View>
    
            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image
                  style={styles.icon}
                  source={{ uri: 'https://img.icons8.com/color/70/000000/facebook-like.png' }}
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Shop</Text>
              </View>
            </View>
            <View style={[styles.container, {backgroundColor:theme.backgroundColor}]}>
             <StatusBar barStyle={theme.barStyle}/>
             <Text style={[styles.title, {color:theme.color}]}>Switch to {darkModeText}</Text>
             <Switch
                value={darkMode}
                onValueChange={toggleDarkMode}
            />
          </View>
        </View>
        </View>
      )
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
    header: {
        // backgroundColor: '#DCDCDC',
      },
      headerContent: {
        padding: 30,
        alignItems: 'center',
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
      },
      name: {
        fontSize: 22,
        color: '#000000',
        fontWeight: '600',
      },
      userInfo: {
        fontSize: 16,
        color: '#778899',
        fontWeight: '600',
      },
      body: {
        // backgroundColor: '#778899',
        height: 500,
        alignItems: 'center',
      },
      item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      infoContent: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 5,
      },
      iconContent: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 5,
      },
      icon: {
        width: 30,
        height: 30,
        marginTop: 20,
      },
      info: {
        fontSize: 18,
        marginTop: 20,
        color: '#FFFFFF',
      },
});

class DarkModeManager {
    static DARK_MODE_KEY = 'darkMode';

    static async setDarkMode(enabled) {
        try {
            await AsyncStorage.setItem(this.DARK_MODE_KEY, JSON.stringify(enabled));
        } catch (error) {
            console.error('Error saving dark mode state:', error);
        }
    }

    static async getDarkMode() {
        try {
            const darkModeStr = await AsyncStorage.getItem(this.DARK_MODE_KEY);
            return darkModeStr ? JSON.parse(darkModeStr) : false;
        } catch (error) {
            console.error('Error retrieving dark mode state:', error);
            return false;
        }
    }
}
