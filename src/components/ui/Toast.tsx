import React, { createContext, useCallback, useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { MotionPresence as AnimatePresence } from './MotionPresence';
import { CheckCircle2, Info, XCircle } from 'lucide-react';

type Tone = 'success' | 'error' | 'info';
interface ToastItem {
  id: number;
  tone: Tone;
  text: string;
}

const ToastContext = createContext<(text: string, tone?: Tone) => void>(() => undefined);
export const useToast = () => useContext(ToastContext);

const icons: Record<Tone, React.ReactNode> = {
  success: <CheckCircle2 size={18} className="text-emerald-400" />,
  error: <XCircle size={18} className="text-rose-400" />,
  info: <Info size={18} className="text-brand-300" />,
};

let nextId = 1;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<ToastItem[]>([]);
  const push = useCallback((text: string, tone: Tone = 'success') => {
    const id = nextId++;
    setItems((list) => [...list, { id, tone, text }]);
    window.setTimeout(() => setItems((list) => list.filter((t) => t.id !== id)), 4200);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[90] flex flex-col items-center gap-2 sm:left-auto sm:right-6 sm:items-end"
        role="status"
        aria-live="polite"
      >
        <AnimatePresence>
          {items.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl bg-ink-900 px-4 py-3 text-sm font-medium text-white shadow-lift"
            >
              <span className="shrink-0">{icons[t.tone]}</span>
              {t.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
