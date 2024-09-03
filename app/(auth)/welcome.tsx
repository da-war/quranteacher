import { Button, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Welcome = () => {


  return (
    <SafeAreaView className="flex-1 h-fullitems-center bg-white">
      
     <View  className="gap-2 mt-10 px-5 my-2">
      <Text className="text-primary-600 font-JakartaBold text-2xl text-center">Quran Teacher</Text>
      <Text className="text-secondary-400 text-md text-center font-JakartaSemiBold">Muhammad (PBUH) said; </Text>
      <Text className="text-secondary-400 text-lg mx-2 text-center font-JakartaBold ">The best among you (Muslims) are those who learn the Qur'an and teach it. </Text>
      <Text className="text-secondary-500 text-sm text-right font-Jakarta mr-6">Volume 6, Book 61, Number 546</Text>
      </View>

      <View className="justify-center items-center -mt-10">
        <Image resizeMode="contain" className="h-[75%]" source={images.onboard} />
        <CustomButton onPress={()=>router.push('/(auth)/sign-up')} bgVariant="secondary" title="Get Started" className="w-[200px] -mt-6" />
      </View>
   
     
    </SafeAreaView>
  );
};

export default Welcome;
