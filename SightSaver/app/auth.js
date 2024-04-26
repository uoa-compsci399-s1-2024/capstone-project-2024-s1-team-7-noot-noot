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

function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to SightSaver</Text>

            <Text style={styles.text}>Sign up now to start using our app.</Text>
            <Button title="Sign up" onPress={() => navigation.navigate('Signup')} />

            <Text style={styles.text}>Been here before?</Text>
            <Button title="Sign in" onPress={() => navigation.navigate('Signin')} />

        </View>
    );
}


function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useSession();

    const handleSignin = () => {
        navigation.navigate('Signin');
    };

    const handleSignup = () => {
        signIn();
        console.log('Signing up with:', { email, password });
        router.replace('/')
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Sign up" onPress={handleSignup} />
            <Text style={styles.text}>Already have an account?</Text>
            <Button title="Sign in" onPress={handleSignin} />
        </View>
    );
}




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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      
  },
  input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 20,
      padding: 10,
  },
  text: {
      marginTop: 20,
      marginBottom: 10,
  },
      root: {
        height: '100%',
        alignItems: 'center',
        paddingHorizontal: '10%',
        paddingTop: '25%',
    },
    logo: {
        width: '100%',
        maxWidth: 400,
        maxHeight: 300,
        paddingBottom: 20,
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: '15%',
    },
    googleLogin: {
        position: 'absolute',
        bottom: '10%',
        width: '100%',
    }
});

