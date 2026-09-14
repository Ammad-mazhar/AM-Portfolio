import { useEffect, useRef, useState } from 'react';
import SectionHeader from './SectionHeader.jsx';
import { expertise } from '../data/content.js';
import { useI18n } from '../i18n/useI18n.js';
import './Expertise.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Expertise() {
  const { t } = useI18n();
  const ref = useRef(null);
  const [active, setActive] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Ids, tech stack tags, and proficiency levels stay in content.js; the
  // human-language text (node label, title, blurb, note) comes from the
  // current language's dictionary, keyed by the same id.
  const layers = expertise.map((layer) => ({ ...layer, ...t.expertise.items[layer.id] }));

  return (
    <section id="expertise" className="expertise section">
      <div className="container">
        <SectionHeader number="02" title={t.expertise.sectionTitle} />
        <p className="expertise__lede">{t.expertise.lede}</p>

        <div ref={ref} className={`expertise__diagram ${active ? 'is-active' : ''}`}>
          <div className="expertise__rail" aria-hidden="true">
            <span className="expertise__pulse" />
            {layers.map((layer, i) => (
              <span className="expertise__node" style={{ '--i': i }} key={layer.id}>
                <span className="expertise__node-dot" />
                <span className="expertise__node-label">{layer.node}</span>
              </span>
            ))}
          </div>

          <ol className="expertise__cards">
            {layers.map((layer, i) => (
              <li className="expertise__card" style={{ '--i': i }} key={layer.id}>
                <div className="expertise__card-head">
                  <span className="expertise__card-index">{`0${i + 1}`}</span>
                  <h3 className="expertise__card-title">{layer.title}</h3>
                </div>
                <p className="expertise__card-blurb">{layer.blurb}</p>
                <ul className="expertise__tags">
                  {layer.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="expertise__meter">
                  <span
                    className="expertise__meter-track"
                    role="img"
                    aria-label={`${layer.title}: ${layer.note}, ${layer.level} out of 10`}
                  >
                    <span
                      className="expertise__meter-fill"
                      style={{ '--level': layer.level }}
                    />
                  </span>
                  <span className="expertise__meter-note">{layer.note}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
