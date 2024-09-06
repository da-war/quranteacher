import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity,  FlatList, Modal, TextInput } from 'react-native';


import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTranslationStore from '../../store/useTranslationStore';


// english
// french
// hindi
// indonesian
// urdu_maududi
// urdu_qadri
// urdu_jalandhari

const translationEditions=[
  {
    id:1,
    name:'english',
    placeholderText:"English by Muhammad Asad"
  },
  {
    id:2,
    name:'french',
    placeholderText:"French by Muhammad Hamidullah"
  },
  {
    id:3,
    name:'hindi',
    placeholderText:"Hindi by Suhel Farooq Khan and Saifur Rahman Nadwi"
  },
  {
    id:4,
    name:'indonesian',
    placeholderText:"Indonesian by Quran.com"
  },
  {
    id:5,
    name:'urdu_maududi',
    placeholderText:"Urdu (Maulana Maududi)"
  },
  {
    id:6,
    name:'urdu_qadri',
    placeholderText:"Urdu (Dr Tahir ul Qadari)"
  },
  {
    id:7,
    name:'urdu_jalandhari',
    placeholderText:"Urdu (Fateh Muhammad Jalandhari)"
  },
];

const ReadingScreen = () => {

  const [selectedTranslation, setSelectedTranslation] = useState('English');
  const [translations, setTranslations] = useState(['English', 'French', 'Spanish']); // Add available translations
  const [showTranslations, setShowTranslations] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');


  const { currentTranslation, setTranslation } = useTranslationStore();



  const handleTranslationChange = (translationName: string) => {
    setTranslation(translationName);
  };




  const handleBookmark = () => {
    // Implement bookmark logic here
  };

  const handleShare = () => {
    // Implement share logic here
  };

  return (
    <SafeAreaView className='flex flex-1'>
      <ScrollView className="flex-1 bg-white p-5">
      <StatusBar style='dark' />

      {/* Quranic Text */}
      <View className="mb-5">
        <Text className="text-2xl font-JakartaBold text-primary-500">Surah Al-Fatiha</Text>
        <Text className="text-lg font-Noto mt-3">
          {/* Display the Arabic text here */}
          {`بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ`}
        </Text>
        <Text className="text-lg font-Noto mt-3">
          {/* Display the selected translation text here */}
          {`In the name of Allah, the Most Gracious, the Most Merciful.`}
        </Text>
      </View>

      {/* Language Preferences */}
      <View className="bg-primary-100 p-4 rounded-lg mb-5">
        <Text className="text-lg font-JakartaSemiBold text-primary-500">Translation</Text>
        <TouchableOpacity
          onPress={() => setShowTranslations(true)}
          className="bg-white border border-gray-300 p-3 rounded-lg mt-2"
        >
          <Text className="text-lg font-JakartaMedium text-gray-700">{selectedTranslation}</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons for Different Activities */}
      <View className="flex-row justify-between mb-5">
        <TouchableOpacity
          onPress={handleBookmark}
          className="bg-primary-500 p-4 rounded-lg flex-1 mr-2"
        >
          <Text className="text-white text-center text-lg font-JakartaSemiBold">Bookmark</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShare}
          className="bg-secondary-500 p-4 rounded-lg flex-1 ml-2"
        >
          <Text className="text-white text-center text-lg font-JakartaSemiBold">Share</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Selecting Translation */}
      <Modal
        visible={showTranslations}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTranslations(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-5 rounded-lg w-4/5">
            <Text className="text-lg font-JakartaSemiBold text-primary-500 mb-3">Select Translation</Text>
            <FlatList
              data={translations}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleTranslationChange(item)}
                  className="p-3 border-b border-gray-300"
                >
                  <Text className="text-lg font-JakartaMedium">{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setShowTranslations(false)}
              className="mt-4 p-3 bg-secondary-500 rounded-lg"
            >
              <Text className="text-white text-center text-lg font-JakartaSemiBold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Search Modal */}
      <Modal
        visible={searchModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSearchModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-5 rounded-lg w-4/5">
            <Text className="text-lg font-JakartaSemiBold text-primary-500 mb-3">Search</Text>
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search in Quran..."
              className="border border-gray-300 p-3 rounded-lg"
            />
            <TouchableOpacity
              onPress={() => setSearchModalVisible(false)}
              className="mt-4 p-3 bg-secondary-500 rounded-lg"
            >
              <Text className="text-white text-center text-lg font-JakartaSemiBold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
    </SafeAreaView>
  );
};

export default ReadingScreen;
