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
// import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import SignInWithGoogleButton from '../components/SignInGoogle';

function WelcomeScreen({ navigation }) {
    const colorScheme = useColorScheme();
    const { height } = useWindowDimensions();
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
                <CustomButton style={[styles.signUpButton]}onPress={() => navigation.navigate('Signup')} text={"Sign up"} />
                {/* Signin text */}
                <View style={styles.signInContainer}>
                    <Text style={{fontSize:15}}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                        <Text style={styles.signInText}>Login</Text>
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

    const handleLogin = () => {
        if (!email || !name || !password) {
            alert("Please fill in all fields. If you don't have an account, please sign up.");
            return;}

        // Login logic
        console.log('Signing in with:', { email, name, password });
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
            {/* Login Form */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={styles.container}>    
                {/* Login button */}
                <CustomButton style={[styles.signUpButton]} onPress={handleLogin} text={"Login"} />
                {/* Signup text */}
                <View style={styles.signInContainer}>
                    <Text style={{fontSize:15}}>Don't have an account yet?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signInText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Google button */}
            <View style={{flex:1, justifyContent:'flex-end'}}>
                <SignInWithGoogleButton />
            </View>
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
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            {/* Terms of serivce*/}
            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setTermsAccepted(!termsAccepted)}>
                    {termsAccepted && <Text>✓</Text>}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>I have read and accept the Terms of Service</Text>
            </View>
            {/* Privacy Policy */}
            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setPrivacyAccepted(!privacyAccepted)}>
                    {privacyAccepted && <Text>✓</Text>}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>I have read and accept the Privacy policy</Text>
            </View>

            <View style={styles.container}>    
                {/* Signup button */}
                <CustomButton style={[styles.signUpButton]} onPress={handleSignup} text={"Sign up"} />
                {/* Signin text */}
                <View style={styles.signInContainer}>
                    <Text style={{fontSize:15}}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                        <Text style={styles.signInText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Google button */}
            <View style={{flex:1, justifyContent:'flex-end'}}>
                <SignInWithGoogleButton />
            </View>
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
        height: '100%',
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
        color: 'blue',
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

