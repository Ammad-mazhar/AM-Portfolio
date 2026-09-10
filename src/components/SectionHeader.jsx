import './SectionHeader.css';

export default function SectionHeader({ number, title }) {
  return (
    <div className="section-header">
      <span className="section-header__number">{number}</span>
      <h2 className="section-header__title">{title}</h2>
      <span className="section-header__rule" aria-hidden="true" />
    </div>
  );
}
