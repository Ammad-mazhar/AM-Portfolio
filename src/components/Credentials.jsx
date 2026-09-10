import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import { credentials } from '../data/content.js';
import './Credentials.css';

const groups = [
  { key: 'education', title: 'Education' },
  { key: 'achievements', title: 'Achievements' },
  { key: 'competitions', title: 'Competitions' },
];

export default function Credentials() {
  return (
    <section id="credentials" className="credentials section">
      <div className="container">
        <SectionHeader number="05" title="Credentials" />
        <div className="credentials__grid">
          {groups.map((group) => (
            <Reveal className="credentials__card" key={group.key}>
              <h3 className="credentials__card-title">{group.title}</h3>
              <ul className="credentials__list">
                {credentials[group.key].map((item) => (
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
