import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CircularProgress from 'react-native-circular-progress-indicator'
import { useAyahsStore } from '@/store/useAyahsStore'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

import * as Notifications from 'expo-notifications';

const Ayah = () => {

    const {completedAyahs,totalAyahs} =useAyahsStore();
    const handleSetReminder = () => {


    };

    const handleStartReading = () => {
        // Implement start reading logic here
        router.push('/read');
    }

    


  return (
    <View style={{ flex: 1, padding: 10 }}>
    <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-white p-4 my-4 rounded-lg">
            <Text className="text-2xl font-JakartaSemiBold text-center font-JakartaBold text-primary-500">
                Ayah by Ayah
            </Text>
            <View style={{ gap: 20 }} className="flex flex-row my-3">
                <CircularProgress
                    value={completedAyahs}
                    radius={90}
                    duration={500}
                    progressValueColor={"#000"}
                    maxValue={totalAyahs}
                    title={`/ ${totalAyahs}`}
                    titleColor={`${completedAyahs}`}
                    titleStyle={{ fontFamily: "JakartaBold" }}
                    subtitleStyle={{ fontSize: 12 }}
                    subtitle="Completed Ayahs"
                    subtitleColor="#4E2999"
                    activeStrokeColor="#4E2999"
                    inActiveStrokeColor="#E5E5E5"
                />
                <View className="flex flex-col justify-center items-start gap-2">
                    <View className="flex flex-row gap-1 items-center">
                        <MaterialCommunityIcons name="square" size={14} color="#994EF8" />
                        <Text  style={{flexShrink:1}} className="text-xs font-Jakarta">5 language translations</Text>
                    </View>
                    <View className="flex flex-row gap-1 items-center">
                        <MaterialCommunityIcons name="square" size={14} color="#994EF8" />
                        <Text style={{flexShrink:1}} className="text-xs font-Jakarta">Save your progress</Text>
                    </View>
                    <View className="flex flex-row gap-1 items-center">
                        <MaterialCommunityIcons name="square" size={14} color="#994EF8" />
                        <Text  style={{flexShrink:1}} className="text-xs font-Jakarta">Set Daily Reminder</Text>
                    </View>
                </View>
            </View>
            <View className="flex-row justify-between mb-5">
                <TouchableOpacity
                    onPress={handleStartReading}
                    className="bg-primary-500 p-4 rounded-lg flex-1 mr-2"
                >
                    <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        className="text-white text-center text-lg font-JakartaSemiBold"
                    >
                        Start Reading
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSetReminder}
                    className="bg-secondary-500 p-4 rounded-lg flex-1 ml-2"
                >
                    <Text className="text-white text-center text-lg font-JakartaSemiBold">
                        Set Reminder
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        {/* Tip Section */}
        <View>
            <Text className="text-2xl font-JakartaSemiBold">Beautiful Tips</Text>
            <View className="flex flex-row place-items-start gap-2 my-2">
                <MaterialCommunityIcons name="heart" size={20} color="#994EF8" />
                <Text style={{ flexShrink: 1 }} className="text-lg">
                    If you read <Text className="font-JakartaBold">17-18 Ayahs</Text> a day, you
                    will complete the Quran in a year.
                </Text>
            </View>
            <View className="flex flex-row place-items-start gap-2 my-2">
                <MaterialCommunityIcons name="heart" size={20} color="#994EF8" />
                <Text style={{ flexShrink: 1 }} className="text-lg">
                    <Text className="font-JakartaBold">Make Dua</Text> for the strength to complete
                    your Quran journey.
                </Text>
            </View>
            <View className="flex flex-row place-items-start gap-2 my-2">
                <MaterialCommunityIcons name="heart" size={20} color="#994EF8" />
                <Text style={{ flexShrink: 1 }} className="text-lg">
                    Set <Text className="font-JakartaBold">Daily Reminders</Text> so that you don't
                    forget to read the Quran.
                </Text>
            </View>
        </View>
    </ScrollView>
</View>
  )
}

export default Ayah

const styles = StyleSheet.create({})