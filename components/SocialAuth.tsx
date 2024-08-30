import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { icons } from '@/constants'

const SocialAuth = () => {
  return (
   <>
    <Text className="text-md text-center font-JakartaBold my-2">Continue With</Text>
        <View className="flex flex-row justify-between gap-2 mx-5">
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
        className="w-[46%]"
      
        />
          <CustomButton 
          bgVariant="outline" 
          title="Google" 
          IconLeft={() => (
          <Image
            source={icons.apple}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )} 
        textVariant="primary" 
        className="w-[46%]"
      
        />
        </View>
</>
  )
}

export default SocialAuth

const styles = StyleSheet.create({})