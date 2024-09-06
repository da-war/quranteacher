import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { HomeCardProps } from '@/types/type'

const HomeCard:React.FC<HomeCardProps> = ({title="title",description="des",onPress}) => {
  return (
    <View className='flex flex-row p-4 bg-white mb-2 border-neutral-200 border-2 mx-3 rounded-xl shadow-lg justify-between items-center '>
     <View style={{maxWidth:'50%'}}>
     <Text className='text-2xl font-JakartaMedium mb-2'>{title}</Text>
     <Text style={{fontSize:16, lineHeight:25}} numberOfLines={3} adjustsFontSizeToFit className=' text-gray-500 font-JakartaLight'>{description}</Text>
     </View>

      <TouchableOpacity className='bg-primary-600 mt-2 p-2 rounded-xl justify-center items-center self-end px-7' onPress={onPress}>
        <Text className='text-white font-JakartaSemiBold text-xl'>Click here!</Text>
            {/* might have to add icon */}
      </TouchableOpacity>
    </View>
  )
}

export default HomeCard

const styles = StyleSheet.create({})