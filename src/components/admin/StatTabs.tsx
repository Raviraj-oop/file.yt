import React from 'react';
import { motion } from 'framer-motion';

export interface StatTab {
  id: string;
  label: string;
  value: React.ReactNode;
}

interface Props {
  tabs: StatTab[];
  active: string;
  onChange: (id: string) => void;
  label: string;
}

/** Count cards that also switch the list below them. */
const StatTabs = ({ tabs, active, onChange, label }: Props) => (
  <div role="group" aria-label={label} className="grid max-w-xl grid-cols-2 gap-4">
    {tabs.map((t) => {
      const on = t.id === active;
      return (
        <button
          key={t.id}
          type="button"
          aria-pressed={on}
          onClick={() => onChange(t.id)}
          className={`card relative p-4 text-left transition duration-200 sm:p-5 ${on ? 'bg-gradient-to-br from-brand-50 via-white to-white' : 'hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift'}`}
        >
          {on && <motion.span layoutId={`tab-${label}`} className="absolute inset-0 rounded-2xl ring-2 ring-brand-600" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
          <span className={`relative block text-sm font-medium ${on ? 'text-brand-700' : 'text-ink-500'}`}>{t.label}</span>
          <span className="relative mt-1 block font-sans text-3xl font-semibold text-ink-900">{t.value}</span>
        </button>
      );
    })}
  </div>
);

export default StatTabs;
