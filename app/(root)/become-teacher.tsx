import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import BackButton from "@/components/global/BackButton";

// Form Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  gender: Yup.string().required("Gender is required"),
  hafiz: Yup.boolean(),
  teachingExperience: Yup.string().required("Experience is required"),
  availability: Yup.string().required("Availability is required"),
  languages: Yup.string().required("Languages are required"),
  teachingYears: Yup.number().required("Teaching experience in years is required"),
  cnicFront: Yup.string().required("CNIC Front Image is required"),
  cnicBack: Yup.string().required("CNIC Back Image is required"),
  profilePicture: Yup.string().required("Profile Picture is required"),
});

const FormScreen = () => {
  const [cnicFront, setCnicFront] = useState<string>('');
  const [cnicBack, setCnicBack] = useState<string>('');
  const [certificates, setCertificates] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [isHafiz, setIsHafiz] = useState(false);
    const [image, setImage] = useState<string | null>(null);


    const removeImage=(whichOne:string){
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
        setCnicBack(result.assets[0].uri);
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

    }
  };



  const removeCertificate = (uri:string) => {
    setCertificates(certificates.filter(cert => cert !== uri));
  };

  return (
    <SafeAreaView style={styles.container}>
        <BackButton title="Back" />
        
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View className="">
            <Text className="text-3xl font-JakartaBold text-center mt-5"> Become A Teacher</Text>
            <Text className="text-md text-center font-JakartaBold mt-3 mb-7">Fill the form below to apply as a teacher, after that our team will review your application verify details manually and get back to you!</Text>
        </View>
        <Formik
          initialValues={{
            name: "",
            phone: "",
            address: "",
            city: "",
            gender: "",
            hafiz: false,
            teachingExperience: "",
            availability: "",
            languages: "",
            teachingYears: "",
            cnicFront: null,
            cnicBack: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue,errors }) => (
            <View>
              <InputField
                label="Name"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
              />
              <Text className="text-red-500 text-xs">{errors.name}</Text>
              <InputField
                label="Phone Number"
                keyboardType="phone-pad"
                value={values.phone}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
              />
              <Text className="text-red-500 text-xs">{errors.phone}</Text>
              <InputField
                label="Address"
                value={values.address}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
              />
              <Text className="text-red-500 text-xs">{errors.address}</Text>
              <InputField
                label="City"
                value={values.city}
                onChangeText={handleChange("city")}
                onBlur={handleBlur("city")}
              />
              <Text className="text-red-500 text-xs">{errors.city}</Text>

              {/* Gender Radio Buttons */}
              <View style={styles.radioGroup}>
                <Text style={styles.label}>Gender:</Text>
                <TouchableOpacity
                  style={[styles.radioButton, selectedGender === "Male" && styles.radioButtonSelected]}
                  onPress={() => {
                    setSelectedGender("Male");
                    setFieldValue("gender", "Male");
                  }}
                >
                  <Text style={[styles.radioText,selectedGender === "Male" && styles.radioTextSelectedStyle]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.radioButton, selectedGender === "Female" && styles.radioButtonSelected]}
                  onPress={() => {
                    setSelectedGender("Female");
                    setFieldValue("gender", "Female");
                  }}
                >
                  <Text style={[styles.radioText,selectedGender === "Female" && styles.radioTextSelectedStyle]}>Female</Text>
                </TouchableOpacity>
              </View>

              {/* Hafiz/Non-Hafiz Radio Buttons */}
              <View style={styles.radioGroup}>
                <Text style={styles.label}>Hafiz:</Text>
                <TouchableOpacity
                  style={[styles.radioButton, !isHafiz && styles.radioButtonSelected]}
                  onPress={() => {
                    setIsHafiz(false);
                    setFieldValue("hafiz", false);
                  }}
                >
                  <Text style={[styles.radioText,!isHafiz && styles.radioTextSelectedStyle]}>Non-Hafiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.radioButton, isHafiz && styles.radioButtonSelected]}
                  onPress={() => {
                    setIsHafiz(true);
                    setFieldValue("hafiz", true);
                  }}
                >
                  <Text style={[styles.radioText,isHafiz && styles.radioTextSelectedStyle]}>Hafiz</Text>
                </TouchableOpacity>
              </View>

              <InputField
                label="Teaching Experience"
                value={values.teachingExperience}
                onChangeText={handleChange("teachingExperience")}
                onBlur={handleBlur("teachingExperience")}
              />
              <InputField
                label="Languages"
                value={values.languages}
                onChangeText={handleChange("languages")}
                onBlur={handleBlur("languages")}
              />
              <InputField
                label="Teaching Experience (Years)"
                keyboardType="numeric"
                value={values.teachingYears}
                onChangeText={handleChange("teachingYears")}
                onBlur={handleBlur("teachingYears")}
              />

              {/* CNIC Front Image Picker */}
              <View style={styles.imagePicker}>
                <Text style={styles.label}>CNIC Front:</Text>
                {cnicFront ? (
                  <View>
                    <Image source={{ uri: cnicFront }} style={styles.imagePreview} />
                    <TouchableOpacity onPress={() => removeImage('cnicF')}>
                      <Text style={styles.removeButton}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => pickImage('cnicF')}>
                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.plusSign}>+</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>

              {/* CNIC Back Image Picker */}
              <View style={styles.imagePicker}>
                <Text style={styles.label}>CNIC Back:</Text>
                {cnicBack ? (
                  <View>
                    <Image source={{ uri: cnicBack }} style={styles.imagePreview} />
                    <TouchableOpacity onPress={() => removeImage("cnicB")}>
                      <Text style={styles.removeButton}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => pickImage("cnicB")}>
                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.plusSign}>+</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>

              {/* Certificates/Degrees */}
              <View style={styles.imagePicker}>
                <Text style={styles.label}>Certificates/Degrees:</Text>
                <View style={styles.certificateList}>
                  {certificates.map((uri, index) => (
                    <View key={index} style={styles.certificate}>
                      <Image source={{ uri }} style={styles.imagePreview} />
                      <TouchableOpacity onPress={() => removeCertificate(uri)}>
                        <Text style={styles.removeButton}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                <TouchableOpacity onPress={addCertificate}>
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.plusSign}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
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
