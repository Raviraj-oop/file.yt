import type { ReactElement } from 'react';
import { AnimatePresence } from 'framer-motion';

// Framer Motion can render nothing. The project's TypeScript JSX checker requires an element or null.
export const MotionPresence = AnimatePresence as (
  props: Parameters<typeof AnimatePresence>[0]
) => ReactElement | null;
