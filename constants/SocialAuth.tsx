import { Image, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import { icons } from './index';
import { router } from 'expo-router';


import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';

import firestore from '@react-native-firebase/firestore'; // Firestore
import { User } from '@/types/type';

import * as Animateable from 'react-native-animatable';

const SocialAuth = () => {

  const googleLogin = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const userId = userInfo.data?.user.id.toString();
        storeUserDataInFirestore(userId!, {
            name: userInfo.data?.user?.name!,
            email: userInfo.data?.user?.email!,
            uid: userInfo.data?.user?.id!
        })

    } catch (error:any) {
        if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log(error)
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log(error)
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log(error)
        } else {
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
    <Animateable.View 
      animation='slideInUp'
      duration={500} 
      className='justify-center items-center mt-3'
    >
      <Text className='text-lg font-JakartaBold text-neutral-500'>Continue With</Text>
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
          onPress={googleLogin}
        />
      </View>
    </Animateable.View>
  );
};

export default SocialAuth;
