import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { HomeCardProps } from '@/types/type'

const HomeCard:React.FC<HomeCardProps> = ({title="title",description="des",onPress}) => {
  return (
    <View className='flex flex-row p-4 bg-neutral-100 mb-2 border-neutral-200 border-2 mx-3 rounded-xl shadow-lg justify-between items-center'>
     <View>
     <Text className='text-2xl font-JakartaBold mb-2'>{title}</Text>
     <Text className='text-md text-gray-500'>{description}</Text>
     </View>

      <TouchableOpacity className='bg-primary-400 mt-2 p-2 rounded-xl justify-center items-center self-end px-7' onPress={onPress}>
        <Text className='text-white font-JakartaSemiBold text-xl'>Click here!</Text>
            {/* might have to add icon */}
      </TouchableOpacity>
    </View>
  )
}

export default HomeCard

const styles = StyleSheet.create({})