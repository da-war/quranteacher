import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Alert, Modal } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/global/BackButton";
import { useUserStore } from "@/store/useUserStore";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { MaterialIcons } from "@expo/vector-icons";
import AppForm from "@/components/form/AppForm";
import AppFormField from "@/components/form/AppFormField";
import AppFormRadioButton from "@/components/form/AppFormRadioButton";
import SubmitButton from "@/components/form/SubmitButton";
import AppFormFieldList from "@/components/form/AppFormFieldList";
import AppFormImageInput from "@/components/form/AppFormImageInput";
import AppFormImageInputList from "@/components/form/AppFormImageInputList";
import MdText from "@/components/global/MdText";
import { BecomeTeacherFormValues } from "@/types/type";
import { becomeTeacherInitialValues, becomeTeacherValidationSchema } from "@/lib/schema";
import { router } from "expo-router";
import * as ImageManipulator from 'expo-image-manipulator';


import * as Progress from 'react-native-progress';


const BecomeTeacher = () => {
  const [certificates, setCertificates] = useState<string[]>([]);
  const { user, setUser } = useUserStore();
  const [images, setImages] = useState<{ name: string; uri: string }[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [loading,setLoading]=useState<boolean>(false);


  useEffect(() => {
    console.log('user',user);

  }, [user]);

  const uploadImage = async (uri: string, name: string) => {
    setLoading(true); // Start loading indicator

    try {
        // Compress the image
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 800 } }], // Resize to desired width, maintaining aspect ratio
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Compress the image
        );

        const reference = storage().ref(`teacher_images/${name}`);
        const task = reference.putFile(manipResult.uri); // Use the manipulated URI

        // Track upload progress
        task.on('state_changed', (taskSnapshot) => {
            const progress = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes);
            setUploadProgress(prev => ({ ...prev, [name]: progress }));
        });

        // Await the completion of the upload
        await task;

        // Get the download URL of the uploaded image
        const url = await reference.getDownloadURL();
        return url; // Return the URL
    } catch (error) {
        console.error("Upload error:", error); // Log the error for debugging
        Alert.alert('Error', error instanceof Error ? error.message : "Can't upload files!");
    } finally {
        setLoading(false); // Ensure loading stops
    }
};

  const applyAsTeacher = async (values: BecomeTeacherFormValues) => {
    const userId = auth().currentUser?.uid;
    if(!userId) Alert.alert('Error', 'User not found');
    if (userId) {
      try {
        const profilePictureUrl = await uploadImage(values.profilePicture, new Date().getTime().toString());
        const cnicFrontUrl = values.cnicFront ? await uploadImage(values.cnicFront, new Date().getTime().toString()) : null;
        const cnicBackUrl = values.cnicBack ? await uploadImage(values.cnicBack, new Date().getTime().toString()) : null;
        const certificatesUrls = await Promise.all(
          values.certificates.map(async (cert) => await uploadImage(cert, new Date().getTime().toString()))
        );
        const docRef = await firestore().collection('teacherapplications').add({
          ...values,
          userId,
          profilePicture: profilePictureUrl,
          cnicFront: cnicFrontUrl,
          cnicBack: cnicBackUrl,
          certificates: certificatesUrls,
          appliedOn: firestore.FieldValue.serverTimestamp()
        });
        await firestore().collection('users').doc(userId).update({
          isTeacherApplied: true
        });
        setUser({
          isTeacherApplied:true,
        });
        Alert.alert('Application Submitted Successfully');
        router.push('/(root)/(tabs)/home');
      } catch (error) {
        console.error("Error adding document: ", error);
        if(error instanceof Error) {
          Alert.alert('Error', error.message);
        }
      }
    }
  };
  const deleteImage = async (name: string) => {
    try {
      const reference = storage().ref(`teacher_images/${name}`);
      await reference.delete();

      setImages(prev => prev.filter(image => image.name !== name));
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[name];
        return newProgress;
      });

      Alert.alert('Success', `${name} has been deleted.`);
    } catch (error) {
      if(error instanceof Error) {
        Alert.alert('Error', error.message);
        return;
      }
      else{
        console.log(error);
      }
    }
  };

  return (
   <>
    <SafeAreaView style={styles.container}>
      <View className="bg-primary-500 p-4">
        <BackButton title="back" titleStyle="text-white" />
      </View>

      {user?.isTeacherApplied === false && (
        <KeyboardAvoidingView className="flex-1 p-4">
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            <View>
              <Text className="text-3xl font-JakartaBold text-center mt-5">Become A Teacher</Text>
              <Text className="text-md text-center font-JakartaBold mt-3 mb-7 text-neutral-500">
                Fill the form below to apply as a teacher, after that our team will review your application verify details manually and get back to you!
              </Text>
            </View>
            <AppForm
              initialValues={becomeTeacherInitialValues}
              validationSchema={becomeTeacherValidationSchema}
              onSubmit={(values: BecomeTeacherFormValues) => applyAsTeacher(values)}
            >
              <View className="my-2">
                <MdText text="Upload Profile Picture" />
                <AppFormImageInput name="profilePicture" />
              </View>
              <AppFormField name="name" label="Name" />
              <AppFormField name="phone" label="Phone" />
              <AppFormField name="address" label="Address" />
              <AppFormField name="city" label="City" />
              <AppFormField name="teachingExperience" label="Teaching Experience" keyboardType="numeric" />
              <AppFormFieldList name="qualifications" label="Qualifications" placeholder="BS IT, MS Islamiat, F.A etc" />
              <AppFormRadioButton
                name="gender"
                title="Gender"
                options={["Male", "Female"]}
              />
              <AppFormRadioButton
                name="hafiz"
                title="Hafiz"
                options={["Yes", "No"]}
              />
              <AppFormFieldList name="languages" label="Languages" placeholder="english, urdu, hindi" />
              <Text className="text-lg font-JakartaBold text-center mx-auto my-7">
                Complete the details to get verified <MaterialIcons name="verified" size={16} color="blue" />
              </Text>
              <View className="my-2">
                <MdText text="Upload CNIC Front" subText="(optional)" />
                <AppFormImageInput name="cnicFront" />
              </View>
              <View className="my-2">
                <MdText text="Upload CNIC Back" subText="(optional)" />
                <AppFormImageInput name="cnicBack" />
              </View>
              <View className="my-2">
                <MdText text="Upload Certificates/Degrees" subText="(optional up to 5)" />
                <AppFormImageInputList name="certificates" limit={5} />
              </View>

              <SubmitButton title="Submit Application" className="rounded-md my-5 bg-primary-500" />
            </AppForm>

          </ScrollView>
        </KeyboardAvoidingView>
      )}

      {user?.isTeacherApplied && (
        <View className="flex-1 p-4 justify-center items-center">
          <Text className="text-xl font-JakartaSemiBold text-center w-[80%]">Already Applied as a teacher we'll get back to you shortly</Text>
        </View>
      )}
    </SafeAreaView>

    <Modal visible={loading}>
      <View className="flex-1 justify-center items-center">
      <Progress.Bar progress={0.3} width={200} />
        <Text className="text-2xl font-JakartaSemiBold text-center">Uploading Files...</Text>
      </View>
    </Modal>
    
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
});

export default BecomeTeacher;
