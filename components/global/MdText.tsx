import { Text, View } from 'react-native'
import React from 'react'
interface Props{ text:string;labelStyle?:string;subText?:string}
const MdText:React.FC<Props> = ({text, labelStyle,subText}) =>  (
    <View className='flex flex-row items-baseline'>
        <Text className={`text-[16px] font-JakartaBold mb-3 ${labelStyle}`}>{text}</Text>
       {subText&&( <Text className='text-neutral-500 text-[12px] ml-2'>{subText}</Text>)}
    </View>
)
export default MdText