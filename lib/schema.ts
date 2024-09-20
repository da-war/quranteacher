import * as Yup from 'yup'

export const initialValuesSignup={
    name:'',
    email:'',
    password:''
}

export const initialValuesSignin={
    email:'',
    password:''
}

export const signUpValidationSchema=Yup.object().shape({
    name:Yup.string().required().label('Name'),
    email:Yup.string().required().email().label('Email'),
    password:Yup.string().required().min(6).label('Password')
})

export const signInValidationSchema=Yup.object().shape({
    email:Yup.string().required().email().label('Email'),
    password:Yup.string().required().min(6).label('Password')
})

export const forgotPasswordValidationSchema=Yup.object().shape({
    email:Yup.string().required().email().label('Email')
})

export const becomeTeacherInitialValues={
    name: "",
    phone: '',
    address: "",
    city: "",
    gender: "",
    hafiz: "",
    teachingExperience: 0,
    availability: "",
    languages: [],
    cnicFront: "",
    cnicBack: "",
    profilePicture: "",
    certificates: [],
    qualifications: []
  }
export const becomeTeacherValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.number().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    gender: Yup.string().required("Gender is required"),
    hafiz: Yup.string().required("Hafiz status is required"),
    teachingExperience: Yup.number().required("Experience in years (numbers) is required"),
    cnicFront: Yup.string(),
    cnicBack: Yup.string(),
    profilePicture: Yup.string().required("Profile Picture is required"),
    certificates: Yup.array().max(5),
    languages: Yup.array().min(1,"Languages are required").required("Languages are required"),
    qualifications: Yup.array().min(1,"Qualifications are required").required("Qualifications are required")
    
  });
  


