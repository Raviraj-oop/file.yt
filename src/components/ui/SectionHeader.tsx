import React from 'react';
import Reveal from './Reveal';

interface Props {
  title: React.ReactNode;
  intro?: React.ReactNode;
  center?: boolean;
  light?: boolean;
}

const SectionHeader = ({ title, intro, center, light }: Props) => (
  <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
    <span className={`mb-2 block h-1 w-10 rounded-full bg-gradient-to-r ${light ? 'from-[#a9ebee] to-[#8085f9]' : 'from-[#2f6bea] to-[#7a1ff0]'} ${center ? 'mx-auto' : ''}`} aria-hidden="true" />
    <h2 className={`text-[1.625rem] font-bold leading-tight tracking-[-.03em] sm:text-[2rem] sm:leading-[1.12] ${light ? '!text-white' : ''}`}>{title}</h2>
    {intro && <p className={`mt-2 text-base leading-relaxed ${light ? 'text-white/70' : 'text-ink-500'}`}>{intro}</p>}
  </Reveal>
);

export default SectionHeader;
