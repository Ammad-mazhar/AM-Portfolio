import Reveal from './Reveal.jsx';
import { contact, resumeUrl } from '../data/content.js';
import { useI18n } from '../i18n/useI18n.js';
import './Footer.css';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer id="contact" className="footer section">
      <div className="container footer__inner">
        <Reveal className="footer__stamp" aria-hidden="true">
          {t.footer.stamp}
        </Reveal>

        <Reveal as="h2" className="footer__heading">
          {t.footer.heading}
        </Reveal>

        <Reveal as="p" className="footer__line">
          {t.footer.line}
        </Reveal>

        <Reveal className="footer__actions">
          <a className="btn btn--primary" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <a className="btn" href={`tel:${contact.phoneHref}`}>
            {contact.phone}
          </a>
          <a className="btn" href={contact.whatsapp} target="_blank" rel="noreferrer">
            {t.footer.actions.whatsapp}
          </a>
          <a className="btn" href={contact.github} target="_blank" rel="noreferrer">
            {t.footer.actions.github}
          </a>
          <a className="btn" href={contact.linkedin} target="_blank" rel="noreferrer">
            {t.footer.actions.linkedin}
          </a>
          <a className="btn" href={resumeUrl} download>
            {t.footer.actions.downloadCV}
          </a>
        </Reveal>

        <p className="footer__meta">
          <span>© {new Date().getFullYear()} Ammad Mazhar</span>
          <span className="footer__meta-divider">·</span>
          <span>{t.footer.builtWith}</span>
        </p>
      </div>
    </footer>
  );
}
