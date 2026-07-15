import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Landmark, Anchor, Building2, ClipboardCheck, Ship, Container, ShieldCheck, Banknote } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/FadeIn';
import { getPartners } from '../lib/api';

const partnerCategories = [
  { name: 'Government Institutions', icon: Landmark },
  { name: 'Port & Customs Authorities', icon: Anchor },
  { name: 'Business Chambers', icon: Building2 },
  { name: 'Independent Surveyors', icon: ClipboardCheck },
  { name: 'Ship Owners', icon: Ship },
  { name: 'Shipping Lines', icon: Container },
  { name: 'Cargo Insurers', icon: ShieldCheck },
  { name: 'Trade Finance Partners', icon: Banknote },
];

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    getPartners().then(res => setPartners(res.data)).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative" style={{ height: '280px' }}>
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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-stretch">
            {/* Left - text */}
            <FadeIn className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-6" style={{ color: '#1f2937' }}>Our Partners</h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: '#4b5563' }}>
                <p>Peninsula Agritrade LLC is a reliable partner in the international agri-commodity arena. Our team brings extensive expertise across physical trading, trade finance, shipping, and execution — ensuring tailored, professional service for every counterparty.</p>
                <p>We work closely with government institutions, port and customs authorities, business chambers, independent surveyors, ship owners, shipping lines, cargo insurers, and trade-finance partners, delivering seamless coordination across the entire supply chain.</p>
              </div>
            </FadeIn>

            {/* Right - partner categories (4 per row) */}
            <FadeIn delay={0.15} className="lg:col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:h-full lg:grid-rows-2">
                {partnerCategories.map((c) => {
                  const Icon = c.icon;
                  return (
                    <Card key={c.name} className="border h-full bg-white transition-shadow hover:shadow-md" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }} data-testid={`partner-tile-${c.name}`}>
                      <CardContent className="p-5 h-full flex flex-col items-center justify-center text-center" style={{ minHeight: '140px' }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: 'rgba(138, 21, 56, 0.08)' }}>
                          <Icon className="w-6 h-6" style={{ color: '#8A1538' }} strokeWidth={1.6} />
                        </div>
                        <span className="text-sm font-semibold leading-tight" style={{ color: '#1f2937' }}>{c.name}</span>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
