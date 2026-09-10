import { useMemo, useState } from 'react';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import ProjectCard from './ProjectCard.jsx';
import { filters, projects } from '../data/projects.js';
import './Projects.css';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(
    () => (activeFilter === 'All' ? projects : projects.filter((p) => p.stack === activeFilter)),
    [activeFilter],
  );

  return (
    <section id="work" className="projects section">
      <div className="container">
        <SectionHeader number="03" title="Selected Work" />

        <div className="projects__filters" role="group" aria-label="Filter projects by stack">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`filter-btn ${activeFilter === filter ? 'is-active' : ''}`}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
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
