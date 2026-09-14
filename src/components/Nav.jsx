import { useState } from 'react';
import { useI18n } from '../i18n/useI18n.js';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import './Nav.css';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  const links = [
    { href: '#skills', label: t.nav.skills },
    { href: '#about', label: t.nav.about },
    { href: '#expertise', label: t.nav.expertise },
    { href: '#work', label: t.nav.work },
    { href: '#build-log', label: t.nav.buildLog },
    { href: '#credentials', label: t.nav.credentials },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className="nav">
      <div className="nav__inner container">
        <a href="#top" className="nav__logo" aria-label={t.nav.home}>
          <img src="/logo-mark.svg" alt="Ammad Mazhar" width="40" height="40" />
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={t.nav.toggleMenu}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="nav-menu" className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
