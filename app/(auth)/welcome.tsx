import { Button, Image, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex-1 h-full justify-between items-center bg-white">
      <TouchableOpacity
        className="w-full flex justify-end items-end p-5"
        onPress={() => router.replace("/(auth)/sign-up")}
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        index={activeIndex}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-primary-500 rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View className="flex justify-center items-center" key={item.id}>
            <Image
              resizeMode="contain"
              source={item.image}
              className="w-full h-[300px] mb-10"
            />
            <Text className="text-black text-3xl font-JakartaBold mx-10 text-center">
              {item.title}
            </Text>
            <Text className="text-black text-md text-center mt-5 mx-10 font-JakartaSemiBold text-[#858585]">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        className={`w-11/12 mb-5`}
        onPress={() => {
          if (isLastSlide) {
            router.replace("/(auth)/sign-up");
          } else {
            swiperRef.current?.scrollBy(1);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default Welcome;
