import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import auth from '@react-native-firebase/auth';
import BackgroundGradient from '../../../components/BackgroundGradient';
import BackButton from '@/components/global/BackButton';
import { useUserStore } from '@/store/useUserStore';
import ProfileComponent from '@/components/profile/ProfileComponent';
import CustomButton from '@/components/CustomButton';


export default function ProfileScreen() {

  const {user}=useUserStore();
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

  const onPressLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: ()=>{
        auth().signOut().then(()=>{
          console.log('signed out');
          router.replace('/welcome');
  
        }).catch((e)=>{
          console.log(e);
        })
      } },
    ]);

  };

  return (
    <SafeAreaView className='flex-1 bg-neutral-100'>
      <ScrollView>
      <View className='h-[300px] bg-white p-4 overflow-hidden rounded-bl-[50px] rounded-br-[50px]'>
          <BackgroundGradient />
          <BackButton title="Profile" titleStyle='text-white font-JakartaBold' />
          <View className='mt-10 justify-center items-center'>
            <View className={`items-center bg-neutral-300 w-[130px] h-[130px] rounded-full mb-3 ${!user?.profilePicture && 'justify-center items-center p-2'}`}>
              {user?.profilePicture && <Image source={{ uri: user?.profilePicture }} className='w-full h-full rounded-full' />}
              {!user?.profilePicture && <Text className='text-md text-white text-center font-JakartaExtraBold'>No Profile Picture</Text>}
            </View>
            <Text className='text-3xl font-JakartaSemiBold text-white'>{user?.name}</Text>
          </View>
        </View>

        <View>
          <ProfileComponent title='Become a Teacher' iconName='human-greeting-variant' onPress={()=>router.push('/(root)/become-teacher')} />
          <ProfileComponent title='My Bookings' iconName='format-list-numbered' onPress={()=>router.push("/(root)/my-bookings")} />
          <ProfileComponent title='Notifications' iconName='bell' onPress={()=>router.push('/(root)/notifications')} />
          <ProfileComponent title='Settings' iconName='toolbox' onPress={()=>router.push('/(root)/settings')} />

          <View className='mx-4 mt-10'>
          <CustomButton bgVariant="danger" title="Logout" className="" onPress={onPressLogout} />
          </View>
        </View>
      </ScrollView>
    
    </SafeAreaView>
  );
}
