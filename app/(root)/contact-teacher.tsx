import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContactTeacher() {
  const [message, setMessage] = useState('');

  return (
    <SafeAreaView className="bg-gray-100 flex-1 p-5">
      <ScrollView className="flex-1">
        <Text className="text-2xl font-bold text-gray-800 mb-5">Contact Teacher</Text>

        {/* Teacher Info */}
        <View className="bg-white p-4 rounded-lg shadow-sm">
          <Text className="text-xl font-semibold text-gray-700">Teacher Name</Text>
          <Text className="text-gray-600 mt-1">City, Country</Text>
          <Text className="text-gray-600 mt-1">★★★★★ (4.8)</Text>
        </View>

        {/* Message Input */}
        <View className="mt-5 bg-white p-4 rounded-lg shadow-sm">
          <Text className="text-lg font-semibold text-gray-700 mb-3">Your Message</Text>
          <TextInput
            placeholder="Type your message here..."
            multiline
            className="border border-gray-300 rounded-lg p-3 text-gray-700 h-40"
            value={message}
            onChangeText={setMessage}
          />
        </View>

        {/* Send Button */}
        <TouchableOpacity className="bg-blue-600 py-3 rounded-lg mt-5">
          <Text className="text-center text-white font-semibold">Send Message</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
