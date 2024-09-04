import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { icons } from '@/constants'

const Teacher = ({name="Dawar",location='Lahore'}) => {
  return (
    <View className='p-4 justify-center items-center bg-neutral-50 gap-2 mx-2 w-[150px] rounded-xl mt-5 border-2 border-white'>
        <View className='w-[50px] h-[50px] bg-neutral-300 rounded-full'>
        <Image className='w-[50px] h-[50px] rounded-full' resizeMode='contain' source={{uri:'https://picsum.photos/200/300?random=1'}} />
        </View>
      <Text className='text-md font-JakartaBold'>{name}</Text>
     <View className='flex flex-row gap-1 items-center'>
        <Image source={icons.point} className='w-4 h-4' resizeMode='contain' />
     <Text className='text-sm font-JakartaLight'>{location}</Text>
     </View>

    </View>
  )
}

export default Teacher

const styles = StyleSheet.create({})