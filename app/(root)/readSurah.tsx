import { Alert, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundGradient from '@/components/BackgroundGradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
import { toArabicNumeral } from '@/utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

// Define the type for an Ayah object
interface Ayah {
  text: string;
  number: number;
  audio: string;
}

const ReadSurah = () => {
  const { surah } = useLocalSearchParams();
  const [fontSize, setFontSize] = React.useState<number>(20);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [playingAyah, setPlayingAyah] = React.useState<Ayah | null>(null);
  const [sound, setSound] = React.useState<Audio.Sound | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [currentAyahIndex, setCurrentAyahIndex] = React.useState<number>(0);
  const flashListRef = useRef<FlashList<any>>(null);

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
  }, []);

  const playAyahAudio = async (ayah: Ayah, index: number) => {
    if (sound) {
        await sound.unloadAsync(); // Stop any currently playing audio
    }

    // Set a timeout to stop the sound if it doesn't load in 13 seconds
    const timeoutId = setTimeout(async () => {
        // Stop audio only if it's still in loading state
        if (isPlaying) {
            await stopAudio(); // Stop audio if not loaded
            Alert.alert("Slow Internet Connection...");
        }
    }, 13000); // 13000 milliseconds = 13 seconds

    try {
        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: ayah.audio }, // Ayah audio URI
            { shouldPlay: true }
        );

        clearTimeout(timeoutId); // Clear the timeout if sound loads successfully

        setSound(newSound);
        setPlayingAyah(ayah);
        setCurrentAyahIndex(index); // Track the current Ayah index
        setIsPlaying(true);

        // Scroll to the Ayah when playing
        flashListRef.current?.scrollToIndex({
            index,
            animated: true,
        });

        // Listen for audio playback completion to play the next Ayah
        newSound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) {
                playNextAyah(index);
            }
        });
    } catch (error) {
        clearTimeout(timeoutId); // Clear the timeout in case of error
        Alert.alert("Slow Connection", "An error occurred while loading the audio.");
    }
};


  const playNextAyah = (currentIndex: number) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < parsedSurah.ayahs.length) {
      const nextAyah = parsedSurah.ayahs[nextIndex];
      playAyahAudio(nextAyah, nextIndex);
    } else {
      setIsPlaying(false); // Stop if it's the end of the list
    }
  };

  const togglePlayPause = (ayah: Ayah, index: number) => {
    if (playingAyah?.number === ayah.number && isPlaying) {
      if (sound) {
        sound.pauseAsync();
        setIsPlaying(false);
        stopAudio();
      }
    } else {
      playAyahAudio(ayah, index); // Use the list index instead of ayah.number
    }
  };

  const stopAudio = async () => {
    if (sound) {
      await sound.unloadAsync();
      setPlayingAyah(null);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Cleanup the sound when component unmounts
        }
      : undefined;
  }, [sound]);

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
        ref={flashListRef}
          data={parsedSurah.ayahs}
          estimatedItemSize={100}
          renderItem={({ item, index }) => (
            <View className={`p-4 bg-white mb-1 pb-10 ${playingAyah?.number === item.number && isPlaying?"bg-primary-100":'bg-white'}`}>
              <Text
                adjustsFontSizeToFit
                style={{
                  fontSize: fontSize,
                  textAlign: 'right',
                  lineHeight: fontSize < 28 ? 44 : 70,
                }}
                className="text-2xl font-NotoBold text-black"
              >
                {item?.text}
              </Text>
              <View className="absolute bottom-1 left-1 flex flex-row gap-3 items-center">
                <Text className="text-2xl font-NotoMedium">
                  {toArabicNumeral(item.number)}
                </Text>
                <TouchableOpacity onPress={() => togglePlayPause(item, index)}>
                  <MaterialCommunityIcons
                    name={
                      playingAyah?.number === item.number && isPlaying
                        ? 'pause-circle'
                        : 'play-circle'
                    }
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFontSize(fontSize + 2)}>
                  <MaterialCommunityIcons
                    name="format-font-size-increase"
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default ReadSurah;
