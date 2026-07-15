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
    image: 'https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
    action: 'Connecting',
    headline: 'Qatar to the global agricultural value chain\nand supporting long-term national food security goals.',
    subtext: "Qatar's first fully integrated agri-supply chain manager and global trading platform,\nlinking producers and consumers worldwide.",
  },
  {
    image: 'https://images.pexels.com/photos/1211787/pexels-photo-1211787.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    action: 'Grounded',
    headline: 'in discipline, integrity, and proven\noperational excellence across global markets.',
    subtext: 'Supported by a team with 25+ years of global trading experience, we execute every commitment\nwith precision — price, quality, and timing delivered as promised.',
  },
  {
    image: 'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    action: 'Partnerships',
    headline: "built on trust, long-term alignment,\nand Qatar's Food Security Vision 2030.",
    subtext: 'From inland grain origins to major global port terminals, we cultivate relationships that reinforce\nnational food resilience and support sustainable international supply chains.',
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
    const timer = setInterval(nextSlide, 4750);
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
              <motion.div key={currentSlide} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-white leading-[1.12] tracking-tight whitespace-pre-line">
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
              {slides.map((s, i) => (
                <button key={s.action} onClick={() => setCurrentSlide(i)} className="group" data-testid={`hero-dot-${i}`}>
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
              <div key={s.label} className="text-center">
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
