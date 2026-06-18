import {
  createContext,
  useContext,
  useState
} from "react";

import en from "../locales/en";
import hi from "../locales/hi";
import te from "../locales/te";

const LanguageContext =
  createContext();

export function LanguageProvider({
  children
}) {

  const [language, setLanguage] =
    useState(

      localStorage.getItem(
        "language"
      ) || "en"

    );

  const changeLanguage = (lang) => {

    setLanguage(lang);

    localStorage.setItem(
      "language",
      lang
    );

  };

  const translations = {
    en,
    hi,
    te
  };

  const t = (key) => {

    return key
      .split(".")
      .reduce(
        (obj, i) => obj?.[i],
        translations[language]
      ) || key;

  };

  return (

    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t
      }}
    >

      {children}

    </LanguageContext.Provider>

  );

}

export const useLanguage =
  () =>
    useContext(
      LanguageContext
    );