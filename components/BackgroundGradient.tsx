import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface BackgroundGradientProps {
  opacity?: number;
  gradientOne?: string;
  gradientTwo?: string;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: object | object[];
}

const BackgroundGradient:React.FC<BackgroundGradientProps> = ({
  opacity,
  gradientOne='#4E2999',
  gradientTwo='#7A4DB8',
  start={ x: 0, y: 0.5 },
  end={ x: 1, y: 0.5 },
  style,
}) => {
  
  return (
    <LinearGradient
      colors={[gradientOne, gradientTwo]}
      start={start}
      end={end}
      style={[StyleSheet.absoluteFillObject,{opacity:opacity},style]}
    />
  );
};

export default BackgroundGradient;
