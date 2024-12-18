import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
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
import Bismilliah from '@/components/global/Bismilliah';
import { Audio } from 'expo-av';


const ReadingScreen = () => {
  const [selectedTranslation, setSelectedTranslation] = useState('english'); // Default to English
  const [showTranslations, setShowTranslations] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [sound,setSound]=useState<any>(null);
  const { currentTranslation, setTranslation } = useTranslationStore();
  const { currentAyah, currentSurah,setCurrentAyah,setCurrentSurah,completedAyahs,setCompletedAyahs } = useAyahsStore();
  const [soundUri,setSoundUri]=useState<string|null>(quranAll.q.surahs[currentSurah].ayahs[currentAyah].audio);
  const [loading,setLoading]=useState(false);

  const [arabicFontSize, setArabicFontSize] = useState(24);
  const [translationFontSize,setTranslationFontSize] = useState(24);
  const [adjustArabicFontSize,setAdjustArabicFontSize]=useState(false);
  const [adjustTranslationFontSize,setAdjustTranslationFontSize]=useState(false);
  const [bismillahTranslation,setBismillahTranslation]=useState(currentTranslation?.name);
  const arabicBis="بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم";

const playAudio = async (uri: string) => {
  try {
    // Unload the previous sound if it exists
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    setLoading(true); // Show loading indicator

    // Load the new sound
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true }, // Start playing as soon as it's loaded
      (status) => {
        if (status.isLoaded && status.didJustFinish) {
          stopAudio(); // Stop audio and reset when finished
          setPlaying(false)
        }
      }
    );

    setSound(newSound); // Update the sound state with the new sound
    setPlaying(true);
    setLoading(false); // Hide loading indicator
  } catch (error) {
    setLoading(false);
    console.error('Error playing audio:', error);
    Alert.alert('Error', 'There was an issue loading the audio. Please check your internet connection.');
  }
};

// Function to stop audio
const stopAudio = async () => {
  if (sound) {
    try {
      await sound.stopAsync(); // Stop the sound
      setPlaying(false);
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  }
};

// Display loading indicator if necessary
const renderLoadingIndicator = () => {
  return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
};

const toggleAudio = () => {
  if (playing) {
    stopAudio();
  } else {
    playAudio(soundUri!);
  }
};

// Cleanup when component unmounts
useEffect(() => {
  return () => {
    if (sound) {
      sound.unloadAsync(); // Unload sound to free resources when component unmounts
    }
  };
}, [sound]);

 const getTranslationBismillah = () => {
    switch (currentTranslation?.name) {
      case 'English - Muhammad Asad':
        setBismillahTranslation('In the name of God, The Most Gracious, The Dispenser of Grace:');
        break;
      case 'French - Muhammad Hamidullah':
        setBismillahTranslation('Au nom d\'Allah, le Tout Misericordieux, le Trés Misericordieux.');
        break;
      case 'Hindi - Suhel Farooq Khan and Saifur Rahman Nadwi':
        setBismillahTranslation('अल्लाह के नाम से जो रहमान व रहीम है।');
        break;
      case 'Indonesian - Quran.com':
        setBismillahTranslation('Dengan menyebut nama Allah Yang Maha Pemurah lagi Maha Penyayang.');
        break;
      case 'Urdu - Maulana Maududi':
        setBismillahTranslation('اللہ کے نام سے جو رحمان و رحیم ہے');
        break;
      case 'Urdu - Dr Tahir ul Qadari':
        setBismillahTranslation('اللہ کے نام سےشروع جو نہایت مہربان ہمیشہ رحم فرمانےوالا ہے');
        break;
      case 'Urdu - Fateh Muhammad Jalandhari':
        setBismillahTranslation('شروع الله کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے');
        break;
      case 'Urdu - Muhammad Junagarhi':
        setBismillahTranslation('شروع کرتا ہوں اللہ تعالیٰ کے نام سے جو بڑا مہربان نہایت رحم واﻻ ہے');
        break;
      default:
        setBismillahTranslation('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ');
        break;
    }
  };

  useEffect(() => {
    getTranslationBismillah();
  }, [currentTranslation]);


 

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
    if (currentSurah === quranAll.q.surahs.length - 1 && currentAyah === quranAll.q.surahs[currentSurah].ayahs.length - 1) {
      Alert.alert('You are at the end of the Quran');
      return;
    }
    //update the current ayah number, useAyahsStore plus make sure to first check if next ayah exists or not if not move to next surah and set current ayah to 1 plus on each increment the completed ayahs and all possible works require
    if(currentAyah<quranAll.q.surahs[currentSurah].ayahs.length-1){
      if(quranAll.q.surahs[currentSurah].ayahs[currentAyah].number>completedAyahs){
        setCompletedAyahs(quranAll.q.surahs[currentSurah].ayahs[currentAyah].number);
      }
      setSoundUri(quranAll.q.surahs[currentSurah].ayahs[currentAyah+1].audio);
      setCurrentAyah(currentAyah+1);
      setPlaying(false)
      stopAudio();
      //
    }else{
      setSoundUri(quranAll.q.surahs[currentSurah+1].ayahs[0].audio);
      setCurrentSurah(currentSurah+1);
      setCurrentAyah(0);
      setPlaying(false)
      stopAudio();

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
      setSoundUri(quranAll.q.surahs[currentSurah].ayahs[currentAyah-1].audio);
      setCurrentAyah(currentAyah - 1);
      setPlaying(false)
      stopAudio();
    }
    // If at the first ayah of the surah, move to the last ayah of the previous surah
    else if (currentAyah === 0 && currentSurah > 0) {
      setSoundUri(quranAll.q.surahs[currentSurah-1].ayahs[quranAll.q.surahs[currentSurah-1].ayahs.length-1].audio);
      setCurrentSurah(currentSurah - 1);
      const previousSurahAyahsCount = quranAll.q.surahs[currentSurah - 1].ayahs.length;
      setCurrentAyah(previousSurahAyahsCount - 1);
      setPlaying(false);
      stopAudio();
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
      {loading&&(
        renderLoadingIndicator()
      )}
      <ScrollView className="flex-1 p-5">

        <StatusBar style="dark" />
        <BackButton title="Read" />

        {/* Quranic Text */}
      <View className='flex flex-1'>


          {/* Arabic Quranic Text */}
          <View className="p-3 pb-7 bg-white rounded-xl my-3 min-h-[150px]">
            <TouchableOpacity onPress={()=>setAdjustArabicFontSize(!adjustArabicFontSize)} className='flex flex-row items-center gap-4 mb-3'>
              <Text className='text-md font-JakartaSemiBold underline'>Adjust Font Size: {arabicFontSize}</Text>
              <MaterialCommunityIcons name={adjustArabicFontSize?'chevron-down':'chevron-right'} size={20} color='#000' />
            </TouchableOpacity>
            <View>
            {
              adjustArabicFontSize &&(
               <View className='flex flex-row items-center justify-between'>
                 <Slider
                style={{flex:1, height: 20,marginRight:15}}
                minimumValue={18}
                step={1}
                maximumValue={44}
                onValueChange={(value=>setFont(value))}
                value={arabicFontSize}
                minimumTrackTintColor="#994EF8"
                maximumTrackTintColor="#999999"
                thumbTintColor="#4E2999"
                tapToSeek
            />
            <TouchableOpacity onPress={()=>setAdjustArabicFontSize(false)} className=''>
              <MaterialCommunityIcons name="check-circle" size={30} color='#994EF8' />          
                </TouchableOpacity>
               </View>
              )
            }
            </View>
           <Bismilliah bismillahText={arabicBis} currentAyah={currentAyah} currentSurrah={currentSurah} currentTranslation={currentTranslation?.name} />
            <Text style={{ lineHeight: arabicFontSize<28?44:70, textAlign: 'right',fontSize:arabicFontSize }} className="font-NotoBold text-primary-500">
              {quranAll.q.surahs[currentSurah].ayahs[currentAyah].text}
            </Text>

            <TouchableOpacity onPress={toggleAudio} className='absolute bottom-1 left-1 flex flex-row items-center gap-1'>
            <MaterialCommunityIcons  name={playing ? 'pause-circle-outline' : 'play-circle-outline'} size={30} color='#994EF8' />
            <Text className='text-md font-JakartaSemiBold'>Audio</Text>
            </TouchableOpacity>
          </View>


          {/* Language Preferences */}
        <View className="bg-neutral-100 p-1 rounded-lg mb-3 flex flex-row gap-3 items-center justify-between overflow-hidden">
          <Text numberOfLines={1} adjustsFontSizeToFit className="text-md font-JakartaSemiBold text-primary-500">Change Translation</Text>
          <TouchableOpacity
            onPress={() => setShowTranslations(true)}
            style={{flexShrink: 1}}
            className="bg-white border border-gray-300 p-1 rounded-lg flex flex-row items-center justify-between w-[55%] overflow-hidden"
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
              <View className="flex-1 justify-center items-center bg-white bg-opacity-50">
                <View className="bg-neutral-100 p-4 rounded-lg pt-20">
                  <Text className="text-lg font-JakartaSemiBold mb-4">Select Translation</Text>
                  <ScrollView showsVerticalScrollIndicator={false}>
                  {translationEditions.map((translation) => (
                    <TouchableOpacity
                      key={translation.id}
                      onPress={() => {
                        handleTranslationChange(translation.name);
                        setShowTranslations(false);
                      }}
                      className={`p-4 border-b border-b-2 border-gray-300 ${translation.name === selectedTranslation ? 'bg-primary-200' : ''}`}
                    >
                      <Text className={`text-md font-JakartaSemiBold ${translation.name===selectedTranslation? "text-primary-500":"text-black"}`} >
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
            <TouchableOpacity onPress={()=>setAdjustTranslationFontSize(!adjustTranslationFontSize)} className='flex flex-row items-center gap-4 mb-3'>
              <Text className='text-md font-JakartaSemiBold underline'>Adjust Font Size: {translationFontSize}</Text>
              <MaterialCommunityIcons name={adjustTranslationFontSize?'chevron-down':'chevron-right'} size={20} color='#000' />
            </TouchableOpacity>
            <View>
            {
              adjustTranslationFontSize &&(
               <View className='flex flex-row items-center justify-between'>
                 <Slider
                style={{flex:1, height: 20,marginRight:15}}
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
            <TouchableOpacity onPress={()=>setAdjustTranslationFontSize(false)} className=''>
              <MaterialCommunityIcons name="check-circle" size={30} color='#994EF8' />          
                </TouchableOpacity>
               </View>
              )
            }
            </View>
              {currentTranslation?.jsonContent?.surahs?.[currentSurah]?.ayahs?.[currentAyah]?.text ? (
                <>
                <Bismilliah bismillahText={bismillahTranslation} currentAyah={currentAyah} currentSurrah={currentSurah} currentTranslation={currentTranslation.name} isTranslation={true} />
                <Text style={{ fontSize:translationFontSize,lineHeight: translationFontSize<28?42:70, textAlign: currentTranslation?.direction === 'rtl' ? 'right' : 'left' }}>
                  {currentTranslation.jsonContent.surahs[currentSurah].ayahs[currentAyah].text}
                </Text></>
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
