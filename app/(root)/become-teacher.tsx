import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';

const FormScreen = () => {
  const [cnicFront, setCnicFront] = useState(null);
  const [cnicBack, setCnicBack] = useState(null);
  const [certifications, setCertifications] = useState([]);

  // Image picker function
  const pickImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleAddCertification = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCertifications([...certifications, result.uri]);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    gender: Yup.string().oneOf(['male', 'female']).required('Gender is required'),
    hafiz: Yup.boolean().required('Specify if you are Hafiz'),
    experience: Yup.string().required('Teaching experience is required'),
    qualifications: Yup.array().of(Yup.string()).min(1, 'At least one qualification is required'),
    availability: Yup.string().required('Availability is required'),
    tutoringMethod: Yup.string().oneOf(['home', 'virtual', 'both']).required('Tutoring method is required'),
    languages: Yup.string().required('Languages are required'),
    experienceYears: Yup.number().min(0, 'Must be greater than 0').required('Experience years are required'),
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          name: '',
          phone: '',
          address: '',
          city: '',
          gender: '',
          hafiz: false,
          experience: '',
          qualifications: [''],
          availability: '',
          tutoringMethod: '',
          languages: '',
          experienceYears: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <View>
            {/* Name */}
            <Text>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            {/* Phone */}
            <Text>Phone</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
            {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

            {/* Address */}
            <Text>Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
            />
            {touched.address && errors.address && <Text style={styles.error}>{errors.address}</Text>}

            {/* City */}
            <Text>City</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('city')}
              onBlur={handleBlur('city')}
              value={values.city}
            />
            {touched.city && errors.city && <Text style={styles.error}>{errors.city}</Text>}

            {/* Gender */}
            <Text>Gender</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity onPress={() => setFieldValue('gender', 'male')}>
                <Text style={values.gender === 'male' ? styles.radioSelected : styles.radio}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFieldValue('gender', 'female')}>
                <Text style={values.gender === 'female' ? styles.radioSelected : styles.radio}>Female</Text>
              </TouchableOpacity>
            </View>
            {touched.gender && errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

            {/* Hafiz */}
            <Text>Hafiz</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity onPress={() => setFieldValue('hafiz', true)}>
                <Text style={values.hafiz ? styles.radioSelected : styles.radio}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFieldValue('hafiz', false)}>
                <Text style={!values.hafiz ? styles.radioSelected : styles.radio}>No</Text>
              </TouchableOpacity>
            </View>

            {/* Teaching Experience */}
            <Text>Teaching Experience</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('experience')}
              onBlur={handleBlur('experience')}
              value={values.experience}
            />
            {touched.experience && errors.experience && <Text style={styles.error}>{errors.experience}</Text>}

            {/* Qualifications */}
            <Text>Qualifications</Text>
            {values.qualifications.map((qualification, index) => (
              <TextInput
                key={index}
                style={styles.input}
                onChangeText={handleChange(`qualifications[${index}]`)}
                value={qualification}
              />
            ))}
            <Button title="Add New Qualification" onPress={() => setFieldValue('qualifications', [...values.qualifications, ''])} />

            {/* Availability */}
            <Text>Availability</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('availability')}
              onBlur={handleBlur('availability')}
              value={values.availability}
            />
            {touched.availability && errors.availability && <Text style={styles.error}>{errors.availability}</Text>}

            {/* Tutoring Method */}
            <Text>Tutoring Method</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity onPress={() => setFieldValue('tutoringMethod', 'home')}>
                <Text style={values.tutoringMethod === 'home' ? styles.radioSelected : styles.radio}>Home Tutoring</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFieldValue('tutoringMethod', 'virtual')}>
                <Text style={values.tutoringMethod === 'virtual' ? styles.radioSelected : styles.radio}>Virtual Tutoring</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFieldValue('tutoringMethod', 'both')}>
                <Text style={values.tutoringMethod === 'both' ? styles.radioSelected : styles.radio}>Both</Text>
              </TouchableOpacity>
            </View>

            {/* Languages */}
            <Text>Languages</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('languages')}
              onBlur={handleBlur('languages')}
              value={values.languages}
            />
            {touched.languages && errors.languages && <Text style={styles.error}>{errors.languages}</Text>}

            {/* Teaching Experience in Years */}
            <Text>Teaching Experience (Years)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={handleChange('experienceYears')}
              onBlur={handleBlur('experienceYears')}
              value={values.experienceYears}
            />
            {touched.experienceYears && errors.experienceYears && <Text style={styles.error}>{errors.experienceYears}</Text>}

            {/* CNIC Front Photo */}
            <Text>CNIC Front</Text>
            <Button title="Upload CNIC Front" onPress={() => pickImage(setCnicFront)} />
            {cnicFront && <Image source={{ uri: cnicFront }} style={styles.image} />}

            {/* CNIC Back Photo */}
            <Text>CNIC Back</Text>
            <Button title="Upload CNIC Back" onPress={() => pickImage(setCnicBack)} />
            {cnicBack && <Image source={{ uri: cnicBack }} style={styles.image} />}

            {/* Certifications/Degrees Photos */}
            <Text>Certifications/Degrees</Text>
            <Button title="Add Certification/Degree" onPress={handleAddCertification} />
            <View style={styles.certificationsContainer}>
              {certifications.map((cert, index) => (
                <Image key={index} source={{ uri: cert }} style={styles.image} />
              ))}
            </View>

            {/* Submit Button */}
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  radio: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  radioSelected: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#007bff',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  certificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default FormScreen;
