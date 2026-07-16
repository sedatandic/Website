import React from 'react';
import { motion } from 'framer-motion';

const MAP_URL = 'https://static.prod-images.emergentagent.com/jobs/a46d9f4e-718c-4add-95f0-4ba36a75bba8/images/6273f377bbf4b8f698221190cf59f72041087ff4671c198a75a0ab09f673cee8.png';

// left/top are % positions tuned to the equirectangular dotted map
const offices = [
  { name: 'Doha (HQ)', type: 'trading', left: 64.3, top: 41.6, hq: true },
  { name: 'Geneva', type: 'trading', left: 51.7, top: 31.4 },
  { name: 'Istanbul', type: 'trading', left: 58.1, top: 34.2 },
  { name: 'Dubai', type: 'trading', left: 65.4, top: 41.6 },
  { name: 'Singapore', type: 'trading', left: 78.9, top: 51.1 },
  { name: 'Canada', type: 'origination', left: 22.2, top: 28.0 },
  { name: 'Ukraine', type: 'origination', left: 58.5, top: 29.0 },
  { name: 'Russia', type: 'origination', left: 60.4, top: 25.4 },
  { name: 'Kazakhstan', type: 'origination', left: 69.8, top: 28.6 },
];

const destinationMarkers = [
  { name: 'Egypt', type: 'destination', left: 58.7, top: 39.5 },
  { name: 'Saudi Arabia', type: 'destination', left: 63.0, top: 41.8 },
  { name: 'Kenya', type: 'destination', left: 60.2, top: 52.1 },
  { name: 'Nigeria', type: 'destination', left: 50.9, top: 49.1 },
  { name: 'India', type: 'destination', left: 71.4, top: 40.1 },
  { name: 'Bangladesh', type: 'destination', left: 75.1, top: 42.2 },
  { name: 'Vietnam', type: 'destination', left: 79.4, top: 43.3 },
  { name: 'Indonesia', type: 'destination', left: 79.7, top: 54.0 },
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

export const AnimatedOfficeMap = ({ showDestinations = false, fill = false, title = 'Global Presence' }) => {
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
    <div className="flex flex-col h-full" data-testid="animated-office-map">
      {title && (
        <h3 className="text-xs font-bold tracking-wider uppercase mb-3" style={{ color: '#1f2937', letterSpacing: '0.1em' }}>{title}</h3>
      )}
      <div
        className={`relative w-full rounded-xl border overflow-hidden ${fill ? 'flex-1' : 'shrink-0'}`}
        style={{ borderColor: '#e5e7eb', background: '#f4f6f8', ...(fill ? { minHeight: '340px' } : { aspectRatio: '1264 / 848' }) }}
      >
        <img
          src={MAP_URL}
          alt="World map of Peninsula Agritrade offices"
          className={`absolute inset-0 w-full h-full ${fill ? 'object-fill' : 'object-contain'}`}
          style={{ opacity: 0.85 }}
        />
        {markers.map((o, i) => (
          <Marker key={o.name} {...o} index={i} />
        ))}
        {fill && (
          <div
            className="absolute bottom-2.5 left-2.5 flex flex-wrap items-center gap-3 px-3 py-1.5 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', border: '1px solid #e5e7eb' }}
          >
            {legend}
          </div>
        )}
      </div>
      {!fill && (
        <div className="flex flex-wrap items-center gap-4 mt-2">{legend}</div>
      )}
    </div>
  );
};

export default AnimatedOfficeMap;
