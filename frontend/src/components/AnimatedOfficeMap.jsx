import React from 'react';
import { motion } from 'framer-motion';

const MAP_URL = 'https://static.prod-images.emergentagent.com/jobs/a46d9f4e-718c-4add-95f0-4ba36a75bba8/images/6273f377bbf4b8f698221190cf59f72041087ff4671c198a75a0ab09f673cee8.png';

// left/top are % positions tuned to the equirectangular dotted map
const offices = [
  { name: 'Doha (HQ)', type: 'trading', left: 64.6, top: 43, hq: true },
  { name: 'Geneva', type: 'trading', left: 51.7, top: 30 },
  { name: 'Istanbul', type: 'trading', left: 58.2, top: 33.5 },
  { name: 'Dubai', type: 'trading', left: 66.5, top: 44 },
  { name: 'Singapore', type: 'trading', left: 78.8, top: 58.5 },
  { name: 'Canada', type: 'origination', left: 25.5, top: 30 },
  { name: 'Ukraine', type: 'origination', left: 58.5, top: 27 },
  { name: 'Russia', type: 'origination', left: 61.5, top: 22 },
  { name: 'Kazakhstan', type: 'origination', left: 70.5, top: 26 },
];

const COLORS = { trading: '#8A1538', origination: '#d9a441' };

const Marker = ({ name, type, left, top, hq, index }) => {
  const color = COLORS[type];
  const dot = hq ? 14 : 10;
  const ring = hq ? 26 : 18;
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: `${left}%`, top: `${top}%`, zIndex: hq ? 20 : 10 }}
      data-testid={`office-marker-${name.toLowerCase().replace(/[^a-z]/g, '')}`}
    >
      {/* pulsing ring */}
      <motion.span
        className="absolute rounded-full"
        style={{ width: ring, height: ring, left: -ring / 2, top: -ring / 2, background: color }}
        initial={{ scale: 1, opacity: 0.55 }}
        animate={{ scale: [1, 2.8, 2.8], opacity: [0.55, 0, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: index * 0.22 }}
      />
      {/* solid dot */}
      <span
        className="relative block rounded-full ring-2 ring-white shadow-md"
        style={{ width: dot, height: dot, left: -dot / 2, top: -dot / 2, background: color }}
      />
      {/* label: always visible for HQ, hover for others */}
      <span
        className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-bold text-white transition-opacity duration-200 pointer-events-none ${hq ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        style={{ background: color, top: hq ? 10 : -22 }}
      >
        {name}
      </span>
    </div>
  );
};

export const AnimatedOfficeMap = () => (
  <div className="mb-6" data-testid="animated-office-map">
    <h3 className="text-xs font-bold tracking-wider uppercase mb-3" style={{ color: '#1f2937', letterSpacing: '0.1em' }}>Global Presence</h3>
    <div className="relative w-full rounded-xl border overflow-hidden" style={{ borderColor: '#e5e7eb', background: '#f4f6f8', aspectRatio: '1264 / 848' }}>
      <img src={MAP_URL} alt="World map of Peninsula Agritrade offices" className="absolute inset-0 w-full h-full object-contain" style={{ opacity: 0.85 }} />
      {offices.map((o, i) => (
        <Marker key={o.name} {...o} index={i} />
      ))}
    </div>
    <div className="flex items-center gap-4 mt-2">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: '#4b5563' }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.trading }} /> Trading
      </span>
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: '#4b5563' }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.origination }} /> Origination
      </span>
    </div>
  </div>
);

export default AnimatedOfficeMap;
