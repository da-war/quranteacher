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

