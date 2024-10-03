import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import moment from "moment";
import { colors } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/global/BackButton";
import CustomButton from "@/components/CustomButton";

const BookAppointmentScreen = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Sample time slots
  const timeSlots = [
    "09:00 AM",
    "10:30 AM",
    "12:00 PM",
    "02:00 PM",
    "04:00 PM",
  ];

  // Get upcoming dates
  const getUpcomingDates = () => {
    let dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(moment().add(i, "days"));
    }
    return dates;
  };

  const onDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset the selected time slot
  };

  const onTimeSlotSelect = (slot: string) => {
    setSelectedTimeSlot(slot);
  };

  const handleBooking = () => {
    console.log(selectedDate, selectedTimeSlot);
    if (selectedTimeSlot) {
      alert(
        `Booking Confirmed for ${selectedDate.format(
          "MMMM Do YYYY"
        )} at ${selectedTimeSlot}`
      );
    } else {
      alert("Please select a time slot.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="p-4 bg-primary-500">
        <BackButton title="Go Back" titleStyle="text-white" />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Book an Appointment</Text>

        <Text style={styles.subTitle}>Select Date</Text>
        <View>
          <FlatList
            data={getUpcomingDates()}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.format("DD-MM-YYYY")}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dateContainer,
                  selectedDate.isSame(item, "day") && styles.selectedDate,
                ]}
                onPress={() => onDateSelect(item)}
              >
                <Text
                  style={[
                    styles.dateText,
                    selectedDate.isSame(item, "day") && { color: "white" },
                  ]}
                >
                  {item.format("ddd")}
                </Text>
                <Text
                  style={[
                    styles.dateNumber,
                    selectedDate.isSame(item, "day") && { color: "white" },
                  ]}
                >
                  {item.format("D")}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <Text style={styles.subTitle}>Select Time Slot</Text>
        <View style={{ marginTop: 10 }}>
          <ScrollView
            style={{ flexWrap: "wrap" }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.timeSlotContainer,
                  selectedTimeSlot === slot && styles.selectedTimeSlot,
                ]}
                onPress={() => onTimeSlotSelect(slot)}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTimeSlot === slot && { color: "white" },
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <CustomButton
          title="Confirm Booking"
          onPress={handleBooking}
          className="mt-7 rounded-md"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
  },
  dateContainer: {
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    height: 70,
    justifyContent: "center",
    width: 70,
    marginTop: 10,
  },
  selectedDate: {
    backgroundColor: colors.primary,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  timeSlotContainer: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedTimeSlot: {
    backgroundColor: colors.primary,
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: "500",
  },
  bookButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    marginTop: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BookAppointmentScreen;
