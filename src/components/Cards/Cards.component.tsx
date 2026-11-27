import React from 'react';
import { Check, LucideIcon } from 'lucide-react';

interface ICardProps {
  title: string;
  content: string;
  icon?: LucideIcon;
  className?: string;
}

/** Splits "Solutions: • a • b Technologies: x, y" copy into bullets and technology tags. */
export const parseService = (content: string) => {
  const [solutions, technologies] = content.split('Technologies:');
  return {
    bullets: solutions
      .split('•')
      .map((p) => p.trim())
      .filter((p) => p && !p.toLowerCase().startsWith('solutions')),
    technologies: (technologies || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
  };
};

const Cards = ({ title, content, icon: Icon, className = '' }: ICardProps): React.JSX.Element => {
  const { bullets, technologies } = parseService(content);
  return (
    <article className={`card card-hover card-glow group flex h-full flex-col p-6 ${className}`}>
      {Icon && (
        <span className="icon-tile mb-6 h-12 w-12 transition-transform duration-300 group-hover:scale-105">
          <Icon size={22} />
        </span>
      )}
      <h3 className="text-xl font-bold">{title}</h3>
      <ul className="mb-7 mt-5 space-y-2.5">
        {bullets.map((b) => (
          <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-ink-600">
            <Check size={17} className="mt-1 shrink-0 text-brand-600" />
            {b}
          </li>
        ))}
      </ul>
      {technologies.length > 0 && (
        <ul aria-label="Technologies" className="mt-auto flex flex-wrap gap-1.5 border-t border-ink-200 pt-5">
          {technologies.map((t) => (
            <li key={t} className="rounded-md border border-ink-200 bg-ink-50 px-2 py-1 text-xs font-medium text-ink-600 transition group-hover:border-brand-100 group-hover:bg-brand-50/60">
              {t}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default Cards;
