import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import sw from "./locales/sw.json";
import so from "./locales/so.json";
import ar from "./locales/ar.json";

const RTL_LANGUAGES = ["ar"];

const savedLanguage = localStorage.getItem("gcx_language") || "en";

function applyDocumentDirection(lng) {
  const isRtl = RTL_LANGUAGES.includes(lng);
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.documentElement.lang = lng;
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      sw: { translation: sw },
      so: { translation: so },
      ar: { translation: ar },
    },
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

// Apply direction on first load
applyDocumentDirection(savedLanguage);

// Persist language and apply direction whenever it changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("gcx_language", lng);
  applyDocumentDirection(lng);
});

export default i18n;