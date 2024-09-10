import { Image, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import { icons } from './index';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import { router } from 'expo-router';

const SocialAuth = () => {
  const onPressGoogleAuth = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Sign in with Google in Firebase
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);

      // Update the display name in Firebase Auth
      await userCredential.user.updateProfile({
        displayName: userInfo.user.name,
      });

      // Store the user info (name and email) in Firestore
      await firestore()
        .collection('users') // Firestore collection
        .doc(userCredential.user.uid) // Use user's unique Firebase UID as document ID
        .set({
          name: userInfo.user.name,
          email: userInfo.user.email,
        }, { merge: true }); // Merging in case the document already exists

      // Redirect to a different route
      router.push('/(root)/(tabs)/home'); // Update to your desired route

    } catch (error: Error | any) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
      } else {
        console.error(error);
      }
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
          onPress={onPressGoogleAuth}
        />
      </View>
    </>
  );
};

export default SocialAuth;
