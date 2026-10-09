import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Reveal({ as: Tag = 'div', className = '', children, immediate = false, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (immediate) return;
    if (prefersReducedMotion()) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  const revealClassName = immediate
    ? `reveal-now ${className}`.trim()
    : `reveal ${visible ? 'is-visible' : ''} ${className}`.trim();

  return (
    <Tag ref={ref} className={revealClassName} {...rest}>
      {children}
    </Tag>
  );
}
