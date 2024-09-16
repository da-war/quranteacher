import {  Text, View } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";

import { useFonts } from "expo-font";
import { NotificationProvider } from "@/context/NotificationContext";
import * as Notifications from 'expo-notifications';
import { AuthProvider } from "@/context/AuthContext";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),

})

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "Noto-Bold":require('../assets/fonts/NotoNaskhArabic-Bold.ttf'),
    "Noto-Medium":require('../assets/fonts/NotoNaskhArabic-Medium.ttf'),
    "Noto":require('../assets/fonts/NotoNaskhArabic-Regular.ttf'),
    "Noto-SemiBold":require('../assets/fonts/NotoNaskhArabic-SemiBold.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
   <AuthProvider>
     <NotificationProvider>
      <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index" />
    </Stack>
    </NotificationProvider>
   </AuthProvider>
  );
};

export default RootLayout;

