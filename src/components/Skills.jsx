import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import {
  Atom,
  Braces,
  BrainCircuit,
  Contact,
  Database,
  FileCode2,
  Flame,
  GitBranch,
  Orbit,
  Palette,
  Radar,
  Route,
  Search,
  Server,
  TextSearch,
  TrendingUp,
  Webhook,
  Zap,
} from 'lucide-react';
import { cn, EASE_OUT_EXPO } from '../lib/utils.js';
import './Skills.css';

const SKILLS = [
  // Ring 1 — core stack
  { name: 'React', category: 'UI Library', icon: Atom },
  { name: 'JavaScript', category: 'Language', icon: Braces },
  { name: 'Vite', category: 'Build Tool', icon: Zap },
  { name: 'HTML', category: 'Markup', icon: FileCode2 },
  { name: 'CSS', category: 'Styling', icon: Palette },
  // Ring 2 — backend & data
  { name: 'Node.js', category: 'Runtime', icon: Server },
  { name: 'Express', category: 'Web Framework', icon: Route },
  { name: 'Laravel', category: 'PHP Framework', icon: Flame },
  { name: 'PHP', category: 'Language', icon: FileCode2 },
  { name: 'REST APIs', category: 'Integration', icon: Webhook },
  { name: 'MySQL', category: 'Database', icon: Database },
  // Ring 3 — tooling & growth
  { name: 'Git & GitHub', category: 'Version Control', icon: GitBranch },
  { name: 'SEO', category: 'Growth', icon: Search },
  { name: 'Keyword Research', category: 'Growth', icon: TextSearch },
  { name: 'Google Analytics', category: 'Analytics', icon: TrendingUp },
  { name: 'SEMrush', category: 'Analytics', icon: Radar },
  { name: 'CRM Development', category: 'Business Systems', icon: Contact },
  { name: 'AI Integration', category: 'Intelligence', icon: BrainCircuit },
];

const RING_CONFIG = [
  { count: 5, radiusFraction: 0.16, duration: 42, direction: 1 },
  { count: 6, radiusFraction: 0.3, duration: 58, direction: -1 },
  { count: 7, radiusFraction: 0.45, duration: 76, direction: 1 },
];

function useContainerWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
}

function SkillNode({ skill, isHovered, onHoverStart, onHoverEnd }) {
  const Icon = skill.icon;
  return (
    <button
      type="button"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      aria-label={`${skill.name} — ${skill.category}`}
      className={cn('skills__node', isHovered && 'is-hovered')}
    >
      <Icon aria-hidden="true" />
      <span role="tooltip" className="skills__tooltip">
        <span className="skills__tooltip-name">{skill.name}</span>
        <span className="skills__tooltip-cat">{skill.category}</span>
      </span>
    </button>
  );
}

function OrbitNode({
  skill,
  angle,
  radius,
  ringRotation,
  isHovered,
  onHoverStart,
  onHoverEnd,
}) {
  const counterRotate = useTransform(ringRotation, (r) => -r - angle);
  return (
    <div
      className="skills__orbit-slot"
      style={{ transform: `rotate(${angle}deg) translateX(${radius}px)` }}
    >
      <motion.div
        className="skills__orbit-rot"
        style={{ rotate: counterRotate, x: '-50%', y: '-50%' }}
      >
        <SkillNode
          skill={skill}
          isHovered={isHovered}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      </motion.div>
    </div>
  );
}

function OrbitRing({
  skills,
  radius,
  duration,
  direction,
  paused,
  hoveredSkill,
  onHoverStart,
  onHoverEnd,
}) {
  const rotation = useMotionValue(0);
  const controlsRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return; // leave the ring static at rotation 0
    controlsRef.current = animate(rotation, 360 * direction, {
      duration,
      repeat: Infinity,
      ease: 'linear',
    });
    return () => controlsRef.current?.stop();
  }, [rotation, duration, direction, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (paused) controlsRef.current?.pause();
    else controlsRef.current?.play();
  }, [paused, prefersReducedMotion]);

  return (
    <>
      <div
        aria-hidden="true"
        className="skills__ring-track"
        style={{ width: radius * 2, height: radius * 2 }}
      />
      <motion.div className="skills__ring" style={{ rotate: rotation }}>
        {skills.map((skill, index) => (
          <OrbitNode
            key={skill.name}
            skill={skill}
            angle={(360 / skills.length) * index}
            radius={radius}
            ringRotation={rotation}
            isHovered={hoveredSkill === skill.name}
            onHoverStart={() => onHoverStart(skill.name)}
            onHoverEnd={onHoverEnd}
          />
        ))}
      </motion.div>
    </>
  );
}

export default function Skills() {
  const [containerRef, width] = useContainerWidth();
  const [hoveredSkill, setHoveredSkill] = useState(null);

  let offset = 0;
  const rings = RING_CONFIG.map((config) => {
    const ringSkills = SKILLS.slice(offset, offset + config.count);
    offset += config.count;
    return { ...config, skills: ringSkills };
  });

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div className="skills__head">
          <span className="skills__eyebrow">Skills</span>
          <h2 className="skills__title">A constellation, not a checklist.</h2>
          <p className="skills__lede">
            Hover any node for the detail — the stack spans frontend, backend, and the
            SEO work that got me here.
          </p>
        </div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="skills__stage"
        >
          <div aria-hidden="true" className="skills__center-glow" />
          <div aria-hidden="true" className="skills__center">
            <Orbit aria-hidden="true" />
          </div>

          {width > 0 &&
            rings.map((ring) => (
              <OrbitRing
                key={ring.radiusFraction}
                skills={ring.skills}
                radius={width * ring.radiusFraction}
                duration={ring.duration}
                direction={ring.direction}
                paused={hoveredSkill !== null}
                hoveredSkill={hoveredSkill}
                onHoverStart={setHoveredSkill}
                onHoverEnd={() => setHoveredSkill(null)}
              />
            ))}
        </motion.div>
      </div>
    </section>
  );
}
