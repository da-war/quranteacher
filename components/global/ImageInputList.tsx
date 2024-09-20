import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import { useRef } from 'react';

interface ImageInputListProps {
  onImagesPicked: (uris: string[]) => void;
  limit?: number;
  className?: string;
}

const ImageInputList: React.FC<ImageInputListProps> = ({ onImagesPicked, limit = 3, className }) => {
  const [imageUris, setImageUris] = useState<string[]>([]);
  const actionSheetRef = useRef<ActionSheetRef>(null); // Explicitly typing the ref
  const scrollViewRef = useRef<ScrollView>(null);

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
    if (imageUris.length >= limit) return;
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: limit - imageUris.length, // Allow only the remaining slots
    });
  
    if (!result.canceled) {
      // Filter out any duplicates
      const newUris = result.assets
        .map(asset => asset.uri)
        .filter(uri => !imageUris.includes(uri)); // Only add unique URIs
  
      const updatedUris = [...imageUris, ...newUris].slice(0, limit); // Limit the total to the specified limit
      setImageUris(updatedUris);
      onImagesPicked(updatedUris);
      actionSheetRef.current?.hide(); // Close action sheet after selection
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };
  

  const pickFromCamera = async () => {
    if (imageUris.length >= limit) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newUris = [...imageUris, result.assets[0].uri];
      setImageUris(newUris);
      onImagesPicked(newUris);
      actionSheetRef.current?.hide(); // Close action sheet after selection
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  const showActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const handleDelete = (uri: string) => {
    const newUris = imageUris.filter(imageUri => imageUri !== uri);
    setImageUris(newUris);
    onImagesPicked(newUris);
  };

  return (
    <>
      <View className={className}>
        <View className="relative">
          <ScrollView ref={scrollViewRef} snapToEnd horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {imageUris.map((uri, index) => (
              <View key={index} className="relative w-24 h-24 bg-gray-200 rounded-lg mr-2">
                <Image source={{ uri }} className="w-full h-full rounded-lg" />
                <TouchableOpacity onPress={() => handleDelete(uri)} className="absolute top-1 right-1">
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
            {imageUris.length < limit && (
              <TouchableOpacity  onPress={showActionSheet} className="w-24 h-24 bg-gray-200 rounded-lg justify-center items-center">
                <Text className="text-gray-500">Pick an Image</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>

      <ActionSheet
        ref={actionSheetRef}
        containerStyle={styles.actionSheetContainer}
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
    </>
  );
};

const styles = StyleSheet.create({
  actionSheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default ImageInputList;
