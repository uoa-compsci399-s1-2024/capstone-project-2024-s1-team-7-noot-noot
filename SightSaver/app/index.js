import Colors from '../constants/Colors';
import { View, Text } from '../components/Themed';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useColorScheme } from '../components/useColorScheme';
import { router } from 'expo-router';
import {useAuth} from '../ctx';
import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, useWindowDimensions, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';

export default function WelcomeScreen({ navigation }) {
    console.log('Welcome Screen');
    const colorScheme = useColorScheme();
    const { height } = useWindowDimensions();
    // const { signIn } = useSession();

    const checkLogin = () => {
    };

    const postData = {
        "email": "test_user_1@gmail.com", 
        "password": "test_user_1"
    }
    const fetchData = () => {
        console.log('Fetching data...');
        axios.post('https://sightsaver-api.azurewebsites.net/api/auth/authenticate', postData)
        .then(response => {
        // Handle success, log the response
        console.log('Response data:', response.data.token);
        authToken = response.data.token;
        console.log(authToken);
        getUserData(authToken);
        })
        .catch(error => {
        // Handle error, log the error message
        console.error('Error posting data:', error);
        });
        // checkLogin()
        };
    
    const getUserData = (authToken) => {
        console.log('authtoken is',authToken)
        const config = {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          };
        axios.get('https://sightsaver-api.azurewebsites.net/api/user', config)
        .then(response => {
            console.log('User data:', response.data);
        })
    };

    const handleLogin = () => {
        signIn();
        router.replace('/');
        };

    return (
        <View style={[styles.root, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
            {/* Sightsaver Logo */}
            <View style={styles.imageContainer}>
                <Image 
                    source={Colors[colorScheme ?? 'light'].image}
                    style={[styles.logo, {height: height * 0.04}]}
                    resizeMode='contain'
                />
            </View>
            {/* Buttons for testing */}
            <Button title="Skip Login (for testing only)" onPress={handleLogin}></Button>
            <View style={{margin:10}}></View>
            <Button title="Test API" onPress={(fetchData)}></Button>
            <View style={styles.container}>    
                {/* Signup button */}
                <CustomButton style={[styles.signUpButton]}onPress={() => router.replace('/(auth)/signup')} text={"Sign up"} />
                {/* Signin text */}
                <View style={styles.signInContainer}>
                    <Text style={{fontSize:15}}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
                        <Text style={[styles.signInText, {color:Colors[colorScheme ?? 'light'].clickableText}]}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',

    },
    text: {
        marginTop: 20,
        marginBottom: 10,
    },
    //Welcome Screen
    root: {
        flex: 1,
        flexDirection: 'column',
        minHeight: "600",
        // minHeight: '100%',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        paddingHorizontal: '10%',
        paddingBottom: '10%',
    },
    imageContainer: {
        flex: 1,
        // marginTop: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    logo: {
        width: '100%',
        // maxWidth: 400,
        // maxHeight: 300,
        // paddingBottom: 20,
    },
    signInContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInText: {
        fontSize: 15,
        marginLeft: 7,
        fontWeight: 'bold',
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: '15%',
    },
    //Signup Screen and Login Screen
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginLeft: "3%",
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxLabel: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    googleLogin: {
        position: 'absolute',
        bottom: '10%',
        width: '100%',
    },
    signUpButton: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
    },
});