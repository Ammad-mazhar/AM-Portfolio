export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'nl', label: 'Nederlands', short: 'NL' },
  { code: 'da', label: 'Dansk', short: 'DA' },
  { code: 'sv', label: 'Svenska', short: 'SV' },
];

export const DEFAULT_LANGUAGE = 'en';

// Maps a language code to its English name — used server-side to tell the
// chat model which language to answer in.
export const LANGUAGE_NAMES = {
  en: 'English',
  de: 'German',
  nl: 'Dutch',
  da: 'Danish',
  sv: 'Swedish',
};
