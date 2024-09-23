import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundGradient from '@/components/BackgroundGradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';

// Define the type for an Ayah object
type Ayah = {
  text: string;
};

const ReadSurah = () => {
  const { surah } = useLocalSearchParams();
  const [fontSize, setFontSize] = React.useState<number>(20);

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
          data={parsedSurah.ayahs as Ayah[]} // Cast the ayahs array to Ayah[]
          estimatedItemSize={100} // Estimate the size based on the layout
          renderItem={({ item }) => (
            <View className="p-4 bg-white mb-1">
              <Text
                adjustsFontSizeToFit
                style={{ lineHeight: 60, fontSize: fontSize, textAlign: 'right' }}
                className="text-2xl font-NotoBold text-black"
              >
                {item.text}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </SafeAreaView>
  );
};

export default ReadSurah;
