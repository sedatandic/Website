import React from 'react';
import { motion } from 'framer-motion';

const MAP_URL = '/dotted-world-map.png';

// left/top are % positions tuned to the dotted map (Antarctica cropped; aspect 1264/732)
const offices = [
  { name: 'Doha (HQ)', type: 'trading', left: 64.3, top: 42.7, hq: true },
  { name: 'Geneva', type: 'trading', left: 51.7, top: 28.4 },
  { name: 'Istanbul', type: 'trading', left: 58.1, top: 31.9 },
  { name: 'Dubai', type: 'trading', left: 65.4, top: 42.7 },
  { name: 'Singapore', type: 'trading', left: 78.8, top: 59.1 },
  { name: 'Canada', type: 'origination', left: 22.2, top: 22.3 },
  { name: 'Ukraine', type: 'origination', left: 58.5, top: 25.4 },
  { name: 'Russia', type: 'origination', left: 60.4, top: 21.8 },
  { name: 'Kazakhstan', type: 'origination', left: 68.9, top: 27.1 },
  { name: 'Brazil', type: 'origination', left: 36.1, top: 66.9 },
  { name: 'Australia', type: 'origination', left: 87.2, top: 77.1 },
];

const destinationMarkers = [
  { name: 'Türkiye', type: 'destination', left: 59.1, top: 32.7 },
  { name: 'Tunisia', type: 'destination', left: 52.6, top: 36.7 },
  { name: 'Algeria', type: 'destination', left: 50.8, top: 38.1 },
  { name: 'Lebanon', type: 'destination', left: 59.9, top: 36.8 },
  { name: 'Syria', type: 'destination', left: 60.1, top: 37.1 },
  { name: 'Pakistan', type: 'destination', left: 69.2, top: 39.4 },
  { name: 'Libya', type: 'destination', left: 53.7, top: 37.5 },
  { name: 'Malaysia', type: 'destination', left: 78.2, top: 57.9 },
  { name: 'Sri Lanka', type: 'destination', left: 72.4, top: 54.6 },
  { name: 'Philippines', type: 'destination', left: 83.6, top: 50.0 },
  { name: 'Egypt', type: 'destination', left: 58.7, top: 39.4 },
  { name: 'India', type: 'destination', left: 71.4, top: 40.4 },
  { name: 'Nepal', type: 'destination', left: 73.7, top: 41.0 },
  { name: 'Bangladesh', type: 'destination', left: 75.1, top: 43.7 },
  { name: 'Vietnam', type: 'destination', left: 79.4, top: 45.6 },
  { name: 'Indonesia', type: 'destination', left: 79.7, top: 64.2 },
];

const COLORS = { trading: '#8A1538', origination: '#d9a441', destination: '#0B3C5D' };

// Trade-flow paths in the 1264x732 SVG space (left*12.64, top*7.32)
const DOHA = [812.8, 312.6];
const flowDefs = [
  { from: [280.6, 163.2], to: DOHA, color: '#d9a441', dur: 6.5 },   // Canada -> Doha
  { from: [739.4, 185.9], to: DOHA, color: '#d9a441', dur: 4.6 },   // Ukraine -> Doha
  { from: [456.3, 489.7], to: DOHA, color: '#d9a441', dur: 7.0 },   // Brazil -> Doha
  { from: [1102.2, 564.4], to: DOHA, color: '#d9a441', dur: 7.5 },  // Australia -> Doha
  { from: DOHA, to: [747.0, 239.4], color: '#0B3C5D', dur: 3.8 },   // Doha -> Türkiye
  { from: DOHA, to: [742.0, 288.4], color: '#0B3C5D', dur: 4.2 },   // Doha -> Egypt
  { from: DOHA, to: [902.5, 295.7], color: '#0B3C5D', dur: 4.4 },   // Doha -> India
  { from: DOHA, to: [1007.4, 469.9], color: '#0B3C5D', dur: 5.6 },  // Doha -> Indonesia
];

const buildPath = ([x1, y1], [x2, y2]) => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const off = len * 0.18;
  const cx = mx + (-dy / len) * off, cy = my + (dx / len) * off;
  return `M${x1},${y1} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2},${y2}`;
};

const TradeFlows = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1264 732" preserveAspectRatio="none" aria-hidden="true">
    {flowDefs.map((f, i) => {
      const d = buildPath(f.from, f.to);
      return (
        <g key={i}>
          <path d={d} fill="none" stroke={f.color} strokeWidth="2" strokeDasharray="8 8" opacity="0.4" />
          <path d="M-7,-4 L7,0 L-7,4 Z" fill={f.color} opacity="0.95">
            <animateMotion dur={`${f.dur}s`} repeatCount="indefinite" path={d} rotate="auto" />
          </path>
        </g>
      );
    })}
  </svg>
);

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
        animate={{ scale: [1, 2.6, 2.6], opacity: [0.5, 0, 0] }}
        transition={{ duration: 4.2, times: [0, 0.45, 1], repeat: Infinity, ease: 'easeOut', delay: index * 0.35 }}
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

export const AnimatedOfficeMap = ({ showDestinations = false, fill = false, legendInside = false, showFlows = false, title = 'Global Presence' }) => {
  const markers = showDestinations ? [...offices, ...destinationMarkers] : offices;
  const legend = (
    <>
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: '#374151' }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.trading }} /> Trading Office
      </span>
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: '#374151' }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.origination }} /> Origination
      </span>
      {showDestinations && (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: '#374151' }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS.destination }} /> Destination Market
        </span>
      )}
    </>
  );
  return (
    <div className={`flex flex-col ${fill ? 'h-full' : ''}`} data-testid="animated-office-map">
      {title && (
        <h3 className="text-xs font-bold tracking-wider uppercase mb-3" style={{ color: '#1f2937', letterSpacing: '0.1em' }}>{title}</h3>
      )}
      <div
        className={`relative w-full rounded-xl border overflow-hidden ${fill ? 'flex-1' : 'shrink-0'}`}
        style={{ borderColor: '#e5e7eb', background: '#f4f6f8', ...(fill ? { minHeight: '340px' } : { aspectRatio: '1264 / 732' }) }}
      >
        <img
          src={MAP_URL}
          alt="World map of Peninsula Agritrade offices"
          className={`absolute inset-0 w-full h-full ${fill ? 'object-fill' : 'object-contain'}`}
          style={{ opacity: 0.85 }}
        />
        {showFlows && <TradeFlows />}
        {markers.map((o, i) => (
          <Marker key={o.name} {...o} index={i} />
        ))}
        {legendInside && (
          <div
            className="absolute bottom-2.5 left-2.5 flex flex-wrap items-center gap-3 px-3 py-1.5 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', border: '1px solid #e5e7eb' }}
          >
            {legend}
          </div>
        )}
      </div>
      {!legendInside && (
        <div className="flex flex-wrap items-center gap-4 mt-2">{legend}</div>
      )}
    </div>
  );
};

export default AnimatedOfficeMap;
