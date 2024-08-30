import { router } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard() {
  return (
   <SafeAreaView className='flex flex-1'>
     <ScrollView className="bg-gray-100 flex-1 p-5">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold text-gray-800">Quran Dashboard</Text>
        <TouchableOpacity>
          <View className="w-10 h-10 rounded-full bg-gray-300" />
        </TouchableOpacity>
      </View>

      {/* Progress Overview */}
      <View className="mt-5 p-4 bg-white rounded-lg shadow-sm">
        <Text className="text-lg font-semibold text-gray-700">Today's Progress</Text>
        <View className="mt-3 flex-row justify-between">
          <View className="w-24 h-24 bg-gray-200 rounded-full flex justify-center items-center">
            <Text className="text-2xl font-bold text-gray-800">70%</Text>
          </View>
          <View className="flex-1 ml-5 justify-center">
            <Text className="text-lg text-gray-700">5 Juz Read Today</Text>
            <Text className="text-lg text-gray-700">25% of Quran Completed</Text>
          </View>
        </View>
      </View>

      {/* Tracking Section */}
      <View className="mt-5 p-4 bg-white rounded-lg shadow-sm">
        <Text className="text-lg font-semibold text-gray-700">Current Reading</Text>
        <Text className="mt-2 text-gray-600">Last read: Surah Al-Baqarah, Ayah 50</Text>
        <TouchableOpacity onPress={()=>router.push('/read')} className="mt-3 bg-green-600 py-2 rounded-lg">
          <Text className="text-center text-white font-semibold">Continue Reading</Text>
        </TouchableOpacity>
      </View>

      {/* Translation Settings */}
      <View className="mt-5 p-4 bg-white rounded-lg shadow-sm">
        <Text className="text-lg font-semibold text-gray-700">Translation Settings</Text>
        <View className="mt-3">
          <Text className="text-gray-600">Preferred Language:</Text>
          <TouchableOpacity className="mt-2 bg-gray-200 p-2 rounded-lg">
            <Text className="text-gray-700">English</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-3 flex-row items-center">
          <Text className="text-gray-600">Enable Tafsir:</Text>
          <TouchableOpacity className="ml-3">
            <View className="w-10 h-6 bg-primary-500 rounded-full" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats & Insights */}
      <View className="mt-5 p-4 bg-white rounded-lg shadow-sm">
        <Text className="text-lg font-semibold text-gray-700">Stats & Insights</Text>
        {/* Add content for graphs, streaks, etc. here */}
      </View>

      {/* Additional Resources */}
      <View className="mt-5 p-4 bg-white rounded-lg shadow-sm mb-10">
        <Text className="text-lg font-semibold text-gray-700">Additional Resources</Text>
        <TouchableOpacity className="mt-3 bg-blue-600 py-2 rounded-lg">
          <Text className="text-center text-white font-semibold">Find Quran Teachers</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mt-3 bg-gray-200 py-2 rounded-lg">
          <Text className="text-center text-gray-700">Bookmarks</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mt-3 bg-gray-200 py-2 rounded-lg">
          <Text className="text-center text-gray-700">Quran Reading Plan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
   </SafeAreaView>
  );
}
