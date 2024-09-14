import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import auth from '@react-native-firebase/auth';
import BackgroundGradient from '../../../components/BackgroundGradient';
import HomeCard from '../../../components/home/HomeCard';
import Teacher from '@/components/home/Teacher';
import { useUserStore } from '@/store/useUserStore';



export default function App() {

  const {user}=useUserStore();



  const readPress=()=>{
   router.push('/dashboard')
  }
  const findPress=()=>{
    router.push('/find-teacher')
  }

  const logout=()=>{
    auth().signOut().then(()=>{
      console.log('signed out');
      router.replace('/welcome');

    }).catch((e)=>{
      console.log(e);
    })
  }

  useEffect(() => {
    console.log('user',user)
    if(user?.role=='student'){
      router.replace("/(root)/(tabs)/home");
    }
  }
  , []);

  return (
    <View className='flex-1 pb-32'>
      <View style={{height:225, position:'absolute',zIndex:-99,top:0,right:0,left:0}}>
      <BackgroundGradient />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView  className='py-3 px-4'>
          <Text numberOfLines={1} adjustsFontSizeToFit className='text-2xl text-center text-white font-JakartaExtraBold'>Quran Teacher</Text>
          <Text numberOfLines={1} onPress={logout} adjustsFontSizeToFit className='text-lg text-white font-JakartaMedium mt-3'>Asalam-u-Alaikum {auth().currentUser?.displayName}</Text>
          <Text numberOfLines={1} onPress={logout} adjustsFontSizeToFit className='text-lg text-white font-JakartaMedium mt-3'>logout</Text>
        
        </SafeAreaView>
        
      <View className={`${Platform.OS==='ios'?'-mt-6':''}`}>
      <HomeCard title='Read Quran' description='Read and Explore Quran in different languages to enhance your journey' onPress={readPress}  />
      <HomeCard title='Find Teacher' description='Find teacher who can teach you and your family about the message of Allah' onPress={findPress} />
      </View>


      </ScrollView>
    </View>
  );
}
