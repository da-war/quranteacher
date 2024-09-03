import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


import auth from '@react-native-firebase/auth';
import BackgroundGradient from '../../../components/BackgroundGradient';
import HomeCard from '@/components/HomeCard';

export default function App() {


  const user=auth().currentUser?.displayName || auth().currentUser?.email?.split('@')[0];

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
  return (
    <View className='flex-1'>
      <View style={{height:225, position:'absolute',zIndex:-99,top:0,right:0,left:0}}>
      <BackgroundGradient />
      </View>
      <ScrollView>
        <SafeAreaView  className='py-3 px-4'>
          <Text numberOfLines={1} adjustsFontSizeToFit className='text-2xl text-center text-white font-JakartaExtraBold'>Quran Teacher</Text>
          <Text numberOfLines={1} onPress={logout} adjustsFontSizeToFit className='text-lg text-white font-JakartaMedium mt-3'>Asalam-u-Alaikum {auth().currentUser?.displayName}</Text>
        </SafeAreaView>
        
        <HomeCard />
        <HomeCard />
      </ScrollView>
    </View>
  );
}
