import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the store state type
interface AyahsStore {
  completedAyahs: number;
  currentAyah: number;
  totalAyahs: number;
  progressPercentage: number;
  markAyahComplete: () => void;
  setCurrentAyah: (ayahNumber: number) => void;
  calculateProgress: () => void;
}

// Total number of Ayahs
const TOTAL_AYAH = 6236;

// Create the Zustand store with persistence
export const useAyahsStore = create<AyahsStore>()(
  persist(
    (set) => ({
      completedAyahs: 0,
      currentAyah: 1,
      totalAyahs: TOTAL_AYAH,
      progressPercentage: 0,
      markAyahComplete: () => set((state) => {
        const newCompletedAyahs = state.completedAyahs + 1;
        const newCurrentAyah = state.currentAyah + 1;
        const newProgressPercentage = (newCompletedAyahs / state.totalAyahs) * 100;

        return {
          completedAyahs: newCompletedAyahs,
          currentAyah: newCurrentAyah,
          progressPercentage: newProgressPercentage,
        };
      }),
      setCurrentAyah: (ayahNumber: number) => set((state) => ({
        currentAyah: ayahNumber,
      })),
      calculateProgress: () => set((state) => ({
        progressPercentage: (state.completedAyahs / state.totalAyahs) * 100,
      })),
    }),
    {
      name: 'ayahs-storage', // Unique name for the storage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for React Native
    }
  )
);
