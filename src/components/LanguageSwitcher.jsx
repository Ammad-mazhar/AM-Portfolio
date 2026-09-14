import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/useI18n.js';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { lang, setLang, languages, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    function onDocClick(event) {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    }
    function onKeyDown(event) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const current = languages.find((l) => l.code === lang) ?? languages[0];

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        type="button"
        className="lang-switcher__trigger"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.languageSwitcher.label}
      >
        {current.short}
      </button>

      {open && (
        <ul className="lang-switcher__menu" role="listbox" aria-label={t.languageSwitcher.label}>
          {languages.map((option) => (
            <li key={option.code}>
              <button
                type="button"
                role="option"
                aria-selected={option.code === lang}
                className={`lang-switcher__option ${option.code === lang ? 'is-active' : ''}`}
                onClick={() => {
                  setLang(option.code);
                  setOpen(false);
                }}
              >
                <span className="lang-switcher__code">{option.short}</span>
                <span className="lang-switcher__name">{option.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
