import React from 'react';
import { Image, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { useColorScheme } from './useColorScheme';

export default function SignInWithGoogleButton() {
    const colorScheme = useColorScheme();
    
    const handleSignIn = () => {
        // Google OAuth URL
        const authUrl = 'https://accounts.google.com/o/oauth2/auth' +
            '?client_id=YOUR_GOOGLE_CLIENT_ID' +
            '&redirect_uri=YOUR_REDIRECT_URI' +
            '&response_type=token' +
            '&scope=email%20profile';

        // Open Google sign-in page in a WebView
        Linking.openURL(authUrl);
    }

    return (
        <Pressable onPress={handleSignIn} style={styles.container}>
            <Image source={require('../assets/images/google-icon.png')} style={styles.icon} />
            <Text style={styles.text}>Sign in with Google</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#1970B4',
        width: '100%',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginTop: 20,
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
});
