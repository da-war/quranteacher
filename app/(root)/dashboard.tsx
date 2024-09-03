import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

import {StatusBar} from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';

const DashboardScreen = () => {
  const router = useRouter();
 

  // Sample data for recent activities
  const recentActivities = [
    { id: '1', text: 'Completed Surah Al-Baqarah' },
    { id: '2', text: 'Started reading Surah Al-Imran' },
    { id: '3', text: 'Achieved 20% of reading target' },
  ];

  const handleStartReading = () => {
    router.push('/read');
  };

  const handleSetReminder = () => {
    // Implement reminder logic here
    //what reminder will do?

    //i'm asking copilot from you
    //it will remind the user to read the Quran at a specific time
  };

  return (
    <SafeAreaView className='flex flex-1'>
      <ScrollView className="flex-1 bg-white p-5">
      <StatusBar style='dark' />
      <View className="mb-5">
        <Image source={images.quran} className="w-full h-60 rounded-lg" resizeMode="cover" />
        <Text className="text-3xl font-JakartaBold text-primary-500 mt-5">Dashboard</Text>
      </View>

      {/* Progress Section */}
      <View className="bg-primary-100 p-5 rounded-lg mb-5">
        <Text className="text-xl font-JakartaSemiBold text-primary-500">Reading Progress</Text>
        <View className="flex-row justify-between items-center mt-3">
          <View className="w-1/2">
            <Text className="text-lg font-JakartaMedium text-gray-700">Surahs Read</Text>
            <View className="h-2 bg-primary-400 rounded-full mt-1">
              <View className="h-full bg-primary-500" style={{ width: '40%' }} /> 
            </View>
            <Text className="text-sm text-gray-600 mt-1">40% Completed</Text>
          </View>
          <Text className="text-lg font-JakartaMedium text-primary-500">20/114 Surahs</Text>
        </View>
      </View>

      <View className="flex-row justify-between mb-5">
        <TouchableOpacity
          onPress={handleStartReading}
          className="bg-primary-500 p-4 rounded-lg flex-1 mr-2"
        >
          <Text className="text-white text-center text-lg font-JakartaSemiBold">Start Reading</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSetReminder}
          className="bg-secondary-500 p-4 rounded-lg flex-1 ml-2"
        >
          <Text className="text-white text-center text-lg font-JakartaSemiBold">Set Reminder</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-secondary-100 p-5 rounded-lg mb-5">
        <Text className="text-lg font-JakartaSemiBold text-secondary-700">Motivational Quote</Text>
        <Text className="text-sm text-secondary-600 mt-2">“The Quran is a guide for those who are conscious of Allah.”</Text>
      </View>

      <View>
        <Text className="text-lg font-JakartaSemiBold text-gray-700 mb-3">Recent Activities</Text>
        <FlatList
          data={recentActivities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-gray-100 p-3 mb-2 rounded-lg">
              <Text className="text-sm text-gray-700">{item.text}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
