import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type Language = 'en' | 'hi' | 'zh';

interface SettingsContextType {
  darkMode: boolean;
  language: Language;
  toggleDarkMode: () => void;
  setLanguage: (language: Language) => void;
}

const SettingsContext =
  createContext<SettingsContextType | undefined>(
    undefined
  );

export function SettingsProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [darkMode, setDarkMode] =
    useState<boolean>(() =>
      localStorage.getItem('darkMode') === 'true'
    );

  const [language, setLanguageState] =
    useState<Language>(() => {

      const saved =
        localStorage.getItem('language');

      if (
        saved === 'en' ||
        saved === 'hi' ||
        saved === 'zh'
      ) {
        return saved;
      }

      return 'en';
    });

  const toggleDarkMode = () => {
    setDarkMode(
      previous => !previous
    );
  };

  const setLanguage = (
    value: Language
  ) => {
    setLanguageState(value);
  };

  useEffect(() => {

    localStorage.setItem(
      'darkMode',
      String(darkMode)
    );

    document.body.classList.toggle(
      'dark-mode',
      darkMode
    );

  }, [darkMode]);

  useEffect(() => {

    localStorage.setItem(
      'language',
      language
    );

  }, [language]);

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        language,
        toggleDarkMode,
        setLanguage,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {

  const context =
    useContext(SettingsContext);

  if (!context) {
    throw new Error(
      'useSettings must be used inside SettingsProvider'
    );
  }

  return context;
}