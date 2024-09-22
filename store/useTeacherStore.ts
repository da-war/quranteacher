// useTeacherStore.ts
import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Teacher } from '@/types/type';

interface TeacherStore {
  teacher: Teacher | null;
  setTeacher: (teacher: Teacher | null) => Promise<void>;
}

// Create Zustand store
export const useTeacherStore = create<TeacherStore>()(
  persist(
    (set) => ({
      teacher: null,
      setTeacher: async (teacher) => {
        if (teacher) {
          await AsyncStorage.setItem('teacher', JSON.stringify(teacher));
        } else {
          await AsyncStorage.removeItem('teacher');
        }
        set({ teacher });
      },
    }),
    {
      name: 'teacher-storage', // Unique name for storage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for persistence
    }
  )
);
