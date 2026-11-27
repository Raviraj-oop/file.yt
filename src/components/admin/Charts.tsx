import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

/* Checked for colour-blind separation and contrast. Each colour always means the same vendor group. */
export const chartColors = { verified: '#4f46e5', pending: '#eb6834' };
export const trackColors = { verified: '#e0e4ff', pending: '#fde3d7' };

type Align = 'start' | 'center' | 'end';
const alignClass: Record<Align, string> = { start: 'left-0', center: 'left-1/2 -translate-x-1/2', end: 'right-0' };

/* The outer part places the tooltip and the inner part animates, so the two transforms do not clash. */
const Tooltip = ({ color, title, text, align = 'center' }: { color: string; title: string; text: string; align?: Align }) => (
  <span className={`pointer-events-none absolute bottom-full z-20 mb-2.5 ${alignClass[align]}`}>
    <motion.span
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.12 }}
      className="block whitespace-nowrap rounded-xl bg-ink-900 px-3.5 py-2.5 text-left shadow-lift"
    >
      <span className="flex items-center gap-2 text-xs font-medium text-slate-300">
        <span className="h-2 w-2 rounded-full ring-1 ring-white/40" style={{ backgroundColor: color }} />
        {title}
      </span>
      <span className="mt-1 block text-sm font-semibold text-white">{text}</span>
    </motion.span>
  </span>
);

export interface Part {
  key: 'verified' | 'pending';
  label: string;
  value: number;
}

interface SegmentedBarProps {
  parts: Part[];
  onSelect?: (key: Part['key']) => void;
}

/** One whole split into parts. Click a part, or its legend row, to open that list. */
export const SegmentedBar = ({ parts, onSelect }: SegmentedBarProps) => {
  const [active, setActive] = useState<string | null>(null);
  const [tip, setTip] = useState<string | null>(null);
  const total = parts.reduce((sum, p) => sum + p.value, 0);
  const drawn = parts.filter((p) => p.value > 0);
  const dim = (key: string) => (active && active !== key ? 'opacity-45' : '');

  return (
    <div>
      <div className="flex h-7 gap-0.5">
        {total === 0 && <div className="w-full rounded bg-ink-100" />}
        {drawn.map((p, i) => {
          const share = Math.round((p.value / total) * 100);
          const show = () => {
            setActive(p.key);
            setTip(p.key);
          };
          const hide = () => {
            setActive(null);
            setTip(null);
          };
          return (
            <motion.button
              key={p.key}
              type="button"
              aria-label={`${p.label}: ${p.value} vendors, ${share}%. Open list.`}
              onClick={() => onSelect?.(p.key)}
              onMouseEnter={show}
              onMouseLeave={hide}
              onFocus={show}
              onBlur={hide}
              initial={{ flexGrow: 0 }}
              animate={{ flexGrow: p.value }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{ flexBasis: 0, minWidth: 8 }}
              className="relative rounded text-left text-xs font-semibold"
            >
              <span className={`absolute inset-0 rounded transition-opacity duration-200 ${dim(p.key)}`} style={{ backgroundColor: chartColors[p.key] }} />
              {share >= 15 && <span className={`relative px-2.5 ${p.key === 'verified' ? 'text-white' : 'text-ink-950'}`}>{share}%</span>}
              {tip === p.key && (
                <Tooltip color={chartColors[p.key]} title={p.label} text={`${p.value} of ${total} vendors (${share}%)`} align={drawn.length === 1 ? 'center' : i === 0 && share < 50 ? 'start' : 'end'} />
              )}
            </motion.button>
          );
        })}
      </div>
      <ul className="mt-5 divide-y divide-ink-200/70">
        {parts.map((p) => (
          <li key={p.key}>
            <button
              type="button"
              onClick={() => onSelect?.(p.key)}
              onMouseEnter={() => setActive(p.key)}
              onMouseLeave={() => setActive(null)}
              className={`group -mx-2 flex w-[calc(100%+16px)] items-center gap-3 rounded-lg px-2 py-3 text-left text-[15px] transition duration-200 hover:bg-ink-50 ${dim(p.key)}`}
            >
              <span className="h-3 w-3 shrink-0 rounded-[4px]" style={{ backgroundColor: chartColors[p.key] }} aria-hidden="true" />
              <span className="text-ink-700">{p.label}</span>
              <span className="ml-auto font-semibold tabular-nums text-ink-900">
                {p.value} <span className="font-normal text-ink-500">{p.value === 1 ? 'vendor' : 'vendors'}</span>
              </span>
              <ChevronRight size={16} className="shrink-0 text-ink-400 transition group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export interface MeterRow {
  key: 'verified' | 'pending';
  label: string;
  value: number;
  total: number;
}

const ticks = [0, 25, 50, 75, 100];

/** How much of each group has reached the goal, on one shared 0-100% scale. */
export const MeterChart = ({ rows, unit }: { rows: MeterRow[]; unit: string }) => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div>
      <div className="relative space-y-6 pb-5">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-ink-200" aria-hidden="true">
          {ticks.map((t) => (
            <span key={t} className="absolute bottom-0 h-1.5 w-px bg-ink-300" style={{ left: t === 100 ? 'calc(100% - 1px)' : `${t}%` }} />
          ))}
        </div>
        {rows.map((r) => {
          const share = r.total ? Math.round((r.value / r.total) * 100) : 0;
          return (
            <div key={r.key}>
              <div className="mb-2.5 flex items-baseline gap-3 text-[15px]">
                <span className="flex items-center gap-2.5 text-ink-700">
                  <span className="h-3 w-3 shrink-0 rounded-[4px]" style={{ backgroundColor: chartColors[r.key] }} aria-hidden="true" />
                  {r.label}
                </span>
                <span className="ml-auto text-sm tabular-nums text-ink-500">{r.total ? `${r.value} of ${r.total}` : 'No vendors'}</span>
                {r.total > 0 && <span className="w-12 text-right font-semibold tabular-nums text-ink-900">{share}%</span>}
              </div>
              <div
                className="relative rounded-full"
                tabIndex={0}
                role="img"
                aria-label={`${r.label}: ${r.value} of ${r.total} ${unit}, ${share}%`}
                onMouseEnter={() => setActive(r.key)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(r.key)}
                onBlur={() => setActive(null)}
              >
                <div className={`h-3 overflow-hidden rounded-full transition-opacity duration-200 ${active && active !== r.key ? 'opacity-45' : ''}`} style={{ backgroundColor: trackColors[r.key] }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: chartColors[r.key] }}
                    initial={{ width: 0 }}
                    animate={{ width: `${share}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
                {active === r.key && r.total > 0 && (
                  <Tooltip color={chartColors[r.key]} title={r.label} text={`${share}% ${unit}, ${r.total - r.value} missing`} />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative mt-2 h-4 text-xs tabular-nums text-ink-500" aria-hidden="true">
        {ticks.map((t) => (
          <span key={t} className={`absolute ${t === 0 ? '' : t === 100 ? '-translate-x-full' : '-translate-x-1/2'}`} style={{ left: `${t}%` }}>{t}%</span>
        ))}
      </div>
    </div>
  );
};
