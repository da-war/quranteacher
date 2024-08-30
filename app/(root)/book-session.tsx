import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BookSession() {
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>('Morning');
  const timeSlots: string[] = ['Morning', 'Afternoon', 'Evening', 'Weekend'];

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <SafeAreaView className="bg-gray-100 flex-1 p-5">
      <ScrollView className="flex-1">
        <Text className="text-2xl font-bold text-gray-800 mb-5">Book a Session</Text>

        {/* Teacher Info */}
        <View className="bg-white p-4 rounded-lg shadow-sm">
          <Text className="text-xl font-semibold text-gray-700">Teacher Name</Text>
          <Text className="text-gray-600 mt-1">City, Country</Text>
          <Text className="text-gray-600 mt-1">★★★★★ (4.8)</Text>
        </View>

        {/* Custom Date Picker */}
        <View className="mt-5 bg-white p-4 rounded-lg shadow-sm">
          <Text className="text-lg font-semibold text-gray-700 mb-3">Select Date</Text>
          <TouchableOpacity onPress={showDatepicker} className="border border-gray-300 p-3 rounded-lg">
            <Text className="text-gray-700">{date.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </View>

        {/* Time Slots */}
        <View className="mt-5 bg-white p-4 rounded-lg shadow-sm">
          <Text className="text-lg font-semibold text-gray-700 mb-3">Select Time Slot</Text>
          <View className="flex-row flex-wrap">
            {timeSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                className={`py-2 px-4 rounded-lg mr-2 mb-2 ${
                  selectedTime === slot ? 'bg-green-600' : 'bg-gray-300'
                }`}
                onPress={() => setSelectedTime(slot)}
              >
                <Text className="text-white font-semibold">{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity className="bg-green-600 py-3 rounded-lg mt-5">
          <Text className="text-center text-white font-semibold">Confirm Booking</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
