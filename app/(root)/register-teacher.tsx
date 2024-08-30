import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterTeacher() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    languages: '',
    bio: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Logic to handle registration
    Alert.alert('Registration Successful', 'You can now access your teacher dashboard.');
  };

  return (
    <SafeAreaView className="bg-gray-100 flex-1 p-5">
      <ScrollView>
        <Text className="text-2xl font-bold text-gray-800">Register as a Teacher</Text>
        <View className="mt-5">
          <TextInput
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
            placeholder="Full Name"
            className="bg-white p-4 rounded-lg shadow-sm mb-3"
          />
          <TextInput
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            placeholder="Email"
            keyboardType="email-address"
            className="bg-white p-4 rounded-lg shadow-sm mb-3"
          />
          <TextInput
            value={formData.phone}
            onChangeText={(text) => handleChange('phone', text)}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            className="bg-white p-4 rounded-lg shadow-sm mb-3"
          />
          <TextInput
            value={formData.languages}
            onChangeText={(text) => handleChange('languages', text)}
            placeholder="Languages you teach"
            className="bg-white p-4 rounded-lg shadow-sm mb-3"
          />
          <TextInput
            value={formData.bio}
            onChangeText={(text) => handleChange('bio', text)}
            placeholder="Short Bio"
            multiline
            className="bg-white p-4 rounded-lg shadow-sm"
          />
          <TouchableOpacity onPress={handleSubmit} className="mt-5 bg-blue-600 py-2 rounded-lg">
            <Text className="text-center text-white font-semibold">Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
