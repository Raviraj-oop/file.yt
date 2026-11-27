import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}

/** Standard heading block for inner pages, in the same dark style as the home page. */
const PageHero = ({ title, intro, children }: Props) => (
  <section className="dark-hero relative isolate overflow-hidden">
    <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
    <div className="aurora aurora-a -right-24 -top-32 -z-10 h-80 w-80 sm:h-[28rem] sm:w-[28rem]" aria-hidden="true" />
    <div className="aurora aurora-b -bottom-40 left-[-6rem] -z-10 h-72 w-72 opacity-40" aria-hidden="true" />
    <div className="page relative pb-7 pt-20 sm:pb-8 sm:pt-[88px]">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
        <span className="block h-1 w-12 rounded-full bg-gradient-to-r from-[#a9ebee] to-[#8085f9]" aria-hidden="true" />
        <h1 className="mt-3 text-[1.8rem] font-extrabold leading-tight tracking-[-.045em] !text-white sm:text-4xl sm:leading-[1.05]">{title}</h1>
        {intro && <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{intro}</p>}
        {children && <div className="mt-4 flex flex-wrap gap-3">{children}</div>}
      </motion.div>
    </div>
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />
  </section>
);

export default PageHero;
