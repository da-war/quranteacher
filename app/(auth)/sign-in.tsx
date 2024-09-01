
import { icons, images } from "@/constants";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import auth from '@react-native-firebase/auth';

import {StatusBar} from 'expo-status-bar';
import SocialAuth from "@/components/SocialAuth";
import AppForm from "@/components/form/AppForm";
import { initialValuesSignin, signInValidationSchema } from "@/lib/schema";
import AppFormField from "@/components/form/AppFormField";
import SubmitButton from "@/components/form/SubmitButton";



const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const onSignInPress = (values:{email:string,password:string})=>{

    const {email,password} = values;

    auth()
  .signInWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User signed in!');
    router.replace("/(root)/(tabs)/home");
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      Alert.alert('That email address is invalid!');
    }

    console.error(error);
  });

    
  }

  
  return (
    <ScrollView className="flex-1 bg-white">
      <StatusBar style='light' />
      <View className="flex-1 bg-white">
      <View className="relative w-full h-[200px]">
          <Image source={images.quran} className="z-0 w-full h-[200px] " resizeMode="cover" />
          <Text className="text-xl text-white font-JakartaSemiBold absolute bottom-2 left-5">
          Welcome Back
          </Text>
        </View>
        <View className="p-5 ">
        <AppForm
          initialValues={initialValuesSignin}
          validationSchema={signInValidationSchema}
          onSubmit={onSignInPress}
          >
            
            <AppFormField 
                name="email"
                placeholder="dawar@gmail.com"
                icon={icons.email}
                autoCapitalize="none"
                label="Email"
                />
            <AppFormField 
                name="password"
                placeholder="enter your password"
                icon={icons.lock}
                autoCapitalize="none"
                label="Password"
                />

                <SubmitButton title="Sign In" className="mt-7" />
          </AppForm>
          {/*OAuth */}

   
          <Link
            className="text-md text-center text-general-200 mt-10 "
            href="/sign-up"
          >
            <Text className="mr-2">Don't have an account? </Text>
            <Text className="text-primary-500 font-JakartaBold">Sign Up!</Text>
          </Link>
        </View>

        <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
            <View className="flex-1 h-[1px] bg-general-100" />
            <Text className="text-lg">Or</Text>
            <View className="flex-1 h-[1px] bg-general-100" />
        </View>


        <SocialAuth />

        {/*Verification Modal */}


        
      </View>
    </ScrollView>
  );
};

export default SignIn;
