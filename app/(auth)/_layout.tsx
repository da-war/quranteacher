import React from "react";

import { Stack } from "expo-router";

const AuthStack = () => {
  return (
   <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name="welcome" />
    <Stack.Screen name="sign-in" />
    <Stack.Screen name="sign-up" />
   </Stack>
  );
};

export default AuthStack;

