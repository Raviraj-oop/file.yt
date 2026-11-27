import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MotionPresence as AnimatePresence } from '../ui/MotionPresence';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import slide1 from '../../assets/optimized/slide-1.webp';
import slide2 from '../../assets/optimized/slide-2.webp';
import slide3 from '../../assets/optimized/slide-3.webp';
import slide4 from '../../assets/optimized/slide-4.webp';

const slides = [
  { img: slide1, badge: 'Start your journey', heading: 'Launch your career with hands-on AI & Data Science training.' },
  { img: slide2, badge: 'Real world projects', heading: 'Build 11 real portfolio projects and become job-ready.' },
  { img: slide3, badge: 'Expert mentorship', heading: 'Learn from top 1% industry experts with live sessions.' },
  { img: slide4, badge: 'Placement support', heading: '95% placement success — your career transformation starts here.' },
];

const arrow =
  'grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition hover:bg-white/25';

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [paused, reduced, current]);

  const go = (step: number) => setCurrent((c) => (c + step + slides.length) % slides.length);
  const slide = slides[current];

  return (
    <div
      className="relative min-h-[260px] overflow-hidden rounded-3xl bg-ink-900 sm:min-h-[300px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Training highlights"
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={slide.img}
          src={slide.img}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/50 to-ink-950/10" />
      <div className="relative z-10 flex min-h-[inherit] flex-col justify-end gap-3 p-4 sm:p-5 lg:flex-row lg:items-end lg:justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl"
          >
            <p className="font-medium text-brand-200">{slide.badge}</p>
            <p className="mt-2 font-display text-xl font-bold leading-snug text-white sm:text-3xl sm:leading-tight">{slide.heading}</p>
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex">
            {slides.map((s, i) => (
              <button
                key={s.badge}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current}
                className="px-1 py-3"
              >
                <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className={arrow}>
            <ChevronLeft size={20} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next slide" className={arrow}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
