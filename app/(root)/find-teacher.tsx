import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import TeachBox from "@/components/teacher/TeachBox";
import { FlashList } from "@shopify/flash-list";
import { colors, teachers } from "@/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FilterButton = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`${
      selected ? "bg-primary-500" : "bg-neutral-200"
    } p-2 m-1 rounded-lg`}
  >
    <Text
      className={`font-Jakarta text-md ${
        selected
          ? "text-white font-JakartaBold"
          : "text-gray-500 font-JakartaBold"
      }`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const FindTeacher = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    language: "",
    location: "",
    hafiz: "",
    gender: "",
    experience: "",
    availability: "",
  });

  const animation = useState(new Animated.Value(0))[0];

  const toggleFilters = () => {
    Animated.timing(animation, {
      toValue: filtersVisible ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
    setFiltersVisible(!filtersVisible);
  };

  const applyFilters = () => {
    // Logic to apply filters goes here
    alert("Filters applied");
  };

  return (
    <SafeAreaView className="bg-gray-100 flex-1 p-5">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-1">
          <Pressable onPress={() => router.back()}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={28}
              color={colors.primary}
            />
          </Pressable>
          <Text className="text-lg font-bold text-gray-800">
            Find Quran Teacher
          </Text>
        </View>
        <TouchableOpacity onPress={toggleFilters}>
          <Text className="text-md text-primary-500 font-JakartaBold underline">
            Filters
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filters Section */}
      {filtersVisible && (
        <Animated.View
          style={{
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          }}
          className="mt-5 bg-white p-4 rounded-lg shadow-sm"
        >
          <Text className="text-lg font-semibold text-gray-700">Filters</Text>
          <View className="mt-3">
            {/* Language Filter */}
            <Text className="text-gray-600">Language</Text>
            <View className="mt-2 flex-row flex-wrap">
              {["Arabic", "English", "Urdu", "French", "Spanish"].map(
                (language) => (
                  <FilterButton
                    key={language}
                    label={language}
                    selected={selectedFilters.language === language}
                    onPress={() =>
                      setSelectedFilters({ ...selectedFilters, language })
                    }
                  />
                )
              )}
            </View>

            {/* Location Filter */}
            <Text className="mt-5 text-gray-600">Location</Text>
            <TextInput
              value={selectedFilters.location}
              onChangeText={(text) =>
                setSelectedFilters({ ...selectedFilters, location: text })
              }
              placeholder="Enter city or country"
              className="bg-gray-200 p-2 rounded-lg mt-2"
            />

            {/* Hafiz Filter */}
            <Text className="mt-5 text-gray-600">Hafiz Status</Text>
            <View className="mt-2 flex-row">
              {["Hafiz", "Non-Hafiz"].map((status) => (
                <FilterButton
                  key={status}
                  label={status}
                  selected={selectedFilters.hafiz === status}
                  onPress={() =>
                    setSelectedFilters({ ...selectedFilters, hafiz: status })
                  }
                />
              ))}
            </View>

            {/* Gender Filter */}
            <Text className="mt-5 text-gray-600">Gender</Text>
            <View className="mt-2 flex-row">
              {["Male", "Female"].map((gender) => (
                <FilterButton
                  key={gender}
                  label={gender}
                  selected={selectedFilters.gender === gender}
                  onPress={() =>
                    setSelectedFilters({ ...selectedFilters, gender })
                  }
                />
              ))}
            </View>

            {/* Teaching Experience Filter */}
            <Text className="mt-5 text-gray-600">Teaching Experience</Text>
            <View className="mt-2 flex-row flex-wrap">
              {["1-3 Years", "3-5 Years", "5+ Years"].map((experience) => (
                <FilterButton
                  key={experience}
                  label={experience}
                  selected={selectedFilters.experience === experience}
                  onPress={() =>
                    setSelectedFilters({ ...selectedFilters, experience })
                  }
                />
              ))}
            </View>

            {/* Availability Filter */}
            <Text className="mt-5 text-gray-600">Availability</Text>
            <View className="mt-2 flex-row flex-wrap">
              {["Morning", "Afternoon", "Evening", "Weekends"].map(
                (availability) => (
                  <FilterButton
                    key={availability}
                    label={availability}
                    selected={selectedFilters.availability === availability}
                    onPress={() =>
                      setSelectedFilters({ ...selectedFilters, availability })
                    }
                  />
                )
              )}
            </View>

            {/* Apply Filters Button */}
            <TouchableOpacity
              onPress={applyFilters}
              className="mt-5 bg-green-600 py-2 rounded-lg"
            >
              <Text className="text-center text-white font-semibold">
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* Teacher List */}
      <View className="flex-1 mt-5">
        <FlashList
          data={teachers}
          key={searchQuery}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const itemi: any = item;
            return (
              <TeachBox
                teacher={item}
                onPress={() =>
                  router.push({
                    pathname: "/(root)/teacher",
                    params: { teacher: item },
                  })
                }
              />
            );
          }}
          keyExtractor={(item) => item.name}
          ListEmptyComponent={() => (
            <Text className="text-center text-gray-500 mt-5">
              No teachers found
            </Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default FindTeacher;
