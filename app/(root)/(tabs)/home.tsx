import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


import auth from '@react-native-firebase/auth';
import BackgroundGradient from '../../../components/BackgroundGradient';

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

        <SafeAreaView>
        <View className='py-6 px-3'>
        <View>
          <Text numberOfLines={1} adjustsFontSizeToFit className='text-xl text-white font-JakartaSemiBold'>Welcome to Quran Teacher</Text>
          <Text numberOfLines={1} onPress={logout} adjustsFontSizeToFit className='text-xl text-white font-JakartaBold'>Logout</Text>
        </View>
       

       
        </View>

        </SafeAreaView>

        
      </ScrollView>
    </View>
  );
}
