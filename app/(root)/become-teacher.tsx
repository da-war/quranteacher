import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import * as Yup from "yup";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/global/BackButton";
import { useUserStore } from "@/store/useUserStore";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AppForm from "@/components/form/AppForm";
import AppFormField from "@/components/form/AppFormField";

import AppFormRadioButton from "@/components/form/AppFormRadioButton";
import SubmitButton from "@/components/form/SubmitButton";
import AppFormFieldList from "@/components/form/AppFormFieldList";
import ImageInput from "@/components/global/ImageInput";
import ImageInputList from "@/components/global/ImageInputList";

// Form Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  gender: Yup.string().required("Gender is required"),
  hafiz: Yup.string().required("Hafiz status is required"),
  teachingExperience: Yup.string().required("Experience is required"),
  teachingYears: Yup.number().required("Teaching experience in years is required"),
  cnicFront: Yup.string().required("CNIC Front Image is required"),
  cnicBack: Yup.string().required("CNIC Back Image is required"),
  profilePicture: Yup.string().required("Profile Picture is required"),
  certificates: Yup.array().required("Certificates are required"),
  languages: Yup.array().required("Languages are required"),
});


const initialValues={
  name: "",
  phone: "",
  address: "",
  city: "",
  gender: "",
  hafiz: false,
  teachingExperience: "",
  availability: "",
  languages: [],
  teachingYears: "",
  cnicFront: null,
  cnicBack: null,
  profilePicture: null,
  certificates: [],
}

interface FormValues {
  name: string;
  phone: string;
  address: string;
  city: string;
  gender: string;
  hafiz: boolean;
  teachingExperience: string;
  qualifications: string[];
  languages: string;
  teachingYears: number;
  cnicFront: string;
  cnicBack: string;
  profilePicture: string;
  certificates: string[];
}

const FormScreen = () => {
  const [cnicFront, setCnicFront] = useState<string>('');
  const [cnicBack, setCnicBack] = useState<string>('');
  const [certificates, setCertificates] = useState<string[]>([]);
  const {user} =useUserStore();
  console.log(user?.isTeacherApplied)


    const removeImage=(whichOne:string)=>{
      if(whichOne==='cnicF'){
        setCnicFront('')
      }
      else if(whichOne==='cnicB'){
        setCnicBack('')
      }
    }


  const pickImage = async (whichOne:string) => {
    // No permissions request is necessary for launching the image library
    console.log('function  works')
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log("edf")
      if(whichOne==="cnicF"){
        setCnicFront(result.assets[0].uri);
      }
      else if (whichOne==="cnicB"){
        setCnicBack(result.assets[0].uri)
        console.log("dsfds",result.assets)
      }
      
    }
  };

  const addCertificate = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection:true,
    });

    if (!result.canceled) {
      //check if multiple selected
        result.assets.map(item=>{
          setCertificates([...certificates,item?.uri])
        })
       
    }
  };

  const applyAsTeacher=(values:any)=>{
   console.log(values)
  }



  const removeCertificate = (uri:string) => {
    setCertificates(certificates.filter(cert => cert !== uri));
  };

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
          <AppForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values)=>applyAsTeacher(values)}>

            <AppFormField name="name" label="Name" />
            <AppFormField name="phone" label="Phone" />
            <AppFormField name="address" label="Address" />
            <AppFormField name="city" label="City" />
            <AppFormField name="teachingExperience" label="Teaching Experience" />
            <AppFormField name="city" label="City" />
            <AppFormField name="city" label="City" />

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

          {/* <Text>Get Verified <MaterialIcons name="verified" size={24} color="black" /></Text> */}

          <SubmitButton title="Submit Application" className="rounded-md my-5 bg-primary-500"  />
            
          </AppForm>  

          <View className="my-10 flex-1">
            <ImageInput onImagePicked={(uri)=>console.log(uri)} />
          </View>
          <View className="my-10 flex-1">
            <ImageInputList limit={10} onImagesPicked={(uri)=>console.log(uri)} />
          </View>
          
          
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

export default FormScreen;
