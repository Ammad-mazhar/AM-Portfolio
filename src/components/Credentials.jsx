import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import { credentials } from '../data/content.js';
import { useI18n } from '../i18n/useI18n.js';
import './Credentials.css';

const GROUP_KEYS = ['education', 'achievements', 'competitions'];

export default function Credentials() {
  const { t } = useI18n();

  return (
    <section id="credentials" className="credentials section">
      <div className="container">
        <SectionHeader number="05" title={t.credentials.sectionTitle} />
        <div className="credentials__grid">
          {GROUP_KEYS.map((key) => (
            <Reveal className="credentials__card" key={key}>
              <h3 className="credentials__card-title">{t.credentials.groups[key]}</h3>
              <ul className="credentials__list">
                {(t.credentials.lists[key] ?? credentials[key]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
