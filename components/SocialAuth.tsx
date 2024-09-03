import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { icons } from '../constants/index'

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';



const SocialAuth = () => {

  // async function onGoogleButtonPress() {
  //   // Check if your device supports Google Play
  //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //   // Get the users ID token
  //   const { idToken } = await GoogleSignin.signIn();
  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(googleCredential);
  // }
  // the above is not right well with conditions and error handling give a clean code for google press

  const onPressGoogleAuth = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log("userinfo", userInfo);
        router.push('/(root)/(tabs)/home')

    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log(error)
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log(error)
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log(error)
        } else {
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
        onPress={()=>onPressGoogleAuth()}
      
        />
      
        </View>
</>
  )
}

export default SocialAuth

const styles = StyleSheet.create({})