import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Teacher } from "@/types/type";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/constants";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface UpdatedPropsTeacherBox {
  teacher: Teacher;
  onPress: () => void;
}

const TeachBox = ({ teacher, onPress }: UpdatedPropsTeacherBox) => {
  const scale = useSharedValue(0); // Initial scale set to 0 (hidden)

  useEffect(() => {
    scale.value = withTiming(1, { duration: 500 });
    return () => {
      scale.value = withTiming(0, { duration: 500 });
    };
  }, []);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const isPressed = useSharedValue(false);
  //scale to -50 when pressed

  const animateddStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: isPressed.value ? withSpring(0.8) : withSpring(1) }], // Scale down to 90% when pressed
    };
  });

  return (
    <AnimatedPressable
      onPressIn={() => (isPressed.value = true)}
      onPressOut={() => (isPressed.value = false)}
      onPress={onPress}
      style={[animatedStyle, animateddStyle]}
    >
      <View className="bg-white mb-2 rounded-2xl overflow-hidden flex flex-row min-h-[90px]">
        <Image
          source={{ uri: teacher.profilePicture }}
          className="w-[30%] h-[100%]"
          contentFit="cover"
        />

        <View className="ml-2 p-4">
          <View className="flex flex-row items-center gap-2">
            <Text className="text-xl font-JakartaSemiBold">{teacher.name}</Text>
            <Text className="text-sm text-neutral-400 font-JakartaSemiBold">
              {teacher.hafiz?.toLocaleLowerCase() === "yes" ? "(Hafiz)" : ""}
            </Text>
          </View>
          <View className="flex flex-row items-center mt-2 gap-2">
            <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
            <Text className="text-neutral-500 font-JakartaBold">
              {teacher.rating}
            </Text>
          </View>
          <View className="flex flex-row items-center mt-2">
            <MaterialCommunityIcons
              name="map-marker"
              size={10}
              color={colors.primary}
            />
            <Text className="font-JakartaLight text-[10px]">
              {teacher.city}
            </Text>
          </View>
        </View>
      </View>
    </AnimatedPressable>
  );
};

export default TeachBox;
