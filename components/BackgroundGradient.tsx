import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BackgroundGradient = () => {
  return (
    <LinearGradient
      colors={['#4E2999', '#7A4DB8']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={StyleSheet.absoluteFillObject}
    />
  );
};

export default BackgroundGradient;
