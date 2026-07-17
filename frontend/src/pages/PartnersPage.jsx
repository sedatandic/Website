import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Landmark, Anchor, Building2, ClipboardCheck, Container, Banknote } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';

// Each partner supports an optional `logo` image URL. When present the image is
// shown; otherwise a styled wordmark tile is rendered. Replace `logo` with your
// licensed official logo files to display real logos.
const rows = [
  [
    { name: 'QNB', icon: Banknote },
    { name: 'Dukhan Bank', icon: Banknote },
    { name: 'Doha Bank', icon: Banknote },
    { name: 'CQUR Bank', icon: Banknote },
    { name: 'Commercial Bank', sub: 'Qatar', icon: Banknote },
  ],
  [
    { name: 'Qatar Development Bank', icon: Landmark },
    { name: 'Qatar Financial Centre', icon: Landmark },
    { name: 'SGS', sub: 'Inspection', icon: ClipboardCheck },
    { name: 'Cotecna', sub: 'Inspection', icon: ClipboardCheck },
    { name: 'Control Union', sub: 'Inspection', icon: ClipboardCheck },
  ],
  [
    { name: 'General Survey', sub: 'Inspection', icon: ClipboardCheck },
    { name: 'Qatar Chamber', icon: Building2 },
    { name: 'Hamad Port', icon: Anchor },
    { name: 'QTerminals', icon: Container },
    { name: 'Ministry of Commerce', sub: 'Qatar', icon: Landmark },
  ],
];

const LogoTile = ({ p }) => {
  const Icon = p.icon;
  return (
    <div
      className="shrink-0 mx-3 w-48 h-24 rounded-xl border bg-white flex items-center justify-center text-center px-4 transition-shadow hover:shadow-md"
      style={{ borderColor: '#e5e7eb' }}
      data-testid={`partner-logo-${p.name.toLowerCase().replace(/[^a-z]/g, '')}`}
    >
      {p.logo ? (
        <img src={p.logo} alt={p.name} className="max-h-14 max-w-[85%] object-contain" />
      ) : (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(138, 21, 56, 0.08)' }}>
            <Icon className="w-5 h-5" style={{ color: '#8A1538' }} strokeWidth={1.7} />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm font-bold" style={{ color: '#1f2937' }}>{p.name}</span>
            {p.sub && <span className="text-[10px] uppercase tracking-wider" style={{ color: '#9ca3af' }}>{p.sub}</span>}
          </div>
        </div>
      )}
    </div>
  );
};

const MarqueeRow = ({ items, direction, duration }) => (
  <div className="overflow-hidden py-1.5" data-testid={`partners-marquee-${direction}`}>
    <div className="flex w-max" style={{ animation: `pa-marquee-${direction} ${duration}s linear infinite` }}>
      {[...items, ...items].map((p, i) => <LogoTile key={i} p={p} />)}
    </div>
  </div>
);

export default function PartnersPage() {
  return (
    <div>
      <style>{`
        @keyframes pa-marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes pa-marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>

      {/* Hero */}
      <section className="relative" style={{ height: '140px' }}>
        <img
          src="https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1260"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.55))' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">Our Partners</h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b" style={{ borderColor: '#e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs" style={{ color: '#6b7280' }}>
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Our Partners</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 lg:py-16" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro text */}
          <FadeIn>
            <h2 className="text-2xl font-semibold mb-5" style={{ color: '#1f2937' }}>Our Partners</h2>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed max-w-4xl mb-12" style={{ color: '#4b5563' }}>
              <p>Peninsula Agritrade LLC is a reliable partner in the international agri-commodity arena. Our team brings extensive expertise across physical trading, trade finance, shipping, and execution — ensuring tailored, professional service for every counterparty.</p>
              <p>We work closely with government institutions, port and customs authorities, business chambers, independent surveyors, ship owners, shipping lines, cargo insurers, and trade-finance partners, delivering seamless coordination across the entire supply chain.</p>
            </div>
          </FadeIn>

          {/* Moving logo wall */}
          <FadeIn delay={0.1}>
            <div className="space-y-2" data-testid="partners-logo-wall">
              <MarqueeRow items={rows[0]} direction="left" duration={38} />
              <MarqueeRow items={rows[1]} direction="right" duration={44} />
              <MarqueeRow items={rows[2]} direction="left" duration={50} />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
