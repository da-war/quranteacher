import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUserStore } from '@/store/useUserStore'

const TeacherProfile = () => {
  const {user}=useUserStore();

  console.log(user)
  return (
    <View>
      <Text>TeacherProfile</Text>
    </View>
  )
}

export default TeacherProfile

const styles = StyleSheet.create({})