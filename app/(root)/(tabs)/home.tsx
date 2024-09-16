import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';

import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import BackgroundGradient from '../../../components/BackgroundGradient';
import HomeCard from '../../../components/home/HomeCard';
import Teacher from '@/components/home/Teacher';
import { useUserStore } from '@/store/useUserStore';

import firestore from '@react-native-firebase/firestore';


const teachers=[
  {
    id:1,
    name:'Dawar',
    image:'https://picsum.photos/200/300?random=1',
  },
  {
    id:2,
    name:"Abdulrahman",
    image:'https://picsum.photos/200/300?random=2',
  },
  {
    id:3,
    name:"Abdulrahman",
    image:'https://picsum.photos/200/300?random=3',
  },
  {
    id:4,
    name:"Abdulrahman",
    image:'https://picsum.photos/200/300?random=4',
  },
  {
    id:5,
    name:"Abdulrahman",
    image:'https://picsum.photos/200/300?random=5',
  },
  {
    id:6,
    name:"Abdulrahman",
    image:'https://picsum.photos/200/300?random=6',
  },
]

export default function App() {
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const currentUser = auth().currentUser;

  useEffect(() => {
    // Listen to auth changes
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        // Fetch user data from Firestore when logged in
        const userDoc = await firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setUserType(userData?.role || 'student'); // Assume 'student' as default
        }
      } else {
        router.replace('/welcome');
      }
      setLoading(false); // End loading once user data is fetched or not logged in
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userType === 'teacher') {
      router.replace('/(teacher)/(tabs)/thome');
    }
  }, [userType]);

  const readPress = () => {
    router.push('/dashboard');
  };

  const findPress = () => {
    router.push('/find-teacher');
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('signed out');
        router.replace('/welcome');
      })
      .catch((e) => {
        console.error(e);
      });
  };

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


      {/* there will be two more sections here #TopTeachers and #Daily Vird */}
      <View className='flex-1 bg-white mx-4 rounded-lg pb-10 shadow-2xl'>
      <View className='px-4'>
        <Text className='text-xl font-JakartaMedium mt-5'>Top Teachers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row'>
          {teachers.map((teacher)=>(
            <Teacher name={teacher.name} />
          ))}
        </ScrollView>
      </View>
      <View className='px-4'>
        <Text className='text-xl font-JakartaMedium mt-5'>Top Teachers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row'>
          {teachers.map((teacher)=>(
            <Teacher name={teacher.name} />
          ))}
        </ScrollView>
      </View>
      <View className='px-4'>
        <Text className='text-xl font-JakartaMedium mt-5'>Top Teachers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row'>
          {teachers.map((teacher)=>(
            <Teacher name={teacher.name} />
          ))}
        </ScrollView>
      </View>
      </View>
      </ScrollView>
    </View>
  );
}
