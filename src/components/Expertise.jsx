import { useEffect, useRef, useState } from 'react';
import SectionHeader from './SectionHeader.jsx';
import { expertise } from '../data/content.js';
import './Expertise.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Expertise() {
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

  return (
    <section id="expertise" className="expertise section">
      <div className="container">
        <SectionHeader number="02" title="Expertise" />
        <p className="expertise__lede">
          One request, four layers. Here&apos;s what I reach for at each stage of the
          stack — from the interface a user touches to the growth work that brings them
          there.
        </p>

        <div ref={ref} className={`expertise__diagram ${active ? 'is-active' : ''}`}>
          <div className="expertise__rail" aria-hidden="true">
            <span className="expertise__pulse" />
            {expertise.map((layer, i) => (
              <span className="expertise__node" style={{ '--i': i }} key={layer.id}>
                <span className="expertise__node-dot" />
                <span className="expertise__node-label">{layer.node}</span>
              </span>
            ))}
          </div>

          <ol className="expertise__cards">
            {expertise.map((layer, i) => (
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
