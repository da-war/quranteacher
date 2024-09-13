import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUserStore } from '@/store/useUserStore'

const TeacherHome = () => {
const {user,userType}= useUserStore();
console.log(userType)
console.log(user?.role)
  return (
    <View>
      <Text>thome</Text>
    </View>
  )
}

export default TeacherHome

const styles = StyleSheet.create({})