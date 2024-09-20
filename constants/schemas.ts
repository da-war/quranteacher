import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
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
    certificates: Yup.array(),
    //languages must be array plus should be atleast 1 length
    languages: Yup.array().min(1,"Languages are required").required("Languages are required"),
    
  });
  

