import { useI18n } from '../i18n/useI18n.js';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  const { t } = useI18n();
  const { sheet, status, title, description, tags, image, link } = project;
  const statusClass = status.toLowerCase().replace(/\s+/g, '-');
  const localizedDescription = t.projects.items[sheet]?.description ?? description;

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

        {link ? (
          <a className="project-card__link" href={link} target="_blank" rel="noreferrer">
            {t.projects.viewProject} ↗
          </a>
        ) : (
          <span className="project-card__link project-card__link--disabled">
            {t.projects.noLiveLink}
          </span>
        )}
      </div>
    </article>
  );
}
