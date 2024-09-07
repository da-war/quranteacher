import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTranslationStore from '../../store/useTranslationStore';
import BackButton from '../../components/global/BackButton';
import { quranAll, translationEditions } from '../../constants/index';
import { useAyahsStore } from '@/store/useAyahsStore';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '@/components/CustomButton';

const ReadingScreen = () => {
  const [selectedTranslation, setSelectedTranslation] = useState('english'); // Default to English
  const [showTranslations, setShowTranslations] = useState(false);
  const { currentTranslation, setTranslation } = useTranslationStore();
  const { currentAyah, currentSurah } = useAyahsStore();

  // Handle translation change
  const handleTranslationChange = (translationName: string) => {
    setTranslation(translationName); // Update the translation in the Zustand store
    setSelectedTranslation(translationName); // Update local state to reflect selection
  };

  return (
    <SafeAreaView className="flex flex-1 bg-neutral-100">
      <ScrollView className="flex-1 p-5">
        <StatusBar style="dark" />
        <BackButton title="Read" />

        {/* Quranic Text */}
        <View className='flex flex-1'>
          {/* Arabic Quranic Text */}
          <View className="p-3 bg-white rounded-xl my-3 min-h-[150px]">
            <Text style={{ lineHeight: 40, textAlign: 'right' }} className="text-2xl font-NotoBold text-primary-500">
              {quranAll.q.surahs[currentSurah].ayahs[currentAyah].text}
            </Text>
          </View>


          {/* Language Preferences */}
        <View className="bg-neutral-100 p-1 rounded-lg mb-3 flex flex-row gap-3 items-center justify-between overflow-hidden">
          <Text numberOfLines={1} adjustsFontSizeToFit className="text-md font-JakartaSemiBold text-primary-500">Change Translation</Text>
          <TouchableOpacity
            onPress={() => setShowTranslations(true)}
            className="bg-white border border-gray-300 p-1 rounded-lg flex flex-row items-center justify-between w-[60%] overflow-hidden"
          >
            <Text style={{maxWidth:'72%',fontSize:10}} adjustsFontSizeToFit numberOfLines={2} className="font-JakartaLight">
              {currentTranslation?.name.toString() || 'Select Translation'}
            </Text>
            <MaterialCommunityIcons style={{maxWidth:"10%"}} name={`${showTranslations ? 'chevron-down' : 'chevron-right'}`} size={20} color={'#999999'} />
          </TouchableOpacity>

          {/* Translation Modal (for selection) */}
          {showTranslations && (
            <Modal
              transparent={true}
              animationType="slide"
              visible={showTranslations}
              onRequestClose={() => setShowTranslations(false)}
            >
              <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <View className="bg-white p-4 rounded-lg w-3/4">
                  <Text className="text-lg font-JakartaSemiBold mb-4">Select Translation</Text>
                  <ScrollView showsVerticalScrollIndicator={false}>
                  {translationEditions.map((translation) => (
                    <TouchableOpacity
                      key={translation.id}
                      onPress={() => {
                        handleTranslationChange(translation.name);
                        setShowTranslations(false);
                      }}
                      className={`p-3 border-b border-gray-300 ${translation.name === selectedTranslation ? 'bg-green-100' : ''}`}
                    >
                      <Text className='text-lg' style={{ color: translation.name === selectedTranslation ? 'green' : 'black' }}>
                        {translation.placeholderText}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  </ScrollView>
                </View>
              </View>
            </Modal>
          )}
        </View>





          {/* Translation Section */}
          <View className='mb-20'>
            <Text className="text-lg font-JakartaMedium text-primary-500">Translation</Text>

            {/* Show current translation content */}
            <View className="mt-3 p-3 bg-white rounded-xl  min-h-[150px]">
              {currentTranslation?.jsonContent?.surahs?.[currentSurah]?.ayahs?.[currentAyah]?.text ? (
                <Text style={{ lineHeight: 30, textAlign: currentTranslation?.direction === 'rtl' ? 'right' : 'left' }}>
                  {currentTranslation.jsonContent.surahs[currentSurah].ayahs[currentAyah].text}
                </Text>
              ) : (
                <Text>Translation not available</Text>
              )}
            </View>
          </View>
        </View>


      </ScrollView>
      <View className='flex flex-1 flex-row absolute bottom-20 w-full justify-around'>
        <CustomButton title='Previous' bgVariant='secondary' className='w-[46%]' />
        <CustomButton title='Next' className='w-[45%]' />
      </View>
    </SafeAreaView>
  );
};

export default ReadingScreen;
