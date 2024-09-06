import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { icons } from '../constants/index'

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';



const SocialAuth = () => {
  const onPressGoogleAuth = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
       //is it connected with firebase auth
       auth().signInWithCredential(auth.GoogleAuthProvider.credential(userInfo.idToken)).then(()=>{
        router.push('/(root)/(tabs)/home')
       })


    } catch (error:Error | any) {
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