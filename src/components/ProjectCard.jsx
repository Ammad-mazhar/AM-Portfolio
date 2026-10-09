import { useId, useState } from 'react';
import { useI18n } from '../i18n/useI18n.js';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  const { t } = useI18n();
  const { sheet, status, title, description, tags, image, link, caseStudy } = project;
  const statusClass = status.toLowerCase().replace(/\s+/g, '-');
  const localizedDescription = t.projects.items[sheet]?.description ?? description;
  const caseStudyData = t.projects.items[sheet]?.caseStudy;
  const hasCaseStudy = Boolean(caseStudy && caseStudyData);
  const [isOpen, setIsOpen] = useState(false);
  const caseStudyId = useId();

  return (
    <article className="project-card">
      {image && (
        <div className="project-card__media">
          <img
            src={image}
            alt={`${title} — screenshot`}
            width="900"
            height="563"
            loading="lazy"
          />
        </div>
      )}

      <div className="project-card__body">
        <div className="project-card__head">
          <span className="project-card__sheet">
            {t.projects.sheetLabel} {sheet}
          </span>
          <span className={`badge badge--${statusClass}`}>{t.projects.status[status] ?? status}</span>
        </div>

        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{localizedDescription}</p>

        <ul className="project-card__tags">
          {tags.map((tag) => (
            <li key={tag}>{t.projects.tags[tag] ?? tag}</li>
          ))}
        </ul>

        <div className="project-card__actions">
          {link ? (
            <a className="project-card__link" href={link} target="_blank" rel="noreferrer">
              {t.projects.viewProject} ↗
            </a>
          ) : (
            <span className="project-card__link project-card__link--disabled">
              {t.projects.noLiveLink}
            </span>
          )}

          {hasCaseStudy && (
            <button
              type="button"
              className="project-card__case-toggle"
              aria-expanded={isOpen}
              aria-controls={caseStudyId}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? caseStudyData.toggleClose : caseStudyData.toggleOpen}
            </button>
          )}
        </div>

        {hasCaseStudy && (
          <div id={caseStudyId} className={`project-card__case-study ${isOpen ? 'is-open' : ''}`}>
            <div className="project-card__case-inner">
              {caseStudyData.sections.map((section) => (
                <div className="project-card__case-section" key={section.heading}>
                  <h4>{section.heading}</h4>
                  {section.list ? (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{section.body}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
