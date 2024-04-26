// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Redirect, Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useColorScheme } from '../../components/useColorScheme';
// import { useSession } from '../../ctx';

// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };


// export default function RootLayout({isActive}) {
  
//   const colorScheme = useColorScheme();


//   const { session, isLoading } = useSession();
  
//   if(!session){
//     console.debug('No session found, redirecting to signin');
//     return <Redirect href='/signin' />
//   }
  
  
//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="settings" options={{ headerShown: false }}/>
//       </Stack>
//     </ThemeProvider>
//   );
// }

import { Redirect, Stack } from 'expo-router';
import { Text } from 'react-native';
import { useSession } from '../../ctx';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '../../components/useColorScheme';

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme();

  // // You can keep the splash screen open, or render a loading screen like we do here.
  // if (isLoading) {
  //   console.debug('No session found, redirecting to loading');
  //   return <Text>Loading...</Text>;
  // }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    console.debug('No session found, redirecting to sign');

    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/auth" />;
  }

  // This layout can be deferred because it's not the root layout.
  return(
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }}/>
        </Stack>
      </ThemeProvider>
  )
    ;
}
