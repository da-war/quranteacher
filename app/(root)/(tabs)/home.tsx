import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Platform } from "react-native";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import BackgroundGradient from "../../../components/BackgroundGradient";
import HomeCard from "../../../components/home/HomeCard";
import Teacher from "@/components/home/Teacher";

import firestore from "@react-native-firebase/firestore";
import { getTeacherAppliedJobs, getTeacherFromAsyncStorage } from "@/utils";
import { useTeacherStore } from "@/store/useTeacherStore";
import { useUserStore } from "@/store/useUserStore";

const teachers = [
  {
    id: 1,
    name: "Dawar",
    image: "https://picsum.photos/200/300?random=1",
  },
  {
    id: 2,
    name: "Abdulrahman",
    image: "https://picsum.photos/200/300?random=2",
  },
  {
    id: 3,
    name: "Abdulrahman",
    image: "https://picsum.photos/200/300?random=3",
  },
  {
    id: 4,
    name: "Abdulrahman",
    image: "https://picsum.photos/200/300?random=4",
  },
  {
    id: 5,
    name: "Abdulrahman",
    image: "https://picsum.photos/200/300?random=5",
  },
  {
    id: 6,
    name: "Abdulrahman",
    image: "https://picsum.photos/200/300?random=6",
  },
];

export default function App() {
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { setTeacher } = useTeacherStore();
  const { user } = useUserStore();

  useEffect(() => {
    // Listen to auth changes
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        // Fetch user data from Firestore when logged in
        const userDoc = await firestore()
          .collection("users")
          .doc(user.uid)
          .get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setUserType(userData?.role || "student"); // Assume 'student' as default
        }
      } else {
        router.replace("/welcome");
      }
      setLoading(false); // End loading once user data is fetched or not logged in
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userType === "teacher") {
      getProfile();
      router.replace("/(teacher)/(tabs)/thome");
    }
  }, [userType]);

  const getProfile = async () => {
    setLoading(true);
    const asyncUser = await getTeacherFromAsyncStorage();
    if (asyncUser) {
      setTeacher(asyncUser);
      setLoading(false);
    } else {
      const teacher = await getTeacherAppliedJobs();
      if (teacher) {
        setTeacher(teacher);
      }
    }
  };

  const readPress = () => {
    router.push("/dashboard");
  };

  const findPress = () => {
    router.push("/find-teacher");
  };

  return (
    <View className="flex-1 pb-32">
      <View
        style={{
          height: 225,
          position: "absolute",
          zIndex: -99,
          top: 0,
          right: 0,
          left: 0,
        }}
      >
        <BackgroundGradient />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView className="py-3 px-4">
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            className="text-2xl text-center text-white font-JakartaExtraBold"
          >
            Quran Teacher
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            className="text-md text-white font-JakartaBold  mt-3"
          >
            Asalam-u-Alaikum{"  "}
            {auth().currentUser?.displayName || user?.name || "User"}💜
          </Text>
        </SafeAreaView>

        <View className={`${Platform.OS === "ios" ? "-mt-6" : ""}`}>
          <HomeCard
            title="Read Quran"
            description="Read and Explore Quran in different languages to enhance your journey"
            onPress={readPress}
          />
          <HomeCard
            title="Find Teacher"
            description="Find teacher who can teach you and your family about the message of Allah"
            onPress={findPress}
          />
        </View>

        {/* there will be two more sections here #TopTeachers and #Daily Vird */}
        <View className="flex-1 bg-white mx-4 rounded-lg pb-10 shadow-2xl">
          <View className="px-4">
            <Text className="text-xl font-JakartaMedium mt-5">
              Top Teachers
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
            >
              {teachers.map((teacher) => (
                <Teacher name={teacher.name} />
              ))}
            </ScrollView>
          </View>
          <View className="px-4">
            <Text className="text-xl font-JakartaMedium mt-5">
              Top Teachers
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
            >
              {teachers.map((teacher) => (
                <Teacher name={teacher.name} />
              ))}
            </ScrollView>
          </View>
          <View className="px-4">
            <Text className="text-xl font-JakartaMedium mt-5">
              Top Teachers
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
            >
              {teachers.map((teacher) => (
                <Teacher name={teacher.name} />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
