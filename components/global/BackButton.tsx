import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { icons } from '@/constants'


interface Props {
    title:string,
    titleStyle?:string,
}

const BackButton:React.FC<Props> = ({title="Title",titleStyle='text-primary-600'}) => {
  return (
    <View className='flex flex-row items-center gap-2'>
     <TouchableOpacity onPress={()=>router.back()} className='w-6 h-6 bg-neutral-100 rounded-full justify-center items-center'>
     <Image source={icons.backArrow} className='w-5 h-5' resizeMode='contain' />
     </TouchableOpacity>
      <Text className={`font-JakartaSemiBold text-lg ${titleStyle}`}>{title}</Text>
    </View>
  )
}

export default BackButton
