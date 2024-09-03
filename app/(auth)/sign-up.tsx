
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {  Alert, Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

import AppForm from "../../components/form/AppForm";
import { initialValuesSignup, signUpValidationSchema } from "../../lib/schema";
import AppFormField from "../../components/form/AppFormField";
import SubmitButton from "../../components/form/SubmitButton";


import auth from '@react-native-firebase/auth';
import { animations, icons, images } from "../../constants/index";
import SocialAuth from "../../components/SocialAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import LottieView from 'lottie-react-native';




const SignUp = () => {

  const [modalVisible,setModalVisible]=useState<boolean>(false);
  const router = useRouter();
    const capitalize=(str:string)=>{
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    //now give me a function that makes every character in the string lowercase
    const lowercase=(str:string)=>{
      return str.toLowerCase();
    }
   //now give me a function that capitalize only the first letter of the string
   const capitalizeFirstLetter=(str:string)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
   }

  const onSignUpPress = (values:any)=>{
    setModalVisible(true);
    const {name,email,password} = values;
    auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    setModalVisible(false);
    Alert.alert('Welcome!','You have successfully signed up');
    router.replace('/(root)/(tabs)/home')
  })
  .catch(error => {
    setModalVisible(false);
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }
    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }
    console.error(error);
    Alert.alert('Error',error.message);
  });
  }
  
  return (
   <>
    <ScrollView className="flex-1 bg-white">
      <SafeAreaView className="flex-1 bg-white">
        
        <View className="w-full h-[150px]">
        <TouchableOpacity onPress={()=>router.back()} className="absolute top-2 left-4 bg-neutral-100 p-1 rounded-full">
          <MaterialCommunityIcons name='chevron-left' size={28} color='#004d00' />
        </TouchableOpacity>

        <Text style={{flexWrap:'wrap'}} className="text-3xl font-JakartaSemiBold mt-14 pt-2 mx-4" numberOfLines={2}>Hello! Register to get started</Text>
        </View>
       
        <View className="px-5 ">
          <AppForm 
          initialValues={initialValuesSignup}
          validationSchema={signUpValidationSchema}
          onSubmit={onSignUpPress}
          >
            <AppFormField 
                name="name"
                placeholder="enter your name"
                icon={icons.person}
                autoCapitalize="none"
                label="Name"
                />
            <AppFormField 
                name="email"
                placeholder="enter your name"
                icon={icons.email}
                autoCapitalize="none"
                label="Email"
                />
            <AppFormField 
                name="password"
                placeholder="enter your name"
                icon={icons.lock}
                autoCapitalize="none"
                label="Password"
                />

                <SubmitButton title="Sign Up" className="mt-7" />
          </AppForm>
          {/*OAuth */}

        
          <Link
            className="text-md text-center text-general-200 mt-7"
            href="/(auth)/sign-in"
          >
            <Text className="mr-2">Already have an account? </Text>
            <Text className="text-primary-500 font-JakartaBold">Sign In!</Text>
          </Link>
        </View>

        <View className="flex flex-row justify-center items-center mt-3 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
     <SocialAuth />
        {/*Verification Modal */}



        
      </SafeAreaView>
    </ScrollView>
    <Modal style={{flex:1}} visible={modalVisible} transparent={false} >
      <View className="flex-1 justify-center items-center">
        <LottieView style={{width:200,height:200}} source={animations.quranAnimation} autoPlay loop />
      </View>
    </Modal>
    </>
  );
};

export default SignUp;
