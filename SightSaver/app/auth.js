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
    const { signIn } = useSession();
    const colorScheme = useColorScheme();
    const { height } = useWindowDimensions();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={[styles.root, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
            <Image 
                source={Colors[colorScheme ?? 'light'].image} 
                style={[styles.logo, {height: height * 0.04}]} 
                rezizeMode='contain'
            />
            <View style={styles.inputContainer}>
                <CustomInput 
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                />
                <CustomInput 
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                />
                <CustomButton onPress={() => {
                    signIn();
                    // Navigate after signing in. You may want to tweak this to ensure sign-in is
                    // successful before navigating.
                    router.replace('/');
                  }}
                    text={"Login"}
                />
            </View>
            <View style={styles.googleLogin}>
                <CustomButton onPress={() => {
                    signIn();
                    // Navigate after signing in. You may want to tweak this to ensure sign-in is
                    // successful before navigating.
                    router.replace('/');
                  }}
                    text={"Login with Google"}
                />
            </View>
        </View>
    );
}


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
            if ((!email || !name || !password || !confirmPassword) && (!termsAccepted || !privacyAccepted))
                alert('Please fill in all fields and accept the terms and conditions.');
            if (!email || !name || !password || !confirmPassword)
                alert('Please fill in all fields.');
            if (!termsAccepted || !privacyAccepted)
                alert('Please accept the terms and conditions.');
            return
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

            <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => {
                // initiate sign in
            }}
            disabled={isInProgress}
            />;
        {/*<CustomButton onPress={handleSignup} text="Sign up" />

            <View style={styles.signInContainer}>
                <Text style={styles.text}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                    <Text style={styles.signInText}>Login</Text>
                </TouchableOpacity>
            </View> */}

            {/* Sign up with Google button (can be implemented as CustomButton) */}
            {/* <CustomButton onPress={handleGoogleSignup} text="Sign up with Google" /> */}
        </View>
        );
    };
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { signIn } = useSession();

//     const handleSignin = () => {
//         navigation.navigate('Signin');
//     };

//     const handleSignup = () => {
//         signIn();
//         console.log('Signing up with:', { email, password });
//         router.replace('/')
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Signup</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 value={email}
//                 onChangeText={setEmail}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 secureTextEntry
//                 value={password}
//                 onChangeText={setPassword}
//             />
//             <Button title="Sign up" onPress={handleSignup} />
//             <Text style={styles.text}>Already have an account?</Text>
//             <Button title="Sign in" onPress={handleSignin} />
//         </View>
//     );
// }


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
        paddingBottom: '25%',
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
    //Signup Screen
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

