import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { icons } from './index';
import * as Animatable from 'react-native-animatable';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'; // Firebase Auth
import firestore from '@react-native-firebase/firestore'; // Firestore
import { User } from '@/types/type'; // Your custom type

// Configure Google Signin
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com', // Replace with your Google Web Client ID
});

const SocialAuth = () => {

  useEffect(() => {
    // Check if user is already signed in
    const checkAuthStatus = async () => {
      const currentUser = await GoogleSignin.getCurrentUser();
      if (currentUser) {
        const idToken = await GoogleSignin.getTokens();
        signInWithFirebase(idToken.idToken); // Automatically sign in if user is already authenticated
      }
    };
    checkAuthStatus();
  }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = await GoogleSignin.getTokens();

      // Sign in with Firebase using the ID token
      signInWithFirebase(idToken.idToken);
    } catch (error: any) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.error('Some other error:', error);
      }
    }
  };

  // Function to sign in with Firebase using Google ID Token
  const signInWithFirebase = async (idToken: string | null) => {
    if (!idToken) return;
  
    try {
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const { uid, displayName, email } = userCredential.user;
  
      // Store or update user data in Firestore
      await storeUserDataInFirestore(uid, {
        name: displayName ?? '',
        email: email ?? '',
        id: uid, // Using 'id' as the field for Google user's uid
        registeredOn:firestore.FieldValue.serverTimestamp(),
        role:'student',
      });
  
      console.log('User successfully signed in with Firebase');
      
    } catch (error) {
      console.error('Firebase sign-in error:', error);
    }
  };
  
  // Function to store user data in Firestore
  const storeUserDataInFirestore = async (uid: string, userData: User) => {
    try {
      const userDoc = firestore().collection('users').doc(uid);

      // Check if the user document already exists
      const docSnapshot = await userDoc.get();
      if (!docSnapshot.exists) {
        // If the document does not exist, create a new one
        await userDoc.set(userData);
        console.log('New user document created');
      } else {
        // If the document exists, update it if needed
        await userDoc.update(userData);
        console.log('User document updated');
      }
    } catch (error) {
      console.error('Error storing user data in Firestore:', error);
    }
  };

  return (
    <Animatable.View
      animation='slideInUp'
      duration={500}
      className='justify-center items-center mt-3'
    >
      <Text className='text-lg font-JakartaBold text-neutral-500 mb-3'>Continue With</Text>
      <View className='flex flex-row items-center justify-center mx-4'>
        <CustomButton
          bgVariant="outline"
          title="Google"
          IconLeft={() => (
            <Image
              source={icons.google}
              resizeMode="contain"
              style={{ width: 20, height: 20, marginRight: 10 }}
            />
          )}
          textVariant="primary"
          style={{ width: '100%' }}
          onPress={googleLogin}
        />
      </View>
    </Animatable.View>
  );
};

export default SocialAuth;
