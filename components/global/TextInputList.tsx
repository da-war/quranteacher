import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputField from '../InputField';
import { TextInputListProps } from '@/types/type'; // Ensure this is correct

const TextInputList: React.FC<TextInputListProps> = ({
  label,
  values = [],
  onChangeValues,
  placeholder='english, urdu, hindi',


}) => {
    const [inputs, setInputs] = useState(values);
    const [text, setText] = useState('');

    const handleAddInput = () => {
        setInputs([...inputs, text]);
        setText('');
        onChangeValues([...inputs, text]);
    };
    const handleRemoveInput = (index: number) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
        onChangeValues(newInputs);
    }

    
  
  return (
    <View className='flex gap-3'>
        <View className='flex flex-row items-end'>
                <View className='flex-1'>
                    <InputField 
                        label='Languages' 
                        placeholder={placeholder}
                        onChangeText={text => setText(text)}
                        value={text}
                            />
                </View>
                <TouchableOpacity className='p-2 justify-center items-baseline bg-green-600 rounded-full ml-5 mb-2'>
                    <MaterialCommunityIcons name='plus' size={30} color='white' onPress={handleAddInput} />
                </TouchableOpacity>
        </View>
        <View className='flex flex-row flex-wrap'>
            {inputs.map((input, index) => (
                <View key={index} className='flex flex-row items-center justify-center mr-3 mt-2 bg-neutral-200 rounded-lg p-2 my-2 flex-shrink-1'>
                    <View className=''>
                    <Text className='text-md font-JakartaBold'>{input}</Text>
                    </View>
                    <TouchableOpacity className='ml-4' onPress={() => handleRemoveInput(index)}>
                        <MaterialCommunityIcons name='delete' size={20} color='red' />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  
  addButton: {
    marginTop: 16,
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    marginLeft: 8,
    color: 'green',
  },
});

export default TextInputList;
