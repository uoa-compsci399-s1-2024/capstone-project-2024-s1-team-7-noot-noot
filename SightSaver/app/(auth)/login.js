import Colors from '../../constants/Colors';
import { View, Text } from '../../components/Themed';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useColorScheme } from '../../components/useColorScheme';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { ActivityIndicator, Keyboard, Button, StyleSheet, useWindowDimensions, Image, TouchableOpacity} from 'react-native';
import { useAuth } from "../../ctx";


const Login = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const colorScheme = useColorScheme();
    const { height } = useWindowDimensions();
    const [showPassword, setShowPassword] = useState(false);
    const { onLogin } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const login = async () => {
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        // Validate all fields filled 
        if (!email || !password) {
            alert("Please fill in all fields. If you don't have an account, please sign up.");
            return;
        }
        // Call login function
        try {
            Keyboard.dismiss();
            setIsLoading(true); // Start loading
            console.log('Login');
            const result = await onLogin(email, password);
            if (result) {
                console.log("Login Success", result.data);
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setTimeout(() => {
                setIsLoading(false); // Stop loading
            },1000)

        }
    }

    const skipLogin = async () => {
        setIsLoading(true);
        console.log('Skip Login');
        const result = await onLogin('iru007@gmail.com', 'Iru007!!')
        if (result) {
            console.log("Login Success", result.token);
        } else {
            console.log('Login failed');
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }


    return(
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
                {/* Login button */}
                <CustomButton style={[styles.signUpButton]} onPress={login} text={"Login"} />
                {/* Signup text */}
                <View style={styles.signInContainer}>
                    <Text style={{fontSize:15}}>Don't have an account yet?</Text>
                    <TouchableOpacity onPress={() => router.replace('/(auth)/signup')}>
                    <Text style={[styles.signInText, {color:Colors[colorScheme ?? 'light'].clickableText}]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <Button title="Skip Login" onPress={skipLogin} />
            </View>

            {/* Loading Indicator */}
            {isLoading && (
                <View style={[styles.loadingContainer]}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </View>
    )
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
    signUpButton: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
        justifyContent: 'center',
    },
});



export default Login;