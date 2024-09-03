
import { animations, icons, images } from "../../constants/index";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import auth from '@react-native-firebase/auth';

import {StatusBar} from 'expo-status-bar';
import SocialAuth from "../../components/SocialAuth";
import AppForm from "../../components/form/AppForm";
import { initialValuesSignin, signInValidationSchema } from "../../lib/schema";
import AppFormField from "../../components/form/AppFormField";
import SubmitButton from "../../components/form/SubmitButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";


import LottieView from 'lottie-react-native';





const SignIn = () => {
  const [modalVisible,setModalVisible]=useState<boolean>(false);
  const router = useRouter();

  const onSignInPress = (values:any)=>{
    setModalVisible(true);

    const {email,password} = values;

    auth()
  .signInWithEmailAndPassword(email, password)
  .then(() => {
    setModalVisible(false);
    Alert.alert('Welcome back!','You have successfully signed in');
    router.replace("/(root)/(tabs)/home");
  })
  .catch(error => {
   setModalVisible(false);
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
    <>
    <ScrollView className="flex-1 bg-white">
      <StatusBar style='dark' />
      <SafeAreaView className="flex-1 bg-white">
      <View className="w-full h-[150px]">
        <TouchableOpacity onPress={()=>router.back()} className="absolute top-2 left-4 bg-neutral-100 p-1 rounded-full">
          <MaterialCommunityIcons name='chevron-left' size={28} color='#004d00' />
        </TouchableOpacity>

        <Text style={{flexWrap:'wrap'}} className="text-3xl font-JakartaSemiBold mt-14 pt-2 mx-4" numberOfLines={2} adjustsFontSizeToFit>Welcome back! Glad to see you, Again!</Text>
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
            className="text-md text-center text-general-200 mt-7 "
            href="/sign-up"
          >
            <Text className="mr-2">Don't have an account? </Text>
            <Text className="text-primary-500 font-JakartaBold">Sign Up!</Text>
          </Link>
        </View>

        <View className="flex flex-row justify-center items-center mt-2 gap-x-3">
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

export default SignIn;
