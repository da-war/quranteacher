import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackgroundGradient from '@/components/BackgroundGradient';
import BackButton from '@/components/global/BackButton';

const NotificationSettingsScreen = () => {
  const [settings, setSettings] = useState({
    reminder: true,
    message: true,
    promoted: false,
    alert: true,
    more: false,
  });

  const toggleSwitch = (key) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: !prevSettings[key],
    }));
  };

  const renderSettingItem = (title, key, icon, IconComponent) => (
    <View style={styles.settingItem} key={key}>
      <View style={styles.iconContainer}>
        <IconComponent name={icon} size={24} color="#4E2999" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>Manage your {title.toLowerCase()} settings.</Text>
      </View>
      <Switch
        value={settings[key]}
        onValueChange={() => toggleSwitch(key)}
        thumbColor={settings[key] ? '#4caf50' : '#ccc'}
        trackColor={{ false: '#f4f4f4', true: '#d9fdd3' }}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
        <View className="p-4 bg-primary-500">
         <BackButton title="Notifications" titleStyle='text-white'  />
        </View>
        <ScrollView style={styles.container}>
      <Text style={styles.header}>Notification Settings</Text>

      {renderSettingItem('Reminder Notifications', 'reminder', 'alarm', MaterialIcons)}
      {renderSettingItem('Message Notifications', 'message', 'message', MaterialIcons)}
      {renderSettingItem('Promoted Notifications', 'promoted', 'star', MaterialIcons)}
      {renderSettingItem('Alert Notifications', 'alert', 'alert', Ionicons)}
      
      {/* Option to add more settings */}
      <TouchableOpacity style={styles.addButton} onPress={() => toggleSwitch('more')}>
        <Text style={styles.addButtonText}>Add More Settings</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 15,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: '#4E2999',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationSettingsScreen;
