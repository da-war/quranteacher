import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
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
  cnicFront: Yup.mixed().required("CNIC Front Image is required"),
  cnicBack: Yup.mixed().required("CNIC Back Image is required"),
});

const FormScreen = () => {
  const [cnicFront, setCnicFront] = useState(null);
  const [cnicBack, setCnicBack] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [isHafiz, setIsHafiz] = useState(false);

  const pickImage = async (setImage) => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result?.uri!);
    }
  };

  const removeImage = (setImage) => {
    setImage(null);
  };

  const addCertificate = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCertificates([...certificates, result.uri]);
    }
  };

  const removeCertificate = (uri) => {
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
              <InputField
                label="Address"
                value={values.address}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
              />
              <InputField
                label="City"
                value={values.city}
                onChangeText={handleChange("city")}
                onBlur={handleBlur("city")}
              />

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
                    <TouchableOpacity onPress={() => removeImage(setCnicFront)}>
                      <Text style={styles.removeButton}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => pickImage(setCnicFront)}>
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
                    <TouchableOpacity onPress={() => removeImage(setCnicBack)}>
                      <Text style={styles.removeButton}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => pickImage(setCnicBack)}>
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
