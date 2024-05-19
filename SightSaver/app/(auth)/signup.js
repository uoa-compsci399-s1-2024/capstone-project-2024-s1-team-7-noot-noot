import Colors from '../../constants/Colors';
import { View, Text } from '../../components/Themed';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useColorScheme } from '../../components/useColorScheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, useWindowDimensions, Image, TouchableOpacity} from 'react-native';
import { useAuth } from "../../ctx";
import * as SecureStore from 'expo-secure-store';

export default function SignupScreen() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const colorScheme = useColorScheme();
    const { height } = useWindowDimensions();
    const { onRegister } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const register = async () => {
        const result = await onRegister(email, password, username);
        if (result) {
            console.log('Registration successful',result);
        } else {
            console.log('Registration failed');
        }
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }


    return (
        <View style={[styles.root, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
            {/* Sightsaver Logo */}
            <View style={[styles.imageContainer, {flex:0, marginTop:"15%", marginBottom:"15%"}]}>
                <Image 
                    source={Colors[colorScheme ?? 'light'].image}
                    style={[styles.logo, {height: height * 0.04}]}
                    resizeMode='contain'
                />
            </View>
            {/* Signup Form */}
            <CustomInput
                style={styles.input}
                placeholder="Email"
                value={email}
                setValue={setEmail}
                autoCapitalize="none"
            />
            <CustomInput
                style={styles.input}
                placeholder="Username"
                value={username}
                setValue={setUsername}
            />
            <CustomInput
                style={styles.input}
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={!showPassword}
            />
            <CustomInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                setValue={setConfirmPassword}
                secureTextEntry={!showPassword}
            />
             <View style={styles.container}>
                {/* Show password button */}
            <TouchableOpacity style={{margin:5,padding:5, borderWidth: 1 ,borderColor:'black' ,color:Colors[colorScheme ?? 'light']}} onPress={toggleShowPassword}>
                <Text>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
            </TouchableOpacity>
            </View>

            {/* Terms of serivce*/}
            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={[styles.checkbox,{color:Colors[colorScheme ?? 'light'].text, borderColor:Colors[colorScheme ?? 'light'].borderColor}]}
                    onPress={() => setTermsAccepted(!termsAccepted)}>
                    {termsAccepted && <Text>✓</Text>}
                </TouchableOpacity>
                <Text style={[styles.checkboxLabel,{color:Colors[colorScheme ?? 'light'].text}]}>I have read and accept the Terms of Service</Text>
            </View>
            {/* Privacy Policy */}
            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={[styles.checkbox,{color:Colors[colorScheme ?? 'light'].text, borderColor:Colors[colorScheme ?? 'light'].borderColor}]}
                    onPress={() => setPrivacyAccepted(!privacyAccepted)}>
                    {privacyAccepted && <Text>✓</Text>}
                </TouchableOpacity>
                <Text style={[styles.checkboxLabel,{color:Colors[colorScheme ?? 'light'].text}]}>I have read and accept the Privacy policy</Text>
            </View>

            <View style={styles.container}>    
                {/* Signup button */}
                <CustomButton style={[styles.signUpButton]} onPress={register} text={"Sign up"} />
                {/* Already have an account? */}
                <View style={styles.signInContainer}>
                    <Text style={{fontSize:15}}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
                    <Text style={[styles.signInText, {color:Colors[colorScheme ?? 'light'].clickableText}]}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
        );
    };

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
            marginTop: 20,
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