import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { quranAll } from '@/constants'; // Adjust this import as needed

type Translation = {
  name: string;
  jsonContent: Record<string, any>;
  direction: 'ltr' | 'rtl';
};

type TranslationStore = {
  currentTranslation: Translation | null;
  translations: Record<string, Translation>;
  setTranslation: (name: string) => void;
};

const useTranslationStore = create(
  persist<TranslationStore>(
    (set) => ({
      currentTranslation: {
        name: 'English - Muhammad Asad',
        jsonContent: quranAll.qen,
        direction: 'ltr',
      },
      translations: {
        english: {
          name: 'English - Muhammad Asad',
          jsonContent: quranAll.qen,
          direction: 'ltr',
        },
        french: {
          name: 'French - Muhammad Hamidullah',
          jsonContent: quranAll.qfr,
          direction: 'ltr',
        },
        hindi: {
          name: 'Hindi - Suhel Farooq Khan and Saifur Rahman Nadwi',
          jsonContent: quranAll.qhi,
          direction: 'ltr',
        },
        indonesian: {
          name: 'Indonesian - Quran.com',
          jsonContent: quranAll.qin,
          direction: 'ltr',
        },
        urdu_maududi: {
          name: 'Urdu - Maulana Maududi',
          jsonContent: quranAll.qurMou,
          direction: 'rtl',
        },
        urdu_qadri: {
          name: 'Urdu - Dr Tahir ul Qadari',
          jsonContent: quranAll.qurTq,
          direction: 'rtl',
        },
        urdu_jalandhari: {
          name: 'Urdu - Fateh Muhammad Jalandhari',
          jsonContent: quranAll.qurJalan,
          direction: 'rtl',
        },
        urdu_junagarhi: {
          name: 'Urdu - Muhammad Junagarhi',
          jsonContent: quranAll.qurJun,
          direction: 'rtl',
        },
      },
      setTranslation: (name) =>
        set((state) => ({
          currentTranslation: state.translations[name],
        })),
    }),
    {
      name: 'translation-store', // The key used to store data in AsyncStorages
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for storage
    }
  )
);

export default useTranslationStore;
