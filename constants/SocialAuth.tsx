import { Image, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import { icons } from './index';
import { router } from 'expo-router';


import {
  GoogleOneTapSignIn,
  statusCodes,
  isErrorWithCode,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'; // Firebase Auth
import firestore from '@react-native-firebase/firestore'; // Firestore

const SocialAuth = () => {
  const signInWithGoogle = async () => {
    try {
      // Check for Play Services
      await GoogleSignin.hasPlayServices();
      
      // Perform Google One Tap Sign-In
      const response = await GoogleOneTapSignIn.signIn();
      
      if (isSuccessResponse(response)) {
        const { idToken, accessToken, user } = response.data;
  
        // Create Firebase credentials with the Google token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);
        
        // Sign in to Firebase using the Google credentials
        const firebaseUserCredential = await auth().signInWithCredential(googleCredential);
        
        // Get the Firebase authenticated user ID
        const { uid, email, displayName } = firebaseUserCredential.user;
        
        // Store user data in Firestore (if user is new or updating their data)
        await storeUserDataInFirestore(uid, {
          uid,
          name: displayName || user.name,
          email: email || user.email,
          createdAt: firestore.FieldValue.serverTimestamp(),
          otherCustomData: "Some custom data for the user",
        });
  
        console.log('User signed in and saved in Firestore:', uid);
      } else if (isNoSavedCredentialFoundResponse(response)) {
        // Handle the case where no saved credential was found
        console.log('No saved credential found, maybe prompt for account creation');
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.ONE_TAP_START_FAILED:
            console.error('Google One Tap Start Failed');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.error('Play services not available or outdated');
            break;
          default:
            console.error('Other error:', error.message);
        }
      } else {
        console.error('Non-Google sign-in error:', error.message);
      }
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
    <>
      <Text className="text-md text-center font-JakartaBold mt-4">Continue With</Text>
      <View className="flex flex-row justify-between mx-5 mt-4">
        <CustomButton
          bgVariant="outline"
          title="Google"
          IconLeft={() => (
            <Image
              source={icons.google}
              resizeMode="contain"
              className="w-5 h-5 mx-2"
            />
          )}
          textVariant="primary"
          className={`w-full`}
          onPress={signInWithGoogle}
        />
      </View>
    </>
  );
};

export default SocialAuth;
