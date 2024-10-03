import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Teacher } from "@/types/type";
import { Image } from "expo-image";
import * as Animateable from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/constants";
const TeachBox = ({
  name,
  profilePicture,
  rating,
  city,
  hafiz,
  phone,
}: Teacher) => {
  console.log("Teacher", name);
  console.log("Teacher", profilePicture);
  return (
    <Animateable.View
      animation={"slideInUp"}
      duration={1000}
      className="bg-white my-2 rounded-2xl overflow-hidden flex flex-row min-h-[90px]"
    >
      <Image
        source={{ uri: profilePicture }}
        className="w-[30%] h-[100%]"
        contentFit="cover"
      />

      <View className="ml-2 p-4">
        <View className="flex flex-row items-center gap-2">
          <Text className="text-xl font-JakartaSemiBold">{name}</Text>
          <Text className="text-sm text-neutral-400 font-JakartaSemiBold">
            {hafiz?.toLocaleLowerCase() === "yes" ? "(Hafiz)" : ""}
          </Text>
        </View>
        <View className="flex flex-row items-center mt-2 gap-2">
          <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
          <Text className="text-neutral-500 font-JakartaBold">{rating}</Text>
        </View>
        <View className="flex flex-row items-center mt-2">
          <MaterialCommunityIcons
            name="map-marker"
            size={10}
            color={colors.primary}
          />
          <Text className="font-JakartaLight text-[10px]">{city}</Text>
        </View>
      </View>
    </Animateable.View>
  );
};

export default TeachBox;

const styles = StyleSheet.create({});
