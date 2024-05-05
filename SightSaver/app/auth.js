// import React from 'react';
// import { useState } from 'react';

import Colors from '../constants/Colors';
import { View, Text } from '../components/Themed';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useColorScheme } from '../components/useColorScheme';
import { router } from 'expo-router';
import { useSession } from '../ctx';
import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, useWindowDimensions, Image, TouchableOpacity} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInWithGoogleButton from '../components/SignInGoogle';
import useKeyboardVisibility from '../components/KeyboardVisibility';
import axios from 'axios';

function WelcomeScreen({ navigation }) {
    const colorScheme = useColorScheme();
    const { height } = useWindowDimensions();
    const { signIn } = useSession();
    email = 'admin@gmail.com';
    password = 'Password';

    const checkLogin = async (email, password) => {
        try {
            const response = await axios.post('https://sightsaver-api.azurewebsites.net/api/user', {
                email,
                password
            });
    
            // Assuming the API responds with a success message or user data upon successful login attempt
            if (response.status === 200) {
                console.log('Login successful');
                return true; // Return true to indicate successful login
            } else {
                console.log('Login failed');
                return false; // Return false for failed login
            }
        } catch (error) {
            console.error('Error logging in:', error);
            throw new Error('Failed to login. Please try again.');
        }
    };

    const fetchData = () => {
        console.log('Fetching data...');
        checkLogin(email, password)
            .then(loginSuccessful => {
                if (loginSuccessful) {
                    // Handle successful login (e.g., navigate to dashboard)
                    console.log('User logged in successfully');
                } else {
                    // Handle failed login (e.g., display error message)
                    console.log('Login failed. Please check your credentials.');
                }
            })
            .catch(error => {
                // Handle error
                console.error('Login error:', error.response.data);
            });
        }

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
                <CustomButton style={[styles.signUpButton]}onPress={() => navigation.navigate('Signup')} text={"Sign up"} />
                {/* Signin text */}
                <View style={styles.signInContainer}>
                    <Text style={{fontSize:15}}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                        <Text style={[styles.signInText, {color:Colors[colorScheme ?? 'light'].clickableText}]}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const colorScheme = useColorScheme();
    const { height } = useWindowDimensions();
    const { signIn } = useSession();
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const checkLogin = async (email, password) => {
        console.log('Logging');
        try {
            const response = await axios.post('https://sightsaver-api.azurewebsites.net/api/user', {
                email,
                password
            });
            console.log('Login successful:', response.data);
            return response.data; // Assuming the response contains user data upon successful login
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Login failed. Please check your credentials and try again.');
        }
    };
   

    const handleLogin = () => {
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        // Validate all fields filled
        if (!email || !password) {
            alert("Please fill in all fields. If you don't have an account, please sign up.");
            return;}
    
            // Login process 
            console.log('Logging in with:', { email, password })
            checkLogin(email, password)
            .then(userData => {
                console.log(response.data, 'Logged in successfully');
                signIn();
                router.replace('/'); 
                })
            .catch(error => {
                // Handle login failure (e.g., display error message)
                console.error(error.message);
            });        
        };


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
            {/* Login Form */}
            <CustomInput
                style={styles.input}
                placeholder="Email"
                value={email}
                setValue={setEmail}
                autoCapitalize="none"
            />
            {/* <CustomInput
                style={styles.input}
                placeholder="Name"
                value={name}
                setValue={setName}
            /> */}
            <CustomInput
                style={styles.input}
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={!showPassword}
            />

            <View style={styles.container}>
                {/* Show password button */}
            <TouchableOpacity style={{padding:5, borderWidth: 1 ,borderColor:'black' ,color:Colors[colorScheme ?? 'light']}} onPress={toggleShowPassword}>
                <Text>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
            </TouchableOpacity>    
                {/* Login button */}
                <CustomButton style={[styles.signUpButton]} onPress={handleLogin} text={"Login"} />
                {/* Signup text */}
                <View style={styles.signInContainer}>
                    <Text style={{fontSize:15}}>Don't have an account yet?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={[styles.signInText, {color:Colors[colorScheme ?? 'light'].clickableText}]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Google button */}
            {!useKeyboardVisibility() && (<View style={{flex:1, justifyContent:'flex-end'}}>
                <SignInWithGoogleButton />
            </View>)}
        </View>
        );
    };    
    
function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const colorScheme = useColorScheme();
    const { height } = useWindowDimensions();
    const { signIn } = useSession();

    const handleSignup = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        if (!email || !name || !password || !confirmPassword || !termsAccepted || !privacyAccepted) {
            if ((!email || !name || !password || !confirmPassword) && (!termsAccepted || !privacyAccepted)){
                alert('Please fill in all fields and accept the terms and conditions.');
                return;}
            if (!email || !name || !password || !confirmPassword){
                alert('Please fill in all fields.');
                return;}
            if (!termsAccepted || !privacyAccepted){
                alert('Please accept the terms and conditions.');
                return;}
            return;
        }
        if (password !== confirmPassword) {
            alert('Password and confirm password do not match.');
            return;
        }
        // Signup logic
        alert('Signed up successfully!');
        console.log('Signing up with:', { email, name, password });
        // Navigate to another screen upon successful signup
        signIn();
        router.replace('/');
        };

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
                placeholder="Name"
                value={name}
                setValue={setName}
            />
            <CustomInput
                style={styles.input}
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry
            />
            <CustomInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                setValue={setConfirmPassword}
                secureTextEntry
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
                <CustomButton style={[styles.signUpButton]} onPress={handleSignup} text={"Sign up"} />
                {/* Signin text */}
                <View style={styles.signInContainer}>
                    <Text style={{fontSize:15}}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                    <Text style={[styles.signInText, {color:Colors[colorScheme ?? 'light'].clickableText}]}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Google button */}
            {!useKeyboardVisibility() && (<View style={{flex:1, justifyContent:'flex-end'}}>
                <SignInWithGoogleButton />
            </View>)}
        </View>
        );
    };


const Stack = createNativeStackNavigator();
export default function AuthScreens() {
    return (
        console.debug('auth'),
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}}  />
            <Stack.Screen name="Signin" component={SignIn} options={{headerShown:false}} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown:false}} />
        </Stack.Navigator>
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

