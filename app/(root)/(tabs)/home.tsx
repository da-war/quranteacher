// App.js

import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView, SafeAreaView } from 'react-native';


import auth from '@react-native-firebase/auth';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Quran App</Text>
          <Text style={styles.subtitle}>Read the Quran and Find Quran Teachers</Text>
        </View>

        <Text onPress={()=>auth().signOut()}>Logout</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search for teachers..."
          />
        </View>

        {/* Main Sections */}
        <View style={styles.mainContent}>
          {/* Quran Reading Section */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Read the Quran</Text>
            <Text style={styles.cardContent}>
              Explore and read the Quran online with easy navigation and beautiful text rendering.
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Read Now" onPress={() => alert('Navigate to Quran reader')} />
            </View>
          </View>

          {/* Find Teachers Section */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Find Quran Teachers</Text>
            <Text style={styles.cardContent}>
              Connect with qualified Quran teachers who can guide you through your learning journey.
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Find Teachers" onPress={() => alert('Navigate to teacher search')} />
            </View>
          </View>
        </View>

        {/* Additional Features */}
        <View style={styles.additionalFeatures}>
          <View style={styles.buttonContainer}>
            <Button title="My Profile" onPress={() => alert('Navigate to profile')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Settings" onPress={() => alert('Navigate to settings')} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  searchContainer: {
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  mainContent: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    color: '#444',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 8,
  },
  additionalFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
