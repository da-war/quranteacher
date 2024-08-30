import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Dashboard = ({ navigation }: any) => {
  return (
    <SafeAreaView className="bg-gray-100 flex-1 p-5">
      <Text className="text-2xl font-bold text-gray-800">Teacher Dashboard</Text>
      <View className="mt-5">
        <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.button}>
          <Text style={styles.buttonText}>Start Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Schedule')} style={styles.button}>
          <Text style={styles.buttonText}>Manage Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BookingRequests')} style={styles.button}>
          <Text style={styles.buttonText}>Booking Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Stats')} style={styles.button}>
          <Text style={styles.buttonText}>Stats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4F6D7A',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Dashboard;
