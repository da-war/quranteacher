import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import auth from '@react-native-firebase/auth';
import BackgroundGradient from '../../../components/BackgroundGradient';

export default function ProfileScreen() {
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
    <SafeAreaView className='flex-1 bg-gray-100'>
      <BackgroundGradient style={{ height: 225, position: 'absolute', zIndex: -1, top: 0, right: 0, left: 0 }} />

      <View className='px-4 py-6'>
        <View className='items-center'>
          <Image 
            source={{ uri: auth().currentUser?.photoURL || 'https://via.placeholder.com/150' }} 
            className='w-32 h-32 rounded-full border-4 border-white'
          />
          <Text className='text-2xl text-white font-bold mt-4'>{auth().currentUser?.displayName}</Text>
          <Text className='text-lg text-white mt-2'>{auth().currentUser?.email}</Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 32 }} className='mt-6'>
          <TouchableOpacity 
            onPress={handleBecomeTeacherPress} 
            className='bg-white p-4 rounded-lg shadow-lg mb-4'
          >
            <Text className='text-xl font-medium text-gray-800'>Become a Teacher</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleMyBookingsPress} 
            className='bg-white p-4 rounded-lg shadow-lg mb-4'
          >
            <Text className='text-xl font-medium text-gray-800'>My Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleNotificationsPress} 
            className='bg-white p-4 rounded-lg shadow-lg mb-4'
          >
            <Text className='text-xl font-medium text-gray-800'>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleSettingsPress} 
            className='bg-white p-4 rounded-lg shadow-lg mb-4'
          >
            <Text className='text-xl font-medium text-gray-800'>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleLogout} 
            className='bg-red-500 p-4 rounded-lg shadow-lg'
          >
            <Text className='text-xl font-medium text-white'>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
