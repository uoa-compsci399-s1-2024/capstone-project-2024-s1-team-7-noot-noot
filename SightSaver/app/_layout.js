import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { SessionProvider } from '../ctx';
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Root() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
   if (error) throw error;
 }, [error]);

   useEffect(() => {
    if (loaded) {
      console.debug('Hiding splash screen');
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Render the main content once assets are loaded
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
