import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{padding:10}}>
        {/* Header Section */}
        <View className="mb-8 items-center">
          <Text className="text-3xl font-bold text-gray-800">Welcome to Quran App</Text>
          <Text className="text-lg text-gray-600 mt-2">Explore, Learn, and Connect</Text>
        </View>

        

        {/* Main Sections */}
        <View className="mb-8">
          {/* Quran Reading Section */}
          <View className="bg-white p-5 rounded-lg shadow-md mb-4">
            <Text className="text-xl font-semibold text-gray-700 mb-2">Read the Quran</Text>
            <Text className="text-gray-600 mb-4">
              Explore and read the Quran online with easy navigation and beautiful text rendering.
            </Text>
            <TouchableOpacity onPress={() => router.push('/dashboard')} className="bg-green-600 p-3 rounded-lg">
              <Text className="text-white text-center text-lg">Read Now</Text>
            </TouchableOpacity>
          </View>

          {/* Find Teachers Section */}
          <View className="bg-white p-5 rounded-lg shadow-md mb-4">
            <Text className="text-xl font-semibold text-gray-700 mb-2">Find Quran Teachers</Text>
            <Text className="text-gray-600 mb-4">
              Connect with qualified Quran teachers who can guide you through your learning journey.
            </Text>
            <TouchableOpacity onPress={() => router.push('/find-teacher')} className="bg-blue-600 p-3 rounded-lg">
              <Text className="text-white text-center text-lg">Find Teachers</Text>
            </TouchableOpacity>
          </View>
        </View>

        
      </ScrollView>
    </SafeAreaView>
  );
}
