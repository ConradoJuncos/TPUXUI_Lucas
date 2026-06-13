import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../i18n/translations";

const PreferencesContext = createContext(null);

const getInitialTheme = () => {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getInitialLang = () => {
  const stored = localStorage.getItem("lang");
  if (stored === "es" || stored === "en") return stored;
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "es";
};

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));

  const value = {
    theme,
    toggleTheme,
    lang,
    toggleLang,
    t: translations[lang],
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences debe usarse dentro de <PreferencesProvider>");
  }
  return context;
}
