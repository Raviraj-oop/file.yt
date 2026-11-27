import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MotionPresence as AnimatePresence } from './MotionPresence';
import { ChevronDown } from 'lucide-react';

export interface AccordionEntry {
  id: number;
  title: string;
  body: React.ReactNode;
}

const Accordion = ({ items }: { items: AccordionEntry[] }) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-ink-200 overflow-hidden rounded-2xl border border-ink-200 bg-white">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left font-semibold text-ink-900 transition hover:bg-ink-50"
            >
              {item.title}
              <ChevronDown size={18} className={`shrink-0 text-brand-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-6 leading-relaxed text-ink-600">{item.body}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
