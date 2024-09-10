import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTranslationStore from '../../store/useTranslationStore';
import BackButton from '../../components/global/BackButton';
import { quranAll, translationEditions } from '../../constants/index';
import { useAyahsStore } from '@/store/useAyahsStore';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '@/components/CustomButton';

import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ReadingScreen = () => {
  const [selectedTranslation, setSelectedTranslation] = useState('english'); // Default to English
  const [showTranslations, setShowTranslations] = useState(false);
  const { currentTranslation, setTranslation } = useTranslationStore();
  const { currentAyah, currentSurah,setCurrentAyah,setCurrentSurah,completedAyahs } = useAyahsStore();

  const [arabicFontSize, setArabicFontSize] = useState(16);
  const [translationFontSize,setTranslationFontSize] = useState(16);

  useLayoutEffect(() => {
    const getFontSize = async () => {
      try {
        const fontSize = await AsyncStorage.getItem('arabicFontSize');
        if (fontSize) {
          setArabicFontSize(parseInt(fontSize));
        }
        else{
          setArabicFontSize(16);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getTranslationFontSize = async () => {
      
      try {
        const fontSize = await AsyncStorage.getItem('translationFontSize');
        if (fontSize) {
          setTranslationFontSize(parseInt(fontSize));
        }
        else{
          setTranslationFontSize(16);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getTranslationFontSize();
    getFontSize();
  }, []);

  // Handle translation change
  const handleTranslationChange = (translationName: string) => {
    setTranslation(translationName); // Update the translation in the Zustand store
    setSelectedTranslation(translationName); // Update local state to reflect selection
  };

  const handleNext=()=>{
    //update the current ayah number, useAyahsStore plus make sure to first check if next ayah exists or not if not move to next surah and set current ayah to 1 plus on each increment the completed ayahs and all possible works require
    if(currentAyah<quranAll.q.surahs[currentSurah].ayahs.length-1){
      setCurrentAyah(currentAyah+1);
    }else{
      setCurrentSurah(currentSurah+1);
      setCurrentAyah(0);
    }
  }

  const handlePrevious = () => {
    // Check if we are at the beginning of the Quran
    if (currentSurah === 0 && currentAyah === 0) {
      Alert.alert('You are at the beginning of the Quran');
      return;
    }
    
    // Check if we are at the last ayah of the Quran
    if (currentSurah === quranAll.q.surahs.length - 1 && currentAyah === quranAll.q.surahs[currentSurah].ayahs.length - 1) {
      Alert.alert('You are at the end of the Quran');
      return;
    }
  
    // Move to the previous ayah if possible
    if (currentAyah > 0) {
      setCurrentAyah(currentAyah - 1);
    }
    // If at the first ayah of the surah, move to the last ayah of the previous surah
    else if (currentAyah === 0 && currentSurah > 0) {
      setCurrentSurah(currentSurah - 1);
      const previousSurahAyahsCount = quranAll.q.surahs[currentSurah - 1].ayahs.length;
      setCurrentAyah(previousSurahAyahsCount - 1);
    }
  };
  

  const setFont=async (value:number)=>{
    setArabicFontSize(value);
    await AsyncStorage.setItem('arabicFontSize', value.toString());
  }


  const setTranslationSize=async (value:number)=>{
    setTranslationFontSize(value);
    await AsyncStorage.setItem('translationFontSize', value.toString());
  }



  return (
    <SafeAreaView className="flex flex-1 bg-neutral-100">
      <ScrollView className="flex-1 p-5">
        <StatusBar style="dark" />
        <BackButton title="Read" />

        {/* Quranic Text */}
        <View className='flex flex-1'>
          {/* Arabic Quranic Text */}
          <View className="p-3 bg-white rounded-xl my-3 min-h-[150px]">
            <View className='flex flex-row items-center gap-4 mb-3'>
              <Text>Font Resize: {arabicFontSize}</Text>
              <Slider
                  style={{width: '63%', height: 20}}
                  minimumValue={18}
                  step={1}
                  maximumValue={36}
                  onValueChange={(value=>setFont(value))}
                  value={arabicFontSize}
                  minimumTrackTintColor="#994EF8"
                  maximumTrackTintColor="#999999"
                  thumbTintColor="#4E2999"
                  tapToSeek
              />
            </View>
            <Text style={{ lineHeight: arabicFontSize<28?37:55, textAlign: 'right',fontSize:arabicFontSize }} className="font-NotoBold text-primary-500">
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
          <View className='mb-36'>
            <Text className="text-lg font-JakartaMedium text-primary-500">Translation</Text>

            {/* Show current translation content */}
            <View className="mt-3 p-3 bg-white rounded-xl  min-h-[150px]">
            <View className='flex flex-row items-center gap-4 mb-3'>
              <Text>Font Resize: {translationFontSize}</Text>
              <Slider
                  style={{width: '63%', height: 20}}
                  minimumValue={18}
                  step={1}
                  maximumValue={36}
                  onValueChange={(value=>setTranslationSize(value))}
                  value={translationFontSize}
                  minimumTrackTintColor="#994EF8"
                  maximumTrackTintColor="#999999"
                  thumbTintColor="#4E2999"
                  tapToSeek
              />
            </View>
              {currentTranslation?.jsonContent?.surahs?.[currentSurah]?.ayahs?.[currentAyah]?.text ? (
                <Text style={{ fontSize:translationFontSize,lineHeight: translationFontSize<28?37:55, textAlign: currentTranslation?.direction === 'rtl' ? 'right' : 'left' }}>
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
        <CustomButton title='Previous' bgVariant='secondary' className='w-[46%]' onPress={handlePrevious} />
        <CustomButton title='Next' className='w-[45%]' onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
};

export default ReadingScreen;
