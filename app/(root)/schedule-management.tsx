import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';

const ScheduleScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateSelect = (day: any) => {
    setSelectedDate(day.dateString);
  };

  return (
    <SafeAreaView className="bg-gray-100 flex-1 p-5">
      <Text className="text-2xl font-bold text-gray-800">Manage Schedule</Text>
      <Calendar
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
        style={styles.calendar}
      />
      <Text className="mt-5 text-lg text-gray-800">Available Slots for {selectedDate}</Text>
      <View className="flex-row flex-wrap mt-3">
        {Array.from({ length: 24 }, (_, i) => (
          <TouchableOpacity key={i} className="bg-gray-200 p-2 m-1 rounded-lg">
            <Text className="text-gray-700">{`${i}:00`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 350,
    marginBottom: 20,
  },
});

export default ScheduleScreen;
