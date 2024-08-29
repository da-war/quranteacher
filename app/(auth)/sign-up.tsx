import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const onSignUpPress = ()=>{}
  
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.quran} className="z-0 w-full h-[250px] " />
          <Text className="text-xl text-white font-JakartaSemiBold absolute bottom-5 left-5">
          Create Your Account
          </Text>
        </View>
        <View className="p-5 ">
          <InputField
            label="Name"
            placeholder="enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(text: string) => setForm({ ...form, name: text })}
          />
          <InputField
            label="Email"
            placeholder="enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(text: string) => setForm({ ...form, email: text })}
          />

          <InputField
            label="Password"
            placeholder="enter your password"
            icon={icons.lock}
            secureTextEntry
            value={form.password}
            onChangeText={(text: string) =>
              setForm({ ...form, password: text })
            }
          />

          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />
          {/*OAuth */}

        
          <Link
            className="text-lg text-center text-general-200 mt-10"
            href="/(auth)/sign-in"
          >
            <Text className="mr-2">Already have an account? </Text>
            <Text className="text-primary-500">Sign In!</Text>
          </Link>
        </View>

        {/*Verification Modal */}
      </View>
    </ScrollView>
  );
};

export default SignUp;
