import { Alert, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundGradient from '@/components/BackgroundGradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
import { toArabicNumeral } from '@/utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

// Define the type for an Ayah object
interface  Ayah  {
  text: string;
  number: number;
  audio: string;
};

const ReadSurah = () => {
  const { surah } = useLocalSearchParams();
  const [fontSize, setFontSize] = React.useState<number>(20);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [playingAyah, setPlayingAyah] = React.useState<Ayah | null>(null);
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  

  // Parse the surah JSON string back into an object
  const parsedSurah = surah ? JSON.parse(surah as string) : null;

  const getFontSize = async () => {
    try {
      const fontSize = await AsyncStorage.getItem('arabicFontSize');
      if (fontSize) {
        setFontSize(parseInt(fontSize));
      } else {
        setFontSize(16);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFontSize();
    return () => {
      stopAudio();
    };
  }, []);

  const setPlayingAudio = (ayah: Ayah |null) => {
    if(ayah){
      if (isPlaying && playingAyah?.number === ayah.number) {
        console.log('Stopping audio');
        stopAudio();
      } else {
        setPlayingAyah(ayah);
        setIsPlaying(true);
        playAudio(ayah?.audio);
      }
    }
    else{
      Alert.alert('Error', 'No audio found for this ayah.');
    }
  };

  const playNextAyah = async () => {
    if (playingAyah) {
      const nextAyahIndex = playingAyah.number; // Get the current Ayah number
      const nextAyah = parsedSurah?.ayahs.find((ayah: Ayah) => ayah.number === nextAyahIndex + 1);
      
      if (nextAyah) {
        console.log('Playing next ayah:', nextAyah);
        setPlayingAyah(nextAyah);
        playAudio(nextAyah.audio);
        console.log('Next ayah:', nextAyah);
      } else {
        console.log('No more ayahs to play');
        stopAudio();
      }
    }
  };
  

  const playAudio = async (uri: string | null) => {

    if (uri){
      try {
        // Unload the previous sound if it exists
        if (sound) {
          await sound.unloadAsync();
          setSound(null);
        }
    
        setLoading(true); // Show loading indicator
        setIsPlaying(true);
       
    
        // Load the new sound
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: true }, // Start playing as soon as it's loaded
          (status) => {
            if (status.isLoaded && status.didJustFinish) {
              stopAudio(); // Stop audio and reset when finished
              playNextAyah();
            }
          }
        );
      } catch (error) {
        setLoading(false);
        console.error('Error playing audio:', error);
        Alert.alert('Error', 'There was an issue loading the audio. Please check your internet connection.');
      }
      
    }
    else{
      Alert.alert('Error', 'No audio found for this ayah.');
    }
  };

  const stopAudio = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null); // Clear the sound state
        setIsPlaying(false);
        setPlayingAyah(null);
      } catch (error) {
        console.error('Error stopping audio:', error);
        setPlayingAudio(null);
        setIsPlaying(false);
      }
    }
    else{
      setPlayingAudio(null);
      setIsPlaying(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Display the surah details */}
      <View className="p-4 flex flex-row justify-between">
        <BackgroundGradient />
        {parsedSurah ? (
          <>
            <Text className="text-2xl font-JakartaSemiBold text-white">
              {parsedSurah.englishName}
            </Text>
            <Text className="text-2xl font-NotoMedium text-white pt-2">
              {parsedSurah.name}
            </Text>
          </>
        ) : (
          <Text>No Surah Data Found</Text>
        )}
      </View>

      {parsedSurah && (
        <FlashList
          data={parsedSurah.ayahs as Ayah[]}
          estimatedItemSize={100}
          renderItem={({ item }) => (
            <View className="p-4 bg-white mb-1 pb-10">
              <Text
                adjustsFontSizeToFit
                style={{ fontSize: fontSize, textAlign: 'right', lineHeight: fontSize < 28 ? 44 : 70 }}
                className="text-2xl font-NotoBold text-black"
              >
                {item.text}
              </Text>
              <View className="absolute bottom-1 left-1 flex flex-row gap-3 items-center">
                <Text className="text-2xl font-NotoMedium">{toArabicNumeral(item.number)}</Text>
                <TouchableOpacity onPress={() => setPlayingAudio(item)}>
                  <MaterialCommunityIcons name={playingAyah?.number === item.number && isPlaying ? 'pause-circle' : 'play-circle'} size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFontSize(fontSize + 2)}>
                  <MaterialCommunityIcons name="format-font-size-increase" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </SafeAreaView>
  );
};

export default ReadSurah;
