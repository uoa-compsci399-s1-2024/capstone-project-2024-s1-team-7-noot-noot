// import React from 'react';
// import { View, Text } from '../components/Themed';
// import { StyleSheet, Image, Button, useWindowDimensions } from 'react-native';
// import Colors from '../constants/Colors';
// import { useColorScheme } from '../components/useColorScheme';
// import CustomInput from '../components/CustomInput';
// import { useState } from 'react';
// import CustomButton from '../components/CustomButton';

// export default function SignInScreen({ onSignIn }) {
//     const colorScheme = useColorScheme();
//     const { height } = useWindowDimensions();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     return (
//         <View style={[styles.root, {backgroundColor:Colors[colorScheme ?? 'light'].background}]}>
//             <Image 
//                 source={Colors[colorScheme ?? 'light'].image} 
//                 style={[styles.logo, {height: height * 0.04}]} 
//                 rezizeMode='contain'
//             />
//             <View style={styles.inputContainer}>
//                 <CustomInput 
//                     placeholder="Email"
//                     value={email}
//                     setValue={setEmail}
//                 />
//                 <CustomInput 
//                     placeholder="Password"
//                     value={password}
//                     setValue={setPassword}
//                     secureTextEntry={true}
//                 />
//                 <CustomButton onPress={onSignIn} 
//                     text={"Login"}
//                 />
//             </View>
//             <View style={styles.googleLogin}>
//                 <CustomButton onPress={onSignIn} 
//                     text={"Login with Google"}
//                 />
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     root: {
//         height: '100%',
//         alignItems: 'center',
//         paddingHorizontal: '10%',
//         paddingTop: '25%',
//     },
//     logo: {
//         width: '100%',
//         maxWidth: 400,
//         maxHeight: 300,
//         paddingBottom: 20,
//     },
//     inputContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '100%',
//         paddingTop: '15%',
//     },
//     googleLogin: {
//         position: 'absolute',
//         bottom: '10%',
//         width: '100%',
//     }
// })


import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { useSession } from '../ctx';

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('/');
        }}>
        Sign In
      </Text>
    </View>
  );
}
