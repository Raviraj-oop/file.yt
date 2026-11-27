import React from 'react';
import { journey } from '../../Mockdata/Brochure';
import Reveal from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';

/** Company milestones grouped by year along one line. */
const JourneyTimeline = () => (
  <section id="journey" className="border-t border-ink-200">
    <div className="page py-8 sm:py-10">
      <SectionHeader title="Startup Growth & Innovation Journey" />
      <ol className="relative mt-5 space-y-7 pl-8 sm:pl-10">
        <span className="absolute bottom-0 left-[7px] top-3 w-0.5 rounded-full bg-gradient-to-b from-[#2f6bea] via-brand-500 to-[#7a1ff0]" aria-hidden="true" />
        {journey.map(({ year, milestones }) => (
          <li key={year} className="relative">
            <span className="absolute -left-8 top-2 h-4 w-4 rounded-full border-4 border-brand-600 bg-white sm:-left-10" aria-hidden="true" />
            <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{year}</h3>
            <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {milestones.map(({ date, icon: Icon, text }, i) => (
                <li key={date}>
                  <Reveal delay={i * 0.07} className="h-full">
                    <article className="card card-hover card-glow group h-full p-4">
                      <div className="flex items-center gap-3.5">
                        <span className="icon-tile h-11 w-11 rounded-xl transition-transform duration-300 group-hover:scale-105"><Icon size={21} /></span>
                        <h4 className="text-lg font-bold">{date}</h4>
                      </div>
                      <p className="mt-4 leading-relaxed text-ink-600">{text}</p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default JourneyTimeline;
