import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import * as Yup from "yup";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/global/BackButton";
import { useUserStore } from "@/store/useUserStore";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import {  MaterialIcons } from "@expo/vector-icons";
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

const BecomeTeacher = () => {
  const [certificates, setCertificates] = useState<string[]>([]);
  const {user,setUser} =useUserStore();
  console.log(user?.isTeacherApplied)
  const [images,setImages]=useState<string[]>([]);


  const applyAsTeacher=async (values:BecomeTeacherFormValues)=>{
    //upload images to firebase cloud storage

    if(values.certificates.length>0){

    }
    if(values.cnicBack){

    }
    if(values.cnicFront){

    }
    if (values.profilePicture){

    }

    //in the above four cases we need to upload the images to firebase storage and get the download urls


   //store the values in firestore collection teacherapplications
  const userId=user?.id;

  if(userId){
    try {
      const docRef = await firestore().collection('teacherapplications').add({
        ...values,
        userId,
        appliedOn:firestore.FieldValue.serverTimestamp()
      }).then((docRef)=>{
        //update user document in the users collection
        firestore().collection('users').doc(userId).update({
          isTeacherApplied:true
        })
        setUser({
          ...user,
          isTeacherApplied:true
        })
        //redirect to home
        Alert.alert('Application Submitted Successfully');
        router.push('/(root)/(tabs)/home');
      })
  }
  catch (error) {
    console.error("Error adding document: ", error);
    if(error instanceof Error){
      Alert.alert(error.message)
    }
    else{
      Alert.alert('Error While Submitting Application, Check connection and try again')
    }
  }
  }
  }


  return (
    <SafeAreaView style={styles.container}>
      <View className="bg-primary-500 p-4">
        <BackButton title="back" titleStyle="text-white" />
      </View>
        
      {user?.isTeacherApplied===false&&(
        <KeyboardAvoidingView className="flex-1 p-4">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View className="">
              <Text className="text-3xl font-JakartaBold text-center mt-5"> Become A Teacher</Text>
              <Text className="text-md text-center font-JakartaBold mt-3 mb-7 text-neutral-500">Fill the form below to apply as a teacher, after that our team will review your application verify details manually and get back to you!</Text>
          </View>
          <AppForm 
            initialValues={becomeTeacherInitialValues} 
            validationSchema={becomeTeacherValidationSchema} 
            onSubmit={(values:BecomeTeacherFormValues)=>applyAsTeacher(values)}
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

          {/* second Option Section for verifications */}

          <Text className="text-lg font-JakartaBold text-center mx-auto my-7">Complete the details to get verified<MaterialIcons name="verified" size={16} color="blue" /></Text>
          <View className="my-2">
              <MdText text="Upload CNIC Front" subText="(optional)"  />
              <AppFormImageInput name="cnicFront" />
            </View>
            <View className="my-2">
              <MdText text="Upload CNIC Back" subText="(optional)" />
              <AppFormImageInput name="cnicBack" />
            </View>
            <View className="my-2">
                <MdText text="Upload Certificates/Degrees" subText="(optional upto 5)" />
                <AppFormImageInputList name="certificates" limit={5} />
            </View>

          <SubmitButton title="Submit Application" className="rounded-md my-5 bg-primary-500"  />
          </AppForm>  
        </ScrollView>
        </KeyboardAvoidingView>
      )}

      {user?.isTeacherApplied &&(
        <View className="flex-1 p-4 justify-center items-center">
          <Text className="text-2xl font-JakartaSemiBold text-center">Already Applied as a teacher we'll get back to you shortly</Text>
        </View>
      )}
    </SafeAreaView>
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
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:'center',
    marginVertical: 10,
  },
  radioButton: {
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#4E2999",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    width: 120,
  },
  radioButtonSelected: {
    backgroundColor: "#4E2999",
    borderColor: "#4E2999",
  },
  radioTextSelectedStyle: {
    color: "#fff",
  },
  //radio text must be dynamic if selected then white else primary
  radioText: {
    color: "#4E2999",
  },
  

  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePicker: {
    marginVertical: 10,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  plusSign: {
    fontSize: 40,
    color: "#4E2999",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: "cover",
  },
  removeButton: {
    color: "#4E2999",
    marginTop: 5,
    textAlign: "center",
  },
  certificateList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  certificate: {
    margin: 5,
  },
  submitButton: {
    backgroundColor: "#4E2999",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  submitText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BecomeTeacher;
