import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="read" />
      <Stack.Screen name="readSurah" />
      <Stack.Screen name="find-teacher" />
      <Stack.Screen name="teacher" />
      <Stack.Screen name="contact-teacher" />
      <Stack.Screen name="book-session" />
      <Stack.Screen name="book-appointment" />
      <Stack.Screen name="quiz" />
      <Stack.Screen name="register-teacher" />
      <Stack.Screen name="common-chat" />
      <Stack.Screen name="become-teacher" />
      <Stack.Screen name="my-bookings" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="inbox" />
    </Stack>
  );
};

export default RootLayout;
