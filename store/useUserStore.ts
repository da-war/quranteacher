import { User } from '@/types/type';
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Unsubscribe } from '@react-native-firebase/firestore';

// Define the store state type
interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  subscribeToUserChanges: () => void;
  unsubscribeFromUserChanges: () => void;
  userType:"student"|"teacher";
  setUserType:(type:"student"|"teacher")=>void;
}

// Create the Zustand store with persistence using AsyncStorage
export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),

      userType:"student",
      setUserType:(type)=>{
        set({userType:type})
      },

      // Subscribe to Firestore updates
      subscribeToUserChanges: () => {
        const userId = auth().currentUser?.uid;
        if (!userId) return;

        const unsubscribe = firestore()
          .collection('users')
          .doc(userId)
          .onSnapshot((doc) => {
            if (doc.exists) {
              const userData = doc.data() as User;
              set({
                user: {
                  ...userData,
                  registeredOn: userData.registeredOn as FirebaseFirestoreTypes.Timestamp,
                },
                userType:userData.role
              });
             
            } else {
              console.log('User does not exist in Firestore');
              set({ user: null });
            }
          }, (error) => {
            console.error('Error listening to Firestore changes:', error);
          });

        // Store the unsubscribe function
        set({ unsubscribeFromUserChanges: unsubscribe });
      },

      // Unsubscribe when not needed
      unsubscribeFromUserChanges: () => {
        const unsubscribe = get().unsubscribeFromUserChanges as Unsubscribe;
        if (unsubscribe) {
          unsubscribe();
        }
      },
    }),
    {
      name: 'user-storage', // Unique name for storage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for persistence
    }
  )
);
