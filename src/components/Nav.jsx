import { useState } from 'react';
import './Nav.css';

const links = [
  { href: '#skills', label: 'Skills' },
  { href: '#about', label: 'About' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#work', label: 'Work' },
  { href: '#build-log', label: 'Build Log' },
  { href: '#credentials', label: 'Credentials' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav__inner container">
        <a href="#top" className="nav__logo">
          AM
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label="Toggle navigation menu"
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
        </nav>
      </div>
    </header>
  );
}
