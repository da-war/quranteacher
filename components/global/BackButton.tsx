import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { icons } from '@/constants'


interface Props {
    title:string
}

const BackButton:React.FC<Props> = ({title="Title"}) => {
  return (
    <View className='flex flex-row items-center gap-2'>
     <TouchableOpacity onPress={()=>router.back()} className='w-6 h-6 bg-neutral-100 rounded-full justify-center items-center'>
     <Image source={icons.backArrow} className='w-5 h-5' resizeMode='contain' />
     </TouchableOpacity>
      <Text className='text-primary-600 font-JakartaSemiBold text-lg'>{title}</Text>
    </View>
  )
}

export default BackButton
