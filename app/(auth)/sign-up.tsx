import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images, quranAll } from "@/constants";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import SocialAuth from "@/components/SocialAuth";
import AppForm from "@/components/form/AppForm";
import { initialValuesSignup, signUpValidationSchema } from "@/lib/schema";
import AppFormField from "@/components/form/AppFormField";
import SubmitButton from "@/components/form/SubmitButton";


import auth from '@react-native-firebase/auth';



const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name:'',
  });

  const router = useRouter();

  const onSignUpPress = (values:{name:string,email:string,password:string})=>{
    const {name,email,password} = values;
    auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
  }
  
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[200px]">
          <Image source={images.quran} className="z-0 w-full h-[200px] " resizeMode="cover" />
          <Text className="text-xl text-white font-JakartaSemiBold absolute bottom-2 left-5">
          Create Your Account
          </Text>
        </View>
       
        <View className="p-5 ">
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
      </View>
    </ScrollView>
  );
};

export default SignUp;
