import React from 'react';
import { motion } from 'framer-motion';

const MAP_URL = '/dotted-world-map.png';

// left/top are % positions tuned to the dotted map (Antarctica cropped; aspect 1264/732)
const offices = [
  { name: 'Doha (HQ)', type: 'trading', left: 61.5, top: 52.9, hq: true },
  { name: 'Geneva', type: 'trading', left: 49.0, top: 40.2 },
  { name: 'Istanbul', type: 'trading', left: 55.3, top: 43.7 },
  { name: 'Dubai', type: 'trading', left: 62.6, top: 52.9 },
  { name: 'Singapore', type: 'trading', left: 75.9, top: 64.9 },
  { name: 'Canada', type: 'origination', left: 18.2, top: 35.9 },
  { name: 'Ukraine', type: 'origination', left: 56.2, top: 38.2 },
  { name: 'Russia', type: 'origination', left: 61.1, top: 32.8 },
  { name: 'Kazakhstan', type: 'origination', left: 66.1, top: 38.9 },
  { name: 'Brazil', type: 'origination', left: 33.6, top: 71.5 },
  { name: 'Australia', type: 'origination', left: 85.9, top: 80.9 },
];

const destinationMarkers = [
  { name: 'Tunisia', type: 'destination', left: 50.0, top: 48.0 },
  { name: 'Algeria', type: 'destination', left: 48.0, top: 51.4 },
  { name: 'Morocco', type: 'destination', left: 45.7, top: 49.2 },
  { name: 'Libya', type: 'destination', left: 52.0, top: 52.0 },
  { name: 'Egypt', type: 'destination', left: 55.6, top: 52.0 },
  { name: 'Lebanon', type: 'destination', left: 57.1, top: 48.1 },
  { name: 'Syria', type: 'destination', left: 57.8, top: 47.4 },
  { name: 'Saudi Arabia', type: 'destination', left: 59.7, top: 53.6 },
  { name: 'Pakistan', type: 'destination', left: 66.3, top: 50.3 },
  { name: 'India', type: 'destination', left: 68.8, top: 55.1 },
  { name: 'Nepal', type: 'destination', left: 70.5, top: 51.4 },
  { name: 'Sri Lanka', type: 'destination', left: 69.6, top: 61.9 },
  { name: 'Bangladesh', type: 'destination', left: 72.1, top: 53.6 },
  { name: 'China', type: 'destination', left: 75.7, top: 48.0 },
  { name: 'Thailand', type: 'destination', left: 75.1, top: 58.2 },
  { name: 'Vietnam', type: 'destination', left: 76.9, top: 57.7 },
  { name: 'Malaysia', type: 'destination', left: 75.4, top: 63.9 },
  { name: 'Philippines', type: 'destination', left: 80.9, top: 59.2 },
  { name: 'Indonesia', type: 'destination', left: 79.8, top: 66.6 },
];

const COLORS = { trading: '#8A1538', origination: '#d9a441', destination: '#0B3C5D' };

// Trade-flow paths in the 1264x732 SVG space (left*12.64, top*7.32)
const DOHA = [812.8, 409.9];
const flowDefs = [
  { from: [280.6, 290.6], to: DOHA, color: '#d9a441', dur: 6.5 },   // Canada -> Doha
  { from: [739.4, 312.6], to: DOHA, color: '#d9a441', dur: 4.6 },   // Ukraine -> Doha
  { from: [463.9, 536.6], to: DOHA, color: '#d9a441', dur: 7.0 },   // Brazil -> Doha
  { from: [1102.2, 565.8], to: DOHA, color: '#d9a441', dur: 7.5 },  // Australia -> Doha
  { from: DOHA, to: [747.0, 357.9], color: '#0B3C5D', dur: 3.8 },   // Doha -> Türkiye
  { from: DOHA, to: [742.0, 394.5], color: '#0B3C5D', dur: 4.2 },   // Doha -> Egypt
  { from: DOHA, to: [902.5, 398.9], color: '#0B3C5D', dur: 4.4 },   // Doha -> India
  { from: DOHA, to: [1007.4, 506.5], color: '#0B3C5D', dur: 5.6 },  // Doha -> Indonesia
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

const Marker = ({ name, type, left, top, hq, active }) => {
  const color = COLORS[type];
  const dot = hq ? 14 : 10;
  const ring = hq ? 26 : 18;
  const showLabel = hq || active;
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: `${left}%`, top: `${top}%`, zIndex: hq ? 20 : active ? 15 : 10 }}
      data-testid={`office-marker-${name.toLowerCase().replace(/[^a-z]/g, '')}`}
    >
      {/* pulsing ring — only the currently active marker blinks */}
      {active && !hq && (
        <motion.span
          className="absolute rounded-full"
          style={{ width: ring, height: ring, left: -ring / 2, top: -ring / 2, background: color }}
          initial={{ scale: 1, opacity: 0.55 }}
          animate={{ scale: [1, 2.6], opacity: [0.55, 0] }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
      )}
      {hq && (
        <motion.span
          className="absolute rounded-full"
          style={{ width: ring, height: ring, left: -ring / 2, top: -ring / 2, background: color }}
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: [1, 2.6, 2.6], opacity: [0.5, 0, 0] }}
          transition={{ duration: 4.2, times: [0, 0.45, 1], repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      {/* solid dot */}
      <span
        className="relative block rounded-full ring-2 ring-white shadow-md"
        style={{ width: dot, height: dot, left: -dot / 2, top: -dot / 2, background: color }}
      />
      {/* label: HQ always, active marker while blinking, or on hover */}
      <span
        className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-bold text-white transition-opacity duration-200 pointer-events-none ${showLabel ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        style={{ background: color, top: hq ? 10 : -22 }}
      >
        {name}
      </span>
    </div>
  );
};

export const AnimatedOfficeMap = ({ showDestinations = false, fill = false, legendInside = false, showFlows = false, title = 'Global Presence' }) => {
  const markers = showDestinations ? [...offices, ...destinationMarkers] : offices;
  const nonHq = markers.map((m, i) => i).filter((i) => !markers[i].hq);
  const [activeStep, setActiveStep] = React.useState(0);
  React.useEffect(() => {
    if (nonHq.length === 0) return undefined;
    const id = setInterval(() => setActiveStep((s) => (s + 1) % nonHq.length), 1600);
    return () => clearInterval(id);
  }, [nonHq.length]);
  const activeMarkerIndex = nonHq[activeStep];
  const legendColor = legendInside ? '#e5e7eb' : '#374151';
  const legend = (
    <>
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: legendColor }}>
        <span className="w-2.5 h-2.5 rounded-full ring-1 ring-white/40" style={{ background: COLORS.trading }} /> Trading Office
      </span>
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: legendColor }}>
        <span className="w-2.5 h-2.5 rounded-full ring-1 ring-white/40" style={{ background: COLORS.origination }} /> Origination
      </span>
      {showDestinations && (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: legendColor }}>
          <span className="w-2.5 h-2.5 rounded-full ring-1 ring-white/40" style={{ background: COLORS.destination }} /> Destination Market
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
        style={{ borderColor: '#e5e7eb', background: '#5b6570', ...(fill ? { minHeight: '360px' } : { aspectRatio: '1264 / 666' }) }}
      >
        <img
          src={MAP_URL}
          alt="World map of Peninsula Agritrade offices"
          className={`absolute inset-0 w-full h-full ${fill ? 'object-fill' : 'object-contain'}`}
          style={{ opacity: 1 }}
        />
        {showFlows && <TradeFlows />}
        {markers.map((o, i) => (
          <Marker key={o.name} {...o} active={i === activeMarkerIndex} />
        ))}
        {legendInside && (
          <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-4">
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
