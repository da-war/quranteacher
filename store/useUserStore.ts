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
  userType: "student" | "teacher";
  setUser: (user: Partial<User> | null) => void; // Allow partial updates or null
  setUserType: (type: "student" | "teacher") => void;
  subscribeToUserChanges: () => void;
  unsubscribeFromUserChanges: () => void;
  unsubscribeListener: Unsubscribe | null;
  isTeacherApplied: boolean;
}

// Create Zustand store
export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      userType: "student",
      unsubscribeListener: null,
      isTeacherApplied: false, // Initial state
      setUser: (newUser) => set((state) => {
        const updatedUser = newUser ? { ...state.user, ...newUser } : null;
        return { ...state, user: updatedUser };
      }),
      setUserType: (type) => set({ userType: type }),

      subscribeToUserChanges: () => {
        const userId = auth().currentUser?.uid;
        if (!userId) return;

        const unsubscribe = firestore()
          .collection('users')
          .doc(userId)
          .onSnapshot(
            (doc) => {
              if (doc.exists) {
                const userData = doc.data() as User;
                set({
                  user: {
                    ...userData,
                    registeredOn: userData.registeredOn as FirebaseFirestoreTypes.Timestamp,
                  },
                  userType: userData.role,
                });
              } else {
                set({ user: null });
              }
            },
            (error) => console.error('Error fetching user data:', error)
          );

        set({ unsubscribeListener: unsubscribe });
      },

      unsubscribeFromUserChanges: () => {
        const unsubscribe = get().unsubscribeListener;
        if (unsubscribe) {
          unsubscribe();
          set({ unsubscribeListener: null });
        }
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
