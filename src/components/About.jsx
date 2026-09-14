import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import { useI18n } from '../i18n/useI18n.js';
import './About.css';

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="about section">
      <div className="container">
        <SectionHeader number="01" title={t.about.sectionTitle} />
        <div className="about__grid">
          <Reveal className="about__text">
            {t.about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal className="about__portrait">
            <img src="/2.jpeg" alt="Ammad Mazhar" width="960" height="1280" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
