import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/components/global/BackButton';


const chats=[
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
        name:"Ayesha",
        image:'https://picsum.photos/200/300?random=4',
    }
];

const Chats = () => {
  return (
    <SafeAreaView className='flex-1'>

        <View className='bg-primary-500 p-4' >
            <BackButton title='Chats' titleStyle='text-white font-JakartaBold text-xl' />
        </View>
        <View className='flex-1 p-4'>
            <ScrollView>
                {
                    chats.map((chat: any, index: number) => (
                        <TouchableOpacity onPress={()=>console.log(chat)} key={index} className='p-4 bg-white mb-1 rounded-2xl'>
                            <View className='flex flex-row justify-between'>
                                <View className='flex flex-row gap-2'>
                                    <Image source={{uri:chat.image}} className='w-10 h-10 rounded-full' />
                                    <View>
                                        <Text className='text-lg font-JakartaBold'>{chat.name}</Text>
                                        <Text className='text-sm font-JakartaLight text-neutral-600'>Last message</Text>
                                    </View>

                                </View>

                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
        
    </SafeAreaView>
  )
}

export default Chats

