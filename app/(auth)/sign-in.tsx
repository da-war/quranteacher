import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import auth from '@react-native-firebase/auth';


const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const onSignInPress = ()=>{
    auth()
  .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
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
        <View className="relative w-full h-[250px]">
          <Image source={images.quran} className="z-0 w-full h-[250px] " />
          <Text className="text-xl text-white font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome Back!
          </Text>
        </View>
        <View className="p-5 ">
          <InputField
            label="Email"
            placeholder="enter your email"
            icon={icons.person}
            value={form.email}
            onChangeText={(text: string) => setForm({ ...form, email: text })}
          />
          <InputField
            label="Password"
            placeholder="enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(text: string) =>
              setForm({ ...form, password: text })
            }
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />
          {/*OAuth */}

   
          <Link
            className="text-lg text-center text-general-200 mt-10 font-JakartaBold"
            href="/sign-up"
          >
            <Text className="mr-2">Don't have an account? </Text>
            <Text className="text-primary-500">Sign Up!</Text>
          </Link>
        </View>

        {/*Verification Modal */}
      </View>
    </ScrollView>
  );
};

export default SignIn;
