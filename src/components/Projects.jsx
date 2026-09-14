import { useMemo, useState } from 'react';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import ProjectCard from './ProjectCard.jsx';
import { filters, projects } from '../data/projects.js';
import { useI18n } from '../i18n/useI18n.js';
import './Projects.css';

export default function Projects() {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(
    () => (activeFilter === 'All' ? projects : projects.filter((p) => p.stack === activeFilter)),
    [activeFilter],
  );

  return (
    <section id="work" className="projects section">
      <div className="container">
        <SectionHeader number="03" title={t.projects.sectionTitle} />

        <div className="projects__filters" role="group" aria-label={t.projects.filterAriaLabel}>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`filter-btn ${activeFilter === filter ? 'is-active' : ''}`}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {t.projects.filters[filter] ?? filter}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {filtered.map((project) => (
            <Reveal className="projects__card-wrap" key={project.sheet}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
