import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';

interface ImageInputProps {
  onImageSelect?: (imageUri: string | null) => void;
  initialImage?: string | null;
  size?: number;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageSelect, initialImage = null, size = 100 }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(initialImage);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Bottom sheet snap points
  const snapPoints = useMemo(() => ['40%'], []);

  useEffect(() => {
    // Trigger callback when an image is selected
    if (onImageSelect) {
      onImageSelect(selectedImage);
    }
  }, [selectedImage, onImageSelect]);

  // Open the camera to take a photo
  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result?.cancelled) {
      setSelectedImage(result?.uri);
    }
    bottomSheetRef.current?.close();
  };

  // Open media library to select an image
  const openMediaLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
    bottomSheetRef.current?.close();
  };

  // Handle the image removal
  const removeImage = () => {
    setSelectedImage(null);
  };

  // Open bottom sheet
  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <View className="items-center justify-center mt-10">
      <TouchableOpacity onPress={openBottomSheet} className="relative">
        {/* Image container */}
        <View
          className={`bg-gray-200 items-center justify-center ${
            selectedImage ? 'rounded-full' : 'rounded-lg'
          }`}
          style={{ height: size, width: size }}
        >
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              className="rounded-full"
              style={{ height: size, width: size }}
            />
          ) : (
            <Text className="text-gray-500">Add Image</Text>
          )}
        </View>

        {/* Delete icon when image is selected */}
        {selectedImage && (
          <TouchableOpacity
            onPress={removeImage}
            className="absolute top-0 right-0 p-1 bg-red-600 rounded-full"
          >
            <MaterialCommunityIcons name="close" size={20} color="white" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {/* Gorhom Bottom Sheet */}
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints}>
        <View className="flex-1 items-center justify-center">
          <TouchableOpacity
            onPress={openCamera}
            className="bg-green-600 p-4 rounded-full mb-4"
          >
            <Text className="text-white text-lg">Use Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openMediaLibrary}
            className="bg-blue-600 p-4 rounded-full"
          >
            <Text className="text-white text-lg">Choose from Library</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default ImageInput;
