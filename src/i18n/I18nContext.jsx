import { useEffect, useMemo, useState } from 'react';
import { I18nContext } from './context.js';
import { LANGUAGES, DEFAULT_LANGUAGE } from './languages.js';
import en from './translations/en.js';
import de from './translations/de.js';
import nl from './translations/nl.js';
import da from './translations/da.js';
import sv from './translations/sv.js';

const DICTIONARIES = { en, de, nl, da, sv };
const STORAGE_KEY = 'portfolio-lang';

// Runs once, synchronously, on first render (no SSR here, so no hydration
// mismatch risk) — a saved choice wins, otherwise the browser's own language
// list picks a sensible default, and English is the fallback.
function detectInitialLanguage() {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && DICTIONARIES[saved]) return saved;
  } catch {
    // localStorage unavailable (private browsing, locked-down settings) — ignore.
  }

  const browserLangs = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const entry of browserLangs) {
    const code = entry?.slice(0, 2).toLowerCase();
    if (code && DICTIONARIES[code]) return code;
  }

  return DEFAULT_LANGUAGE;
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore — persistence is a nicety, not a requirement
    }
  }, [lang]);

  const setLang = (code) => {
    if (DICTIONARIES[code]) setLangState(code);
  };

  const value = useMemo(
    () => ({ lang, setLang, t: DICTIONARIES[lang], languages: LANGUAGES }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
