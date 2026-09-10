import './ProjectCard.css';

export default function ProjectCard({ project }) {
  const { sheet, status, title, description, tags, image, link } = project;
  const statusClass = status.toLowerCase().replace(/\s+/g, '-');

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
          <span className="project-card__sheet">SHEET {sheet}</span>
          <span className={`badge badge--${statusClass}`}>{status}</span>
        </div>

        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{description}</p>

        <ul className="project-card__tags">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        {link ? (
          <a className="project-card__link" href={link} target="_blank" rel="noreferrer">
            View project ↗
          </a>
        ) : (
          <span className="project-card__link project-card__link--disabled">No live link</span>
        )}
      </div>
    </article>
  );
}
