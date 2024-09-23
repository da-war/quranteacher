import {  Image, Text, View } from 'react-native'

import { useTeacherStore } from '@/store/useTeacherStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/components/global/BackButton';
import BackgroundGradient from '@/components/BackgroundGradient';


const TeacherProfile = () => {
  const {teacher}=useTeacherStore();


  console.log("Teacher",teacher?.name);

  return (
  <SafeAreaView className='flex-1'>
    <View className='bg-primary-500 p-3'>
      <BackButton title='Profile' titleStyle='text-white'  />
    </View>
    <View className='h-[250px] rounded-bl-[50px] rounded-br-[50px] overflow-hidden'>
      <BackgroundGradient opacity={0.1} />

      <View>
        <Image source={{uri:teacher?.profilePicture}} className='w-[100px] h-[100px]'  />
      </View>
    </View>
  </SafeAreaView>
  )
}

export default TeacherProfile
