import React from 'react';
import { motion } from 'framer-motion';

const inputs = ['Documents', 'Databases', 'APIs'];
const outputs = ['Assistants', 'Automation', 'Insights'];
const rows = [92, 230, 368];
const mid = 230;

const Node = ({ x, y, label, delay }: { x: number; y: number; label: string; delay: number }) => (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.5 }}>
    <rect x={x} y={y - 29} width={138} height={58} rx={16} fill="#161d3d" stroke="rgba(255,255,255,.14)" />
    <text x={x + 69} y={y + 6} textAnchor="middle" fontSize={18} fontWeight={600} fill="#fff">
      {label}
    </text>
  </motion.g>
);

const Wire = ({ d, delay }: { d: string; delay: number }) => (
  <>
    <path d={d} fill="none" stroke="rgba(255,255,255,.13)" strokeWidth={2} />
    <path
      d={d}
      fill="none"
      stroke="url(#wire)"
      strokeWidth={2.5}
      strokeDasharray="10 30"
      strokeLinecap="round"
      className="animate-flow"
      style={{ animationDelay: `${delay}s` }}
    />
  </>
);

/** How a VIPRACUBE TECH system works: client data in, reasoning in the middle, business results out. */
const WorkflowVisual = () => (
  <div className="relative overflow-hidden rounded-[28px] bg-ink-900 shadow-lift">
    <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/40 blur-[80px]" aria-hidden="true" />
    <svg
      viewBox="0 0 620 460"
      className="relative block h-auto w-full"
      role="img"
      aria-label="Documents, databases and APIs flow into the VIPRACUBE TECH core, which uses retrieval, language models and agents to produce assistants, automation and insights."
    >
      <defs>
        <linearGradient id="wire" x1="0" x2="620" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8085f9" />
          <stop offset="1" stopColor="#c58bff" />
        </linearGradient>
        <linearGradient id="core" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4f5df0" />
          <stop offset="1" stopColor="#7a1ff0" />
        </linearGradient>
      </defs>
      {rows.map((y, i) => (
        <React.Fragment key={y}>
          <Wire d={`M162 ${y} C 205 ${y}, 195 ${mid}, 232 ${mid}`} delay={i * -0.5} />
          <Wire d={`M388 ${mid} C 425 ${mid}, 415 ${y}, 458 ${y}`} delay={i * -0.5 - 0.3} />
        </React.Fragment>
      ))}
      {inputs.map((label, i) => (
        <Node key={label} x={24} y={rows[i]} label={label} delay={0.1 + i * 0.1} />
      ))}
      {outputs.map((label, i) => (
        <Node key={label} x={458} y={rows[i]} label={label} delay={0.6 + i * 0.1} />
      ))}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.6 }}>
        <rect x={232} y={118} width={156} height={224} rx={26} fill="url(#core)" />
        <text x={310} y={160} textAnchor="middle" fontSize={18} fontWeight={700} fill="#fff" textLength={144} lengthAdjust="spacingAndGlyphs">
          VIPRACUBE TECH
        </text>
        {['Retrieval', 'LLM', 'Agents'].map((t, i) => (
          <g key={t}>
            <rect x={250} y={180 + i * 48} width={120} height={38} rx={12} fill="rgba(255,255,255,.16)" />
            <text x={310} y={205 + i * 48} textAnchor="middle" fontSize={17} fontWeight={500} fill="#fff">
              {t}
            </text>
          </g>
        ))}
      </motion.g>
    </svg>
  </div>
);

export default WorkflowVisual;
