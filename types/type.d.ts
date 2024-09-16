import { FormikProps, FormikState } from "formik";
import React from "react";
import { TextInputProps, TouchableOpacityProps } from "react-native";
import * as Yup from 'yup'
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

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
  bgVariant?: "primary" | "secondary" | "tetra" | "danger" | "outline" | "success";
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
  onSubmit: (values: {}) => void;
  validationSchema: Yup.ObjectSchema<any>;
  initialValues: object
  children: React.ReactNode
}

declare interface AppFormFieldProps extends InputFieldProps {
  name:string,
}

declare interface SubmitButtonProps extends ButtonProps {
}

declare interface HomeCardProps {
  title: string;
  description: string;
  onPress: () => void;
}

declare interface User {
    id: string; // Unique ID for the user
    name: string;
    email: string;
    passwordHash?: string; // Optional if using Firebase Authentication
    role?: 'student' | 'teacher';
    profilePicture?: string; // URL to profile picture
    phoneNumber?: string;
    registeredOn: FirebaseFirestoreTypes.Timestamp;
    bookings?: Booking[]; // Array of booking references
    city?: string;
    country?: string;
    address?: string;
    qualifications?: Qualification[];
    availability?: AvailabilitySlot[];
    classes?: Class[]; // Array of class references
    videoIntro?:string;
    bio?:string;
    rating?:number;
    verified?:boolean;
    expoNotificationToken?:string;
  }

  declare interface Qualification{
    id: string;
    degree: string;
    institution: string;
    year: string;
    description?: string;
  }
  

  declare interface Teacher extends User {
  
  }
  
  declare interface AvailabilitySlot {
    day: string; // e.g., "Monday"
    timeSlots: string[]; // Array of time slots, e.g., ["09:00-10:00", "11:00-12:00"]
  }

  
  declare interface Class {
    id: string; // Unique ID for the class
    teacherId: string; // Reference to Teacher document
    title: string;
    description?: string;
    groupFee: number; // Monthly group fee
    students?: string[]; // Array of student IDs
    maxStudents: number; // Maximum number of students
    schedule: ClassSchedule[]; // Array of schedules
    createdOn: FirebaseFirestoreTypes.Timestamp;
    groupChatId?: string; // Reference to GroupChat document
  }
  
  declare interface ClassSchedule {
    day: string; // e.g., "Monday"
    time: string; // e.g., "09:00-10:00"
  }
  
  declare interface Booking {
    id: string; // Unique ID for the booking
    userId: string; // Reference to User document
    teacherId: string; // Reference to Teacher document
    classId?: string; // Optional: Reference to Class document
    startTime: FirebaseFirestoreTypes.Timestamp;
    endTime: FirebaseFirestoreTypes.Timestamp;
    status: 'confirmed' | 'pending' | 'cancelled';
  }
  
  declare interface GroupChat {
    id: string; // Unique ID for the group chat
    classId: string; // Reference to Class document
    messages: GroupChatMessage[]; // Array of messages
    createdOn: FirebaseFirestoreTypes.Timestamp;
  }
  
  declare interface GroupChatMessage {
    senderId: string; // User ID of the sender
    message: string;
    timestamp: FirebaseFirestoreTypes.Timestamp;
  }

  declare interface Payment {
    id: string; // Unique ID for the payment
    userId: string; // Reference to User document
    teacherId: string; // Reference to Teacher document
    amount: number;
    paymentStatus: 'completed' | 'failed';
    timestamp: FirebaseFirestoreTypes.Timestamp;
    paymentMethod: 'Stripe'; // You can expand this if you use multiple payment methods
  }
  
