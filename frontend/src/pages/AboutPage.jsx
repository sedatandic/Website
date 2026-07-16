import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Shield, Award, Handshake, Globe, TrendingUp, Users, Briefcase, Building2, Ship, MapPin, Package } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/FadeIn';
import { AnimatedOfficeMap } from '../components/AnimatedOfficeMap';
import { getPartners, getMemberships } from '../lib/api';
import { useEffect, useState } from 'react';

const tabs = [
  { id: 'who-we-are', label: 'Who We Are' },
  { id: 'strengths', label: 'Strengths' },
  { id: 'key-facts', label: 'Key Facts' },
  { id: 'global-presence', label: 'Global Presence' },
  { id: 'memberships', label: 'Memberships' },
];

const heroImages = {
  'who-we-are': 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1260',
  'strengths': 'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&w=1260',
  'key-facts': 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=1260',
  'global-presence': 'https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&w=1260',
  'memberships': 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=1260',
};

const tradingOffices = [
  { city: 'Doha', country: 'Qatar', tag: 'Headquarters', desc: 'Central trading, risk-management and trade-finance hub, leveraging Qatar\u2019s strategic location and world-class infrastructure.' },
  { city: 'Geneva', country: 'Switzerland', tag: 'Trading Office', desc: 'European trading desk with access to global structured commodity and trade finance.' },
  { city: 'Istanbul', country: 'T\u00fcrkiye', tag: 'Trading Office', desc: 'Black Sea origination and regional trading gateway for grains and oilseeds.' },
  { city: 'Dubai', country: 'United Arab Emirates', tag: 'Trading Office', desc: 'Middle East distribution, logistics coordination and regional customer service.' },
  { city: 'Singapore', country: '', tag: 'Trading Office', desc: 'Asia-Pacific trading and distribution hub serving South & Southeast Asian markets.' },
];

const originRegions = [
  { region: 'Black Sea', places: 'Ukraine \u00b7 Russia', commodities: 'Wheat, barley, corn, sunflower meal & oil' },
  { region: 'Central Asia', places: 'Kazakhstan', commodities: 'Milling wheat, pulses' },
  { region: 'Americas', places: 'Canada \u00b7 USA \u00b7 Brazil', commodities: 'Pulses, wheat, oilseeds, corn, soybean, sugar' },
  { region: 'Africa', places: 'East & West Africa', commodities: 'Sesame, pulses, cashew' },
  { region: 'Oceania', places: 'Australia', commodities: 'Wheat, barley, pulses' },
  { region: 'Europe', places: 'EU origins', commodities: 'Feed grains, wheat, barley' },
];

const destinationRegions = [
  { region: 'Middle East & Levant', markets: 'Qatar, UAE, Lebanon, Syria, Türkiye' },
  { region: 'North Africa', markets: 'Egypt, Tunisia, Algeria, Libya' },
  { region: 'South Asia', markets: 'India, Pakistan, Nepal, Bangladesh, Sri Lanka' },
  { region: 'Southeast Asia', markets: 'Indonesia, Vietnam, Malaysia, Philippines' },
];

const commoditiesList = ['Wheat', 'Barley', 'Corn', 'Feed ingredients', 'Oilseeds', 'Pulses', 'Rice', 'Sugar', 'Coffee'];

const keyFacts = [
  { value: '25+', label: 'Different', sub: 'COMMODITIES TRADED', icon: TrendingUp },
  { value: '200+', label: 'Vessels', sub: 'CHARTERED ANNUALLY', icon: Ship },
  { value: '$250M+', label: 'Worth of', sub: 'ANNUAL TURNOVER', icon: Briefcase },
  { value: '600K+', label: 'MTS', sub: 'ANNUAL TRADE VOLUME', icon: Globe },
  { value: '25+', label: 'Different', sub: 'COUNTRIES SERVED', icon: MapPin },
  { value: '7 Offices', label: 'Staff in', sub: '6 DIFFERENT COUNTRIES', icon: Building2 },
];

const sideImages = {
  'who-we-are': 'https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000',
  'strengths': 'https://images.unsplash.com/photo-1529511582893-2d7e684dd128?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000',
  'key-facts': 'https://images.unsplash.com/photo-1670121180530-cfcba4438038?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000',
  'global-presence': 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000',
  'memberships': 'https://images.unsplash.com/photo-1733195296321-b99d129b09cd?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000',
};

function GlobalPresence() {
  return (
    <FadeIn>
      <h2 className="text-2xl font-semibold mb-3" style={{ color: '#1f2937' }}>Global Presence</h2>
      <div className="grid lg:grid-cols-5 gap-8 items-start mb-12">
        <div className="lg:col-span-3">
          <AnimatedOfficeMap showDestinations legendInside showFlows title="Office & Trade-Flow Map" />
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-xs font-bold uppercase mb-3 invisible select-none" aria-hidden="true" style={{ letterSpacing: '0.1em' }}>Office & Trade-Flow Map</h3>
          <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: '#4b5563' }}>
            <p>Peninsula Agritrade operates from its Doha headquarters as a fully integrated physical trading platform, extending far beyond simple origin-to-destination execution. It builds structured supply chains that link reliable producers, competitive export hubs, and high-demand destination markets through a coordinated network of trading offices, origination desks, and logistics partners across the Black Sea, Europe, the Americas, Africa, the Middle East, and Asia.</p>
            <p>The company's regional presence enables continuous market intelligence, disciplined risk management, and real-time operational control. Origination teams maintain direct relationships with farmers, cooperatives, processors, and exporters, ensuring consistent quality and dependable volume. Destination desks work closely with millers, crushers, food manufacturers, and government buyers to match specifications, manage timelines, and secure long-term supply programs.</p>
          </div>
        </div>
      </div>

      {/* Network directory: each group in its own frame, in one row with Commodities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 items-stretch">
        {[
          { label: 'Trading Offices', color: '#8A1538', items: ['Doha (HQ)', 'Geneva', 'Istanbul', 'Dubai', 'Singapore'] },
          { label: 'Origination', color: '#d9a441', items: ['Canada', 'Brazil', 'Ukraine', 'Russia', 'Kazakhstan', 'Australia'] },
          { label: 'Destination Markets', color: '#0B3C5D', items: ['Türkiye', 'Tunisia', 'Algeria', 'Lebanon', 'Syria', 'Pakistan', 'Libya', 'Malaysia', 'Sri Lanka', 'Philippines', 'Egypt', 'India', 'Nepal', 'Bangladesh', 'Vietnam', 'Indonesia'] },
        ].map((g) => (
          <div key={g.label} className="rounded-xl border p-5" style={{ borderColor: '#e5e7eb', background: '#fff' }} data-testid={`map-legend-${g.label.toLowerCase().replace(/[^a-z]/g, '')}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: g.color }} />
              <span className="text-sm font-bold uppercase" style={{ color: '#1f2937', letterSpacing: '0.06em' }}>{g.label}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <span key={it} className="px-2.5 py-1 rounded-md text-xs font-medium" style={{ background: 'rgba(0,0,0,0.04)', color: '#4b5563' }}>{it}</span>
              ))}
            </div>
          </div>
        ))}
        <div className="rounded-xl border p-5" style={{ borderColor: '#e5e7eb', background: '#fff' }} data-testid="commodities-frame">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-5 h-5" style={{ color: '#8A1538' }} />
            <span className="text-sm font-bold uppercase" style={{ color: '#1f2937', letterSpacing: '0.06em' }}>Commodities We Trade</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {commoditiesList.map((c) => (
              <span key={c} className="px-2.5 py-1 rounded-md text-xs font-medium" style={{ background: 'rgba(0,0,0,0.04)', color: '#4b5563' }} data-testid={`commodity-pill-${c.toLowerCase().replace(/[^a-z]/g, '')}`}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Trading Offices */}
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5" style={{ color: '#8A1538' }} />
        <h3 className="text-lg font-semibold" style={{ color: '#1f2937' }}>Trading Offices</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {tradingOffices.map((o) => (
          <Card key={o.city} className="border h-full" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }} data-testid={`office-card-${o.city.toLowerCase()}`}>
            <CardContent className="p-5">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="font-semibold" style={{ color: '#1f2937' }}>{o.city}</span>
                {o.country && <span className="text-xs" style={{ color: '#9ca3af' }}>· {o.country}</span>}
              </div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-2.5" style={{ background: o.tag === 'Headquarters' ? '#8A1538' : 'rgba(138,21,56,0.08)', color: o.tag === 'Headquarters' ? '#fff' : '#8A1538' }}>{o.tag}</span>
              <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{o.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Origins */}
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5" style={{ color: '#d9a441' }} />
        <h3 className="text-lg font-semibold" style={{ color: '#1f2937' }}>Origins &amp; Sourcing</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {originRegions.map((o) => (
          <Card key={o.region} className="border h-full" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }} data-testid={`origin-card-${o.region.toLowerCase().replace(/[^a-z]/g, '')}`}>
            <CardContent className="p-5">
              <div className="font-semibold mb-0.5" style={{ color: '#1f2937' }}>{o.region}</div>
              <div className="text-xs mb-2.5" style={{ color: '#d9a441', fontWeight: 600 }}>{o.places}</div>
              <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{o.commodities}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Destinations */}
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5" style={{ color: '#0B3C5D' }} />
        <h3 className="text-lg font-semibold" style={{ color: '#1f2937' }}>Destination Markets</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {destinationRegions.map((d) => (
          <Card key={d.region} className="border h-full" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }} data-testid={`destination-card-${d.region.toLowerCase().replace(/[^a-z]/g, '')}`}>
            <CardContent className="p-5">
              <div className="font-semibold mb-1.5" style={{ color: '#1f2937' }}>{d.region}</div>
              <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{d.markets}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </FadeIn>
  );
}

export default function AboutPage() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const activeTab = tab || 'who-we-are';
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    if (activeTab === 'memberships') {
      getMemberships().then(res => setMemberships(res.data)).catch(() => {});
    }
  }, [activeTab]);

  const currentTitle = tabs.find(t => t.id === activeTab)?.label || 'About';

  return (
    <div>
      {/* Hero */}
      <section className="relative" style={{ height: '140px' }}>
        <img src={heroImages[activeTab] || heroImages['who-we-are']} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.55))' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">{currentTitle}</h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b" style={{ borderColor: '#e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs" style={{ color: '#6b7280' }}>
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span>About Us</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">{currentTitle}</span>
          </nav>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b" style={{ borderColor: '#e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => navigate(`/about/${t.id}`)}
                className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === t.id
                    ? 'border-[#8A1538] text-[#8A1538]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
                data-testid={`about-tab-${t.id}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 lg:py-16" style={{ background: 'var(--ga-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'global-presence' && (
            <GlobalPresence />
          )}

          {activeTab !== 'global-presence' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-stretch">
            {/* Left - content */}
            <div className="lg:col-span-3">

          {activeTab === 'who-we-are' && (
            <FadeIn>
              <h2 className="text-2xl font-semibold mb-6" style={{ color: '#1f2937' }}>Who We Are</h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: '#4b5563' }}>
                <p>Peninsula Agritrade LLC is Qatar's first international agribusiness and a fully integrated agri-supply chain manager. We connect reliable origins with demanding destination markets through disciplined risk management, robust logistics, and transparent communication.</p>
                <p>Our hub in Qatar leverages the country's strategic geographic location, world-class infrastructure, competitive corporate tax environment, and strong trade-finance ecosystem — enabling efficient, secure, and scalable commodity trading operations.</p>
                <p>Our management team brings over 25 years of combined international trading experience across Europe, the Middle East, Asia, and Africa. We operate with deep physical trading expertise, serving producers, exporters, and industrial buyers with end-to-end execution and market intelligence.</p>
                <p>We trade grains, feed ingredients, oilseeds, pulses, rice, sugar, and coffee — across both bulk and containerized shipments.</p>
                <p>Peninsula Agritrade's core strength lies in strong origination and sourcing capabilities across the Black Sea region, Europe, and the Americas, with a focused export footprint into the Middle East, Asia, and Africa. Our mission aligns with Qatar's Food Security Vision 2030, supporting resilient supply chains and reliable access to essential agricultural commodities.</p>
              </div>
            </FadeIn>
          )}

          {activeTab === 'strengths' && (
            <FadeIn>
              <h2 className="text-2xl font-semibold mb-6" style={{ color: '#1f2937' }}>Strengths</h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: '#4b5563' }}>
                <p>The combined in-depth and broad trading experience coupled with strong, reliable and trusting relationships fostered over the years with the suppliers and buyers globally are the main strengths of the company.</p>
                <p>Since we have started our operations, we have developed more supplier and customer base providing better diversity and further enhance our strengths.</p>
                <p>Our familiarity and expertise in the global agri-commodity markets with a specific focus in Middle East, South Asia and Southeast-Asian countries as the main destinations is one of our core advantage.</p>
                <p>The strong origination and sourcing capabilities in Black Sea region, East & West Africa and South America is another key strength of the company.</p>
                <p>The valuable experience together with strong knowledge of logistics & execution and trade financing of soft-commodities enables Peninsula Agritrade LLC to act with timely execution, performing without market movements and stick to its contractual obligations — these norms are only some of the solid fundamentals of the company.</p>
              </div>
            </FadeIn>
          )}

          {activeTab === 'key-facts' && (
            <FadeIn>
              <h2 className="text-2xl font-semibold mb-8" style={{ color: '#1f2937' }}>Key Facts</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {keyFacts.map((fact, i) => {
                  const Icon = fact.icon;
                  return (
                    <Card key={fact.sub} className="border text-center" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}>
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(230, 126, 34, 0.1)' }}>
                          <Icon className="w-5 h-5" style={{ color: '#8A1538' }} />
                        </div>
                        <div className="text-lg font-bold" style={{ color: '#1f2937' }}>{fact.value}</div>
                        {fact.label && <div className="text-sm" style={{ color: '#6b7280' }}>{fact.label}</div>}
                        <div className="text-xs font-semibold mt-1 tracking-wider" style={{ color: '#8A1538' }}>{fact.sub}</div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </FadeIn>
          )}

          {activeTab === 'memberships' && (
            <FadeIn>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1f2937' }}>Memberships</h2>
              <p className="text-sm sm:text-base leading-relaxed mb-8" style={{ color: '#4b5563' }}>
                We are proud members of several prestigious international trade associations, strengthening our professional standards, market intelligence, and the quality of service we provide to all counterparties.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {memberships.map((m) => (
                  <Card key={m.id} className="border text-center h-full" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}>
                    <CardContent className="p-6 h-full flex flex-col items-center justify-center" style={{ minHeight: '190px' }}>
                      {m.logo ? (
                        <img src={m.logo} alt={m.name} className={`w-full max-w-full object-contain px-2 ${m.name.includes('American Chamber') ? 'max-h-40 scale-125' : 'max-h-40'}`} data-testid={`membership-logo-${m.name}`} />
                      ) : (
                        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(11, 60, 93, 0.08)' }}>
                          <Award className="w-6 h-6" style={{ color: 'var(--ga-navy)' }} />
                        </div>
                      )}
                      {!m.logo && (
                        <>
                          <div className="font-bold text-base" style={{ color: '#1f2937' }}>{m.name}</div>
                          <div className="text-xs mt-1" style={{ color: '#6b7280' }}>{m.full_name}</div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeIn>
          )}

            </div>

            {/* Right - related imagery */}
            <FadeIn delay={0.15} className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden shadow-sm border w-full relative" style={{ borderColor: '#e5e7eb', height: 'calc(100% - 3.5rem)', marginTop: '3.5rem', minHeight: '260px' }}>
                <img src={sideImages[activeTab] || sideImages['who-we-are']} alt="Doha, Qatar" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </FadeIn>
          </div>
          )}
        </div>
      </section>
    </div>
  );
}
