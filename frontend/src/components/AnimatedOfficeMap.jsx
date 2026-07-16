import React from 'react';
import { motion } from 'framer-motion';

const MAP_URL = 'https://static.prod-images.emergentagent.com/jobs/a46d9f4e-718c-4add-95f0-4ba36a75bba8/images/6273f377bbf4b8f698221190cf59f72041087ff4671c198a75a0ab09f673cee8.png';

// left/top are % positions tuned to the equirectangular dotted map
const offices = [
  { name: 'Doha (HQ)', type: 'trading', left: 67, top: 43.6, hq: true },
  { name: 'Geneva', type: 'trading', left: 57.5, top: 35.8 },
  { name: 'Istanbul', type: 'trading', left: 59, top: 37.3 },
  { name: 'Dubai', type: 'trading', left: 68.5, top: 43.3 },
  { name: 'Singapore', type: 'trading', left: 80, top: 51.6 },
  { name: 'Canada', type: 'origination', left: 28, top: 30 },
  { name: 'Ukraine', type: 'origination', left: 60.5, top: 36.5 },
  { name: 'Russia', type: 'origination', left: 61.5, top: 33.8 },
  { name: 'Kazakhstan', type: 'origination', left: 68.5, top: 39.5 },
];

const destinationMarkers = [
  { name: 'Egypt', type: 'destination', left: 61.5, top: 44.3 },
  { name: 'Saudi Arabia', type: 'destination', left: 67.5, top: 45.3 },
  { name: 'Kenya', type: 'destination', left: 62.5, top: 50.5 },
  { name: 'Nigeria', type: 'destination', left: 58.5, top: 50.5 },
  { name: 'India', type: 'destination', left: 71.5, top: 45 },
  { name: 'Bangladesh', type: 'destination', left: 74, top: 46 },
  { name: 'Vietnam', type: 'destination', left: 78.5, top: 47 },
  { name: 'Indonesia', type: 'destination', left: 81, top: 54 },
];

const COLORS = { trading: '#8A1538', origination: '#d9a441', destination: '#0B3C5D' };

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

export const AnimatedOfficeMap = ({ showDestinations = false, title = 'Global Presence' }) => {
  const markers = showDestinations ? [...offices, ...destinationMarkers] : offices;
  return (
    <div className="mb-6" data-testid="animated-office-map">
      {title && (
        <h3 className="text-xs font-bold tracking-wider uppercase mb-3" style={{ color: '#1f2937', letterSpacing: '0.1em' }}>{title}</h3>
      )}
      <div className="relative w-full rounded-xl border overflow-hidden" style={{ borderColor: '#e5e7eb', background: '#f4f6f8', aspectRatio: '1264 / 848' }}>
        <img src={MAP_URL} alt="World map of Peninsula Agritrade offices" className="absolute inset-0 w-full h-full object-contain" style={{ opacity: 0.85 }} />
        {markers.map((o, i) => (
          <Marker key={o.name} {...o} index={i} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: '#4b5563' }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.trading }} /> Trading Office
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: '#4b5563' }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.origination }} /> Origination
        </span>
        {showDestinations && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: '#4b5563' }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.destination }} /> Destination Market
          </span>
        )}
      </div>
    </div>
  );
};

export default AnimatedOfficeMap;
