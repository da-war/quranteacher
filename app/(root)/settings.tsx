import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
  const router = useRouter();

  const handleNavigation = (route) => {
    router.push(route);
  };

  const renderSettingItem = (title, icon, IconComponent, route) => (
    <TouchableOpacity style={styles.settingItem} onPress={() => handleNavigation(route)}>
      <View style={styles.iconContainer}>
        <IconComponent name={icon} size={24} color="#4E2999" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className='flex-1'>
        <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {renderSettingItem('Update Profile', 'user', FontAwesome5, '/update-profile')}
      {renderSettingItem('Privacy Policy', 'shield-check', FontAwesome5, '/privacy-policy')}
      {renderSettingItem('Notification Settings', 'notifications', Ionicons, '/notification-settings')}
      {renderSettingItem('About Us', 'information-circle', Ionicons, '/about-us')}
      {renderSettingItem('Help & Support', 'help-circle', Ionicons, '/help-support')}
      {renderSettingItem('Logout', 'exit-to-app', MaterialCommunityIcons, '/logout')}
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
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SettingsScreen;
