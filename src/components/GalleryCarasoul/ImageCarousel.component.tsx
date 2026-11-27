import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { MotionPresence as AnimatePresence } from '../ui/MotionPresence';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Reveal from '../ui/Reveal';
import image1 from '../../assets/optimized/gallery-1.webp';
import image2 from '../../assets/optimized/gallery-2.webp';
import image3 from '../../assets/optimized/gallery-3.webp';
import image4 from '../../assets/optimized/gallery-4.webp';
import image5 from '../../assets/optimized/gallery-5.webp';
import image6 from '../../assets/optimized/gallery-6.webp';
import image7 from '../../assets/optimized/gallery-7.webp';

const photos = [
  { src: image6, alt: 'The full Vipracube team lined up on stage', cls: 'col-span-2 aspect-[16/9]' },
  { src: image7, alt: 'A team member holding a bouquet of flowers', cls: 'aspect-[4/3] sm:row-span-2 sm:aspect-auto' },
  { src: image2, alt: 'A bouquet being presented at the event', cls: 'aspect-[4/3]' },
  { src: image5, alt: 'A speaker at the podium', cls: 'aspect-[4/3]' },
  { src: image3, alt: 'Guests lighting the ceremonial lamp', cls: 'aspect-[4/3]' },
  { src: image4, alt: 'A team member lighting the ceremonial lamp', cls: 'aspect-[4/3]' },
  { src: image1, alt: 'Team members giving a thumbs up', cls: 'aspect-[4/3]' },
];

const control = 'absolute grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25';

const ImageCarousel = () => {
  const [active, setActive] = useState<number | null>(null);
  const open = active !== null;

  const step = (n: number) => setActive((i) => (i === null ? i : (i + n + photos.length) % photos.length));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {photos.map((p, i) => (
          <Reveal key={p.src} delay={(i % 3) * 0.06} className={p.cls}>
            <button type="button" onClick={() => setActive(i)} aria-label={`Open photo: ${p.alt}`} className="card card-hover group block h-full w-full overflow-hidden rounded-2xl bg-ink-100">
              <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
            </button>
          </Reveal>
        ))}
      </div>
      {createPortal(
        <AnimatePresence>
          {active !== null && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Photo viewer"
              className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/95 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            >
              <motion.img
                key={active}
                src={photos[active].src}
                alt={photos[active].alt}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[82vh] max-w-full rounded-2xl object-contain"
              />
              <button type="button" autoFocus aria-label="Close" onClick={() => setActive(null)} className={`${control} right-4 top-4`}>
                <X size={22} />
              </button>
              <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); step(-1); }} className={`${control} bottom-5 left-[calc(50%-4.25rem)] sm:bottom-auto sm:left-5`}>
                <ChevronLeft size={24} />
              </button>
              <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); step(1); }} className={`${control} bottom-5 right-[calc(50%-4.25rem)] sm:bottom-auto sm:right-5`}>
                <ChevronRight size={24} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default ImageCarousel;
