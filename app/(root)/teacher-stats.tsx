import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StatsScreen = () => {
  return (
    <SafeAreaView className="bg-gray-100 flex-1 p-5">
      <Text className="text-2xl font-bold text-gray-800">Statistics</Text>
      <View className="mt-5">
        <View style={styles.statItem}>
          <Text className="text-lg font-semibold">Total Bookings:</Text>
          <Text className="text-lg">35</Text>
        </View>
        <View style={styles.statItem}>
          <Text className="text-lg font-semibold">Hours Taught:</Text>
          <Text className="text-lg">50</Text>
        </View>
        <View style={styles.statItem}>
          <Text className="text-lg font-semibold">Pending Requests:</Text>
          <Text className="text-lg">5</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  statItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default StatsScreen;
