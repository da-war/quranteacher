import { ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";

import { useTeacherStore } from "@/store/useTeacherStore";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/global/BackButton";
import BackgroundGradient from "@/components/BackgroundGradient";

const TeacherProfile = () => {
  const { teacher } = useTeacherStore();

  console.log("Teacher", teacher?.name);

  return (
    <SafeAreaView className="flex-1">
      s
      <View className="bg-primary-500 p-3">
        <BackButton title="Profile" titleStyle="text-white" />
      </View>
      <View className="flex-1">
        <ScrollView>
          <View className="h-[250px] rounded-bl-[50px] rounded-br-[50px] overflow-hidden">
            <BackgroundGradient opacity={0.1} />

            <View className="justify-center items-center py-3">
              <Image
                source={{ uri: teacher?.profilePicture }}
                className="w-[120px] h-[120px] rounded-full"
                contentFit="cover"
              />
              <Text className="text-lg font-JakartaMedium mt-3">
                {teacher?.name}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TeacherProfile;
