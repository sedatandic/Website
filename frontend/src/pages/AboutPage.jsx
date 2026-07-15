import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Shield, Award, Handshake, Globe, TrendingUp, Users, Briefcase, Building2, Ship, MapPin } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { FadeIn, FadeInStagger, FadeInItem } from '../components/FadeIn';
import { getPartners, getMemberships } from '../lib/api';
import { useEffect, useState } from 'react';

const tabs = [
  { id: 'who-we-are', label: 'Who We Are' },
  { id: 'strengths', label: 'Strengths' },
  { id: 'key-facts', label: 'Key Facts' },
  { id: 'memberships', label: 'Memberships' },
];

const heroImages = {
  'who-we-are': 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=1260',
  'strengths': 'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&w=1260',
  'key-facts': 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=1260',
  'memberships': 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=1260',
};

const keyFacts = [
  { value: '25+', label: 'Different', sub: 'COMMODITIES TRADED', icon: TrendingUp },
  { value: '200+', label: 'Vessels', sub: 'CHARTERED ANNUALLY', icon: Ship },
  { value: '$250M+', label: 'Worth of', sub: 'ANNUAL TURNOVER', icon: Briefcase },
  { value: '500K+', label: 'MTS', sub: 'ANNUAL TRADE VOLUME', icon: Globe },
  { value: '25+', label: 'Different', sub: 'COUNTRIES SERVED', icon: MapPin },
  { value: '7 Offices', label: 'Staff in', sub: '6 DIFFERENT COUNTRIES', icon: Building2 },
];

const sideImages = {
  'who-we-are': 'https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000',
  'strengths': 'https://images.unsplash.com/photo-1529511582893-2d7e684dd128?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000',
  'key-facts': 'https://images.unsplash.com/photo-1670121180530-cfcba4438038?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000',
  'memberships': 'https://images.unsplash.com/photo-1613690399151-65ea69478674?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000',
};

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
      <section className="relative" style={{ height: '280px' }}>
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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-stretch">
            {/* Left - content */}
            <div className="lg:col-span-3">

          {activeTab === 'who-we-are' && (
            <FadeIn>
              <h2 className="text-2xl font-semibold mb-6" style={{ color: '#1f2937' }}>Who We Are</h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: '#4b5563' }}>
                <p>Peninsula Agritrade LLC is Qatar's first international agribusiness and a fully integrated agri-supply chain manager. We connect reliable origins with demanding destination markets through disciplined risk management, robust logistics, and transparent communication.</p>
                <p>Our hub in Qatar leverages the country's strategic geographic location, world-class infrastructure, competitive corporate tax environment, and strong trade-finance ecosystem — enabling efficient, secure, and scalable commodity trading operations.</p>
                <p>Our management team brings over 20 years of combined international trading experience across Europe, the Middle East, Asia, and Africa. We operate with deep physical trading expertise, serving producers, exporters, and industrial buyers with end-to-end execution and market intelligence.</p>
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
                    <Card key={fact.label || fact.value} className="border text-center" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}>
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
                We are a proud member of the following prestigious associations in order to provide more professional service to our counterparties as well as our market intelligence as a result of these trade bodies memberships.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {memberships.map((m) => (
                  <Card key={m.id} className="border text-center" style={{ borderColor: '#e5e7eb', borderRadius: '12px' }}>
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(11, 60, 93, 0.08)' }}>
                        <Award className="w-6 h-6" style={{ color: 'var(--ga-navy)' }} />
                      </div>
                      <div className="font-bold text-base" style={{ color: '#1f2937' }}>{m.name}</div>
                      <div className="text-xs mt-1" style={{ color: '#6b7280' }}>{m.full_name}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeIn>
          )}

            </div>

            {/* Right - related imagery */}
            <FadeIn delay={0.15} className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden shadow-sm border w-full relative" style={{ borderColor: '#e5e7eb', height: 'calc(100% - 8px)', marginTop: '8px', minHeight: '260px' }}>
                <img src={sideImages[activeTab] || sideImages['who-we-are']} alt="Doha, Qatar" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
