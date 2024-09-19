import {Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RadioButtonProps } from '@/types/type'


const RadioButton:React.FC<RadioButtonProps> = ({title="Radio Title",options=[],onChange=() => {},selectedValue,disabled,style,titleStyle,optionStyle}) => {
  return (
    <View className={`flex flex-row my-5 items-center justify-between ${style}`}>
        <Text className={`text-[16px] font-JakartaBold min-w-[20%] ${titleStyle}`}>{title}:</Text>
        <View className='flex flex-row bg-neutral-300 rounded-lg overflow-hidden flex-1 ml-4' >
            {options.map((option) => (
                <TouchableOpacity onPress={() => onChange(option)}  key={option} className={`p-4 flex-1 justify-between items-center ${selectedValue === option ? 'bg-primary-500' : 'bg-neutral-100'} ${optionStyle}`}>
                    <Text className={`text-[16px] font-JakartaBold ml-2 ${selectedValue === option ? 'text-white' : 'text-neutral-600'}`}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
  )
}
export default RadioButton

