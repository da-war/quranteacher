import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const ScheduleScreen = () => {
  const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [showModal, setShowModal] = useState<boolean>(false);
  const [availability, setAvailability] = useState<Record<string, { time: string; description: string }[]>>({
    '2024-08-31': [
      { time: '2024-08-31T09:00:00Z', description: 'Session with John' },
      { time: '2024-08-31T09:30:00Z', description: 'Session with Sara' },
    ],
    '2024-09-01': [
      { time: '2024-09-01T11:00:00Z', description: 'Session with Alice' },
    ],
  });
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<Record<string, boolean>>({});

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const convertToLocalTime = (utcTime: string) => {
    return moment.utc(utcTime).local().format('h:mm A');
  };

  const handleSaveAvailability = () => {
    if (selectedSlots.length) {
      const updatedAvailability = {
        ...availability,
        [selectedDate]: selectedSlots.map(time => ({
          time: moment(selectedDate).startOf('day').add(moment.duration(time)).toISOString(),
          description: 'Available Slot'
        }))
      };
      setAvailability(updatedAvailability);
      setSelectedSlots([]);
      setShowModal(false);
    }
  };

  const handleSlotSelection = (slot: string) => {
    setSelectedSlots(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const timeSlots = Array.from({ length: 24 * 2 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minute}`;
  });

  const renderTimeSlot = (slot: string) => (
    <TouchableOpacity
      key={slot}
      style={[
        styles.slotButton,
        selectedSlots.includes(slot) && styles.selectedSlot
      ]}
      onPress={() => handleSlotSelection(slot)}
    >
      <Text style={styles.slotText}>{slot}</Text>
    </TouchableOpacity>
  );

  const bookedDates = Object.keys(availability);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Manage Schedule</Text>
      
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: '#4CAF50' },
            ...bookedDates.reduce((acc, date) => {
              acc[date] = { marked: true, dotColor: '#FF5722' };
              return acc;
            }, {}),
          }}
          style={styles.calendar}
        />
      </View>

      <Text style={styles.subtitle}>Available Slots for {moment(selectedDate).format('MMMM D, YYYY')}</Text>
      <View style={styles.agendaContainer}>
        {availability[selectedDate]?.length ? (
          availability[selectedDate].map((item, index) => (
            <View key={index} style={styles.agendaItem}>
              <Text style={styles.agendaTime}>{convertToLocalTime(item.time)}</Text>
              <Text style={styles.agendaDescription}>{item.description}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noBookings}>No bookings for this date.</Text>
        )}
      </View>

      <TouchableOpacity onPress={() => setShowModal(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Availability</Text>
      </TouchableOpacity>

      {/* Availability Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Set Availability</Text>
          <Calendar
            onDayPress={(day) => setAvailableDates(prev => ({
              ...prev,
              [day.dateString]: !prev[day.dateString]
            }))}
            markedDates={Object.keys(availableDates).reduce((acc, date) => {
              acc[date] = { selected: availableDates[date], selectedColor: '#4CAF50' };
              return acc;
            }, {})}
            style={styles.calendar}
          />
          <Text style={styles.modalSubtitle}>Select Time Slots</Text>
          <ScrollView style={styles.timeSlotsContainer}>
            {timeSlots.map(slot => renderTimeSlot(slot))}
          </ScrollView>
          <View style={styles.modalButtons}>
            <Button title="Save" onPress={handleSaveAvailability} />
            <Button title="Cancel" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
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
  agendaContainer: {
    flex: 1,
  },
  agendaItem: {
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
  agendaTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  agendaDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  noBookings: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
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
  modalSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  timeSlotsContainer: {
    flex: 1,
    marginVertical: 10,
    width: '100%',
  },
  slotButton: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  selectedSlot: {
    backgroundColor: '#4CAF50',
  },
  slotText: {
    color: '#333',
    fontWeight: 'bold',
  },
  modalButtons: {
    marginTop: 15,
    width: '100%',
  },
});

export default ScheduleScreen;
