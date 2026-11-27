import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import CountUp from '../ui/CountUp';
import { Skeleton } from '../ui/Skeleton';
import { chartColors, trackColors } from './Charts';

export type StatTone = 'total' | 'verified' | 'pending' | 'document';

/* Verified and pending use the same colours as the charts. */
const tones: Record<StatTone, { card: string; tile: string; bar: string; track: string }> = {
  total: { card: 'from-slate-100', tile: 'from-[#3a4569] to-[#0e1329]', bar: '#2d3653', track: '#e5e8f1' },
  verified: { card: 'from-brand-50', tile: 'from-[#635ff2] to-[#4036c9]', bar: chartColors.verified, track: trackColors.verified },
  pending: { card: 'from-orange-50', tile: 'from-[#ee7f48] to-[#cf4d19]', bar: chartColors.pending, track: trackColors.pending },
  document: { card: 'from-cyan-50', tile: 'from-[#1c93ab] to-[#0c647c]', bar: '#0e7490', track: '#cfeef5' },
};

interface Props {
  label: string;
  value: number;
  note: string;
  icon: LucideIcon;
  tone: StatTone;
  /** 0-100. Draws the thin bar under the number. */
  share: number;
  index: number;
  loading: boolean;
  failed: boolean;
  ready: boolean;
}

const StatCard = ({ label, value, note, icon: Icon, tone, share, index, loading, failed, ready }: Props) => {
  const t = tones[tone];
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="h-full">
      <div className={`card card-hover group flex h-full flex-col bg-gradient-to-br ${t.card} via-white to-white p-4`}>
        <div className="flex min-h-[40px] items-center gap-3">
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-soft transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11 ${t.tile}`}>
            <Icon size={20} strokeWidth={2} />
          </span>
          <p className="min-w-0 text-sm font-medium leading-snug text-ink-600 sm:text-[15px]">{label}</p>
        </div>
        {loading ? (
          <Skeleton className="mt-5 h-[34px] w-20 sm:h-[42px]" />
        ) : (
          <p className="mt-5 font-sans text-[34px] font-semibold leading-none tracking-tight text-ink-900 sm:text-[42px]">{failed ? '–' : <CountUp value={value} />}</p>
        )}
        <p className="mb-4 mt-2.5 min-h-[20px] text-sm text-ink-500">{ready ? note : failed ? 'Not available' : ''}</p>
        <div className="mt-auto h-1 overflow-hidden rounded-full" style={{ backgroundColor: t.track }} aria-hidden="true">
          <motion.div className="h-full rounded-full" style={{ backgroundColor: t.bar }} initial={{ width: 0 }} animate={{ width: `${ready ? share : 0}%` }} transition={{ duration: 0.9, ease: 'easeOut' }} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
