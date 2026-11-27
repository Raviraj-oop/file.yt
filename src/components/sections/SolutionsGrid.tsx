import React from 'react';
import { ArrowUpRight, GraduationCap, HeartHandshake, Plane, Rocket, type LucideIcon } from 'lucide-react';
import Reveal from '../ui/Reveal';

/* Shown on the home page ("Solutions We've Built") and on the Clients page. */
export const solutions = [
  { icon: HeartHandshake, link: 'https://www.utkarshavivah.com', name: 'Utkarsha Vivah', by: 'AI-Powered Matrimony Platform' },
  { icon: Plane, link: 'https://www.travobuddy.com', name: 'Travo Buddy', by: 'Intelligent Travel Booking System' },
  { icon: Rocket, link: 'https://www.startupmaharashtra.com', name: 'Startup Maharashtra', by: 'Digital Startup Ecosystem Platform' },
  { icon: GraduationCap, link: 'https://www.navodhanedtech.com', name: 'NavoDhan EdTech', by: 'AI-Powered Learning Platform' },
];

export interface SolutionCard {
  icon: LucideIcon;
  name: string;
  by: string;
  link?: string;
  details?: string;
}

const cardClass = 'card card-hover card-glow group flex h-full flex-col p-4';

const SolutionsGrid = ({ entries = solutions, showWebsiteAddress = true }: { entries?: readonly SolutionCard[]; showWebsiteAddress?: boolean }) => (
  <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
    {entries.map(({ icon: Icon, link, name, by, details }, i) => {
      const content = (
        <>
          <span className="flex items-start justify-between">
            <span className="icon-tile h-14 w-14 transition-transform duration-300 group-hover:scale-105"><Icon size={26} strokeWidth={1.7} /></span>
            {link && <ArrowUpRight size={20} className="text-ink-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600" />}
          </span>
          <span className="mt-7 font-display text-lg font-bold text-ink-900">{name}</span>
          <span className="mb-5 mt-1 text-ink-600">{by}</span>
          {details && <span className="-mt-3 mb-5 text-sm text-ink-600">{details}</span>}
          {link && showWebsiteAddress && <span className="mt-auto break-all text-sm font-medium text-brand-700">{link.replace('https://www.', '')}</span>}
        </>
      );

      return (
        <Reveal key={name} delay={(i % 4) * 0.07}>
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className={cardClass}>{content}</a>
          ) : (
            <article className={cardClass}>{content}</article>
          )}
        </Reveal>
      );
    })}
  </div>
);

export default SolutionsGrid;
