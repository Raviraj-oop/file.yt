import React from 'react';
import mockData from '../../Mockdata/MockData';
import { parseService } from '../Cards/Cards.component';

const technologies = Array.from(
  new Set(mockData.flatMap((service) => parseService(service.content).technologies.slice(0, 4)))
).slice(0, 14);

const TechnologyHighlights = () => (
  <section className="technology-band border-b border-ink-200" aria-label="Technologies we work with">
    {/* A static list when reduced motion is on, a slow scrolling strip otherwise. */}
    <ul className="page hidden flex-wrap items-center justify-center gap-x-6 gap-y-3 py-4 font-display font-semibold text-ink-500 motion-reduce:flex">
      {technologies.map((t) => <li key={t} className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm">{t}</li>)}
    </ul>
    <ul className="sr-only motion-reduce:hidden">{technologies.map((t) => <li key={t}>{t}</li>)}</ul>
    <div className="marquee overflow-hidden py-4 motion-reduce:hidden" aria-hidden="true">
      <div className="marquee-track flex w-max gap-4 pr-4 font-display font-semibold text-ink-500">
        {[...technologies, ...technologies].map((t, i) => (
          <span key={i} className="whitespace-nowrap rounded-full border border-ink-200 bg-white px-4 py-2 text-sm shadow-sm">{t}</span>
        ))}
      </div>
    </div>
  </section>
);

export default TechnologyHighlights;
