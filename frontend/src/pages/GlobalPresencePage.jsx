import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import PageHero from '../components/PageHero';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/FadeIn';

const offices = [
  {
    city: 'Geneva',
    country: 'Switzerland',
    region: 'European Headquarters',
    desc: 'Our main trading desk and European operations hub. Covers grain, oilseed, and sugar trading for European and Mediterranean markets.',
    lat: 46.2,
    lng: 6.15
  },
  {
    city: 'Dubai',
    country: 'UAE',
    region: 'Middle East & Africa Hub',
    desc: 'Regional operations center covering logistics, chartering, and trade execution for MENA and East African markets.',
    lat: 25.2,
    lng: 55.27
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    region: 'Asia-Pacific Hub',
    desc: 'Covering trading and risk management for Asian markets including rice, oilseeds, and feed ingredients.',
    lat: 1.35,
    lng: 103.82
  },
  {
    city: 'Nairobi',
    country: 'Kenya',
    region: 'East Africa Office',
    desc: 'Business development and market coverage for East African grain, pulse, and oilseed markets.',
    lat: -1.29,
    lng: 36.82
  },
  {
    city: 'Sao Paulo',
    country: 'Brazil',
    region: 'South America Origination',
    desc: 'Origination office for soybeans, corn, sugar, and coffee from Brazilian producers.',
    lat: -23.55,
    lng: -46.63
  },
  {
    city: 'Kyiv',
    country: 'Ukraine',
    region: 'Black Sea Origination',
    desc: 'Origination office for Black Sea grains, sunflower products, and corn exports.',
    lat: 50.45,
    lng: 30.52
  },
];

const regions = [
  { name: 'Europe', markets: 'Grain milling, feed production, oilseed crushing' },
  { name: 'Middle East & North Africa', markets: 'Wheat imports, rice, sugar distribution' },
  { name: 'Sub-Saharan Africa', markets: 'Grain imports, pulse distribution, rice' },
  { name: 'Asia-Pacific', markets: 'Oilseeds, feed ingredients, rice, coffee' },
  { name: 'Americas', markets: 'Origination of soybeans, corn, sugar, coffee' },
  { name: 'Black Sea & CIS', markets: 'Origination of wheat, corn, sunflower products' },
];

export default function GlobalPresencePage() {
  return (
    <div>
      <PageHero
        title="Global Presence"
        subtitle="From origin to destination, we are on the ground. Our network spans key origination and destination markets across six continents."
        breadcrumbs={[{ label: 'Global Presence' }]}
      />

      {/* Map Section - Using simple visual instead of react-simple-maps for reliability */}
      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: 'var(--ga-navy)' }}>
                Our Global Network
              </h2>
              <p className="mt-3 text-sm sm:text-base" style={{ color: 'var(--ga-muted)' }}>
                Strategic positions in key origination and destination markets
              </p>
            </div>
          </FadeIn>

          {/* World Map SVG */}
          <FadeIn>
            <div className="relative w-full rounded-2xl border overflow-hidden p-8" style={{ background: 'var(--ga-surface-2)', borderColor: 'var(--ga-border)' }}>
              <svg viewBox="0 0 1000 500" className="w-full h-auto" style={{ minHeight: '300px' }}>
                {/* Simplified world map outline */}
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Simplified continents */}
                {/* North America */}
                <path d="M 120 80 Q 140 60, 200 70 Q 260 60, 280 90 Q 300 110, 280 140 Q 260 160, 250 180 Q 240 200, 220 220 Q 200 240, 180 230 Q 160 220, 140 200 Q 120 180, 110 150 Q 100 120, 120 80 Z" fill="#e1e7ef" stroke="#cfd7e3" strokeWidth="1" />
                {/* South America */}
                <path d="M 230 260 Q 250 250, 270 270 Q 290 300, 280 340 Q 270 380, 260 400 Q 250 420, 240 410 Q 220 390, 210 360 Q 200 330, 210 300 Q 215 280, 230 260 Z" fill="#e1e7ef" stroke="#cfd7e3" strokeWidth="1" />
                {/* Europe */}
                <path d="M 440 60 Q 460 50, 500 55 Q 540 60, 550 80 Q 560 100, 540 120 Q 520 140, 500 130 Q 480 120, 460 110 Q 440 100, 430 80 Q 425 70, 440 60 Z" fill="#e1e7ef" stroke="#cfd7e3" strokeWidth="1" />
                {/* Africa */}
                <path d="M 460 160 Q 480 150, 520 155 Q 560 160, 570 190 Q 580 220, 570 260 Q 560 300, 540 330 Q 520 350, 510 340 Q 490 320, 480 290 Q 470 260, 460 230 Q 450 200, 455 170 Q 458 165, 460 160 Z" fill="#e1e7ef" stroke="#cfd7e3" strokeWidth="1" />
                {/* Asia */}
                <path d="M 560 50 Q 600 40, 660 50 Q 720 60, 780 70 Q 820 80, 840 100 Q 860 120, 840 150 Q 820 170, 780 180 Q 740 190, 700 180 Q 660 170, 620 160 Q 580 150, 560 130 Q 540 110, 550 80 Q 555 60, 560 50 Z" fill="#e1e7ef" stroke="#cfd7e3" strokeWidth="1" />
                {/* Australia */}
                <path d="M 780 290 Q 810 280, 850 290 Q 880 300, 870 330 Q 860 350, 830 360 Q 800 365, 780 350 Q 770 330, 775 310 Q 778 295, 780 290 Z" fill="#e1e7ef" stroke="#cfd7e3" strokeWidth="1" />

                {/* Hub dots */}
                {[
                  { x: 493, y: 102, label: 'Geneva' },
                  { x: 580, y: 170, label: 'Dubai' },
                  { x: 730, y: 150, label: 'Singapore' },
                  { x: 540, y: 250, label: 'Nairobi' },
                  { x: 250, y: 300, label: 'Sao Paulo' },
                  { x: 525, y: 95, label: 'Kyiv' },
                ].map((hub) => (
                  <g key={hub.label} filter="url(#glow)">
                    <circle cx={hub.x} cy={hub.y} r="10" fill="rgba(217,164,65,0.2)" />
                    <circle cx={hub.x} cy={hub.y} r="5" fill="#d9a441" />
                    <text x={hub.x} y={hub.y - 14} textAnchor="middle" fill="#0b3c5d" fontSize="11" fontWeight="600" fontFamily="IBM Plex Sans">
                      {hub.label}
                    </text>
                  </g>
                ))}

                {/* Connection lines */}
                {[
                  [493, 102, 580, 170],
                  [580, 170, 730, 150],
                  [580, 170, 540, 250],
                  [493, 102, 525, 95],
                  [493, 102, 250, 300],
                ].map(([x1, y1, x2, y2], i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(217,164,65,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                ))}
              </svg>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Offices */}
      <section className="ga-section" style={{ background: 'var(--ga-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-10" style={{ color: 'var(--ga-navy)' }}>
              Our Offices & Hubs
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office) => (
              <FadeInItem key={office.city}>
                <Card className="border h-full" style={{ borderColor: 'var(--ga-border)', borderRadius: 'var(--ga-radius-md)' }}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(217,164,65,0.15)' }}>
                        <MapPin className="w-4 h-4" style={{ color: 'var(--ga-gold)' }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base" style={{ color: 'var(--ga-navy)' }}>{office.city}, {office.country}</h3>
                        <span className="text-xs font-medium" style={{ color: 'var(--ga-gold-2)' }}>{office.region}</span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--ga-muted)' }}>{office.desc}</p>
                  </CardContent>
                </Card>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Regions */}
      <section className="ga-section" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="h-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-10" style={{ color: 'var(--ga-navy)' }}>
              Markets We Serve
            </h2>
          </FadeIn>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regions.map((r) => (
              <FadeInItem key={r.name}>
                <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--ga-border)', background: 'var(--ga-surface)' }}>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--ga-navy)' }}>{r.name}</h3>
                  <p className="text-xs" style={{ color: 'var(--ga-muted)' }}>{r.markets}</p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'var(--ga-navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="h-serif text-2xl sm:text-3xl font-semibold text-white">Looking for a local partner?</h2>
            <p className="mt-3 text-white/70 max-w-xl mx-auto">Reach out to our nearest office to discuss your commodity requirements.</p>
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full px-8" style={{ background: 'var(--ga-gold)', color: 'var(--ga-text)' }}>
                <Link to="/contact">Contact Us <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
