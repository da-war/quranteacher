import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Teacher() {
  return (
    <SafeAreaView className="bg-gray-100 flex-1">
      <ScrollView className="p-5">
        {/* Teacher's Photo and Basic Info */}
        <View className="bg-white p-4 rounded-lg shadow-sm items-center">
          <Image
            source={{ uri: 'https://example.com/teacher-photo.jpg' }}
            className="w-32 h-32 rounded-full"
          />
          <Text className="text-xl font-bold text-gray-800 mt-3">Teacher Name</Text>
          <Text className="text-gray-600 mt-1">City, Country</Text>
          <Text className="text-gray-600 mt-1">★★★★★ (4.8)</Text>
        </View>

        {/* Bio/Introduction */}
        <View className="mt-5 bg-white p-4 rounded-lg shadow-sm">
          <Text className="text-lg font-semibold text-gray-700">About Me</Text>
          <Text className="text-gray-600 mt-3">
            Assalamu Alaikum! I am a dedicated Quran teacher with over 10 years of experience in teaching Quran to students of all ages. My goal is to help you understand and memorize the Quran in a way that fits your learning style.
          </Text>
        </View>

        {/* Teaching Details */}
        <View className="mt-5 bg-white p-4 rounded-lg shadow-sm">
          <Text className="text-lg font-semibold text-gray-700">Teaching Details</Text>
          <View className="mt-3">
            <Text className="text-gray-600">📚 Experience: 10+ Years</Text>
            <Text className="text-gray-600 mt-2">🗣️ Languages: Arabic, English, Urdu</Text>
            <Text className="text-gray-600 mt-2">🕌 Hafiz: Yes</Text>
            <Text className="text-gray-600 mt-2">🕒 Availability: Morning, Evening, Weekends</Text>
          </View>
        </View>

        {/* Rating and Reviews */}
        <View className="mt-5 bg-white p-4 rounded-lg shadow-sm">
          <Text className="text-lg font-semibold text-gray-700">Reviews</Text>
          <View className="mt-3">
            {[1, 2, 3].map((review, index) => (
              <View key={index} className="mt-4">
                <Text className="text-gray-800 font-semibold">Student Name</Text>
                <Text className="text-gray-600 mt-1">★★★★★</Text>
                <Text className="text-gray-600 mt-2">
                  Teacher Name has been an excellent guide in my Quranic studies. I have improved significantly in my recitation and understanding.
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact and Booking */}
        <View className="mt-5 bg-white p-4 rounded-lg shadow-sm mb-10">
          <Text className="text-lg font-semibold text-gray-700">Contact & Booking</Text>
          <View className="mt-3">
            <TouchableOpacity onPress={()=>router.push('/contact-teacher')} className="bg-blue-600 py-3 rounded-lg">
              <Text className="text-center text-white font-semibold">Contact Teacher</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>router.push('/book-session')} className="bg-green-600 py-3 rounded-lg mt-4">
              <Text className="text-center text-white font-semibold">Book a Session</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
