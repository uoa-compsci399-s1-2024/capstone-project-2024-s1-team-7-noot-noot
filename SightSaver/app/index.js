import Colors from '../constants/Colors';
import { View, Text } from '../components/Themed';
import CustomButton from '../components/CustomButton';
import { useColorScheme } from '../components/useColorScheme';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, useWindowDimensions, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { useAuth } from '../ctx';

export default function WelcomeScreen() {
    const colorScheme = useColorScheme();
    const { height } = useWindowDimensions();
	const { authState } = useAuth();

    if (authState?.authenticated) {
        return (
            <View style={[styles.activityContainer, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
                <ActivityIndicator size="large" color="#23A0FF" />
            </View>
        );
    } else {
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
        paddingHorizontal: '10%',
        paddingBottom: '10%',
    },
    activityContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: '10%',
        paddingBottom: '10%',
        justifyContent: 'center',
    },
    imageContainer: {
        flex: 1,
        marginTop: '52%',
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