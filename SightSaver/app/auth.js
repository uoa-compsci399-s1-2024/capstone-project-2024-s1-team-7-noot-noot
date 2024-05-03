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

    const fetchData = () => {
        console.log('Fetching data from API...');
        // axios.get('https://sightsaver-api.azurewebsites.net/api/user')
        //   .then((response) => {
        //     const userData = response.data; // Extracting the data array from the response
            
        //     // Define the email you want to check
        //     const emailToCheck = "admin@gmail.com"; // Replace with the email you want to check
            
        //     // Check if the emailToCheck exists in any user object's 'email' property
        //     const userWithEmail = userData.find(user => user.email === emailToCheck);
            
        //     if (userWithEmail) {
        //       console.log(`Email ${emailToCheck} already exists.`);
        //       console.log(userWithEmail.pa); // Optionally log the user object

        //     } else {
        //       console.log(`Email ${emailToCheck} does not exist.`);
        //     }
            
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
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

    const handleLogin = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        if (!email || !password) {
            alert('Please fill in both email and password fields.');
            return;
        }
    
        try {
            const response = await axios.post('https://sightsaver-api.azurewebsites.net/api/user', {
                email: email,
                password: password
            });
    
            // Assuming the server responds with a success status (e.g., HTTP 200)
            // You can handle the login process here
            console.log('Login successful:', response.data);
    
            // Navigate to another screen upon successful login (example)
            signIn(); // Call your signIn function (e.g., update state, set session)
            navigation.replace('/'); // Navigate to home or dashboard screen
    
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                const status = error.response.status;
                if (status === 404) {
                    // Email not found
                    alert('Email not found. Please check your email address.');
                } else if (status === 401) {
                    // Unauthorized - Invalid password
                    alert('Invalid password. Please check your password.');
                } else {
                    // Other server errors
                    console.error('Server Error:', error.response.data);
                    alert('An unexpected error occurred. Please try again.');
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Request Error:', error.request);
                alert('No response from server. Please try again later.');
            } else {
                // Something else happened in making the request
                console.error('Error:', error.message);
                alert('An unexpected error occurred. Please try again.');
            }
        }
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

            <View style={styles.container}>    
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
        /// Validate email syntax
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        // Validate all fields are filled
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
        // Validate password and confirm password match
        if (password !== confirmPassword) {
            alert('Password and confirm password do not match.');
            return;
        }

        // Signup logic
        axios.get('https://sightsaver-api.azurewebsites.net/api/user')
            .then((response) => {
            const userData = response.data; // Extracting the data array from the response
            
            // Define the email you want to check
            const emailToCheck = "admin@gmail.com"; // Replace with the email you want to check
            
            // Check if the emailToCheck exists in any user object's 'email' property
            const userWithEmail = userData.find(user => user.email === emailToCheck);
            
            if (userWithEmail) {
                console.log(`Email ${emailToCheck} already exists.`);
                // console.log(userWithEmail.parent); // Optionally log the user object
                alert('Email already exists');
                
            } else {
                signIn();
                router.replace('/');        
                console.log(`Email ${emailToCheck} does not exist.`);
            }
            
            })
            .catch((error) => {
            console.log(error);
            });
        // alert('Signed up successfully!');
        // console.log('Signing up with:', { email, name, password });
        // Navigate to another screen upon successful signup
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

