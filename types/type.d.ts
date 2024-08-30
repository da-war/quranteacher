import { FormikProps, FormikState } from "formik";
import React from "react";
import { TextInputProps, TouchableOpacityProps } from "react-native";
import * as Yup from 'yup'

declare interface Driver {
  id: number;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
}


declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
  textStyle?:object;
}


declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}



declare interface DriverStore {
  drivers: MarkerData[];
  selectedDriver: number | null;
  setSelectedDriver: (driverId: number) => void;
  setDrivers: (drivers: MarkerData[]) => void;
  clearSelectedDriver: () => void;
}


declare interface AppFormProps{
  onSubmit: (values: object) => void;
  validationSchema: Yup.ObjectSchema<any>;
  initialValues: object
  children: React.ReactNode
}

declare interface AppFormFieldProps extends InputFieldProps {
  name:string,
}

declare interface SubmitButtonProps extends ButtonProps {
}