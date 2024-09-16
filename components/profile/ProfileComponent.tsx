import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ProfileComponentProps {
    title:string;
    onPress:()=>void;
    iconName:any;
}

const ProfileComponent:React.FC<ProfileComponentProps> = ({title="title",onPress,iconName="account"}) => {
  return (
    <TouchableOpacity className='bg-white shadow-2xl mx-4 p-4 rounded-xl mt-3 flex flex-row justify-between items-center' onPress={onPress}>
      <View className='flex flex-row gap-2 items-center'>
        <MaterialCommunityIcons name={iconName} size={24} color='#4E2999' />
      <Text className='font-JakartaLight text-md'>{title}</Text>
      </View>
      <MaterialCommunityIcons name='chevron-right' size={24} color="#4E2999" />
    </TouchableOpacity>
  )
}

export default ProfileComponent;