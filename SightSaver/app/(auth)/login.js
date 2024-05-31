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
            setIsLoading(false);
            return;
        }

        if (!email || !password) {
            alert("Please fill in all fields. If you don't have an account, please sign up.");
            setIsLoading(false);
            return;
        }

        try {
            Keyboard.dismiss();
            setIsLoading(true);
            await onLogin(email, password);
        } catch (error) {
            alert('Invalid email or password. Please try again.');
            setIsLoading(false);
        }
    }

    const skipLogin = async () => {
        try {
            Keyboard.dismiss();
            setIsLoading(true);
            await onLogin('iru007@gmail.com', 'Iru007!!')
        } catch (error) {
            alert('Invalid email or password. Please try again.');
            setIsLoading(false);
        } 
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
                keyboardType={"email-address"}
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
                keyboardType={"default"}
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

            <View style={{marginTop: '10%'}}>
                <Button title="Skip Login" onPress={skipLogin} />
            </View>

            {/* Loading Indicator */}
            {isLoading && (
                <View style={[styles.loadingContainer]}>
                    <ActivityIndicator size="large" color="#23A0FF" />
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
        paddingTop: '10%',
        paddingHorizontal: '10%',
        paddingBottom: '10%',
    },
    imageContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
    logo: {
        width: '100%',
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