import Colors from '../../constants/Colors';
import { View, Text } from '../../components/Themed';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useColorScheme } from '../../components/useColorScheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { TextInput, Keyboard, StyleSheet, useWindowDimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from "../../ctx";

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
    const [isLoading, setIsLoading] = useState(false);

    const register = async () => {

        if (!termsAccepted && !privacyAccepted) {
            alert('Please accept the Terms of Service and Privacy Policy.');
            return; 
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password does not meet constraints. Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
            return; 
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return; 
        }
        
        try {
            Keyboard.dismiss();
            setIsLoading(true); 
            await onRegister(email, password, username);
        } catch (error) {
            console.log('Registration failed', error);
        } finally {
            setTimeout(() => {
                setIsLoading(false); 
            }, 1000)
        }
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
                keyboardType="email-address"
            />
            <CustomInput
                style={styles.input}
                placeholder="Username"
                value={username}
                setValue={setUsername}
                keyboardType="default"
            />
            <CustomInput
                style={styles.input}
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={!showPassword}
                keyboardType="default"
            />
            <CustomInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                setValue={setConfirmPassword}
                secureTextEntry={!showPassword}
                keyboardType="default"
            />
             
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

            {/* Loading Indicator */}
            {isLoading && (
                <View style={[styles.loadingContainer]}>
                    <ActivityIndicator size="large" color="#23A0FF" />
                </View>
            )}

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
            paddingTop: '10%',
            flex: 1,
            flexDirection: 'column',
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
        loadingContainer: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999, // Ensure it's above other components
        },
    });

