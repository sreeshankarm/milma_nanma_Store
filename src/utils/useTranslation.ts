import { useState } from "react";

// ----------------------------------------
// LANGUAGE LABELS
// ----------------------------------------

export const languageLabels = {
  en: "English",
  ml: "Malayalam",
} as const;

export type LanguageCode =
  keyof typeof languageLabels;

// ----------------------------------------
// TRANSLATIONS
// ----------------------------------------

const translations: Record<
  LanguageCode,
  Record<string, string>
> = {
  en: {
    "Language preference": "Language preference",
    "Choose how the app labels and actions should appear across screens.":
      "Choose how the app labels and actions should appear across screens.",
    "App language": "App language",
    Profile: "Profile",
  },

  ml: {
    "Language preference": "ഭാഷ മുൻഗണന",
    "Choose how the app labels and actions should appear across screens.":
      "ആപ്പിലെ ലേബലുകളും പ്രവർത്തനങ്ങളും ഏത് ഭാഷയിൽ കാണണമെന്ന് തിരഞ്ഞെടുക്കുക",
    "App language": "ആപ്പ് ഭാഷ",
    Profile: "പ്രൊഫൈൽ",
  },
};

// ----------------------------------------
// HOOK
// ----------------------------------------

export const useTranslation = () => {
  const [language, setLanguage] = useState<LanguageCode>("en");

  const t = (key: string): string => {
    return translations[language][key] ?? key;
  };

  return {
    t,
    language,
    setLanguage,
  };
};
