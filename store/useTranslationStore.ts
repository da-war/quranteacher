import { create } from 'zustand';

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

const useTranslationStore = create<TranslationStore>((set) => ({
  currentTranslation: null,
  translations: {
    english: {
      name: 'Muhammad Asad',
      jsonContent: {/* English translation JSON */},
      direction: 'ltr',
    },
    french: {
      name: 'Muhammad Hamidullah',
      jsonContent: {/* French translation JSON */},
      direction: 'ltr',
    },
    hindi: {
      name: 'Suhel Farooq Khan and Saifur Rahman Nadwi',
      jsonContent: {/* Hindi translation JSON */},
      direction: 'ltr',
    },
    indonesian: {
      name: 'Quran.com',
      jsonContent: {/* Indonesian translation JSON */},
      direction: 'ltr',
    },
    urdu_maududi: {
      name: 'Maulana Maududi',
      jsonContent: {/* Urdu Maududi translation JSON */},
      direction: 'rtl',
    },
    urdu_qadri: {
      name: 'Dr Tahir ul Qadari',
      jsonContent: {/* Urdu Qadri translation JSON */},
      direction: 'rtl',
    },
    urdu_jalandhari: {
      name: 'Fateh Muhammad Jalandhari',
      jsonContent: {/* Urdu Jalandhari translation JSON */},
      direction: 'rtl',
    },
  },
  setTranslation: (name) =>
    set((state: TranslationStore) => ({
      currentTranslation: state.translations[name],
    })),
}));

export default useTranslationStore;
