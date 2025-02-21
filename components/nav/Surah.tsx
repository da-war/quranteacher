import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { quranAll } from '@/constants';  // Your data source
import InputField from '../InputField';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list';

const Surah = () => {
  const [search, setSearch] = React.useState<string>('');
  const [surahs, setSurahs] = React.useState(quranAll.q.surahs);

  const searchSurah = (text: string) => {
    setSearch(text);
    if (text.length === 0) {
      setSurahs(quranAll.q.surahs);
      return;
    }
    const filteredSurahs = quranAll.q.surahs.filter((surah) => {
      return (
        surah.englishName.toLowerCase().includes(text.toLowerCase()) ||
        surah.name.toLowerCase().includes(text.toLowerCase())
      );
    });
    setSurahs(filteredSurahs);
  };

  const onPressSurah = (item: any) => {
    router.push({
      pathname: '/readSurah',
      params: {
        surah: JSON.stringify(item),
      },
    });
  };

  return (
    <View className="flex-1">
      <View className="mx-4">
        <InputField
          className="bg-white"
          value={search}
          onChangeText={searchSurah}
          placeholder="Search Surah"
          label="Search surah"
          labelStyle="mt-3"
        />
      </View>
      <View className="flex-1 p-4">
        <FlashList
          data={surahs}
          estimatedItemSize={200} // Adjust this based on the approximate size of each item
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onPressSurah(item)}
              className="p-4 bg-white mb-2 flex flex-row justify-between items-center rounded-2xl shadow-inner"
            >
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                className="max-w-[50%] font-JakartaMedium text-lg underline"
              >
                {item.englishName}
              </Text>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                className="max-w-[50%] font-NotoMedium text-lg underline"
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.number.toString()} // Assuming each surah has a unique id
          // Add additional styles if necessary
        />
      </View>
    </View>
  );
};

export default Surah;
