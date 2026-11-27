import React from 'react';
import { ArrowRight, Info } from 'lucide-react';
import { erpEfficiency, erpIntro, erpJourney, erpOffers, erpWhy } from '../../Mockdata/VedErp';
import ErpChallengeStack from './ErpChallengeStack';
import Reveal from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';

const stageStyles = [
  { panel: 'border-brand-100 bg-brand-50/60', dot: 'from-[#5b5cf0] to-[#4036c9]', label: 'text-brand-700', arrow: 'text-brand-400' },
  { panel: 'border-cyan-100 bg-cyan-50/60', dot: 'from-[#1c93ab] to-[#0c647c]', label: 'text-cyan-800', arrow: 'text-cyan-500' },
];

/** Ved ERP on the Products page: what it is, how material moves, the challenges it solves and where it helps. */
const VedErpSection = () => (
  <>
    {/* What we can also do */}
    <section id="ved-erp" className="border-t border-ink-200">
      <div className="page py-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <SectionHeader title={erpIntro.title} intro={erpIntro.intro} />
          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-ink-600">{erpIntro.summary}</p>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {erpOffers.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.07} className="h-full">
              <article className="card card-hover card-glow group h-full p-4">
                <span className="icon-tile h-9 w-9 transition-transform duration-300 group-hover:scale-105"><Icon size={19} /></span>
                <h3 className="mt-3 text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <ul className="mt-6 flex flex-wrap gap-3" aria-label="Why Vipracube">
          {erpWhy.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-800 shadow-sm">
              <Icon size={16} className="text-brand-600" aria-hidden="true" /> {label}
            </li>
          ))}
        </ul>

        {/* Material journey */}
        <Reveal className="mt-9">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Material Journey: Planning to Roll Down</h3>
          <p className="mt-2 text-ink-600">How one requirement becomes a woven fabric roll, recorded in the ERP at every step</p>
        </Reveal>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {erpJourney.map(({ stage, moves, steps }, s) => {
            const st = stageStyles[s];
            return (
              <Reveal key={stage} delay={s * 0.08} className="h-full">
                <div className={`flex h-full flex-col rounded-3xl border p-4 sm:p-5 ${st.panel}`}>
                  <p className={`text-sm font-bold tracking-wide ${st.label}`}>{stage}</p>
                  <ol className="mt-3 grid gap-3 sm:grid-cols-2">
                    {steps.map(({ icon: Icon, title, text }, i) => (
                      <li key={title} className="flex gap-2.5 rounded-2xl bg-white/80 p-3 shadow-sm ring-1 ring-ink-200/60">
                        <span className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white ${st.dot}`}>
                          <Icon size={17} />
                          <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-ink-900 text-[11px] font-bold text-white">{s * 4 + i + 1}</span>
                        </span>
                        <span className="min-w-0">
                          <span className="block font-bold text-ink-900">{title}</span>
                          <span className="mt-0.5 block text-sm leading-relaxed text-ink-600">{text}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-auto pt-4">
                    <p className="text-xs font-semibold text-ink-500">What moves</p>
                    <p className="mt-2 flex flex-wrap items-center gap-2">
                      {moves.map((m, i) => (
                        <React.Fragment key={m}>
                          {i > 0 && <ArrowRight size={15} className={`shrink-0 ${st.arrow}`} aria-hidden="true" />}
                          <span className="rounded-full border border-ink-200 bg-white px-3 py-1 text-sm font-semibold text-ink-800">{m}</span>
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    {/* Challenges and solutions: stacking cards */}
    <ErpChallengeStack />

    {/* Efficiency areas */}
    <section id="erp-efficiency" className="home-hero relative isolate overflow-hidden">
      <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="aurora aurora-a -z-10 right-[-6rem] top-[-6rem] h-80 w-80 opacity-40" aria-hidden="true" />
      <div className="page py-8 sm:py-10">
        <SectionHeader light title="Where Vipra ERP Improves Efficiency" intro="The ERP modules behind each area." />
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {erpEfficiency.map(({ icon: Icon, area, how }, i) => (
            <li key={area}>
              <Reveal delay={(i % 4) * 0.06} className="h-full">
                <div className="h-full rounded-2xl border border-white/15 bg-white/[.06] p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10">
                  <span className="icon-tile h-9 w-9 rounded-xl"><Icon size={17} /></span>
                  <h3 className="mt-3 text-lg font-bold !text-white">{area}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{how}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-5 flex max-w-3xl gap-3 rounded-2xl border border-white/15 bg-white/5 p-3 text-sm leading-relaxed text-slate-300">
          <Info size={18} className="mt-0.5 shrink-0 text-cyan-200" aria-hidden="true" />
          These are expected improvements based on what each module records and reports. Actual results depend on each plant and how fully the ERP is used; no measured results are shown here.
        </p>
      </div>
    </section>
  </>
);

export default VedErpSection;
