import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import { buildLog } from '../data/content.js';
import { useI18n } from '../i18n/useI18n.js';
import './BuildLog.css';

export default function BuildLog() {
  const { t } = useI18n();
  const entries = buildLog.map((entry) => ({ ...entry, ...t.buildLog.items[entry.id] }));

  return (
    <section id="build-log" className="build-log section">
      <div className="container">
        <SectionHeader number="04" title={t.buildLog.sectionTitle} />
        <ol className="build-log__timeline">
          {entries.map((entry) => (
            <Reveal as="li" className="build-log__entry" key={entry.id}>
              <div className="build-log__marker" aria-hidden="true" />
              <div className="build-log__content">
                <div className="build-log__meta">
                  <span className="build-log__range">{entry.range}</span>
                  <span className="build-log__tag">{t.buildLog.tags[entry.tag] ?? entry.tag}</span>
                </div>
                <h3 className="build-log__role">{entry.role}</h3>
                <ul className="build-log__bullets">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
