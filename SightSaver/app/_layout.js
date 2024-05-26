import {AuthProvider, useAuth } from '../ctx';
import {Stack ,useRouter, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { getUserDetails, setUserDetails } from '../ctx';

const StackLayout = () => {
	const { authState } = useAuth();
	const segments = useSegments();
	const router = useRouter();
	
	// State to hold user details upon launching app
	const fetchUserDetails = async () => {
		try {
		  const userDetails = await getUserDetails();
		  if (userDetails) {
			console.log('User details:', userDetails);
			await setUserDetails(userDetails.username, userDetails.email);

		  }
		} catch (error) {
		  console.error('Error fetching user details:', error);
		}
	  };

	useEffect(() => {
		const inAuthGroup = segments[0] === '(entry)';

		if (!authState?.authenticated && inAuthGroup) {
			router.replace('/');
			console.log('replacing')
		} else if (authState?.authenticated === true) {
			console.log("Loading User Details")
			fetchUserDetails().then(() => {
				router.replace('/(entry)');
				console.log('replacing index')
			});
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
