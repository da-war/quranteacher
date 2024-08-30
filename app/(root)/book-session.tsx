import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import moment from 'moment'; // For handling time zones

const BookingScreen = () => {
  const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<{ name: string; details: string } | null>(null);

  // Dummy data for available slots (stored in UTC)
  const availableSlots = {
    '2024-08-31': [
      '09:00',
      '09:30',
      '10:00',
    ],
    '2024-09-01': [
      '11:00',
      '11:30',
    ],
    '2024-09-02': [
      '14:00',
    ],
  };

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setSelectedSlot(null);
  };

  const handleSlotPress = (slot: string) => {
    setSelectedSlot(slot);
    setModalVisible(true);
  };

  const handleBooking = () => {
    setBookingDetails({
      name: 'John Doe',
      details: `Booked for ${convertToLocalTime(selectedSlot)}`,
    });
    console.log(bookingDetails);
    setModalVisible(false);
  };

  const convertToLocalTime = (utcTime: string) => {
    
    return moment.utc(`${selectedDate}T${utcTime}:00Z`).local().format('MMMM D, YYYY h:mm A');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Book a Session</Text>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#4CAF50' },
          }}
          style={styles.calendar}
        />
      </View>

      <Text style={styles.subtitle}>Available Slots for {moment(selectedDate).format('MMMM D, YYYY')}</Text>
      <View style={styles.slotsContainer}>
        {availableSlots[selectedDate]?.map((slot, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSlotPress(slot)}
            style={styles.slotItem}
          >
            <Text style={styles.slotTime}>{convertToLocalTime(slot)}</Text>
          </TouchableOpacity>
        ))}
        {availableSlots[selectedDate]?.length === 0 && (
          <Text style={styles.noSlots}>No available slots for this date.</Text>
        )}
      </View>

      {/* Booking Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Confirm Booking</Text>
          <Text style={styles.modalDetails}>{convertToLocalTime(selectedSlot!)}</Text>
          <Button title="Confirm" onPress={handleBooking} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      {/* Booking Details */}
      {bookingDetails && (
        <View style={styles.bookingDetails}>
          <Text style={styles.bookingTitle}>Booking Confirmed</Text>
          <Text style={styles.bookingText}>Name: {bookingDetails.name}</Text>
          <Text style={styles.bookingText}>Details: {bookingDetails.details}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  calendarContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
  },
  slotsContainer: {
    flex: 1,
  },
  slotItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 5,
  },
  slotTime: {
    fontSize: 16,
    color: '#333',
  },
  noSlots: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 16,
    marginBottom: 20,
  },
  bookingDetails: {
    marginTop: 20,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookingText: {
    fontSize: 16,
  },
});

export default BookingScreen;
