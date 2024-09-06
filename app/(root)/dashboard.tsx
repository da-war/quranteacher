import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

import {StatusBar} from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context';
import { quranAll } from '@/constants';

import CircularProgress from 'react-native-circular-progress-indicator';
import BackButton from '@/components/global/BackButton';
import { useAyahsStore } from '@/store/useAyahsStore';
import TopNav from '@/components/nav/TopNav';

const DashboardScreen = () => {
  const router = useRouter();
  const {
    completedAyahs,
    currentAyah,
    totalAyahs,
    progressPercentage,
    markAyahComplete,
    setCurrentAyah,
    calculateProgress
  } = useAyahsStore();

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
      <StatusBar style='dark' />
     <View className='py-4 px-4'>
     <BackButton title='Readings' />
     </View>
      <View style={{flex:1}}>
      <TopNav />
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
