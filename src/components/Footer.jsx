import Reveal from './Reveal.jsx';
import { contact, resumeUrl } from '../data/content.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="contact" className="footer section">
      <div className="container footer__inner">
        <Reveal className="footer__stamp" aria-hidden="true">
          Open to opportunities
        </Reveal>

        <Reveal as="h2" className="footer__heading">
          Let&apos;s build something.
        </Reveal>

        <Reveal as="p" className="footer__line">
          Reach out for full-time roles, freelance work, or just to talk shop.
        </Reveal>

        <Reveal className="footer__actions">
          <a className="btn btn--primary" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <a className="btn" href={`tel:${contact.phoneHref}`}>
            {contact.phone}
          </a>
          <a className="btn" href={contact.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="btn" href={contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn" href={resumeUrl} download>
            Download CV
          </a>
        </Reveal>

        <p className="footer__meta">
          <span>© {new Date().getFullYear()} Ammad Mazhar</span>
          <span className="footer__meta-divider">·</span>
          <span>Built with React + Vite</span>
        </p>
      </div>
    </footer>
  );
}
