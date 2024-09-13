import React from 'react'
import { Stack } from 'expo-router'

const TeacherTabs = () => {
  return (
   <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name="thome" />
    <Stack.Screen name="tchats" />
    <Stack.Screen name="tprofile" />
   </Stack>
  )
}

export default TeacherTabs

