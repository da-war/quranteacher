import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface Props {
  currentSurrah: number;
  currentAyah: number;
  currentTranslation?: string;
  isTranslation?: boolean;
  bismillahText?: string;
}

const Bismilliah: React.FC<Props> = ({ currentSurrah, currentAyah, bismillahText }) => {
  // Determine whether to render the component
  if (
    (currentAyah === 0 && currentSurrah === 0) || // Do not render if both Ayah and Surrah are 0
    (currentAyah === 0 && currentSurrah === 8) || // Do not render if Ayah is 0 and Surrah is 8
    (currentAyah>0)
  ) {
    return null; // Do not render the component
  }

  // Default text and direction
 
  return (
    <View style={styles.container}>
      <Text className='text-2xl font-NotoMedium' style={[styles.text, { textAlign: 'center'}]}>
        {bismillahText}
      </Text>
    </View>
  );
};

export default Bismilliah;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});
