import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Stack } from 'expo-router';

const TeacherLayout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  )
}

export default TeacherLayout

const styles = StyleSheet.create({})