import React from 'react';
import logoColor from '../../assets/Images/logo1.png';
import logoWhite from '../../assets/Images/logo2.png';

const BrandLogo = ({ light = false, compact = false }: { light?: boolean; compact?: boolean }) => (
  <span className={`inline-flex w-max items-center gap-1.5 whitespace-nowrap align-middle font-sans font-extrabold ${compact ? 'text-xs' : 'text-sm'}`}>
    <span className={`aspect-square shrink-0 overflow-hidden ${compact ? 'h-7' : 'h-8'}`}>
      <img src={light ? logoWhite : logoColor} alt="" className="h-full w-auto max-w-none" />
    </span>
    <span className={light ? 'text-white' : 'bg-gradient-to-r from-[#2554ed] to-[#8c00ff] bg-clip-text text-transparent'}>
      VIPRACUBE TECH
    </span>
  </span>
);

export default BrandLogo;
