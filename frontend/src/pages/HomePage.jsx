import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Ship, BarChart3, Globe, Wheat, Shield, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { getProfileDownloadUrl } from '../lib/api';

/* ─── Hero Slides ─── */
const slides = [
  {
    image: 'https://images.pexels.com/photos/36091328/pexels-photo-36091328.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    action: 'Connects',
    headline: 'Qatar to the global\nagricultural value chain.',
    subtext: 'A fully integrated agri-supply chain manager and global trading platform,\nconnecting agricultural producers with consumers across the globe.',
  },
  {
    image: 'https://images.pexels.com/photos/1211787/pexels-photo-1211787.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    action: 'Delivers',
    headline: 'with discipline, integrity\nand daily execution.',
    subtext: 'Over 25 years of international trading experience across Dubai, Singapore, Geneva\nand Istanbul. We deliver what we promised — at the agreed price, quality and time.',
  },
  {
    image: 'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    action: 'Grows',
    headline: 'partnerships rooted in trust\nand long-term vision.',
    subtext: 'From grain silos in the heartlands to port terminals worldwide,\nwe build lasting relationships that nourish communities and support food security.',
  },
];

/* ─── Stats ─── */
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
    const step = Math.max(Math.floor((duration * 1000) / end), 16);
    const inc = Math.ceil(end / (duration * 1000 / step));
    const t = setInterval(() => {
      start += inc;
      if (start >= end) { setCount(end); clearInterval(t); } else { setCount(start); }
    }, step);
    return () => clearInterval(t);
  }, [isInView, value, duration]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ─── Commodities ─── */
const commodities = [
  { name: 'Grains & Feeds', path: '/commodities/grains-feeds', image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Oilseeds', path: '/commodities/oilseeds', image: 'https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Pulses & Beans', path: '/commodities/pulses-beans', image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Sugar & Rice', path: '/commodities/sugar-rice', image: 'https://images.pexels.com/photos/2523650/pexels-photo-2523650.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Coffee', path: '/commodities/coffee', image: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

/* ─── Differentiators ─── */
const differentiators = [
  { title: 'Multi-Origin Sourcing', desc: 'Direct procurement across Black Sea, Americas, Africa and Asia — reducing single-origin risk and optimizing landed costs.', icon: Globe },
  { title: 'Risk Management', desc: 'Stringent counterparty assessment, mark-to-market monitoring, and hedging strategies protect every transaction.', icon: Shield },
  { title: 'Freight & Logistics', desc: 'Vessel chartering, containerized shipments, and end-to-end documentation from origin to destination.', icon: Ship },
  { title: 'Trade Compliance', desc: 'All operations adhere to GAFTA, FOSFA and ICC regulations, ensuring legal certainty and global recognition.', icon: BarChart3 },
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

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
    fetch(`${backendUrl}/api/insights`)
      .then((r) => r.json())
      .then((d) => setInsights(Array.isArray(d) ? d.slice(0, 3) : []))
      .catch(() => setInsights([]));
  }, []);

  return (
    <div>

      {/* ══════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative w-full" style={{ height: 'calc(100vh - 120px)', minHeight: '520px' }} data-testid="hero-section">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0">
            <img src={slides[currentSlide].image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(11,18,32,0.65) 0%, rgba(11,18,32,0.35) 50%, rgba(11,18,32,0.55) 100%)' }} />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.12] tracking-tight whitespace-pre-line">
                  <span style={{ color: '#8A1538' }}>{slides[currentSlide].action}</span>{' '}{slides[currentSlide].headline}
                </h1>
                <p className="mt-6 text-base sm:text-lg text-white/55 leading-relaxed max-w-4xl mx-auto whitespace-pre-line">{slides[currentSlide].subtext}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg" className="rounded-full px-8 font-medium shadow-lg transition-all hover:-translate-y-0.5" style={{ background: '#8A1538', color: 'white' }} data-testid="hero-discover-us-button">
                    <Link to="/about/who-we-are">Discover Us</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full px-8 font-medium border-white/20 text-white hover:bg-white/10 hover:text-white" data-testid="pdf-download-company-profile">
                    <a href={getProfileDownloadUrl()} target="_blank" rel="noopener noreferrer">Company Profile</a>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} className="group" data-testid={`hero-dot-${i}`}>
                  <div className="h-[3px] rounded-full transition-all duration-500" style={{ width: i === currentSlide ? '32px' : '16px', background: i === currentSlide ? '#8A1538' : 'rgba(255,255,255,0.3)' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. STATS
      ══════════════════════════════════════════════════ */}
      <section style={{ background: '#fdf2f5', borderBottom: '1px solid #f3d6df' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: '#8A1538' }}>
                  <AnimatedCounter value={s.value} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <div className="mt-1.5 text-xs font-medium tracking-wider uppercase" style={{ color: '#6b7280' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. ABOUT
      ══════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28" style={{ background: '#fff' }} data-testid="about-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img src="https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Grain storage facility" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: '#0b1220' }}>
                Who We Are
              </h2>
              <div className="mt-4 w-12 h-[3px] rounded-full" style={{ background: '#8A1538' }} />
              <p className="mt-6 text-base leading-relaxed" style={{ color: '#4b5563' }}>
                Peninsula Agritrade is a fully integrated agri-supply chain manager and global trading platform. We connect agricultural producers with consumers through reliable, efficient, and transparent physical trading operations.
              </p>
              <p className="mt-4 text-base leading-relaxed" style={{ color: '#4b5563' }}>
                With over 20 years of combined international trading experience, we serve as a one-stop service for our customers — providing market intelligence, disciplined execution, and proactive communication at every stage.
              </p>
              <div className="mt-8">
                <Button asChild className="rounded-full px-6 font-medium" style={{ background: '#8A1538', color: 'white' }}>
                  <Link to="/about/who-we-are">Learn More <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. COMMODITIES
      ══════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-24" style={{ background: '#f9fafb' }} data-testid="commodities-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#0b1220' }}>Our Commodities</h2>
            <div className="mt-4 w-12 h-[3px] rounded-full mx-auto" style={{ background: '#8A1538' }} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {commodities.map((c, i) => (
              <Link key={i} to={c.path} className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-testid={`commodity-card-${i}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3.5 text-center">
                  <span className="text-sm font-semibold" style={{ color: '#0b1220' }}>{c.name}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild className="rounded-full px-6 font-medium" style={{ background: '#8A1538', color: 'white' }}>
              <Link to="/commodities/at-a-glance">View All Products <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. DIFFERENTIATORS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-24" style={{ background: '#fff' }} data-testid="differentiators-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#0b1220' }}>What Sets Us Apart</h2>
            <div className="mt-4 w-12 h-[3px] rounded-full mx-auto" style={{ background: '#8A1538' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((d, i) => {
              const Icon = d.icon;
              return (
                <div key={i} className="group rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5" style={{ borderColor: '#e5e7eb' }} data-testid={`diff-card-${i}`}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-[#8A1538]" style={{ background: '#f3f4f6' }}>
                    <Icon className="w-5 h-5 transition-colors duration-300 group-hover:text-white" style={{ color: '#8A1538' }} />
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: '#0b1220' }}>{d.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{d.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: '#8A1538' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Ready to discuss your requirements?</h2>
          <p className="mt-3 text-sm text-white/70 max-w-lg mx-auto">Whether you need grains, oilseeds, sugar, or coffee — our trading desk is ready to help.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 font-medium" style={{ background: 'white', color: '#8A1538' }}>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 font-medium border-white/40 text-white hover:bg-white/10 hover:text-white">
              <Link to="/commodities/at-a-glance">Browse Products</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
