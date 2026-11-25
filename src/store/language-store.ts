import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { LanguageCode } from "@/types/learning";

type LanguageState = {
  selectedLanguage: LanguageCode | null;
  /** False until the saved value has been read from AsyncStorage */
  hasHydrated: boolean;
  setSelectedLanguage: (code: LanguageCode) => void;
  clearSelectedLanguage: () => void;
  setHasHydrated: () => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      hasHydrated: false,
      setSelectedLanguage: (code) => set({ selectedLanguage: code }),
      clearSelectedLanguage: () => set({ selectedLanguage: null }),
      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: "language-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ selectedLanguage: state.selectedLanguage }),
      // The inner callback also runs if reading storage fails, so the app never
      // gets stuck waiting. `initialState` is used because `state` is undefined then.
      onRehydrateStorage: (initialState) => () => initialState.setHasHydrated(),
    },
  ),
);
