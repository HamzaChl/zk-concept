import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import deCommon from "./locales/de/common.json";
import enCommon from "./locales/en/common.json";
import frCommon from "./locales/fr/common.json";
import nlCommon from "./locales/nl/common.json";

const SUPPORTED_LANGUAGES = ["fr", "nl", "en", "de"] as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { common: frCommon },
      nl: { common: nlCommon },
      en: { common: enCommon },
      de: { common: deCommon },
    },
    fallbackLng: "fr",
    supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "zk-language",
    },
  });

i18n.on("languageChanged", (language) => {
  document.documentElement.lang = language;
});

document.documentElement.lang = i18n.resolvedLanguage ?? "fr";

export default i18n;
