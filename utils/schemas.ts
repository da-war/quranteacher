import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

interface User {
    id: string; // Unique ID for the user
    name: string;
    email: string;
    passwordHash?: string; // Optional if using Firebase Authentication
    role: 'student' | 'teacher';
    profilePicture?: string; // URL to profile picture
    phoneNumber?: string;
    registeredOn: FirebaseFirestoreTypes.Timestamp;
    bookings?: Booking[]; // Array of booking references
  }
  

  interface Teacher {
    id: string; // Unique ID for the teacher
    name: string;
    email: string;
    profilePicture?: string; // URL to profile picture
    bio?: string;
    qualifications: string[]; // Array of qualifications
    availability: AvailabilitySlot[]; // Availability slots
    verified: boolean;
    classes?: Class[]; // Array of class references
  }
  
  interface AvailabilitySlot {
    day: string; // e.g., "Monday"
    timeSlots: string[]; // Array of time slots, e.g., ["09:00-10:00", "11:00-12:00"]
  }

  
  interface Class {
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
  
  interface ClassSchedule {
    day: string; // e.g., "Monday"
    time: string; // e.g., "09:00-10:00"
  }
  
  interface Booking {
    id: string; // Unique ID for the booking
    userId: string; // Reference to User document
    teacherId: string; // Reference to Teacher document
    classId?: string; // Optional: Reference to Class document
    startTime: FirebaseFirestoreTypes.Timestamp;
    endTime: FirebaseFirestoreTypes.Timestamp;
    status: 'confirmed' | 'pending' | 'cancelled';
  }
  
  interface GroupChat {
    id: string; // Unique ID for the group chat
    classId: string; // Reference to Class document
    messages: GroupChatMessage[]; // Array of messages
    createdOn: FirebaseFirestoreTypes.Timestamp;
  }
  
  interface GroupChatMessage {
    senderId: string; // User ID of the sender
    message: string;
    timestamp: FirebaseFirestoreTypes.Timestamp;
  }

  interface Payment {
    id: string; // Unique ID for the payment
    userId: string; // Reference to User document
    teacherId: string; // Reference to Teacher document
    amount: number;
    paymentStatus: 'completed' | 'failed';
    timestamp: FirebaseFirestoreTypes.Timestamp;
    paymentMethod: 'Stripe'; // You can expand this if you use multiple payment methods
  }
  
