import {AuthProvider, useAuth } from '../ctx';
import {Stack ,useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';

const StackLayout = () => {
	const { authState, onLogout } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		const inAuthGroup = segments[0] === '(entry)';

		if (!authState?.authenticated && inAuthGroup) {
			router.replace('/');
		} else if (authState?.authenticated === true) {
			router.replace('/(entry)');
		}
	}, [authState]);

	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="(entry)" options={{ headerShown: false }} />
			<Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
			<Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
		</Stack>
	);
};

const RootLayoutNav = () => {
	return (
		<AuthProvider>
			<StackLayout />
		</AuthProvider>
	);
};

export default RootLayoutNav;
