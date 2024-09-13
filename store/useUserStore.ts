import { User } from '@/types/type';
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Define the store state type
interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    fetchUserDetails: () => Promise<void>;
}

// Fetch user details from Firebase Firestore
const fetchUserFromFirestore = async (userId: string): Promise<User | null> => {
    try {
        const userDoc = await firestore().collection('users').doc(userId).get();

        if (userDoc.exists) {
            const userData = userDoc.data() as User;
            return {
                ...userData,
                registeredOn: userData.registeredOn as FirebaseFirestoreTypes.Timestamp, // Ensure the timestamp is correct
            };
        } else {
            console.log('User does not exist in Firestore');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user from Firestore:', error);
        return null;
    }
};

// Create the Zustand store with persistence using AsyncStorage
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      fetchUserDetails: async () => {
        const userId = auth().currentUser?.uid; // Replace this with how you get the current user ID, e.g., from Firebase Auth
        const user = await fetchUserFromFirestore(userId!);
        if (user) {
          set({ user });
        }
      },
    }),
    {
      name: 'user-storage', // Unique name for storage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for persistence
    }
  )
);

// Initialize the user store: Check if user exists before fetching
export const initializeUserStore = async () => {
  const store = useUserStore.getState();

  // Check if user already exists in the store
  if (store.user) {
    // If user exists, don't fetch again
    console.log('User is already stored:', store.user);
    return;
  }

  // If no user is stored, fetch from Firestore
  console.log('Fetching user details from Firestore...');
  await store.fetchUserDetails(); // This will also setUser after fetching
};

// Optionally, add a method to force refresh user details (for manual sync if needed)
export const refreshUserDetails = async () => {
  const store = useUserStore.getState();
  console.log('Refreshing user details...');
  await store.fetchUserDetails(); // Force fetch user and update the store
};
