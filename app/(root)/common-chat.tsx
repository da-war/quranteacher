import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatScreen = () => {
  return (
    <SafeAreaView className="bg-gray-100 flex-1 p-5">
      <Text className="text-2xl font-bold text-gray-800">Chat</Text>
      <ScrollView className="mt-5">
        {/* Messages would be mapped here */}
        <View className="bg-white p-4 mb-3 rounded-lg shadow-sm">
          <Text className="text-gray-800">User: Hello, I have a question.</Text>
          <Text className="text-gray-600">Teacher: Sure, feel free to ask!</Text>
        </View>
      </ScrollView>
      <View className="flex-row mt-5">
        <TextInput placeholder="Type a message" className="flex-1 bg-white p-4 rounded-lg shadow-sm" />
        <TouchableOpacity className="ml-2 bg-blue-600 p-4 rounded-lg">
          <Text className="text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
