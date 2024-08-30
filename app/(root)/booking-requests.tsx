import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BookingRequestsScreen = () => {
  const handleAccept = (id: number) => {
    Alert.alert('Accepted', `Booking request ${id} accepted.`);
  };

  const handleReject = (id: number) => {
    Alert.alert('Rejected', `Booking request ${id} rejected.`);
  };

  return (
    <SafeAreaView className="bg-gray-100 flex-1 p-5">
      <Text className="text-2xl font-bold text-gray-800">Booking Requests</Text>
      <View className="mt-5">
        {[1, 2, 3].map((requestId) => (
          <View key={requestId} className="bg-white p-4 mb-3 rounded-lg shadow-sm">
            <Text className="text-gray-800">Booking Request {requestId}</Text>
            <View className="flex-row justify-between mt-3">
              <TouchableOpacity onPress={() => handleAccept(requestId)} style={styles.buttonAccept}>
                <Text className="text-white">Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleReject(requestId)} style={styles.buttonReject}>
                <Text className="text-white">Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonAccept: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonReject: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
});

export default BookingRequestsScreen;
