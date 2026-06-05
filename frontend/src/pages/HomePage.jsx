import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowRight, Ship, BarChart3, Globe, Shield, Wheat, Leaf,
  Briefcase, ChevronRight, Coffee, Droplets, CandyCane,
  Download, Users, Factory, Building2, Truck, HandCoins, Sprout,
  TrendingUp, Award, Heart, Quote
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { getProfileDownloadUrl } from '../lib/api';

/* ─────── Hero Slides ─────── */
const slides = [
  {
    image: 'https://images.pexels.com/photos/36091328/pexels-photo-36091328.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    action: 'Connects',
    headline: 'Qatar to the global agricultural value chain.',
    subtext: 'A fully integrated agri-supply chain manager and global trading platform, connecting agricultural producers with consumers across the globe.',
  },
  {
    image: 'https://images.pexels.com/photos/5732561/pexels-photo-5732561.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    action: 'Sources',
    headline: 'from the world\'s key origins to demand markets.',
    subtext: 'Multi-origin sourcing across the Black Sea, Americas, Africa, and Asia, with a niche focus on structurally import-dependent markets in the Middle East, MENA, and Sub-Saharan Africa.',
  },
  {
    image: 'https://images.pexels.com/photos/1211787/pexels-photo-1211787.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    action: 'Delivers',
    headline: 'with discipline, integrity and daily execution.',
    subtext: 'Over 20 years of international trading experience across Dubai, Singapore, Geneva and Istanbul. We deliver what we promised, at the agreed price, quality and time.',
  },
  {
    image: 'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    action: 'Grows',
    headline: 'partnerships rooted in trust and long-term vision.',
    subtext: 'From grain silos in the heartlands to port terminals worldwide, we build lasting relationships that nourish communities and support food security.',
  },
];

/* ─────── Counter Stats ─────── */
const stats = [
  { value: 250, suffix: 'M+', prefix: '$', label: 'Annual Turnover', icon: BarChart3 },
  { value: 500, suffix: 'K+', prefix: '', label: 'MTS Annual Volume', icon: Ship },
  { value: 25, suffix: '+', prefix: '', label: 'Countries Served', icon: Globe },
  { value: 25, suffix: '+', prefix: '', label: 'Commodities Traded', icon: Wheat },
];

function AnimatedCounter({ value, suffix, prefix, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const stepTime = Math.max(Math.floor((duration * 1000) / end), 16);
    const increment = Math.ceil(end / (duration * 1000 / stepTime));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); } else { setCount(start); }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ─────── Commodities ─────── */
const commodities = [
  { name: 'GRAINS & FEEDS', slug: 'grains-feeds', icon: Wheat, image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'OILSEEDS', slug: 'oilseeds', icon: Droplets, image: 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'PULSES & BEANS', slug: 'pulses-beans', icon: Leaf, image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'SUGAR & RICE', slug: 'sugar-rice', icon: CandyCane, image: 'https://images.pexels.com/photos/2523650/pexels-photo-2523650.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'COFFEE', slug: 'coffee', icon: Coffee, image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

/* ─────── Value Chain ─────── */
const valueChain = [
  { step: '1', title: 'Origination & Sourcing', desc: 'Direct procurement from farmers, cooperatives and exporters at key origins around the world.', icon: Wheat },
  { step: '2', title: 'Risk Management', desc: 'Structured contracts, hedging strategies and disciplined credit assessment to protect every transaction.', icon: Shield },
  { step: '3', title: 'Logistics & Shipping', desc: 'Vessel chartering, freight optimization and end-to-end documentation management.', icon: Ship },
  { step: '4', title: 'Distribution & Delivery', desc: 'Reliable, timely delivery to millers, feed producers, food manufacturers and industrial buyers.', icon: Globe },
];

/* ─────── Who We Serve (Scoular-inspired) ─────── */
const whoWeServe = [
  { name: 'Flour Millers', icon: Factory, desc: 'Consistent-quality wheat and grain supply for milling operations.' },
  { name: 'Feed Producers', icon: Sprout, desc: 'Corn, soybean meal, and feedstuff ingredients for compound feed plants.' },
  { name: 'Food Manufacturers', icon: Building2, desc: 'Pulses, oilseeds, sugar and specialty ingredients for food processing.' },
  { name: 'Commodity Traders', icon: TrendingUp, desc: 'Wholesale parcels and back-to-back solutions for fellow trading houses.' },
  { name: 'Industrial Buyers', icon: Truck, desc: 'Bulk agricultural raw materials for biofuel, starch and ethanol plants.' },
  { name: 'Government Agencies', icon: HandCoins, desc: 'Tender-based supply programs for national food security and strategic reserves.' },
];

/* ─────── Pillar Triptych (Cargill-inspired) ─────── */
const pillars = [
  {
    title: 'People',
    icon: Users,
    desc: 'A lean, flat management structure with over 20 years of combined international trading experience across Dubai, Singapore, Geneva and Istanbul. We empower our team to make decisions and act.',
    link: '/careers',
    linkText: 'Explore Careers',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Products',
    icon: Wheat,
    desc: 'A diversified portfolio spanning grains, feedstuff, oilseeds, pulses, sugar, rice, coffee, cotton and specialty crops — sourced from multiple origins and delivered to structurally import-dependent markets.',
    link: '/commodities/at-a-glance',
    linkText: 'View Commodities',
    image: 'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Planet',
    icon: Leaf,
    desc: 'Contributing to food security through responsible sourcing and sustainable supply chain management. We believe profitable trade and environmental stewardship can coexist.',
    link: '/about/strengths',
    linkText: 'Our Commitment',
    image: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

/* ─────── Partners marquee ─────── */
const partnerNames = ['SGS', 'Maersk', 'Intertek', 'CMA CGM', 'MSC', 'Bureau Veritas', 'GAFTA', 'FOSFA', 'GPC', 'Standard Chartered'];

/* ─────── Diamond mosaic images ─────── */
const diamondImages = [
  'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/2523650/pexels-photo-2523650.jpeg?auto=compress&cs=tinysrgb&w=300',
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [insights, setInsights] = useState([]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Fetch latest insights
  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
    fetch(`${backendUrl}/api/insights`)
      .then((res) => res.json())
      .then((data) => setInsights(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => setInsights([]));
  }, []);

  return (
    <div>
      {/* ═══════ HERO CAROUSEL ═══════ */}
      <section className="relative w-full" style={{ height: 'calc(100vh - 72px)', minHeight: '560px' }} data-testid="hero-section">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0">
            <img src={slides[currentSlide].image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.5) 100%)' }} />
          </motion.div>
        </AnimatePresence>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
                <div className="mb-4"><span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#7B1E2F' }}>Peninsula Agritrade</span></div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                  <span style={{ color: '#7B1E2F' }}>{slides[currentSlide].action}</span>{' '}{slides[currentSlide].headline}
                </h1>
                <p className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">{slides[currentSlide].subtext}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg" className="rounded-full px-8 font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5" style={{ background: '#7B1E2F', color: 'white' }} data-testid="hero-discover-us-button">
                    <Link to="/about/who-we-are">Discover Us</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full px-8 font-medium border-white/25 text-white hover:bg-white/10 hover:text-white" data-testid="pdf-download-company-profile">
                    <a href={getProfileDownloadUrl()} target="_blank" rel="noopener noreferrer">Company Profile</a>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-5 items-center">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} className="flex items-center gap-2 group transition-all" data-testid={`hero-dot-${i}`}>
                  <span className={`text-xs font-mono font-bold transition-colors ${i === currentSlide ? 'text-[#7B1E2F]' : 'text-white/40 group-hover:text-white/70'}`}>0{i + 1}</span>
                  <div className="h-[2px] transition-all duration-500" style={{ width: i === currentSlide ? '40px' : '20px', background: i === currentSlide ? '#7B1E2F' : 'rgba(255,255,255,0.25)' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ ANIMATED STATS ═══════ */}
      <section style={{ background: '#0b1220' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center">
                  <Icon className="w-5 h-5 mx-auto mb-3" style={{ color: '#7B1E2F' }} />
                  <div className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-none tracking-tight">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <div className="mt-2 h-px w-12 mx-auto" style={{ background: 'rgba(230,126,34,0.4)' }} />
                  <div className="mt-3 text-xs sm:text-sm font-medium tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ MISSION (Agrocorp-inspired) ═══════ */}
      <section className="py-20 lg:py-28" style={{ background: '#ffffff' }} data-testid="mission-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            <div className="relative overflow-hidden rounded-l-2xl lg:rounded-l-3xl" style={{ minHeight: '420px' }}>
              <img src="https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Grain silos" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center py-12 lg:py-16 px-8 lg:px-16">
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: '#0b1220' }}>Our Mission</h2>
              <div className="mt-4 w-14 h-[3px] rounded-full" style={{ background: '#7B1E2F' }} />
              <p className="mt-6 text-base sm:text-lg leading-relaxed" style={{ color: '#4b5563' }}>
                To connect global producers and consumers through reliable, efficient, and transparent physical trading operations. To be a one-stop service for customers by providing relevant, up-to-date market intelligence — building long-lasting relationships through proactive, responsible, and reassuring counterparty behavior.
              </p>
              <div className="mt-8">
                <Button asChild className="rounded-full px-7 font-medium" style={{ background: '#0b1220', color: 'white' }}>
                  <Link to="/about/who-we-are">Learn More <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ VISION (Agrocorp-inspired reversed) ═══════ */}
      <section className="py-20 lg:py-28" style={{ background: '#f8f9fb' }} data-testid="vision-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            <div className="flex flex-col justify-center py-12 lg:py-16 px-8 lg:px-16 order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: '#0b1220' }}>Our Vision</h2>
              <div className="mt-4 w-14 h-[3px] rounded-full" style={{ background: '#7B1E2F' }} />
              <p className="mt-6 text-base sm:text-lg leading-relaxed" style={{ color: '#4b5563' }}>
                To be a premier global supply chain manager and agri-business platform — a leading integrated agricultural commodities trading house and a dependable global link between producers and consumers, competing alongside multinationals in key agri-commodity markets.
              </p>
              <div className="mt-8">
                <Button asChild className="rounded-full px-7 font-medium" style={{ background: '#0b1220', color: 'white' }}>
                  <Link to="/about/strengths">Our Strengths <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-r-2xl lg:rounded-r-3xl order-1 lg:order-2" style={{ minHeight: '420px' }}>
              <img src="https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Green field" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CLOSE TO THE SOURCE — Product Showcase (Bilcanli-inspired) ═══════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '520px' }} data-testid="close-to-source-section">
        {/* Background: hands holding grains */}
        <img
          src="https://images.unsplash.com/photo-1756047890348-e3a5f8e9d9d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMGhvbGRpbmclMjB3aGVhdCUyMGdyYWlucyUyMGFncmljdWx0dXJhbCUyMGNvbW1vZGl0eXxlbnwwfHx8fDE3NzQyMDkzMDN8MA&ixlib=rb-4.1.0&q=85"
          alt="Hands touching golden wheat stalks in a field"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(11,18,32,0.82) 0%, rgba(11,18,32,0.55) 50%, rgba(11,18,32,0.35) 100%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline */}
            <div>
              <span className="text-xs font-mono tracking-widest uppercase mb-4 block" style={{ color: '#7B1E2F' }}>Close to the Source</span>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight">
                Right Raw Material.<br />
                <span style={{ color: '#7B1E2F' }}>Right Result.</span>
              </h2>
              <div className="mt-5 w-16 h-[3px] rounded-full" style={{ background: '#7B1E2F' }} />
              <p className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed max-w-lg">
                A wide portfolio of agricultural commodities sourced directly from key origins, tailored to meet the specific requirements of our buyers.
              </p>
            </div>
            {/* Right: Flowing product list */}
            <div>
              <h3 className="text-xs font-bold tracking-wider uppercase mb-6" style={{ color: '#7B1E2F', letterSpacing: '0.12em' }}>Our Products</h3>
              <div className="flex flex-wrap gap-2.5">
                {['Wheat', 'Corn', 'Barley', 'Soybean Meal', 'Sunflower Seed Meal', 'Rapeseed', 'Lentils', 'Chickpeas', 'Yellow Peas', 'Faba Beans', 'Rice', 'Sugar', 'Cotton', 'Coffee', 'DDGS', 'Sesame Seeds', 'Sorghum', 'Mung Beans'].map((product, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 cursor-default"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.75)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {product}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <Button asChild className="rounded-full px-7 font-medium" style={{ background: '#7B1E2F', color: 'white' }}>
                  <Link to="/commodities/at-a-glance">Explore All Products <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PEOPLE / PRODUCTS / PLANET TRIPTYCH (Cargill-inspired) ═══════ */}
      <section className="py-20 lg:py-24" style={{ background: '#ffffff' }} data-testid="pillars-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#7B1E2F' }}>What Drives Us</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: '#0b1220' }}>People. Products. Planet.</h2>
          </div>
          <div className="flex justify-center mb-14"><div className="w-14 h-[3px] rounded-full" style={{ background: '#7B1E2F' }} /></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Link key={i} to={p.link} className="group relative bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1" style={{ borderColor: '#e5e7eb' }} data-testid={`pillar-card-${p.title.toLowerCase()}`}>
                  <div className="relative h-52 overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,18,32,0.7) 0%, transparent 60%)' }} />
                    <div className="absolute bottom-4 left-5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#7B1E2F' }}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{p.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{p.desc}</p>
                    <div className="mt-5 text-xs font-semibold inline-flex items-center gap-1 transition-all group-hover:gap-2" style={{ color: '#7B1E2F' }}>{p.linkText} <ArrowRight className="w-3 h-3" /></div>
                  </div>
                  <div className="h-[3px] w-0 group-hover:w-full transition-all duration-300" style={{ background: '#7B1E2F' }} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ WHO WE SERVE (Scoular-inspired icon grid) ═══════ */}
      <section className="py-20 lg:py-24" style={{ background: '#0b1220' }} data-testid="who-we-serve-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#7B1E2F' }}>Our Markets</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">Who We Serve</h2>
          </div>
          <div className="flex justify-center mb-4"><div className="w-14 h-[3px] rounded-full" style={{ background: '#7B1E2F' }} /></div>
          <p className="text-center text-sm sm:text-base mb-14 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
            We supply a diversified base of buyers across the food, feed and industrial sectors, ensuring that agricultural raw materials reach the right hands at the right time.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {whoWeServe.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="group text-center" data-testid={`who-we-serve-${i}`}>
                  <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: 'rgba(230,126,34,0.1)', border: '2px solid rgba(230,126,34,0.25)' }}>
                    <Icon className="w-8 h-8 transition-colors duration-300 group-hover:text-[#7B1E2F]" style={{ color: 'rgba(255,255,255,0.7)' }} />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-white tracking-wide">{item.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ COMMODITIES SHOWCASE ═══════ */}
      <section className="py-16 lg:py-20" style={{ background: '#f8f9fb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4"><h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: '#0b1220' }}>Our Commodities</h2></div>
          <div className="flex justify-center mb-12"><div className="w-14 h-[3px] rounded-full" style={{ background: '#7B1E2F' }} /></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {commodities.map((c, i) => {
              const Icon = c.icon;
              return (
                <Link key={i} to={`/commodities/${c.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-testid={`commodity-showcase-${c.slug}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10" style={{ background: '#7B1E2F' }}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="pt-8 pb-5 px-3 text-center">
                    <span className="text-xs sm:text-sm font-bold tracking-wide" style={{ color: '#0b1220' }}>{c.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Button asChild className="rounded-full px-7 font-medium" style={{ background: '#7B1E2F', color: 'white' }}>
              <Link to="/commodities/at-a-glance">Explore All <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════ SPLIT-SCREEN AGRICULTURAL PANORAMA (Bilcanli-inspired) ═══════ */}
      <section className="relative overflow-hidden" data-testid="split-panorama-section">
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: '480px' }}>
          {/* Left image — Sunflower/wheat field at sunset */}
          <div className="relative overflow-hidden" style={{ minHeight: '320px' }}>
            <img
              src="https://images.pexels.com/photos/7819671/pexels-photo-7819671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Sunflower field at sunset"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(11,18,32,0.55), rgba(11,18,32,0.25))' }} />
          </div>
          {/* Right image — Green corn/crop field */}
          <div className="relative overflow-hidden" style={{ minHeight: '320px' }}>
            <img
              src="https://images.pexels.com/photos/5601957/pexels-photo-5601957.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Green corn field"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, rgba(11,18,32,0.55), rgba(11,18,32,0.25))' }} />
          </div>
        </div>
        {/* Centered overlay text */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight">
              From Diverse Origins,<br />
              <span style={{ color: '#7B1E2F' }}>One Trusted Source.</span>
            </h2>
            <div className="mt-5 flex justify-center"><div className="w-14 h-[3px] rounded-full" style={{ background: '#7B1E2F' }} /></div>
            <p className="mt-5 text-sm sm:text-base text-white/65 max-w-xl mx-auto leading-relaxed">
              Our sourcing network spans the world's most important agricultural regions, from the sunflower fields of the Black Sea to the grain belts of the Americas. Diversity of origin means reliability of supply.
            </p>
            <div className="mt-7">
              <Button asChild className="rounded-full px-7 font-medium shadow-lg" style={{ background: '#7B1E2F', color: 'white' }}>
                <Link to="/about/who-we-are">Discover Our Reach <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SUSTAINABILITY BANNER ═══════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '400px' }}>
        <img src="https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=1260" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(11,60,40,0.88) 0%, rgba(11,60,40,0.6) 60%, rgba(11,60,40,0.4) 100%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="max-w-xl">
            <span className="text-xs font-mono tracking-widest uppercase text-white/60">Sustainability</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white leading-snug">Trading today with tomorrow in mind.</h2>
            <div className="mt-4 w-14 h-[3px] rounded-full" style={{ background: '#7B1E2F' }} />
            <p className="mt-5 text-base text-white/70 leading-relaxed">
              From farm-level traceability to transparent documentation, we work with suppliers who share our commitment to responsible sourcing and reduced environmental impact. Every shipment is an opportunity to build a more sustainable supply chain.
            </p>
            <div className="mt-8">
              <Button asChild className="rounded-full px-7 font-medium" style={{ background: 'white', color: '#0b1220' }}>
                <Link to="/about/strengths">Discover <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ END-TO-END VALUE CHAIN (Agrocorp cards) ═══════ */}
      <section className="py-20 lg:py-24" style={{ background: '#ffffff' }} data-testid="value-chain-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4"><h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: '#0b1220' }}>End-to-End Trading Model</h2></div>
          <div className="flex justify-center mb-14"><div className="w-14 h-[3px] rounded-full" style={{ background: '#7B1E2F' }} /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueChain.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="group relative bg-white rounded-2xl border px-6 py-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{ borderColor: '#e5e7eb' }} data-testid={`value-chain-card-${i}`}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300 group-hover:bg-[#7B1E2F]" style={{ background: '#f3f4f6' }}>
                    <Icon className="w-7 h-7 transition-colors duration-300 group-hover:text-white" style={{ color: '#7B1E2F' }} />
                  </div>
                  <h3 className="font-bold text-base mb-3" style={{ color: '#0b1220' }}>{item.step}. {item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ WHY GLOBALAGRI (InspectSea "What Sets Us Apart" inspired) ═══════ */}
      <section className="py-20 lg:py-24" style={{ background: '#f8f9fb' }} data-testid="why-peninsula-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#7B1E2F' }}>Why Choose Us</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: '#0b1220' }}>What Sets Us Apart</h2>
          </div>
          <div className="flex justify-center mb-14"><div className="w-14 h-[3px] rounded-full" style={{ background: '#7B1E2F' }} /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Multi-Origin Sourcing', desc: 'Direct procurement across Black Sea, South America, Africa, Asia, and Australia — reducing single-origin risk and optimizing landed costs.' },
              { title: 'Client-Centric Approach', desc: 'We are a one-stop service for our customers, providing market intelligence, tailored solutions, and proactive communication at every stage.' },
              { title: 'Trade Finance Expertise', desc: 'Structured trade finance, pre-export finance facilities, and LC operations managed with precision and speed by our dedicated finance team.' },
              { title: 'Freight & Logistics Management', desc: 'Vessel chartering, containerized shipments, and end-to-end logistics from origin to destination with certified documentation.' },
              { title: 'Risk Management Discipline', desc: 'Stringent counterparty assessment, mark-to-market monitoring, and hedging strategies protect every transaction in our portfolio.' },
              { title: 'GAFTA, FOSFA & ICC Compliance', desc: 'All contracts and operations adhere to international trade association rules, ensuring legal certainty and global recognition.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5" style={{ borderColor: '#e5e7eb' }} data-testid={`why-card-${i}`}>
                <div className="w-2 h-2 rounded-full mb-4" style={{ background: '#7B1E2F' }} />
                <h3 className="font-bold text-base mb-2" style={{ color: '#0b1220' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ LATEST MARKET INSIGHTS (Cargill/Andersons-inspired) ═══════ */}
      <section className="py-20 lg:py-24" style={{ background: '#f8f9fb' }} data-testid="latest-insights-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#7B1E2F' }}>Market Intelligence</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: '#0b1220' }}>Latest Insights</h2>
              <div className="mt-4 w-14 h-[3px] rounded-full" style={{ background: '#7B1E2F' }} />
            </div>
            <Button asChild className="rounded-full px-6 font-medium self-start sm:self-auto" style={{ background: '#0b1220', color: 'white' }}>
              <Link to="/insights">View All <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight, i) => (
              <Link key={i} to={`/insights/${insight.slug}`} className="group bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{ borderColor: '#e5e7eb' }} data-testid={`insight-card-${i}`}>
                <div className="relative h-48 overflow-hidden">
                  <img src={insight.image || 'https://images.pexels.com/photos/6489275/pexels-photo-6489275.jpeg?auto=compress&cs=tinysrgb&w=600'} alt={insight.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <Badge className="text-[10px] font-bold tracking-wide px-3 py-1" style={{ background: '#7B1E2F', color: 'white', border: 'none' }}>{insight.category}</Badge>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs mb-3" style={{ color: '#9ca3af' }}>
                    <span>{insight.read_time || '4 min read'}</span>
                    <span>|</span>
                    <span>{insight.date ? new Date(insight.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}</span>
                  </div>
                  <h3 className="font-bold text-base leading-snug mb-2 transition-colors group-hover:text-[#7B1E2F]" style={{ color: '#0b1220' }}>{insight.title}</h3>
                  <p className="text-sm leading-relaxed line-clamp-2" style={{ color: '#6b7280' }}>{insight.excerpt}</p>
                  <div className="mt-4 text-xs font-semibold inline-flex items-center gap-1 transition-all group-hover:gap-2" style={{ color: '#7B1E2F' }}>Read More <ArrowRight className="w-3 h-3" /></div>
                </div>
                <div className="h-[3px] w-0 group-hover:w-full transition-all duration-300" style={{ background: '#7B1E2F' }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ EMPLOYEE TESTIMONIAL (Andersons-inspired) ═══════ */}
      <section className="py-20 lg:py-24" style={{ background: '#ffffff' }} data-testid="testimonial-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <Quote className="w-10 h-10 mb-6" style={{ color: 'rgba(230,126,34,0.3)' }} />
              <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed italic" style={{ color: '#0b1220' }}>
                "Our business is built on the principle that the best relationships in trading are earned through consistent daily execution. We deliver what we promised — at the agreed price, quality, and time. That's not a tagline, it's how we operate."
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#7B1E2F' }}>
                  <span className="text-white font-bold text-sm">FK</span>
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: '#0b1220' }}>Founding Team</div>
                  <div className="text-xs" style={{ color: '#6b7280' }}>Peninsula Agritrade LLC</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 relative">
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Team collaboration" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,18,32,0.5) 0%, transparent 50%)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DOWNLOAD BROCHURE CTA ═══════ */}
      <section className="py-10" style={{ background: '#f8f9fb' }} data-testid="download-brochure-section">
        <div className="text-center">
          <Button asChild size="lg" className="rounded-full px-10 py-6 font-bold text-sm tracking-wider uppercase shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5" style={{ background: '#7B1E2F', color: 'white', letterSpacing: '0.08em' }} data-testid="download-brochure-btn">
            <a href={getProfileDownloadUrl()} target="_blank" rel="noopener noreferrer">
              <Download className="w-4 h-4 mr-2" />Download Our Corporate Brochure
            </a>
          </Button>
        </div>
      </section>

      {/* ═══════ PARTNERS MARQUEE ═══════ */}
      <section className="py-14" style={{ background: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4"><div className="text-center"><h2 className="text-3xl font-bold tracking-tight" style={{ color: '#0b1220' }}>Our Partners</h2></div></div>
        <div className="flex justify-center mb-10"><div className="w-14 h-[3px] rounded-full" style={{ background: '#7B1E2F' }} /></div>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-12 items-center">
            {[...partnerNames, ...partnerNames].map((name, i) => (
              <div key={i} className="flex-shrink-0 px-8 py-4 rounded-xl border" style={{ borderColor: '#e5e7eb', minWidth: '180px' }}>
                <div className="text-center font-bold text-sm" style={{ color: '#374151' }}>{name}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee { animation: marquee 30s linear infinite; }
          .animate-marquee:hover { animation-play-state: paused; }
        `}</style>
      </section>

      {/* ═══════ FOUNDER QUOTE WITH DIAMOND MOSAIC ═══════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: '#0b1220' }} data-testid="founder-quote-section">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block" style={{ opacity: 0.12 }}>
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-3 p-8" style={{ transform: 'rotate(45deg) scale(1.4)', transformOrigin: 'center center' }}>
            {diamondImages.map((img, i) => (<div key={i} className="overflow-hidden rounded-lg"><img src={img} alt="" className="w-full h-full object-cover" /></div>))}
            {diamondImages.slice(0, 3).map((img, i) => (<div key={`dup-${i}`} className="overflow-hidden rounded-lg"><img src={img} alt="" className="w-full h-full object-cover" /></div>))}
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-[3px] rounded-full mb-8" style={{ background: '#7B1E2F' }} />
              <blockquote className="text-xl sm:text-2xl lg:text-[1.75rem] font-medium text-white leading-relaxed italic">
                "In commodities trading, your word is your bond. We built this company on that principle — integrity in every transaction, discipline in every execution, and commitment to every partner."
              </blockquote>
              <div className="mt-8">
                <div className="text-sm font-bold text-white">Leadership Team</div>
                <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Peninsula Agritrade LLC</div>
              </div>
            </div>
            <div className="relative flex justify-center items-center">
              <div className="grid grid-cols-3 gap-3" style={{ width: '320px' }}>
                {diamondImages.map((img, i) => (
                  <div key={i} className="overflow-hidden" style={{ width: '96px', height: '96px', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA BAND ═══════ */}
      <section className="py-14" style={{ background: '#7B1E2F' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Ready to discuss your requirements?</h2>
          <p className="mt-3 text-base text-white/80 max-w-xl mx-auto">Whether you need grains, oilseeds, sugar, or coffee — our trading desk is ready to help.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 font-medium hover:-translate-y-0.5" style={{ background: '#0b1220', color: 'white' }}>
              <Link to="/contact">Contact Our Team</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 font-medium border-white/40 text-white hover:bg-white/10 hover:text-white">
              <Link to="/commodities/at-a-glance">Browse Commodities</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
