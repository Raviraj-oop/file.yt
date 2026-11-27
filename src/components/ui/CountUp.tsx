import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

/** Counts up to a value such as "20+" or 48 when it scrolls into view. */
const CountUp = ({ value }: { value: string | number }) => {
  const text = String(value);
  const match = text.match(/^(\d+)(.*)$/);
  const isNumber = Boolean(match);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || !isNumber) return;
    if (reduced) {
      setShown(target);
      return;
    }
    const controls = animate(0, target, { duration: 1.1, ease: 'easeOut', onUpdate: (v) => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [inView, isNumber, target, reduced]);

  return (
    <span ref={ref}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{isNumber ? `${shown}${suffix}` : text}</span>
    </span>
  );
};

export default CountUp;
