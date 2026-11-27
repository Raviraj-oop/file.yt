import React from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/** Fades content up once as it scrolls into view. */
const Reveal = ({ children, delay = 0, className }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -40px 0px' }}
    transition={{ duration: 0.55, delay, ease: [0.21, 0.6, 0.35, 1] }}
  >
    {children}
  </motion.div>
);

export default Reveal;
