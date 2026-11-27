import React, { useEffect, useRef } from 'react';
import {
  BadgeCheck, ChartColumn, CheckCircle2, ClipboardCheck, Database, Gauge, LucideIcon, PackageCheck, PackageOpen, UserCheck,
  Warehouse, Wrench,
} from 'lucide-react';
import { erpChallenges } from '../../Mockdata/VedErp';
import SectionHeader from '../ui/SectionHeader';

/** Icon for each solution card, in the same order as erpChallenges. */
const solutionIcons: LucideIcon[] = [
  Database, Warehouse, ClipboardCheck, PackageCheck, PackageOpen, Gauge, BadgeCheck, Wrench, ChartColumn, UserCheck,
];

/** Distance from the top of the screen where cards stick (below the 56px navbar), and the offset between stacked cards. */
const STICK_TOP = 72;
const STACK_STEP = 12;

/**
 * "Business Challenges & How Vipra ERP Solves Them" as stacking cards:
 * each card sticks near the top while the next one slides over it, and the covered card shrinks and dims.
 */
const ErpChallengeStack = () => {
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = cardsRef.current;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!card) return;
        if (!next) {
          card.style.transform = '';
          card.style.filter = '';
          return;
        }
        const stickTop = STICK_TOP + i * STACK_STEP;
        const covered = Math.min(1, Math.max(0, 1 - (next.getBoundingClientRect().top - stickTop) / card.offsetHeight));
        card.style.transform = `scale(${1 - covered * 0.06})`;
        card.style.filter = covered > 0 ? `brightness(${1 - covered * 0.45})` : '';
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="erp-challenges" className="dark-hero relative isolate border-t border-white/10">
      <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="page pt-10 pb-6 sm:pt-14">
        <SectionHeader
          light
          title="Business Challenges & How Vipra ERP Solves Them"
          intro="Each challenge is the problem an ERP module is built to solve. Impacts are expected benefits of using these modules, not measured results."
        />
      </div>

      <ol className="page pb-16 sm:pb-24">
        {erpChallenges.map(({ challenge, problem, solution, how, impact, area }, i) => {
          const Icon = solutionIcons[i] ?? CheckCircle2;
          return (
            <li
              key={challenge}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="erp-stack-card sticky mb-8 rounded-[26px] p-5 sm:mb-10 sm:p-8 lg:p-10"
              style={{ top: STICK_TOP + i * STACK_STEP, zIndex: i + 1 }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold tabular-nums text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/15" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <h3 className="text-xl font-bold !text-white sm:text-2xl">{solution}</h3>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/30 sm:ml-auto">
                  {area}
                </span>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[.14em] text-rose-300">Today · Business challenge</p>
                  <p className="mt-2 text-lg font-semibold text-white">{challenge}</p>
                  <p className="mt-3 flex gap-3 leading-relaxed text-slate-300">
                    <span className="mt-3 h-px w-3 shrink-0 bg-slate-400" aria-hidden="true" />
                    {problem}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[.14em] text-brand-300">With Vipra ERP</p>
                  <ul className="mt-3 space-y-2.5">
                    {how.map((h) => (
                      <li key={h} className="flex gap-3 leading-relaxed text-slate-100">
                        <CheckCircle2 size={18} className="mt-1 shrink-0 text-[#a9ebee]" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 rounded-xl bg-white/5 p-3 text-[15px] leading-relaxed text-slate-200 ring-1 ring-white/10">
                    <span className="font-semibold text-white">Expected impact:</span> {impact}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default ErpChallengeStack;
