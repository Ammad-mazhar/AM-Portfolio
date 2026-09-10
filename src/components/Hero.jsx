import Reveal from './Reveal.jsx';
import { contact, resumeUrl } from '../data/content.js';
import './Hero.css';

const titleBlock = [
  { label: 'Role', value: 'Full Stack Developer' },
  { label: 'Stack', value: 'React · Express · Laravel' },
  { label: 'Based in', value: 'Pakistan (Remote)' },
  { label: 'Status', value: 'Open to opportunities' },
];

export default function Hero() {
  return (
    <section id="top" className="hero section">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__content">
            <Reveal className="hero__eyebrow">
              <span className="hero__dot" aria-hidden="true" />
              Available for full-time &amp; freelance work
            </Reveal>

            <Reveal as="h1" className="hero__title">
              Ammad Mazhar
            </Reveal>

            <Reveal as="p" className="hero__subtitle">
              Full Stack Developer — React · Express · Laravel
            </Reveal>

            <Reveal as="p" className="hero__intro">
              I build and ship full stack products — from React interfaces down to the Express
              and Laravel APIs behind them. Currently completing a Software Engineering diploma
              at Aptech while working hands-on with real client and freelance projects.
            </Reveal>

            <Reveal className="hero__actions">
              <a className="btn btn--primary" href="#work">
                View Work
              </a>
              <a className="btn" href={resumeUrl} download>
                Download CV
              </a>
              <a className="btn" href={contact.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="btn" href={contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="btn" href={`mailto:${contact.email}`}>
                Email
              </a>
            </Reveal>
          </div>

          <Reveal className="hero__portrait">
            <img
              src="/1.jpeg"
              alt="Ammad Mazhar"
              width="1024"
              height="1280"
              loading="eager"
            />
          </Reveal>
        </div>

        <Reveal className="hero__titleblock">
          {titleBlock.map((item) => (
            <div className="hero__titleblock-cell" key={item.label}>
              <span className="hero__titleblock-label">{item.label}</span>
              <span className="hero__titleblock-value">{item.value}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
