import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import { useWindowDimensions } from 'react-native';

interface ImageInputProps {
  onImagePicked: (uri: string) => void;
  className?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImagePicked, className }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const actionSheetRef = React.useRef<ActionSheetRef>(null);
  const { height } = useWindowDimensions(); // Get the height of the window

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus.status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }

      if (mediaLibraryStatus.status !== 'granted') {
        alert('Sorry, we need media library permissions to make this work!');
      }
    };
    requestPermissions();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      onImagePicked(result.assets[0].uri);
    }
  };

  const pickFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      onImagePicked(result.assets[0].uri);
    }
  };

  const showActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const handleDelete = () => {
    setImageUri(null);
    onImagePicked('');
  };

  return (
    <>
    <View className={className}>
      <TouchableOpacity onPress={showActionSheet} className="relative">
        <View className="w-24 h-24 bg-gray-200 rounded-lg justify-center items-center">
          {imageUri ? (
            <Image source={{ uri: imageUri }} className="w-full h-full rounded-lg" />
          ) : (
            <Text className="text-gray-500">Pick an Image</Text>
          )}
          {imageUri && (
            <TouchableOpacity onPress={handleDelete} className="absolute top-1 right-1">
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      
    </View>
    <View className='flex-1'>
    <ActionSheet
        ref={actionSheetRef}
        containerStyle={styles.actionSheetContainer} // Custom container styles if needed
        animated
        gestureEnabled
        snapPoints={[100]}
      >
        <View className="p-4 min-h-[300px]">
          <Text className="text-[20px] mb-4 font-JakartaSemiBold">Select an option:</Text>
          <TouchableOpacity onPress={pickFromCamera} className="py-2">
            <Text className="text-blue-500 text-[16px] font-JakartaMedium">Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage} className="py-2">
            <Text className="text-blue-500 text-[16px] font-JakartaMedium">Media Library</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => actionSheetRef.current?.hide()} className="py-2">
            <Text className="text-red-500 text-[16px] font-JakartaMedium">Cancel</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
      </View>
      </>
  );
};

const styles = StyleSheet.create({
  actionSheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default ImageInput;
