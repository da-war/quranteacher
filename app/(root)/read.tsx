import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Read() {
  return (
    <SafeAreaView className="bg-gray-100 flex-1 p-5">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold text-gray-800">Surah Al-Baqarah</Text>
        <Text className="text-lg text-gray-600">Ayah 50</Text>
      </View>

      {/* Quran Text */}
      <ScrollView className="mt-5 bg-white p-4 rounded-lg shadow-sm flex-1">
        <Text style={{lineHeight:55}} className="text-3xl font-NotoBold text-gray-800 leading-relaxed">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          {"\n"} يَا أَيُّهَا النَّاسُ اعْبُدُوا رَبَّكُمُ الَّذِي خَلَقَكُمْ وَالَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ
        </Text>
        <TouchableOpacity className="mt-5 bg-gray-200 p-2 rounded-lg">
          <Text className="text-xl text-gray-700">Toggle Translation</Text>
        </TouchableOpacity>
        <Text className="mt-3 text-lg text-gray-600 leading-relaxed">
          In the name of Allah, the Most Compassionate, the Most Merciful.
          {"\n"} O mankind, worship your Lord, who created you and those before you, that you may become righteous.
        </Text>
      </ScrollView>

      {/* Navigation & Bookmark */}
      <View className="mt-5 flex-row justify-between items-center">
        <TouchableOpacity className="bg-gray-300 p-3 rounded-lg">
          <Text className="text-gray-700">Previous Ayah</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-green-600 p-3 rounded-lg">
          <Text className="text-white font-semibold">Next Ayah</Text>
        </TouchableOpacity>
      </View>

      {/* Bookmark & Audio */}
      <View className="mt-5 flex-row justify-between items-center">
        <TouchableOpacity className="bg-gray-200 p-3 rounded-lg">
          <Text className="text-gray-700">Bookmark Ayah</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 p-3 rounded-lg">
          <Text className="text-gray-700">Play Audio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
