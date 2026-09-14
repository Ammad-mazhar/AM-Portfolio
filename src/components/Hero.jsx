import Reveal from './Reveal.jsx';
import { contact, resumeUrl } from '../data/content.js';
import { useI18n } from '../i18n/useI18n.js';
import './Hero.css';

export default function Hero() {
  const { t } = useI18n();
  const titleBlock = [t.hero.titleBlock.role, t.hero.titleBlock.stack, t.hero.titleBlock.basedIn, t.hero.titleBlock.status];

  return (
    <section id="top" className="hero section">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__content">
            <Reveal className="hero__eyebrow">
              <span className="hero__dot" aria-hidden="true" />
              {t.hero.eyebrow}
            </Reveal>

            <Reveal as="h1" className="hero__title">
              Ammad Mazhar
            </Reveal>

            <Reveal as="p" className="hero__subtitle">
              {t.hero.titleBlock.role.value} — React · Express · Laravel
            </Reveal>

            <Reveal as="p" className="hero__intro">
              {t.hero.intro}
            </Reveal>

            <Reveal className="hero__actions">
              <a className="btn btn--primary" href="#work">
                {t.hero.actions.viewWork}
              </a>
              <a className="btn" href={resumeUrl} download>
                {t.hero.actions.downloadCV}
              </a>
              <a className="btn" href={contact.github} target="_blank" rel="noreferrer">
                {t.hero.actions.github}
              </a>
              <a className="btn" href={contact.linkedin} target="_blank" rel="noreferrer">
                {t.hero.actions.linkedin}
              </a>
              <a className="btn" href={`mailto:${contact.email}`}>
                {t.hero.actions.email}
              </a>
            </Reveal>
          </div>

          <Reveal className="hero__portrait">
            <img src="/1.jpeg" alt="Ammad Mazhar" width="1024" height="1280" loading="eager" />
          </Reveal>
        </div>

        <Reveal className="hero__titleblock">
          {titleBlock.map((item, index) => (
            <div className="hero__titleblock-cell" key={index}>
              <span className="hero__titleblock-label">{item.label}</span>
              <span className="hero__titleblock-value">{item.value}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
