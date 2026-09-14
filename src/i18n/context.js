import { createContext } from 'react';

// Split into its own plain-JS file (no JSX, no component) so that both
// I18nContext.jsx (the provider) and useI18n.js (the hook) can import the
// same context without either file mixing component + non-component
// exports — that mix breaks Fast Refresh.
export const I18nContext = createContext(null);
