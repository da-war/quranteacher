import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
  <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="='dashboard" />
    <Stack.Screen name="read" />
    <Stack.Screen name="readSurah" />
    <Stack.Screen name="find-teacher" />
    <Stack.Screen name="teacher" />
    <Stack.Screen name="contact-teacher" />
    <Stack.Screen name="book-session" />
    <Stack.Screen name="quiz" />
    <Stack.Screen name="register-teacher" />
    <Stack.Screen name="teacher-dashboard" />
    <Stack.Screen name='common-chat' />
    <Stack.Screen name='booking-requests' />
    <Stack.Screen name="teacher-stats" />
    <Stack.Screen name="become-teacher" />
    <Stack.Screen name="my-bookings" />
    <Stack.Screen name="notificaitons" />
    <Stack.Screen name="settings" />
  </Stack>
  );
};

export default RootLayout;

