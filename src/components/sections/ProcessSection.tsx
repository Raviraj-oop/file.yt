import React from 'react';
import { processSteps } from '../../Mockdata/Brochure';
import Reveal from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';

/** How a project moves from the first idea to handover. */
const ProcessSection = () => (
  <section id="our-process" className="inner-hero border-t border-ink-200">
    <div className="page py-8 sm:py-10">
      <SectionHeader title="Our Process Overview" />
      <ol className="mt-5 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map(({ title, icon: Icon, text }, i) => (
          <li key={title}>
            <Reveal delay={(i % 4) * 0.07}>
              <div className="flex items-center gap-4">
                <span className="icon-tile h-14 w-14"><Icon size={24} strokeWidth={1.8} /></span>
                <span className="h-px flex-1 bg-brand-200" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{i + 1}. {title}</h3>
              <p className="mt-2 leading-relaxed text-ink-600">{text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ProcessSection;
