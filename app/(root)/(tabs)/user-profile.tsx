import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import auth from '@react-native-firebase/auth';
import BackgroundGradient from '../../../components/BackgroundGradient';
import BackButton from '@/components/global/BackButton';
import { useUserStore } from '@/store/useUserStore';


export default function ProfileScreen() {

  const user = useUserStore((state) => state.user);
  const handleBecomeTeacherPress = () => {
    // router.push('/become-teacher');
  };

  const handleMyBookingsPress = () => {
    // router.push('/my-bookings');
  };

  const handleNotificationsPress = () => {
    // router.push('/notifications');
  };


  const handleSettingsPress = () => {
    // router.push('/settings');
  };

  const handleLogout = () => {
    auth().signOut().then(() => {
      console.log('signed out');
      router.replace('/welcome');
    }).catch((e) => {
      console.log(e);
    });
  };

  return (
    <SafeAreaView className='flex-1 bg-neutral-100'>
        <View className='h-[300px] bg-white p-4'>
          <BackButton title="Profile" />
          <View className='mt-10'>

            <Image />
            <Text className='text-3xl font-JakartaSemiBold'>{auth().currentUser?.displayName}</Text>
          </View>
        </View>
    
    </SafeAreaView>
  );
}
