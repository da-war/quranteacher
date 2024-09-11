import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {useLocalSearchParams} from 'expo-router'

const readSurah = () => {
    const {surah}=useLocalSearchParams();
    console.log(surah)
  return (
    <View>
      <Text>readSurah</Text>
    </View>
  )
}

export default readSurah

const styles = StyleSheet.create({})